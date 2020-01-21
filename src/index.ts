import { EnigmaUI } from './ui/enigma-ui';
import { EnigmaConfiguration, createEnigmaM3 } from './enigma/enigma-configurations';
import { Configuration } from './ui/configuration';
import { PlugboardUI } from './ui/plugboard-ui';

(function initialize() {
  const ENIGMA_HEIGHT = 1050;
  const ENIGMA_WIDTH = 1000;
  const CONFIGURATION_OPEN_CLASS = 'open';

  let enigmaConfiguration: EnigmaConfiguration;
  let enigmaUI: EnigmaUI;
  let context: CanvasRenderingContext2D;
  let pressedKey: string | undefined;
  let plugboard: CanvasRenderingContext2D;
  let plugboardUI: PlugboardUI;
  let configurationParent: HTMLElement;
  let configurationContainer: HTMLElement;
  let configuration: Configuration | undefined;

  function toggleConfiguration() {
    if (configurationParent.classList.contains(CONFIGURATION_OPEN_CLASS)) {
      configurationParent.classList.remove(CONFIGURATION_OPEN_CLASS);
    } else {
      configurationParent.classList.add(CONFIGURATION_OPEN_CLASS);
      configuration = new Configuration(enigmaConfiguration, configurationContainer);
      configuration.initialize();
    }
  }

  function submitConfiguration(e: Event) {
    configuration?.submit();
    toggleConfiguration();
    enigmaUI.draw(context);
    e.preventDefault();
  }

  function initializeCanvasContext(
    id: string,
    width: number,
    height: number
  ): CanvasRenderingContext2D {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    canvas.height = height;
    canvas.width = width;
    return canvas.getContext('2d')!;
  }

  window.addEventListener('load', () => {
    context = initializeCanvasContext('enigma-emulator', ENIGMA_WIDTH, ENIGMA_HEIGHT);
    enigmaConfiguration = createEnigmaM3();
    enigmaUI = new EnigmaUI(enigmaConfiguration, ENIGMA_WIDTH, ENIGMA_HEIGHT);
    enigmaUI.draw(context);

    plugboard = initializeCanvasContext('enigma-plugboard', 1000, 410);
    plugboardUI = new PlugboardUI(1000, 410, enigmaConfiguration.plugboard, plugboard);
    plugboardUI.initializeSockets(document.getElementById('enigma-plugboard-socket-buttons')!);
    plugboardUI.draw();
    configurationParent = document.getElementById('enigma-configuration-container')!;
    configurationContainer = document.getElementById('enigma-configuration')!;
    document
      .getElementById('enigma-configuration-button')!
      .addEventListener('click', toggleConfiguration);
    document
      .getElementById('enigma-configuration-form')!
      .addEventListener('submit', submitConfiguration);
  });

  window.addEventListener('keydown', e => {
    const letter = e.key.toUpperCase();
    if (pressedKey !== letter && enigmaConfiguration.alphabet.includes(letter)) {
      pressedKey = letter;
      const encryptedLetter = enigmaConfiguration.enigma.encrypt(letter);
      enigmaUI.setPressedKey(letter);
      enigmaUI.setEncryptedKey(encryptedLetter);
      enigmaUI.draw(context);
    }
  });

  window.addEventListener('keyup', e => {
    const letter = e.key.toUpperCase();
    if (pressedKey === letter) {
      enigmaUI.resetPressedKey();
      enigmaUI.resetEncryptedKey();
      enigmaUI.draw(context);
      pressedKey = undefined;
    }
  });
})();
