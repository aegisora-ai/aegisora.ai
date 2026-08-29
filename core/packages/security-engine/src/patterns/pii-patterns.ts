/**
 * Regular expression patterns for PII detection and masking.
 * Supports:
 * - Emails with plus-addressing, subdomains, and special characters
 * - Full SSNs and Partial / Masked SSNs (e.g. XXX-XX-1234, ***-**-1234, 123-45-XXXX)
 * - International phone formats (E.164, country codes, trunk prefixes, localized separators)
 */

/**
 * Matches emails including RFC 5233 / RFC 5322 plus-addressing (e.g. user+tag@domain.com)
 * and deep subdomains (e.g. name+filter@sub.corp.domain.co.uk).
 */
export const EMAIL_PATTERN =
  /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;

/**
 * Matches full standard US Social Security Numbers (e.g. 123-45-6789 or 123 45 6789).
 */
export const SSN_FULL_PATTERN =
  /(?<!\d)\d{3}[-\s]\d{2}[-\s]\d{4}(?!\d)/g;

/**
 * Matches partial and masked SSN variants:
 * - Masked prefix (e.g., XXX-XX-1234, ***-**-1234, xxx-xx-1234, *** ** 1234)
 * - Masked suffix (e.g., 123-XX-XXXX, 123-**-****)
 * - Contextual SSN references (e.g., "SSN ending in 1234", "last 4 SSN: 1234")
 *
 * Uses non-word / non-digit lookarounds (?<!\w) rather than \b so asterisks '*' match properly.
 */
export const PARTIAL_SSN_PATTERN =
  /(?<!\w)(?:[X*x]{3}[-\s]?[X*x]{2}[-\s]?\d{4}|\d{3}[-\s]?[X*x]{2}[-\s]?[X*x]{4}|(?:ssn|social\s*security)(?:[:\s#]+(?:last\s*4[:\s#]*)?|\s+ending\s+in\s+)\d{4})(?!\w)/gi;

/**
 * Matches both full and partial/masked SSNs.
 */
export const SSN_PATTERN =
  /(?<!\w)(?:\d{3}[-\s]\d{2}[-\s]\d{4}|[X*x]{3}[-\s]?[X*x]{2}[-\s]?\d{4}|\d{3}[-\s]?[X*x]{2}[-\s]?[X*x]{4})(?!\w)/gi;

/**
 * Matches international phone numbers with country codes (e.g. +1, +44, +49, +33, +91, +81, +61, +86, etc.),
 * optional trunk codes (e.g. +44 (0)20...), and standard domestic formatted numbers with area codes.
 */
export const INTERNATIONAL_PHONE_PATTERN =
  /\+(?:[0-9][-.\s]?|\([0-9]+\)[-.\s]?){6,14}[0-9](?!\d)/g;

/**
 * Matches domestic/national phone formats (e.g. (555) 123-4567, 555-123-4567, 555.123.4567).
 */
export const DOMESTIC_PHONE_PATTERN =
  /(?<!\d)(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]\d{3}[-.\s]\d{4}(?!\d)/g;

/**
 * Combined phone number pattern covering both international and domestic formats.
 */
export const PHONE_PATTERN =
  /(?:\+(?:[0-9][-.\s]?|\(?0?\d+\)?[-.\s]?){6,14}[0-9]|(?<!\d)(?:\+?1[-.\s]?)?(?:\(\d{3}\)|\d{3})[-.\s]\d{3}[-.\s]\d{4})(?!\d)/g;

export const PII_PATTERNS = {
  EMAIL: EMAIL_PATTERN,
  SSN: SSN_PATTERN,
  SSN_FULL: SSN_FULL_PATTERN,
  PARTIAL_SSN: PARTIAL_SSN_PATTERN,
  PHONE: PHONE_PATTERN,
  PHONE_INTERNATIONAL: INTERNATIONAL_PHONE_PATTERN,
  PHONE_DOMESTIC: DOMESTIC_PHONE_PATTERN,
} as const;
