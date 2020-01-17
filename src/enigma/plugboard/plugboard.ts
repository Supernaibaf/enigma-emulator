export class Plugboard {
  private connections: Map<string, string>;

  constructor() {
    this.connections = new Map<string, string>();
  }

  addConnection(letter1: string, letter2: string) {
    this.connections.set(letter1, letter2);
    this.connections.set(letter2, letter1);
  }

  removeConnection(letter: string) {
    const connectedLetter = this.connections.get(letter);
    this.connections.delete(letter);
    this.connections.delete(connectedLetter!);
  }

  encrypt(letter: string): string {
    const connectedLetter = this.connections.get(letter);
    return connectedLetter ?? letter;
  }
}
