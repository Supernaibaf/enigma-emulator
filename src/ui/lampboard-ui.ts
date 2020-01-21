import {
  LAMP_GLASS_ENLIGHTED,
  LAMP_LETTER_ENLIGHTED,
  LAMP_LETTER,
  LAMP_GLASS,
  LEATHER
} from './colors';
import { ENIGMA_FONT } from './fonts';

type LampPosition = {
  lamp: string;
  x: number;
  y: number;
};

const LAMP_RADIUS = 0.03;
const LAMP_POSITIONS: LampPosition[] = [
  { lamp: 'Q', x: 0.1, y: 0.25222 },
  { lamp: 'W', x: 0.2, y: 0.25222 },
  { lamp: 'E', x: 0.3, y: 0.25222 },
  { lamp: 'R', x: 0.4, y: 0.25222 },
  { lamp: 'T', x: 0.5, y: 0.25222 },
  { lamp: 'Z', x: 0.6, y: 0.25222 },
  { lamp: 'U', x: 0.7, y: 0.25222 },
  { lamp: 'I', x: 0.8, y: 0.25222 },
  { lamp: 'O', x: 0.9, y: 0.25222 },
  { lamp: 'A', x: 0.15, y: 0.50324 },
  { lamp: 'S', x: 0.25, y: 0.50324 },
  { lamp: 'D', x: 0.35, y: 0.50324 },
  { lamp: 'F', x: 0.45, y: 0.50324 },
  { lamp: 'G', x: 0.55, y: 0.50324 },
  { lamp: 'H', x: 0.65, y: 0.50324 },
  { lamp: 'J', x: 0.75, y: 0.50324 },
  { lamp: 'K', x: 0.85, y: 0.50324 },
  { lamp: 'P', x: 0.1, y: 0.75426 },
  { lamp: 'Y', x: 0.2, y: 0.75426 },
  { lamp: 'X', x: 0.3, y: 0.75426 },
  { lamp: 'C', x: 0.4, y: 0.75426 },
  { lamp: 'V', x: 0.5, y: 0.75426 },
  { lamp: 'B', x: 0.6, y: 0.75426 },
  { lamp: 'N', x: 0.7, y: 0.75426 },
  { lamp: 'M', x: 0.8, y: 0.75426 },
  { lamp: 'L', x: 0.9, y: 0.75426 }
];

export class LampboardUI {
  private encryptedLetter?: string;

  constructor(
    private width: number,
    private height: number,
    private context: CanvasRenderingContext2D
  ) {}

  private drawLamps() {
    LAMP_POSITIONS.forEach(l => this.drawLamp(l));
  }

  private drawLamp(lamp: LampPosition) {
    const lampX = this.width * lamp.x;
    const lampY = this.height * lamp.y;
    const radius = this.width * LAMP_RADIUS;

    this.context.fillStyle = this.encryptedLetter === lamp.lamp ? LAMP_GLASS_ENLIGHTED : LAMP_GLASS;
    this.context.beginPath();
    this.context.arc(lampX, lampY, radius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.fillStyle =
      this.encryptedLetter === lamp.lamp ? LAMP_LETTER_ENLIGHTED : LAMP_LETTER;
    this.context.font = ENIGMA_FONT;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText(lamp.lamp, lampX, lampY);
  }

  draw() {
    this.context.fillStyle = LEATHER;
    this.context.fillRect(0, 0, this.width, this.height);
    this.drawLamps();
  }

  resetEncryptedKey() {
    this.encryptedLetter = undefined;
  }

  setEncryptedKey(encryptedLetter: string) {
    this.encryptedLetter = encryptedLetter;
  }
}
