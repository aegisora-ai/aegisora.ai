import {
  EventStore
} from "../observability";

import {
  EventBus
} from "../events";

import {
  DecisionTraceStore
} from "../audit";

import {
  RuntimePolicyEngine
} from "../policy";

import {
  SecurityGuard
} from "../security";

import {
  RiskEngine
} from "../security";

import {
  RuntimeMonitor
} from "../monitoring";

import {
  AgentRegistry
} from "../agents";

import {
  AgentLifecycle
} from "../lifecycle";

import {
  AgentSnapshotEngine
} from "../snapshot";

import {
  AgentHealthEngine
} from "../health";

import {
  AgentNetwork,
  MessageRouter
} from "../network";

import {
  MessageBus
} from "../communication";


export class RuntimeContext {

  eventStore:
    EventStore;

  eventBus:
    EventBus;

  decisionStore:
    DecisionTraceStore;

  policy:
    RuntimePolicyEngine;

  security:
    SecurityGuard;

  risk:
    RiskEngine;

  monitor:
    RuntimeMonitor;

  agentRegistry:
    AgentRegistry;

  lifecycle:
    AgentLifecycle;

  snapshot:
    AgentSnapshotEngine;

  health:
    AgentHealthEngine;

  /**
   * Canonical runtime network.
   */
  agentNetwork:
    AgentNetwork;

  /**
   * Canonical runtime message bus.
   *
   * MUST use the same AgentRegistry
   * owned by RuntimeContext.
   */
  messageBus:
    MessageBus;

  /**
   * Canonical runtime message router.
   */
  messageRouter:
    MessageRouter;


  constructor() {

    this.eventStore =
      new EventStore();

    this.decisionStore =
      new DecisionTraceStore();

    this.policy =
      new RuntimePolicyEngine();

    this.security =
      new SecurityGuard();

    this.risk =
      new RiskEngine();

    this.monitor =
      new RuntimeMonitor(
        this.eventStore.getAll()
      );

    /**
     * SINGLE CANONICAL IDENTITY AUTHORITY.
     */
    this.agentRegistry =
      new AgentRegistry();

    /**
     * NETWORK REUSES CANONICAL REGISTRY.
     */
    this.agentNetwork =
      new AgentNetwork(
        this.agentRegistry
      );

    /**
     * COMMUNICATION REUSES
     * CANONICAL REGISTRY.
     */
    this.messageBus =
      new MessageBus(
        this.agentRegistry
      );

    /**
     * ROUTER USES CANONICAL NETWORK.
     */
    this.messageRouter =
      new MessageRouter(
        this.agentNetwork
      );

    this.lifecycle =
      new AgentLifecycle(
        this
      );

    this.snapshot =
      new AgentSnapshotEngine(
        this
      );

    this.health =
      new AgentHealthEngine();

    this.eventBus =
      new EventBus(
        this.eventStore
      );

  }

}
