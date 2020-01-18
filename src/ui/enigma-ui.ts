import {
  LEATHER,
  SILVER,
  KEY_GLASS,
  KEY_LETTER,
  LAMP_GLASS,
  LAMP_GLASS_ENLIGHTED,
  LAMP_LETTER,
  LAMP_LETTER_ENLIGHTED,
  KEY_GLASS_PRESSED,
  KEY_LETTER_PRESSED,
  ROTOR_LABEL,
  ROTOR_LABEL_LETTER
} from './colors';
import { EnigmaConfiguration } from '../enigma/enigma-configurations';

type KeyPosition = {
  key: string;
  x: number;
  y: number;
};

function drawSubcomponent(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  drawMethod: (context: CanvasRenderingContext2D) => void
) {
  context.save();
  context.translate(x, y);
  context.beginPath();
  context.rect(0, 0, width, height);
  context.clip();
  drawMethod(context);
  context.restore();
}

const FONT = '30px Arial';

const ROTORBOARD_POSITION = 0;
const ROTORBOARD_HEIGHT = 0.45;
const LAMPBOARD_POSITION = 0.45;
const LAMPBOARD_HEIGHT = 0.275;
const KEYBOARD_POSITION = 0.725;
const KEYBOARD_HEIGHT = 0.275;

const ROTOR_LABEL_DISTANCE = 0.05;
const ROTOR_LABEL_POSITION = 0.25;
const ROTOR_LABEL_HEIGHT = 0.07;
const ROTOR_LABEL_WIDTH = 0.07;

const LAMP_RADIUS = 0.03;
const KEY_OUTER_RADIUS = 0.03;
const KEY_INNER_RADIUS = 0.025;
const KEY_POSITIONS: KeyPosition[] = [
  { key: 'Q', x: 0.1, y: 0.06966 },
  { key: 'W', x: 0.2, y: 0.06966 },
  { key: 'E', x: 0.3, y: 0.06966 },
  { key: 'R', x: 0.4, y: 0.06966 },
  { key: 'T', x: 0.5, y: 0.06966 },
  { key: 'Z', x: 0.6, y: 0.06966 },
  { key: 'U', x: 0.7, y: 0.06966 },
  { key: 'I', x: 0.8, y: 0.06966 },
  { key: 'O', x: 0.9, y: 0.06966 },
  { key: 'A', x: 0.15, y: 0.13899 },
  { key: 'S', x: 0.25, y: 0.13899 },
  { key: 'D', x: 0.35, y: 0.13899 },
  { key: 'F', x: 0.45, y: 0.13899 },
  { key: 'G', x: 0.55, y: 0.13899 },
  { key: 'H', x: 0.65, y: 0.13899 },
  { key: 'J', x: 0.75, y: 0.13899 },
  { key: 'K', x: 0.85, y: 0.13899 },
  { key: 'P', x: 0.1, y: 0.20832 },
  { key: 'Y', x: 0.2, y: 0.20832 },
  { key: 'X', x: 0.3, y: 0.20832 },
  { key: 'C', x: 0.4, y: 0.20832 },
  { key: 'V', x: 0.5, y: 0.20832 },
  { key: 'B', x: 0.6, y: 0.20832 },
  { key: 'N', x: 0.7, y: 0.20832 },
  { key: 'M', x: 0.8, y: 0.20832 },
  { key: 'L', x: 0.9, y: 0.20832 }
];

export class EnigmaUI {
  private pressedKey?: string;

  private encryptedKey?: string;

  constructor(
    private enigmaConfiguration: EnigmaConfiguration,
    private width: number,
    private height: number
  ) {
    this.pressedKey = undefined;
    this.encryptedKey = undefined;
  }

