export { SecurityEngine } from "./engine/security-engine";

export { PromptInjectionAnalyzer } from "./analyzers/prompt-injection";

export {
  PIIDetector,
  DEFAULT_PII_RULES,
  type PIIRuleDefinition,
} from "./analyzers/pii-detector";

export {
  EMAIL_PATTERN,
  SSN_FULL_PATTERN,
  PARTIAL_SSN_PATTERN,
  SSN_PATTERN,
  INTERNATIONAL_PHONE_PATTERN,
  DOMESTIC_PHONE_PATTERN,
  PHONE_PATTERN,
  PII_PATTERNS,
} from "./patterns/pii-patterns";

export {
  maskEmail,
  maskSSN,
  maskPhone,
  maskPII,
  DEFAULT_PII_MASKS,
  type PIIMaskOptions,
} from "./masking/pii-masker";

export type { SecurityAnalyzer } from "./analyzers/base-analyzer";

export type {
  SecurityContext,
  SecurityAnalysis,
  ThreatSignal,
  ThreatType,
  ThreatSeverity,
} from "./types/security";
