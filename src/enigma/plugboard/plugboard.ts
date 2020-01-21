export type Plug = {
  origin: string;
  target: string;
};

export class Plugboard {
  private connections: Map<string, string>;

  private reverseConnections: Map<string, string>;

  get plugs(): Plug[] {
    const plugs = [] as Plug[];
    this.connections.forEach((v, k) => {
      plugs.push({
        origin: k,
        target: v
      });
    });
    return plugs;
  }

  constructor() {
    this.connections = new Map<string, string>();
    this.reverseConnections = new Map<string, string>();
  }

  addConnection(letter1: string, letter2: string): Plug {
    this.connections.set(letter1, letter2);
    this.reverseConnections.set(letter2, letter1);
    return {
      origin: letter1,
      target: letter2
    };
  }

  removeConnection(letter: string) {
    const connectedLetter = this.connections.get(letter);
    const reverseConnectedLetter = this.reverseConnections.get(letter);
    if (connectedLetter) {
      this.connections.delete(letter);
      this.reverseConnections.delete(connectedLetter);
    } else if (reverseConnectedLetter) {
      this.reverseConnections.delete(letter);
      this.connections.delete(reverseConnectedLetter);
    }
  }

  encrypt(letter: string): string {
    const connectedLetter = this.connections.get(letter);
    const reverseConnectedLetter = this.reverseConnections.get(letter);
    return connectedLetter ?? reverseConnectedLetter ?? letter;
  }
}
