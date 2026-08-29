declare const process: {
  exit(code?: number): never;
};

const assert = {
  ok(value: unknown, message?: string): void {
    if (!value) {
      throw new Error(message ?? "Assertion failed: expected truthy value");
    }
  },
  equal(actual: unknown, expected: unknown, message?: string): void {
    if (actual !== expected) {
      throw new Error(
        message ??
          `Assertion failed: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
      );
    }
  },
};
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
} from "../src/index";

async function runTests() {
  console.log("============================================================");
  console.log("PII MASKING & REGEX PATTERN TEST SUITE");
  console.log("============================================================\n");

  // =========================================================================
  // 1. EMAIL REGEX & PLUS-ADDRESSING TESTS
  // =========================================================================
  console.log("[1] Testing Emails with Plus-Addressing and Edge Cases...");

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

  // Standard emails and edge cases
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
  // 2. SSN & PARTIAL SSN PATTERN TESTS
  // =========================================================================
  console.log("\n[2] Testing Partial and Full SSN Formats...");

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

  // Non-SSN formats should not false-positive match SSN_FULL_PATTERN
  const nonSSNs = [
    "2026-08-29", // Date format (4-2-2)
    "90210", // Zip code (5 digits)
    "123456", // 6 digits
    "555-123-4567", // Phone format (3-3-4)
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
  // 3. INTERNATIONAL PHONE NUMBER PATTERN TESTS
  // =========================================================================
  console.log("\n[3] Testing International Phone Formats...");

  const internationalPhones = [
    // US / Canada
    "+1 (555) 123-4567",
    "+1-800-555-0199",
    "+1 555 234 5678",
    "+1.555.345.6789",
    // UK
    "+44 20 7946 0958",
    "+44 (0)20 7946 0958",
    "+44 7911 123456",
    "+44-20-7946-0123",
    // Germany
    "+49 30 123456",
    "+49-89-636-48018",
    "+49 170 1234567",
    // France
    "+33 1 42 68 55 55",
    "+33 (0)1 42 68 55 55",
    // India
    "+91 98765 43210",
    "+91-9876543210",
    "+91 22 2857 1234",
    // Japan
    "+81 3 1234 5678",
    "+81-90-1234-5678",
    // Australia
    "+61 2 9876 5432",
    "+61 412 345 678",
    // China
    "+86 10 1234 5678",
    "+86-13800000000",
    // Switzerland
    "+41 22 123 45 67",
    // Brazil
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

  // Domestic phone formats
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
  // 4. COMBINED PII MASKING TESTS (maskPII)
  // =========================================================================
  console.log("\n[4] Testing Combined Multi-PII Masking...");

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

  // Test custom mask tokens
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
  // 5. PII DETECTOR ANALYZER INTEGRATION TESTS
  // =========================================================================
  console.log("\n[5] Testing PIIDetector Security Analyzer...");

  const detector = new PIIDetector();

  // Test email detection
  const emailSignal = detector.analyze({
    agentId: "agent-1",
    action: "tool.execute",
    input: "Send report to analyst+tier2@finance.example.com",
  });
  assert.ok(emailSignal !== null, "Expected threat signal for email");
  assert.equal(emailSignal?.type, "PII_EXPOSURE");
  assert.ok(emailSignal?.description.includes("email address"));

  // Test SSN detection
  const ssnSignal = detector.analyze({
    agentId: "agent-2",
    action: "database.query",
    input: "SELECT * FROM users WHERE ssn = 'XXX-XX-1234'",
  });
  assert.ok(ssnSignal !== null, "Expected threat signal for partial SSN");
  assert.equal(ssnSignal?.type, "PII_EXPOSURE");
  assert.equal(ssnSignal?.severity, "HIGH");

  // Test International Phone detection
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

  // Test Clean Input (No PII)
  const cleanSignal = detector.analyze({
    agentId: "agent-4",
    action: "math.calculate",
    input: "Compute sum of matrix entries from 2026-08-29 dataset",
  });
  assert.equal(cleanSignal, null, "Expected null signal for clean input");

  // Test Custom Strategy / Rule Injection Pattern
  const customDetector = new PIIDetector([
    {
      label: "Custom API Key",
      patterns: [/custom_secret_key_[a-zA-Z0-9]{16}/g],
      score: 95,
    },
  ]);
  const customSignal = customDetector.analyze({
    agentId: "agent-5",
    action: "tool.execute",
    input: "Use key custom_secret_key_1234567890abcdef to authenticate",
  });
  assert.ok(customSignal !== null, "Expected threat signal for custom rule");
  assert.equal(customSignal?.score, 95);
  assert.equal(customSignal?.severity, "HIGH");
  assert.ok(customSignal?.description.includes("Custom API Key"));

  console.log("  ✓ PIIDetector analyzer integration: PASS");

  console.log("\n============================================================");
  console.log("ALL PII MASKING AND REGEX PATTERN TESTS PASSED!");
  console.log("============================================================");
}

runTests().catch((err) => {
  console.error("TEST FAILED:", err);
  process.exit(1);
});
