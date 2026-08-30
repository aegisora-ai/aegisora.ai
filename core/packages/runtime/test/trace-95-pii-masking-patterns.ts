/// <reference types="node" />
import assert from "node:assert/strict";

import {
  EMAIL_PATTERN,
  INTERNATIONAL_PHONE_PATTERN,
  PARTIAL_SSN_PATTERN,
  PHONE_PATTERN,
  PIIDetector,
  SSN_FULL_PATTERN,
  SSN_PATTERN,
  maskEmail,
  maskPII,
  maskPhone,
  maskSSN,
} from "@aegisora/security-engine";

async function main() {
  console.log("============================================================");
  console.log("TRACE 95 — PII MASKING & REGEX PATTERN VALIDATION");
  console.log("============================================================\n");

  // =========================================================================
  // 1. EMAIL REGEX & PLUS-ADDRESSING
  // =========================================================================
  console.log("[A] Testing Emails with Plus-Addressing and Edge Cases...");

  const validPlusEmails = [
    "user+tag@example.com",
    "john.doe+filter@sub.example.co.uk",
    "support+ticket-1234@company.io",
    "alice+marketing+urgent@example.org",
    "first.last+newsletter_2026@domain.gov",
    "dev+build.42@service.cloud",
    "User.Name+Tag@Example.COM",
    "test+123@sub-domain.example.com",
    "customer+service+tier1@helpdesk.support.com",
  ];

  for (const email of validPlusEmails) {
    const regex = new RegExp(EMAIL_PATTERN.source, "i");
    assert.ok(
      regex.test(email),
      `Failed to match plus-addressed email: ${email}`,
    );

    const masked = maskEmail(`Contact me at ${email} for details.`);
    assert.ok(
      !masked.includes(email),
      `Failed to mask email in text: ${email} -> ${masked}`,
    );
    assert.ok(
      masked.includes("[REDACTED_EMAIL]"),
      `Expected [REDACTED_EMAIL] placeholder in: ${masked}`,
    );
  }

  const standardEmails = [
    "simple@example.com",
    "very.common@example.com",
    "disposable.style.email.with+symbol@example.com",
    "other.email-with-hyphen@example.com",
    "fully-qualified-domain@example.co.uk",
    "user.name@department.company.org",
  ];

  for (const email of standardEmails) {
    const regex = new RegExp(EMAIL_PATTERN.source, "i");
    assert.ok(regex.test(email), `Failed to match standard email: ${email}`);
  }

  console.log("  ✓ Plus-addressing and email patterns: PASS");

  // =========================================================================
  // 2. SSN & PARTIAL SSN PATTERNS
  // =========================================================================
  console.log("\n[B] Testing Partial and Full SSN Formats...");

  const partialSSNs = [
    "XXX-XX-1234",
    "xxx-xx-5678",
    "***-**-1234",
    "*** ** 4321",
    "XXX XX 9876",
    "123-XX-XXXX",
    "123-**-****",
    "SSN: ***-**-6789",
    "Social Security ending in 4321",
    "ssn # last 4: 8765",
  ];

  for (const partialSsn of partialSSNs) {
    const regex = new RegExp(PARTIAL_SSN_PATTERN.source, "i");
    assert.ok(
      regex.test(partialSsn),
      `Failed to match partial SSN: ${partialSsn}`,
    );

    const masked = maskSSN(`User records show ${partialSsn}.`);
    assert.ok(
      masked.includes("[REDACTED_SSN]"),
      `Expected [REDACTED_SSN] for: ${partialSsn} -> ${masked}`,
    );
  }

  const fullSSNs = [
    "123-45-6789",
    "987-65-4321",
    "219-09-5432",
    "123 45 6789",
  ];

  for (const ssn of fullSSNs) {
    const regex = new RegExp(SSN_FULL_PATTERN.source, "i");
    assert.ok(regex.test(ssn), `Failed to match full SSN: ${ssn}`);

    const masked = maskSSN(`The SSN is ${ssn}.`);
    assert.ok(
      !masked.includes(ssn),
      `Full SSN was not masked: ${ssn} -> ${masked}`,
    );
    assert.ok(masked.includes("[REDACTED_SSN]"));
  }

  const nonSSNs = [
    "2026-08-29",
    "90210",
    "123456",
    "555-123-4567",
  ];

  for (const item of nonSSNs) {
    const regex = new RegExp(SSN_FULL_PATTERN.source, "i");
    assert.ok(
      !regex.test(item),
      `False positive: non-SSN ${item} matched SSN_FULL_PATTERN`,
    );
  }

  console.log("  ✓ Partial and full SSN patterns: PASS");

  // =========================================================================
  // 3. INTERNATIONAL PHONE FORMATS
  // =========================================================================
  console.log("\n[C] Testing International Phone Formats...");

  const internationalPhones = [
    "+1 (555) 123-4567",
    "+1-800-555-0199",
    "+1 555 234 5678",
    "+1.555.345.6789",
    "+44 20 7946 0958",
    "+44 (0)20 7946 0958",
    "+44 7911 123456",
    "+44-20-7946-0123",
    "+49 30 123456",
    "+49-89-636-48018",
    "+49 170 1234567",
    "+33 1 42 68 55 55",
    "+33 (0)1 42 68 55 55",
    "+91 98765 43210",
    "+91-9876543210",
    "+91 22 2857 1234",
    "+81 3 1234 5678",
    "+81-90-1234-5678",
    "+61 2 9876 5432",
    "+61 412 345 678",
    "+86 10 1234 5678",
    "+86-13800000000",
    "+41 22 123 45 67",
    "+55 11 98765-4321",
  ];

  for (const phone of internationalPhones) {
    const regex = new RegExp(PHONE_PATTERN.source, "i");
    assert.ok(
      regex.test(phone),
      `Failed to match international phone: ${phone}`,
    );

    const masked = maskPhone(`Reach our support hotline at ${phone}.`);
    assert.ok(
      !masked.includes(phone),
      `Phone was not masked: ${phone} -> ${masked}`,
    );
    assert.ok(
      masked.includes("[REDACTED_PHONE]"),
      `Expected [REDACTED_PHONE] for: ${phone} -> ${masked}`,
    );
  }

  const domesticPhones = [
    "(555) 123-4567",
    "555-123-4567",
    "555.123.4567",
    "(800) 555-0199",
  ];

  for (const phone of domesticPhones) {
    const regex = new RegExp(PHONE_PATTERN.source, "i");
    assert.ok(regex.test(phone), `Failed to match domestic phone: ${phone}`);

    const masked = maskPhone(`Call ${phone} for help.`);
    assert.ok(
      !masked.includes(phone),
      `Domestic phone was not masked: ${phone} -> ${masked}`,
    );
    assert.ok(masked.includes("[REDACTED_PHONE]"));
  }

  console.log("  ✓ International and domestic phone formats: PASS");

  // =========================================================================
  // 4. MULTI-PII MASKING
  // =========================================================================
  console.log("\n[D] Testing Multi-PII Masking...");

  const complexPayload = `
User Profile:
- Name: Alex Mercer
- Email: alex.mercer+work@sub.corp.example.co.uk
- Personal Email: alex+backup@gmail.com
- Primary Phone: +44 20 7946 0958
- Secondary Phone: +1 (555) 234-5678
- SSN: XXX-XX-9876
- Full SSN: 123-45-6789
`;

  const maskedPayload = maskPII(complexPayload);

  assert.ok(!maskedPayload.includes("alex.mercer+work@sub.corp.example.co.uk"));
  assert.ok(!maskedPayload.includes("alex+backup@gmail.com"));
  assert.ok(!maskedPayload.includes("+44 20 7946 0958"));
  assert.ok(!maskedPayload.includes("+1 (555) 234-5678"));
  assert.ok(!maskedPayload.includes("XXX-XX-9876"));
  assert.ok(!maskedPayload.includes("123-45-6789"));

  assert.ok(maskedPayload.includes("[REDACTED_EMAIL]"));
  assert.ok(maskedPayload.includes("[REDACTED_PHONE]"));
  assert.ok(maskedPayload.includes("[REDACTED_SSN]"));

  const customMasked = maskPII(complexPayload, {
    emailMask: "<EMAIL_HIDDEN>",
    ssnMask: "<SSN_HIDDEN>",
    phoneMask: "<PHONE_HIDDEN>",
  });

  assert.ok(customMasked.includes("<EMAIL_HIDDEN>"));
  assert.ok(customMasked.includes("<SSN_HIDDEN>"));
  assert.ok(customMasked.includes("<PHONE_HIDDEN>"));

  console.log("  ✓ Combined multi-PII masking: PASS");

  // =========================================================================
  // 5. PIIDetector ANALYZER & CUSTOM RULES
  // =========================================================================
  console.log("\n[E] Testing PIIDetector Analyzer...");

  const detector = new PIIDetector();

  const emailSignal = detector.analyze({
    agentId: "agent-1",
    action: "tool.execute",
    input: "Send report to analyst+tier2@finance.example.com",
  });
  assert.ok(emailSignal !== null, "Expected threat signal for email");
  assert.equal(emailSignal?.type, "PII_EXPOSURE");
  assert.ok(emailSignal?.description.includes("email address"));

  const ssnSignal = detector.analyze({
    agentId: "agent-2",
    action: "database.query",
    input: "SELECT * FROM users WHERE ssn = 'XXX-XX-1234'",
  });
  assert.ok(ssnSignal !== null, "Expected threat signal for partial SSN");
  assert.equal(ssnSignal?.type, "PII_EXPOSURE");
  assert.equal(ssnSignal?.severity, "HIGH");

  const phoneSignal = detector.analyze({
    agentId: "agent-3",
    action: "sms.send",
    input: "Send SMS verification to +49 30 123456",
  });
  assert.ok(
    phoneSignal !== null,
    "Expected threat signal for international phone",
  );
  assert.equal(phoneSignal?.type, "PII_EXPOSURE");
  assert.ok(phoneSignal?.description.includes("phone number"));

  const cleanSignal = detector.analyze({
    agentId: "agent-4",
    action: "math.calculate",
    input: "Compute sum of matrix entries from 2026-08-29 dataset",
  });
  assert.equal(cleanSignal, null, "Expected null signal for clean input");

  const customDetector = new PIIDetector([
    {
      label: "Custom Secret",
      patterns: [/custom_secret_token_[a-zA-Z0-9]{16}/g],
      score: 95,
    },
  ]);
  const customSignal = customDetector.analyze({
    agentId: "agent-5",
    action: "tool.execute",
    input: "Use token custom_secret_token_1234567890abcdef for auth",
  });
  assert.ok(customSignal !== null, "Expected threat signal for custom rule");
  assert.equal(customSignal?.score, 95);
  assert.equal(customSignal?.severity, "HIGH");

  console.log("  ✓ PIIDetector analyzer & rules: PASS");

  console.log("\n============================================================");
  console.log("TRACE 95 PII VALIDATION: PASS");
  console.log("============================================================");
}

main().catch((err) => {
  console.error("TRACE 95 FAILED:", err);
  process.exit(1);
});
