import {
  EMAIL_PATTERN,
  PARTIAL_SSN_PATTERN,
  PHONE_PATTERN,
  SSN_PATTERN,
} from "../patterns/pii-patterns";

export interface PIIMaskOptions {
  emailMask?: string;
  ssnMask?: string;
  phoneMask?: string;
}

export const DEFAULT_PII_MASKS = {
  EMAIL: "[REDACTED_EMAIL]",
  SSN: "[REDACTED_SSN]",
  PHONE: "[REDACTED_PHONE]",
} as const;

/**
 * Masks all email addresses found in the given text.
 */
export function maskEmail(
  text: string,
  mask: string = DEFAULT_PII_MASKS.EMAIL,
): string {
  return text.replace(new RegExp(EMAIL_PATTERN.source, "gi"), mask);
}

/**
 * Masks all full and partial/masked SSNs found in the given text.
 */
export function maskSSN(
  text: string,
  mask: string = DEFAULT_PII_MASKS.SSN,
): string {
  return text
    .replace(new RegExp(SSN_PATTERN.source, "gi"), mask)
    .replace(new RegExp(PARTIAL_SSN_PATTERN.source, "gi"), mask);
}

/**
 * Masks all phone numbers (international and domestic) found in the given text.
 */
export function maskPhone(
  text: string,
  mask: string = DEFAULT_PII_MASKS.PHONE,
): string {
  return text.replace(new RegExp(PHONE_PATTERN.source, "gi"), mask);
}

/**
 * Masks all detected PII in the given text (emails, SSNs, and phone numbers).
 */
export function maskPII(text: string, options?: PIIMaskOptions): string {
  if (!text || typeof text !== "string") {
    return text;
  }

  let result = text;
  result = maskEmail(result, options?.emailMask ?? DEFAULT_PII_MASKS.EMAIL);
  result = maskSSN(result, options?.ssnMask ?? DEFAULT_PII_MASKS.SSN);
  result = maskPhone(result, options?.phoneMask ?? DEFAULT_PII_MASKS.PHONE);

  return result;
}
