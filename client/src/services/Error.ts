export class ArgumentException extends Error {
  name: string;
  message: string;

  constructor(message: string) {
    super(message);
    this.name = 'ArgumentException';
  }
}

export class NotImplementedException extends Error {
  name: string;
  message: string;

  constructor(message: string) {
    super(
      `This portion of the codebase is currently not implemented. TODO: ${message}`,
    );
    this.name = 'NotImplementedException';
  }
}

export class ShouldNeverGetHereException extends Error {
  name: string;
  message: string;

  constructor(message?: string) {
    super(`Should never get here: ${message}`);
    this.name = 'ShouldNeverGetHereException';
  }
}
