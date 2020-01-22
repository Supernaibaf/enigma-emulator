import { EnigmaUI } from './ui/enigma-ui';

(function initialize() {
  window.addEventListener('load', () => {
    const enigmaUI = new EnigmaUI();
    enigmaUI.initialize();
  });
})();
