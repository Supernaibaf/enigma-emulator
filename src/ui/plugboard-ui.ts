import { LEATHER, SOCKET_OUTER, SOCKET_INNER, PLUG_COLORS } from './colors';
import { PLUGBOARD_FONT } from './fonts';
import { Plugboard, Plug } from '../enigma/plugboard/plugboard';

type PlugboardConnection = {
  plug: Plug;
  color: string;
};

type PlugboardHalfConnection = {
  socket: string;
  color: string;
};

type SocketPosition = {
  letter: string;
  x: number;
  y: number;
};

const PLUG_RADIUS = 0.025;
const LETTER_OFFSET = 0.05;
const SOCKET_OUTER_RADIUS = 0.018;
const SOCKET_TOP_OFFSET = 0.136;
const SOCKET_TOP_INNER_RADIUS = 0.012;
const SOCKET_BOTTOM_OFFSET = 0.28;
const SOCKET_BOTTOM_INNER_RADIUS = 0.007;
const SOCKET_POSITIONS: SocketPosition[] = [
  { letter: 'A', x: 0.095, y: 0 },
  { letter: 'B', x: 0.185, y: 0 },
  { letter: 'C', x: 0.275, y: 0 },
  { letter: 'D', x: 0.365, y: 0 },
  { letter: 'E', x: 0.455, y: 0 },
  { letter: 'F', x: 0.545, y: 0 },
  { letter: 'G', x: 0.635, y: 0 },
  { letter: 'H', x: 0.725, y: 0 },
  { letter: 'I', x: 0.815, y: 0 },
  { letter: 'J', x: 0.905, y: 0 },
  { letter: 'K', x: 0.14, y: 0.292 },
  { letter: 'L', x: 0.23, y: 0.292 },
  { letter: 'M', x: 0.32, y: 0.292 },
  { letter: 'N', x: 0.41, y: 0.292 },
  { letter: 'O', x: 0.59, y: 0.292 },
  { letter: 'P', x: 0.68, y: 0.292 },
  { letter: 'Q', x: 0.77, y: 0.292 },
  { letter: 'R', x: 0.86, y: 0.292 },
  { letter: 'S', x: 0.095, y: 0.584 },
  { letter: 'T', x: 0.185, y: 0.584 },
  { letter: 'U', x: 0.275, y: 0.584 },
  { letter: 'V', x: 0.365, y: 0.584 },
  { letter: 'W', x: 0.635, y: 0.584 },
  { letter: 'X', x: 0.725, y: 0.584 },
  { letter: 'Y', x: 0.815, y: 0.584 },
  { letter: 'Z', x: 0.905, y: 0.584 }
];

export class PlugboardUI {
  private connections: PlugboardConnection[];

  private halfConnection?: PlugboardHalfConnection;

  constructor(
    private width: number,
    private height: number,
    private plugboard: Plugboard,
    private context: CanvasRenderingContext2D
  ) {
    this.connections = [];
  }

  private drawSockets() {
    SOCKET_POSITIONS.forEach(s => {
      this.drawTopSocket(s);
      this.drawBottomSocket(s);
      this.drawSocketLetter(s);
    });
  }

  private drawSocketLetter(socket: SocketPosition) {
    const socketX = this.width * socket.x;
    const letterY = this.height * socket.y + this.height * LETTER_OFFSET;
    this.context.fillStyle = SOCKET_OUTER;
    this.context.font = PLUGBOARD_FONT;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText(socket.letter, socketX, letterY);
  }

  private drawBottomSocket(socket: SocketPosition) {
    const socketX = this.width * socket.x;
    const socketBottomY = this.height * socket.y + this.height * SOCKET_BOTTOM_OFFSET;
    this.context.fillStyle = SOCKET_OUTER;
    this.context.beginPath();
    this.context.arc(socketX, socketBottomY, SOCKET_OUTER_RADIUS * this.width, 0, 2 * Math.PI);
    this.context.fill();
    this.context.fillStyle = SOCKET_INNER;
    this.context.beginPath();
    this.context.arc(
      socketX,
      socketBottomY,
      SOCKET_BOTTOM_INNER_RADIUS * this.width,
      0,
      2 * Math.PI
    );
    this.context.fill();
  }

