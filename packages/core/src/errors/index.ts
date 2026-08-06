export class AegisoraError extends Error {
  constructor(message: string) {
    super(message);

    this.name = "AegisoraError";
  }
}

export class SecurityViolationError extends AegisoraError {
  constructor(message: string) {
    super(message);

    this.name = "SecurityViolationError";
  }
}
