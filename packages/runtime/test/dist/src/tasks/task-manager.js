"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskManager = void 0;
class TaskManager {
    tasks;
    constructor() {
        this.tasks =
            new Map();
    }
    /**
     * Create task
     */
    create(agentId, goal) {
        const task = {
            id: crypto.randomUUID(),
            agentId,
            goal,
            status: "idle",
            createdAt: new Date()
        };
        this.tasks.set(task.id, task);
        return task;
    }
    /**
     * Start task
     */
    start(id) {
        const task = this.get(id);
        task.status =
            "running";
        return task;
    }
    /**
     * Complete task
     */
    complete(id, result) {
        const task = this.get(id);
        task.status =
            "completed";
        task.result =
            result;
        task.completedAt =
            new Date();
        return task;
    }
    /**
     * Get task
     */
    get(id) {
        const task = this.tasks.get(id);
        if (!task) {
            throw new Error(`Task not found: ${id}`);
        }
        return task;
    }
    /**
     * List tasks
     */
    list() {
        return Array.from(this.tasks.values());
    }
}
exports.TaskManager = TaskManager;
