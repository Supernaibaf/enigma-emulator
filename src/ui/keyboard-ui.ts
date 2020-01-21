import {
  LEATHER,
  SILVER,
  KEY_GLASS_PRESSED,
  KEY_GLASS,
  KEY_LETTER,
  KEY_LETTER_PRESSED
} from './colors';
import { ENIGMA_FONT } from './fonts';

type KeyPosition = {
  key: string;
  x: number;
  y: number;
};

const KEY_OUTER_RADIUS = 0.03;
const KEY_INNER_RADIUS = 0.025;
const KEY_POSITIONS: KeyPosition[] = [
  { key: 'Q', x: 0.1, y: 0.25222 },
  { key: 'W', x: 0.2, y: 0.25222 },
  { key: 'E', x: 0.3, y: 0.25222 },
  { key: 'R', x: 0.4, y: 0.25222 },
  { key: 'T', x: 0.5, y: 0.25222 },
  { key: 'Z', x: 0.6, y: 0.25222 },
  { key: 'U', x: 0.7, y: 0.25222 },
  { key: 'I', x: 0.8, y: 0.25222 },
  { key: 'O', x: 0.9, y: 0.25222 },
  { key: 'A', x: 0.15, y: 0.50324 },
  { key: 'S', x: 0.25, y: 0.50324 },
  { key: 'D', x: 0.35, y: 0.50324 },
  { key: 'F', x: 0.45, y: 0.50324 },
  { key: 'G', x: 0.55, y: 0.50324 },
  { key: 'H', x: 0.65, y: 0.50324 },
  { key: 'J', x: 0.75, y: 0.50324 },
  { key: 'K', x: 0.85, y: 0.50324 },
  { key: 'P', x: 0.1, y: 0.75426 },
  { key: 'Y', x: 0.2, y: 0.75426 },
  { key: 'X', x: 0.3, y: 0.75426 },
  { key: 'C', x: 0.4, y: 0.75426 },
  { key: 'V', x: 0.5, y: 0.75426 },
  { key: 'B', x: 0.6, y: 0.75426 },
  { key: 'N', x: 0.7, y: 0.75426 },
  { key: 'M', x: 0.8, y: 0.75426 },
  { key: 'L', x: 0.9, y: 0.75426 }
];

export class KeyboardUI {
  private pressedKey?: string;

  private keyReleaseTimeout?: number;

  constructor(
    private width: number,
    private height: number,
    private context: CanvasRenderingContext2D,
    private keyDownDuration: number,
    private keyDownListener: (letter: string) => void,
    private keyUpListener: () => void
  ) {}

  private drawKeys() {
    KEY_POSITIONS.forEach(k => this.drawKey(k));
  }

  private drawKey(key: KeyPosition) {
    const keyX = this.width * key.x;
    const keyY = this.height * key.y;
    const outerRadius = this.width * KEY_OUTER_RADIUS;
    const innerRadius = this.width * KEY_INNER_RADIUS;

    this.context.fillStyle = SILVER;
    this.context.beginPath();
    this.context.arc(keyX, keyY, outerRadius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.fillStyle = this.pressedKey === key.key ? KEY_GLASS_PRESSED : KEY_GLASS;
    this.context.beginPath();
    this.context.arc(keyX, keyY, innerRadius, 0, 2 * Math.PI);
    this.context.fill();
    this.context.fillStyle = this.pressedKey === key.key ? KEY_LETTER_PRESSED : KEY_LETTER;
    this.context.font = ENIGMA_FONT;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillText(key.key, keyX, keyY);
  }

  private keyDown(key: string) {
    this.pressedKey = key;
    this.keyDownListener(key);
    this.draw();
  }

  private keyUp() {
    this.pressedKey = undefined;
    this.keyUpListener();
    this.draw();
  }

  private keyClick(key: string) {
    this.keyDown(key);
    window.clearTimeout(this.keyReleaseTimeout);
    this.keyReleaseTimeout = window.setTimeout(() => this.keyUp(), this.keyDownDuration);
  }

  private registerKeyboardListeners() {
    window.addEventListener('keydown', e => {
      const letter = e.key.toUpperCase();
      if (this.pressedKey !== letter && KEY_POSITIONS.find(k => k.key === letter)) {
        this.keyDown(letter);
      }
    });
    window.addEventListener('keyup', e => {
      const letter = e.key.toUpperCase();
      if (this.pressedKey === letter) {
        this.keyUp();
      }
    });
  }

  draw() {
    this.context.fillStyle = LEATHER;
    this.context.fillRect(0, 0, this.width, this.height);
    this.drawKeys();
  }

  initializeKeys(container: HTMLElement) {
    const keyRadiusForHeight = (KEY_OUTER_RADIUS / this.height) * this.width;
    const buttonWidth = KEY_OUTER_RADIUS * 2 * 100;
    const buttonHeight = keyRadiusForHeight * 2 * 100;
    KEY_POSITIONS.forEach(k => {
      const top = (k.y - keyRadiusForHeight) * 100;
      const left = (k.x - KEY_OUTER_RADIUS) * 100;
      const button = document.createElement('button');
      button.addEventListener('click', () => this.keyClick(k.key));
      button.style.width = `${buttonWidth}%`;
      button.style.height = `${buttonHeight}%`;
      button.style.top = `${top}%`;
      button.style.left = `${left}%`;
      button.setAttribute('type', 'button');
      container.appendChild(button);
    });
    this.registerKeyboardListeners();
  }
}
