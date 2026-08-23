import { AgentMemory } from "./memory";

import { AgentPlanner } from "./planner";

import { AgentExecutor } from "./executor";

import { ToolRegistry } from "./tool";

export class AegisoraAgent {
  private memory: AgentMemory;

  private planner: AgentPlanner;

  private executor: AgentExecutor;

  constructor() {
    const tools = new ToolRegistry();

    this.memory = new AgentMemory();

    this.planner = new AgentPlanner();

    this.executor = new AgentExecutor(tools);
  }

  async run(goal: string) {
    const plan = this.planner.createPlan(goal);

    const result = await this.executor.execute(plan);

    this.memory.add({
      id: crypto.randomUUID(),

      content: goal,

      createdAt: new Date(),
    });

    return result;
  }
}