  private drawRotorboard(context: CanvasRenderingContext2D) {
    const rotorboardPosition = this.height * ROTORBOARD_POSITION;
    const rotorboardHeight = this.height * ROTORBOARD_HEIGHT;
    drawSubcomponent(context, 0, rotorboardPosition, this.width, rotorboardHeight, c => {
      const { rotors } = this.enigmaConfiguration.rotorBox;
      const rotorLabelDistance = this.width * ROTOR_LABEL_DISTANCE;
      const rotorLabelPosition = this.height * ROTOR_LABEL_POSITION;
      const rotorLabelHeight = this.height * ROTOR_LABEL_HEIGHT;
      const rotorLabelWidth = this.width * ROTOR_LABEL_WIDTH;
      let leftOrigin =
        (this.width -
          (rotors.length * rotorLabelWidth + (rotors.length - 1) * rotorLabelDistance)) /
        2;
      for (let i = 0; i < rotors.length; i++) {
        c.fillStyle = ROTOR_LABEL;
        c.fillRect(leftOrigin, rotorLabelPosition, rotorLabelWidth, rotorLabelHeight);
        c.fillStyle = ROTOR_LABEL_LETTER;
        c.font = FONT;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(
          rotors[i].positionLabel,
          leftOrigin + rotorLabelWidth / 2,
          rotorLabelPosition + rotorLabelHeight / 2
        );
        leftOrigin += rotorLabelWidth + rotorLabelDistance;
      }
    });
  }

  private drawLightboard(context: CanvasRenderingContext2D) {
    const lightboardPosition = this.height * LAMPBOARD_POSITION;
    const lightboardHeight = this.height * LAMPBOARD_HEIGHT;
    drawSubcomponent(context, 0, lightboardPosition, this.width, lightboardHeight, c => {
      for (let i = 0; i < KEY_POSITIONS.length; i++) {
        const lampX = this.width * KEY_POSITIONS[i].x;
        const lampY = this.height * KEY_POSITIONS[i].y;
        const { key } = KEY_POSITIONS[i];
        const radius = this.height * LAMP_RADIUS;
        c.fillStyle = this.encryptedKey === key ? LAMP_GLASS_ENLIGHTED : LAMP_GLASS;
        c.beginPath();
        c.arc(lampX, lampY, radius, 0, 2 * Math.PI);
        c.fill();
        c.fillStyle = this.encryptedKey === key ? LAMP_LETTER_ENLIGHTED : LAMP_LETTER;
        c.font = FONT;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(key, lampX, lampY);
      }
    });
  }

  private drawKeyboard(context: CanvasRenderingContext2D) {
    const keyboardPosition = this.height * KEYBOARD_POSITION;
    const keyboardHeight = this.height * KEYBOARD_HEIGHT;
    drawSubcomponent(context, 0, keyboardPosition, this.width, keyboardHeight, c => {
      for (let i = 0; i < KEY_POSITIONS.length; i++) {
        const keyX = this.width * KEY_POSITIONS[i].x;
        const keyY = this.height * KEY_POSITIONS[i].y;
        const { key } = KEY_POSITIONS[i];
        const outerRadius = this.height * KEY_OUTER_RADIUS;
        const innerRadius = this.height * KEY_INNER_RADIUS;
        c.fillStyle = SILVER;
        c.beginPath();
        c.arc(keyX, keyY, outerRadius, 0, 2 * Math.PI);
        c.fill();
        c.fillStyle = this.pressedKey === key ? KEY_GLASS_PRESSED : KEY_GLASS;
        c.beginPath();
        c.arc(keyX, keyY, innerRadius, 0, 2 * Math.PI);
        c.fill();
        c.fillStyle = this.pressedKey === key ? KEY_LETTER_PRESSED : KEY_LETTER;
        c.font = FONT;
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillText(KEY_POSITIONS[i].key, keyX, keyY);
      }
    });
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = LEATHER;
    context.fillRect(0, 0, this.width, this.height);
    this.drawKeyboard(context);
    this.drawLightboard(context);
    this.drawRotorboard(context);
  }

  setEncryptedKey(letter: string) {
    this.encryptedKey = letter;
  }

  resetEncryptedKey() {
    this.encryptedKey = undefined;
  }

  setPressedKey(letter: string) {
    this.pressedKey = letter;
  }

  resetPressedKey() {
    this.pressedKey = undefined;
  }
}
