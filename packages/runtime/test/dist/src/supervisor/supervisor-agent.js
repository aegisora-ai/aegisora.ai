"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupervisorAgent = void 0;
class SupervisorAgent {
    tasks;
    constructor() {
        this.tasks =
            new Map();
    }
    createTask(goal, agents) {
        const task = {
            id: crypto.randomUUID(),
            goal,
            agents,
            status: "idle",
            createdAt: new Date()
        };
        this.tasks.set(task.id, task);
        return task;
    }
    start(id) {
        const task = this.tasks.get(id);
        if (!task) {
            throw new Error("Supervision task not found");
        }
        task.status =
            "running";
        return task;
    }
    complete(id, result) {
        const task = this.tasks.get(id);
        if (!task) {
            throw new Error("Supervision task not found");
        }
        task.status =
            "completed";
        task.result =
            result;
        return task;
    }
    list() {
        return Array.from(this.tasks.values());
    }
}
exports.SupervisorAgent = SupervisorAgent;
