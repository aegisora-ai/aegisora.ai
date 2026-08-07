/**
 * Aegisora Runtime Error System
 *
 * Central runtime exception handling.
 */

export enum RuntimeErrorCode {
  INVALID_REQUEST = "INVALID_REQUEST",
  PROVIDER_FAILURE = "PROVIDER_FAILURE",
  POLICY_BLOCKED = "POLICY_BLOCKED",
  CONTEXT_FAILURE = "CONTEXT_FAILURE",
  UNKNOWN = "UNKNOWN",
}

export class RuntimeError extends Error {
  readonly code: RuntimeErrorCode;

  readonly metadata?: Record<string, unknown>;

  constructor(
    code: RuntimeErrorCode,
    message: string,
    metadata?: Record<string, unknown>,
  ) {
    super(message);

    this.name = "RuntimeError";

    this.code = code;

    this.metadata = metadata;
  }
}
