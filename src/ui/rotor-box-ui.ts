import { LEATHER, ROTOR_LABEL, ROTOR_LABEL_LETTER } from './colors';
import { RotorBox } from '../enigma/rotor-box/rotor-box';
import { ENIGMA_FONT } from './fonts';

const ROTOR_LABEL_DISTANCE = 0.05;
const ROTOR_LABEL_POSITION = 0.56;
const ROTOR_LABEL_HEIGHT = 0.156;
const ROTOR_LABEL_WIDTH = 0.07;

export class RotorBoxUI {
  constructor(
    private width: number,
    private height: number,
    private rotorBox: RotorBox,
    private context: CanvasRenderingContext2D
  ) {}

  private drawRotors() {
    const { rotors } = this.rotorBox;
    const rotorLabelHeight = this.height * ROTOR_LABEL_HEIGHT;
    const rotorLabelWidth = this.width * ROTOR_LABEL_WIDTH;
    const rotorLabelDistance = this.width * ROTOR_LABEL_DISTANCE;
    const rotorLabelPosition = this.height * ROTOR_LABEL_POSITION;
    const rotorLetterPosition = rotorLabelPosition + rotorLabelHeight / 2;
    const rotorsTotalWidth =
      rotors.length * rotorLabelWidth + (rotors.length - 1) * rotorLabelDistance;

    let leftOrigin = (this.width - rotorsTotalWidth) / 2;

    rotors.forEach(r => {
      this.context.fillStyle = ROTOR_LABEL;
      this.context.fillRect(leftOrigin, rotorLabelPosition, rotorLabelWidth, rotorLabelHeight);
      this.context.fillStyle = ROTOR_LABEL_LETTER;
      this.context.font = ENIGMA_FONT;
      this.context.textAlign = 'center';
      this.context.textBaseline = 'middle';
      this.context.fillText(r.positionLabel, leftOrigin + rotorLabelWidth / 2, rotorLetterPosition);
      leftOrigin += rotorLabelWidth + rotorLabelDistance;
    });
  }

  draw() {
    this.context.fillStyle = LEATHER;
    this.context.fillRect(0, 0, this.width, this.height);
    this.drawRotors();
  }
}
