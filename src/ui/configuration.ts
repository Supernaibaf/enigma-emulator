import { EnigmaConfiguration } from '../enigma/enigma-configurations';

type RotorSelectElements = {
  type: HTMLSelectElement;
  ringSetting: HTMLSelectElement;
  position: HTMLSelectElement;
};

const CONFIGURATION_FORM_ID = 'enigma-configuration';

const REFLECTOR_CLASS = 'reflector';
const ROTOR_CLASS = 'rotors';

function clearHtmlElement(element: HTMLElement) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
}

function createSelectOption(text: string): HTMLOptionElement {
  const option = document.createElement('option');
  option.setAttribute('value', text);
  option.innerText = text;
  return option;
}

function createSelectElement<T>(elements: string[], value?: string): HTMLSelectElement {
  const selectElement = document.createElement('select');
  elements.forEach(e => {
    selectElement.appendChild(createSelectOption(e));
  });
  if (value) {
    selectElement.value = value;
  }
  return selectElement;
}

export class Configuration {
  private reflectorSelector: HTMLSelectElement;

  private rotorSelectors: RotorSelectElements[];

  private configurationForm: HTMLFormElement;

  private submitListenerSubscription: (event: Event) => void;

  constructor(
    private enigmaConfiguration: EnigmaConfiguration,
    private submitListener: (enigmaConfiguration: EnigmaConfiguration) => void
  ) {
    this.rotorSelectors = [];
  }

  private initializeReflectors(reflectorContainer: HTMLSelectElement) {
    this.reflectorSelector = reflectorContainer;
    clearHtmlElement(reflectorContainer);
    this.enigmaConfiguration.reflectors.forEach(r => {
      reflectorContainer.appendChild(createSelectOption(r.type));
    });
    reflectorContainer.value = this.enigmaConfiguration.rotorBox.reflector.type;
  }

  private initializeRotors(rotorsContainer: HTMLElement) {
    clearHtmlElement(rotorsContainer);
    const { alphabet, rotors: availableRotors } = this.enigmaConfiguration;
    this.enigmaConfiguration.rotorBox.rotors.forEach((r, i) => {
      const tr = document.createElement('tr');
      const name = document.createElement('td');
      name.innerText = `Rotor ${i + 1}`;
      const type = document.createElement('td');
      const rotorSelectElements = {
        type: createSelectElement(
          availableRotors.map(a => a.type),
          r.type
        ),
        position: createSelectElement(alphabet, r.positionLabel),
        ringSetting: createSelectElement(alphabet, r.ringSettingLabel)
      };
      this.rotorSelectors.push(rotorSelectElements);
      type.appendChild(rotorSelectElements.type);
      const position = document.createElement('td');
      position.appendChild(rotorSelectElements.position);
      const ring = document.createElement('td');
      ring.appendChild(rotorSelectElements.ringSetting);
      tr.appendChild(name);
      tr.appendChild(type);
      tr.appendChild(position);
      tr.appendChild(ring);
      rotorsContainer.appendChild(tr);
    });
  }

  private submit() {
    const reflector = this.enigmaConfiguration.reflectors.find(
      r => r.type === this.reflectorSelector.value
    )!;
    this.enigmaConfiguration.rotorBox.setReflector(reflector);

    this.rotorSelectors.forEach((s, i) => {
      const type = this.enigmaConfiguration.rotors.find(r => r.type === s.type.value)!;
      type.setPosition(s.position.value);
      type.setRingSetting(s.ringSetting.value);
      this.enigmaConfiguration.rotorBox.setRotor(i, type);
    });

    this.submitListener(this.enigmaConfiguration);
    this.destroy();
  }

  initialize() {
    this.submitListenerSubscription = (e: Event) => {
      this.submit();
      e.preventDefault();
    };
    this.configurationForm = document.getElementById(CONFIGURATION_FORM_ID) as HTMLFormElement;
    this.configurationForm.addEventListener('submit', this.submitListenerSubscription);

    const reflectorContainer = this.configurationForm.getElementsByClassName(
      REFLECTOR_CLASS
    )[0] as HTMLSelectElement;
    const rotorsContainer = this.configurationForm.getElementsByClassName(
      ROTOR_CLASS
    )[0] as HTMLElement;
    this.initializeReflectors(reflectorContainer);
    this.initializeRotors(rotorsContainer);
  }

  destroy() {
    this.configurationForm.removeEventListener('submit', this.submitListenerSubscription);
  }
}
