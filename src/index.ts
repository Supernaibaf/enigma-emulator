import { EnigmaConfiguration, createEnigmaM3 } from './enigma/enigma-configurations';
import { Configuration } from './ui/configuration';
import { PlugboardUI } from './ui/plugboard-ui';
import { KeyboardUI } from './ui/keyboard-ui';
import { LampboardUI } from './ui/lampboard-ui';
import { RotorBoxUI } from './ui/rotor-box-ui';

(function initialize() {
  const CONFIGURATION_OPEN_CLASS = 'open';

  let enigmaConfiguration: EnigmaConfiguration;
  let lampboardUI: LampboardUI;
  let rotorBoxUI: RotorBoxUI;
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
    rotorBoxUI.draw();
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

  function keyDownListener(letter: string) {
    const encryptedLetter = enigmaConfiguration.enigma.encrypt(letter);
    lampboardUI.setEncryptedKey(encryptedLetter);
    lampboardUI.draw();
    rotorBoxUI.draw();
  }

  function keyUpListener() {
    lampboardUI.resetEncryptedKey();
    lampboardUI.draw();
    rotorBoxUI.draw();
  }

  window.addEventListener('load', () => {
    enigmaConfiguration = createEnigmaM3();

    const rotorBox = initializeCanvasContext('enigma-rotorbox', 1000, 470);
    rotorBoxUI = new RotorBoxUI(1000, 470, enigmaConfiguration.rotorBox, rotorBox);
    rotorBoxUI.draw();

    const plugboard = initializeCanvasContext('enigma-plugboard', 1000, 410);
    const plugboardUI = new PlugboardUI(1000, 410, enigmaConfiguration.plugboard, plugboard);
    plugboardUI.initializeSockets(document.getElementById('enigma-plugboard-socket-buttons')!);
    plugboardUI.draw();

    const keyboard = initializeCanvasContext('enigma-keyboard', 1000, 290);
    const keyboardUI = new KeyboardUI(
      1000,
      290,
      keyboard,
      1000,
      k => keyDownListener(k),
      () => keyUpListener()
    );
    keyboardUI.initializeKeys(document.getElementById('enigma-keyboard-buttons')!);
    keyboardUI.draw();

    const lampboard = initializeCanvasContext('enigma-lampboard', 1000, 290);
    lampboardUI = new LampboardUI(1000, 290, lampboard);
    lampboardUI.draw();

    configurationParent = document.getElementById('enigma-configuration-container')!;
    configurationContainer = document.getElementById('enigma-configuration')!;
    document
      .getElementById('enigma-configuration-button')!
      .addEventListener('click', toggleConfiguration);
    document
      .getElementById('enigma-configuration-form')!
      .addEventListener('submit', submitConfiguration);
  });
})();
