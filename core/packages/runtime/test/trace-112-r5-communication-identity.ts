import assert from "node:assert/strict";

import {
  RuntimeContext
} from "../src/context/runtime-context";

import {
  Agent
} from "../src/agent/core/agent";

async function main() {

  console.log("");
  console.log("TRACE 112-R5 - communication identity behavioral proof");
  console.log("");

  const context =
    new RuntimeContext();

  const senderId =
    "trace-112-r5-sender";

  const recipientId =
    "trace-112-r5-recipient";

  /*
   * ------------------------------------------------------------
   * 1. REGISTER REAL AGENTS
   * ------------------------------------------------------------
   */

  const senderAgent =
    new Agent({
      id: senderId,
      name: senderId,
    });

  const recipientAgent =
    new Agent({
      id: recipientId,
      name: recipientId,
    });

  context.agentRegistry.register(
    senderAgent
  );

  context.agentRegistry.register(
    recipientAgent
  );

  assert.ok(
    context.agentRegistry.getById(senderId),
    "Sender must exist in canonical registry",
  );

  assert.ok(
    context.agentRegistry.getById(recipientId),
    "Recipient must exist in canonical registry",
  );

  console.log(
    "PASS: Sender and recipient registered.",
  );

  /*
   * ------------------------------------------------------------
   * 2. REGISTER RECIPIENT HANDLER
   * ------------------------------------------------------------
   */

  let handlerCalls = 0;

  let lastMessage:
    unknown = undefined;

  context.messageBus.subscribe(
    recipientId,
    async message => {

      handlerCalls += 1;

      lastMessage =
        message;
    },
  );

  console.log(
    "PASS: Registered recipient subscribed.",
  );

  /*
   * ------------------------------------------------------------
   * 3. VALID REGISTERED MESSAGE
   * ------------------------------------------------------------
   */

  await context.messageBus.send({

    id:
      crypto.randomUUID(),

    from:
      senderId,

    to:
      recipientId,

    content:
      "TRACE 112-R5 valid message",

    createdAt:
      new Date(),
  });

  assert.equal(
    handlerCalls,
    1,
    "Registered message MUST reach recipient handler",
  );

  assert.ok(
    lastMessage,
    "Recipient handler must receive message",
  );

  console.log(
    "PASS: Registered sender → registered recipient delivered.",
  );

  /*
   * ------------------------------------------------------------
   * 4. FORGED SENDER
   * ------------------------------------------------------------
   */

  const forgedSender =
    "trace-112-r5-FORGED-sender";

  let forgedSenderBlocked =
    false;

  const callsBeforeForged =
    handlerCalls;

  try {

    await context.messageBus.send({

      id:
        crypto.randomUUID(),

      from:
        forgedSender,

      to:
        recipientId,

      content:
        "TRACE 112-R5 forged sender",

      createdAt:
        new Date(),
    });

  } catch (error) {

    forgedSenderBlocked =
      true;

    console.log(
      `Forged sender rejected: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
    );
  }

  assert.equal(
    forgedSenderBlocked,
    true,
    "Forged sender MUST be blocked",
  );

  assert.equal(
    handlerCalls,
    callsBeforeForged,
    "Forged sender MUST NOT reach recipient handler",
  );

  console.log(
    "PASS: Forged sender blocked before handler execution.",
  );

  /*
   * ------------------------------------------------------------
   * 5. FORGED RECIPIENT
   * ------------------------------------------------------------
   */

  const forgedRecipient =
    "trace-112-r5-FORGED-recipient";

  let forgedRecipientBlocked =
    false;

  const callsBeforeForgedRecipient =
    handlerCalls;

  try {

    await context.messageBus.send({

      id:
        crypto.randomUUID(),

      from:
        senderId,

      to:
        forgedRecipient,

      content:
        "TRACE 112-R5 forged recipient",

      createdAt:
        new Date(),
    });

  } catch (error) {

    forgedRecipientBlocked =
      true;

    console.log(
      `Forged recipient rejected: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
    );
  }

  assert.equal(
    forgedRecipientBlocked,
    true,
    "Forged recipient MUST be blocked",
  );

  assert.equal(
    handlerCalls,
    callsBeforeForgedRecipient,
    "Forged recipient MUST NOT execute any handler",
  );

  console.log(
    "PASS: Forged recipient blocked before handler execution.",
  );

  /*
   * ------------------------------------------------------------
   * 6. REMOVE SENDER
   * ------------------------------------------------------------
   */

  context.agentRegistry.remove(
    senderId
  );

  assert.equal(
    context.agentRegistry.getById(senderId),
    undefined,
    "Removed sender must disappear from registry",
  );

  let removedSenderBlocked =
    false;

  const callsBeforeRemovedSender =
    handlerCalls;

  try {

    await context.messageBus.send({

      id:
        crypto.randomUUID(),

      from:
        senderId,

      to:
        recipientId,

      content:
        "TRACE 112-R5 removed sender",

      createdAt:
        new Date(),
    });

  } catch (error) {

    removedSenderBlocked =
      true;

    console.log(
      `Removed sender rejected: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
    );
  }

  assert.equal(
    removedSenderBlocked,
    true,
    "Removed sender MUST be blocked",
  );

  assert.equal(
    handlerCalls,
    callsBeforeRemovedSender,
    "Removed sender MUST NOT reach handler",
  );

  console.log(
    "PASS: Removed sender blocked.",
  );

  /*
   * ------------------------------------------------------------
   * 7. REMOVE RECIPIENT
   * ------------------------------------------------------------
   */

  context.agentRegistry.register(
    senderAgent
  );

  context.agentRegistry.remove(
    recipientId
  );

  assert.equal(
    context.agentRegistry.getById(recipientId),
    undefined,
    "Removed recipient must disappear from registry",
  );

  let removedRecipientBlocked =
    false;

  const callsBeforeRemovedRecipient =
    handlerCalls;

  try {

    await context.messageBus.send({

      id:
        crypto.randomUUID(),

      from:
        senderId,

      to:
        recipientId,

      content:
        "TRACE 112-R5 removed recipient",

      createdAt:
        new Date(),
    });

  } catch (error) {

    removedRecipientBlocked =
      true;

    console.log(
      `Removed recipient rejected: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
    );
  }

  assert.equal(
    removedRecipientBlocked,
    true,
    "Removed recipient MUST be blocked",
  );

  assert.equal(
    handlerCalls,
    callsBeforeRemovedRecipient,
    "Removed recipient MUST NOT reach handler",
  );

  console.log(
    "PASS: Removed recipient blocked.",
  );

  /*
   * ------------------------------------------------------------
   * 8. UNREGISTERED SUBSCRIPTION
   * ------------------------------------------------------------
   */

  let subscribeBlocked =
    false;

  try {

    context.messageBus.subscribe(
      "trace-112-r5-FORGED-subscribe",
      async () => {},
    );

  } catch (error) {

    subscribeBlocked =
      true;

    console.log(
      `Unregistered subscription rejected: ${
        error instanceof Error
          ? error.message
          : String(error)
      }`,
    );
  }

  assert.equal(
    subscribeBlocked,
    true,
    "Unregistered agent subscription MUST be blocked",
  );

  console.log(
    "PASS: Unregistered subscription blocked.",
  );

  /*
   * ------------------------------------------------------------
   * FINAL
   * ------------------------------------------------------------
   */

  console.log("");
  console.log("============================================================");
  console.log(" TRACE 112-R5 PASSED");
  console.log("============================================================");
  console.log("");

}

main().catch(error => {

  console.error("");
  console.error("TRACE 112-R5 FAILED");
  console.error("");
  console.error(error);

  process.exitCode = 1;
});
