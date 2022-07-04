export class NotImplementedError extends Error {
  message = "NotImplementedError";

  constructor(text) {
    this.message = `${this.message}: ${text}`;
  }
}
