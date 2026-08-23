import type { AgentRegistry } from "../agents";
import type { EnforcementGate } from "../enforcement";
import type { EnforcementResult } from "../enforcement/types";

import type {
  AgentTeam,
  CollaborationTask,
} from "./collaboration";

export class CollaborationManager {

  private readonly teams =
    new Map<string, AgentTeam>();

  private readonly tasks =
    new Map<string, CollaborationTask>();

  constructor(
    private readonly agentRegistry: AgentRegistry,
    private readonly enforcement: EnforcementGate,
  ) {}

  private async authorize(
    actorId: string,
    operation:
      | "createTeam"
      | "assignTask"
      | "completeTask",
    input: unknown,
  ): Promise<EnforcementResult> {

    return this.enforcement.enforce({
      agentId: actorId,
      resourceType: "agent",
      tool: `collaboration:${operation}`,
      action: "collaboration.execute",
      input,
      metadata: {
        capability: "collaboration.execute",
        operation,
      },
    });
  }

  private assertAllowed(
    result: EnforcementResult,
  ) {
    if (result.decision !== "ALLOW") {
      throw new Error(
        `[ENFORCEMENT:${result.decision}] ${result.reason}`,
      );
    }
  }

  async createTeam(
    actorId: string,
    name: string,
    members: string[],
  ): Promise<AgentTeam> {

    const uniqueMembers =
      [...new Set(members)];

    for (const memberId of uniqueMembers) {
      if (!this.agentRegistry.getById(memberId)) {
        throw new Error(
          `Cannot create team with unregistered agent: ${memberId}`,
        );
      }
    }

    if (!uniqueMembers.includes(actorId)) {
      uniqueMembers.push(actorId);
    }

    const enforcement =
      await this.authorize(
        actorId,
        "createTeam",
        {
          name,
          members: uniqueMembers,
        },
      );

    this.assertAllowed(enforcement);

    const team: AgentTeam = {
      id: crypto.randomUUID(),
      name,
      members: uniqueMembers,
      createdAt: new Date(),
    };

    this.teams.set(
      team.id,
      team,
    );

    return team;
  }

  async assignTask(
    actorId: string,
    teamId: string,
    agentId: string,
    goal: string,
  ): Promise<CollaborationTask> {

    const team =
      this.teams.get(teamId);

    if (!team) {
      throw new Error("Team not found");
    }

    if (!team.members.includes(actorId)) {
      throw new Error(
        `Agent ${actorId} is not a member of team ${teamId}`,
      );
    }

    if (!team.members.includes(agentId)) {
      throw new Error(
        `Assigned agent ${agentId} is not a member of team ${teamId}`,
      );
    }

    if (!this.agentRegistry.getById(agentId)) {
      throw new Error(
        `Assigned agent is not registered: ${agentId}`,
      );
    }

    const enforcement =
      await this.authorize(
        actorId,
        "assignTask",
        {
          teamId,
          agentId,
          goal,
        },
      );

    this.assertAllowed(enforcement);

    const task: CollaborationTask = {
      id: crypto.randomUUID(),
      teamId,
      assignedAgent: agentId,
      goal,
      status: "idle",
    };

    this.tasks.set(
      task.id,
      task,
    );

    return task;
  }

  async completeTask(
    actorId: string,
    taskId: string,
    result: unknown,
  ): Promise<CollaborationTask> {

    const task =
      this.tasks.get(taskId);

    if (!task) {
      throw new Error("Task not found");
    }

    const team =
      this.teams.get(task.teamId);

    if (!team) {
      throw new Error("Team not found");
    }

    if (!team.members.includes(actorId)) {
      throw new Error(
        `Agent ${actorId} is not a member of team ${task.teamId}`,
      );
    }

    const enforcement =
      await this.authorize(
        actorId,
        "completeTask",
        {
          taskId,
          teamId: task.teamId,
          assignedAgent: task.assignedAgent,
        },
      );

    this.assertAllowed(enforcement);

    task.status = "completed";
    task.result = result;

    return task;
  }

  getTeam(id: string) {
    return this.teams.get(id);
  }

  getTask(id: string) {
    return this.tasks.get(id);
  }

  tasksList() {
    return Array.from(
      this.tasks.values(),
    );
  }
}