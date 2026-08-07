"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalManager = void 0;
const decomposition_1 = require("./decomposition");
class GoalManager {
    decomposer;
    goals;
    constructor(decomposer = new decomposition_1.TaskDecomposer()) {
        this.decomposer = decomposer;
        this.goals =
            new Map();
    }
    create(agentId, objective, priority = 1) {
        const goal = {
            id: crypto.randomUUID(),
            agentId,
            objective,
            status: "created",
            priority,
            createdAt: new Date()
        };
        this.goals.set(goal.id, goal);
        return goal;
    }
    tasks(goalId) {
        const goal = this.get(goalId);
        return this.decomposer.decompose(goal.id, goal.objective);
    }
    get(id) {
        const goal = this.goals.get(id);
        if (!goal) {
            throw new Error(`Goal not found: ${id}`);
        }
        return goal;
    }
    updateStatus(id, status) {
        const goal = this.get(id);
        goal.status = status;
        return goal;
    }
    list() {
        return Array.from(this.goals.values());
    }
}
exports.GoalManager = GoalManager;