  private drawTopSocket(socket: SocketPosition) {
    const socketX = this.width * socket.x;
    const socketTopY = this.height * socket.y + this.height * SOCKET_TOP_OFFSET;
    this.context.fillStyle = SOCKET_OUTER;
    this.context.beginPath();
    this.context.arc(socketX, socketTopY, SOCKET_OUTER_RADIUS * this.width, 0, 2 * Math.PI);
    this.context.fill();
    this.context.fillStyle = SOCKET_INNER;
    this.context.beginPath();
    this.context.arc(socketX, socketTopY, SOCKET_TOP_INNER_RADIUS * this.width, 0, 2 * Math.PI);
    this.context.fill();
  }

  private drawPlugs() {
    if (this.halfConnection) {
      this.drawPlug(this.halfConnection.socket, this.halfConnection.color);
    }
    this.connections.forEach(c => {
      this.drawPlug(c.plug.origin, c.color);
      this.drawPlug(c.plug.target, c.color);
    });
  }

  private drawPlug(key: string, color: string) {
    const plugPosition = SOCKET_POSITIONS.find(s => s.letter === key)!;
    const plugX = plugPosition.x * this.width;
    const plugTopY = plugPosition.y * this.height + SOCKET_TOP_OFFSET * this.height;
    const plugBottomY = plugPosition.y * this.height + SOCKET_BOTTOM_OFFSET * this.height;
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc(plugX, plugTopY, PLUG_RADIUS * this.width, Math.PI, 0);
    this.context.arc(plugX, plugBottomY, PLUG_RADIUS * this.width, 0, Math.PI);
    this.context.closePath();
    this.context.fill();
  }

  private getNextAvailableColor(): string {
    return PLUG_COLORS.find(color => !this.connections.find(c => c.color === color))!;
  }

  private socketClick(socket: string) {
    const connection = this.connections.findIndex(
      c => c.plug.origin === socket || c.plug.target === socket
    );
    if (connection >= 0) {
      this.connections.splice(connection, 1);
      this.plugboard.removeConnection(socket);
    } else if (this.halfConnection) {
      if (this.halfConnection.socket === socket) {
        this.halfConnection = undefined;
      } else {
        const plug = this.plugboard.addConnection(this.halfConnection.socket, socket);
        this.connections.push({
          plug,
          color: this.halfConnection.color
        });
        this.halfConnection = undefined;
      }
    } else {
      this.halfConnection = {
        socket,
        color: this.getNextAvailableColor()
      };
    }
    this.draw();
  }

  draw() {
    this.context.fillStyle = LEATHER;
    this.context.fillRect(0, 0, this.width, this.height);
    this.drawSockets();
    this.drawPlugs();
  }

  initializeSockets(container: HTMLElement) {
    const plugRadiusForHeight = (PLUG_RADIUS / this.height) * this.width;
    const buttonWidth = PLUG_RADIUS * 2 * 100;
    const buttonHeight = (SOCKET_BOTTOM_OFFSET - SOCKET_TOP_OFFSET + plugRadiusForHeight * 2) * 100;
    SOCKET_POSITIONS.forEach(s => {
      const top = (SOCKET_TOP_OFFSET + s.y - plugRadiusForHeight) * 100;
      const left = (s.x - PLUG_RADIUS) * 100;
      const button = document.createElement('button');
      button.addEventListener('click', () => this.socketClick(s.letter));
      button.style.width = `${buttonWidth}%`;
      button.style.height = `${buttonHeight}%`;
      button.style.top = `${top}%`;
      button.style.left = `${left}%`;
      button.setAttribute('type', 'button');
      container.appendChild(button);
    });
  }
}
