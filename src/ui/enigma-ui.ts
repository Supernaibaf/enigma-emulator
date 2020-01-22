import { EnigmaConfiguration, createEnigmaM3 } from '../enigma/enigma-configurations';
import { Configuration } from './configuration';
import { KeyboardUI } from './keyboard-ui';
import { PlugboardUI } from './plugboard-ui';
import { LampboardUI } from './lampboard-ui';
import { RotorBoxUI } from './rotor-box-ui';

const CONFIGURATION_TOGGLE_BUTTON_ID = 'enigma-configuration-button';
const CONFIGURATION_CONTAINER_ID = 'enigma-configuration-container';
const CONFIGURATION_OPEN_CLASS = 'open';

const ENIGMA_WIDTH = 1000;

const ROTOR_BOX_CONTAINER_ID = 'enigma-rotorbox-container';
const ROTOR_BOX_HEIGHT = 470;

const LAMPBOARD_CONTAINER_ID = 'enigma-lampboard-container';
const LAMPBOARD_HEIGHT = 290;

const KEYBOARD_CONTAINER_ID = 'enigma-keyboard-container';
const KEYBOARD_HEIGHT = 290;
const KEY_DOWN_DURATION = 800;

const PLUGBOARD_CONTAINER_ID = 'enigma-plugboard-container';
const PLUGBOARD_HEIGHT = 410;

function initializeCanvasContext(
  container: HTMLElement,
  width: number,
  height: number
): CanvasRenderingContext2D {
  const canvas = container.getElementsByTagName('canvas')[0] as HTMLCanvasElement;
  canvas.height = height;
  canvas.width = width;
  return canvas.getContext('2d')!;
}

function getContainer(id: string): HTMLElement {
  return document.getElementById(id)!;
}

function getButtonsContainer(container: HTMLElement): HTMLElement {
  return container.getElementsByClassName('buttons')[0]! as HTMLElement;
}

export class EnigmaUI {
  private rotorBox: RotorBoxUI;

  private lampboard: LampboardUI;

  private keyboard: KeyboardUI;

  private plugboard: PlugboardUI;

  private configurationContainer: HTMLElement;

  private enigmaConfiguration: EnigmaConfiguration;

  private configuration?: Configuration;

  private toggleConfiguration() {
    if (this.configurationContainer.classList.contains(CONFIGURATION_OPEN_CLASS)) {
      this.configurationContainer.classList.remove(CONFIGURATION_OPEN_CLASS);
    } else {
      this.configurationContainer.classList.add(CONFIGURATION_OPEN_CLASS);
      this.initializeConfiguration();
    }
  }

  private registerConfigurationListeners() {
    this.configurationContainer = document.getElementById(CONFIGURATION_CONTAINER_ID)!;

    const toggleButton = document.getElementById(CONFIGURATION_TOGGLE_BUTTON_ID)!;
    toggleButton.addEventListener('click', () => this.toggleConfiguration());
  }

  private initializeConfiguration() {
    this.configuration = new Configuration(this.enigmaConfiguration, e =>
      this.submitConfiguration(e)
    );
    this.configuration.initialize();
  }

  private submitConfiguration(enigmaConfiguration: EnigmaConfiguration) {
    this.enigmaConfiguration = enigmaConfiguration;
    this.configuration = undefined;
    this.toggleConfiguration();
    this.rotorBox.draw();
  }

  private keyDownListener(letter: string) {
    const encryptedLetter = this.enigmaConfiguration.enigma.encrypt(letter);
    this.lampboard.setEncryptedKey(encryptedLetter);
    this.lampboard.draw();
    this.rotorBox.draw();
  }

  private keyUpListener() {
    this.lampboard.resetEncryptedKey();
    this.lampboard.draw();
  }

  private initializeRotorBox() {
    const container = getContainer(ROTOR_BOX_CONTAINER_ID);
    const context = initializeCanvasContext(container, ENIGMA_WIDTH, ROTOR_BOX_HEIGHT);
    this.rotorBox = new RotorBoxUI(
      ENIGMA_WIDTH,
      ROTOR_BOX_HEIGHT,
      this.enigmaConfiguration.rotorBox,
      context
    );
    this.rotorBox.draw();
  }

  private initializeLampboard() {
    const container = getContainer(LAMPBOARD_CONTAINER_ID);
    const context = initializeCanvasContext(container, ENIGMA_WIDTH, LAMPBOARD_HEIGHT);
    this.lampboard = new LampboardUI(ENIGMA_WIDTH, LAMPBOARD_HEIGHT, context);
    this.lampboard.draw();
  }

  private initializeKeyboard() {
    const container = getContainer(KEYBOARD_CONTAINER_ID);
    const context = initializeCanvasContext(container, ENIGMA_WIDTH, KEYBOARD_HEIGHT);
    const buttonsContainer = getButtonsContainer(container);
    this.keyboard = new KeyboardUI(
      ENIGMA_WIDTH,
      KEYBOARD_HEIGHT,
      context,
      KEY_DOWN_DURATION,
      l => this.keyDownListener(l),
      () => this.keyUpListener()
    );
    this.keyboard.initializeKeys(buttonsContainer);
    this.keyboard.draw();
  }

  private initializePlugboard() {
    const container = getContainer(PLUGBOARD_CONTAINER_ID);
    const context = initializeCanvasContext(container, ENIGMA_WIDTH, PLUGBOARD_HEIGHT);
    const buttonsContainer = getButtonsContainer(container);
    this.plugboard = new PlugboardUI(
      ENIGMA_WIDTH,
      PLUGBOARD_HEIGHT,
      this.enigmaConfiguration.plugboard,
      context
    );
    this.plugboard.initializeSockets(buttonsContainer);
    this.plugboard.draw();
  }

  initialize() {
    this.enigmaConfiguration = createEnigmaM3();

    this.registerConfigurationListeners();
    this.initializeRotorBox();
    this.initializeLampboard();
    this.initializeKeyboard();
    this.initializePlugboard();
  }
}
