import { LEATHER, ROTOR_LABEL, ROTOR_LABEL_LETTER } from './colors';
import { EnigmaConfiguration } from '../enigma/enigma-configurations';
import { ENIGMA_FONT } from './fonts';

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

const ROTORBOARD_POSITION = 0;
const ROTORBOARD_HEIGHT = 1;

const ROTOR_LABEL_DISTANCE = 0.05;
const ROTOR_LABEL_POSITION = 0.56;
const ROTOR_LABEL_HEIGHT = 0.156;
const ROTOR_LABEL_WIDTH = 0.07;

export class EnigmaUI {
  constructor(
    private enigmaConfiguration: EnigmaConfiguration,
    private width: number,
    private height: number
  ) {}

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
        c.font = ENIGMA_FONT;
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

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = LEATHER;
    context.fillRect(0, 0, this.width, this.height);
    this.drawRotorboard(context);
  }
}
