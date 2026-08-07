"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaborationManager = void 0;
class CollaborationManager {
    teams;
    tasks;
    constructor() {
        this.teams =
            new Map();
        this.tasks =
            new Map();
    }
    createTeam(name, members) {
        const team = {
            id: crypto.randomUUID(),
            name,
            members,
            createdAt: new Date()
        };
        this.teams.set(team.id, team);
        return team;
    }
    assignTask(teamId, agentId, goal) {
        const task = {
            id: crypto.randomUUID(),
            teamId,
            assignedAgent: agentId,
            goal,
            status: "idle"
        };
        this.tasks.set(task.id, task);
        return task;
    }
    completeTask(taskId, result) {
        const task = this.tasks.get(taskId);
        if (!task) {
            throw new Error("Task not found");
        }
        task.status =
            "completed";
        task.result =
            result;
        return task;
    }
    getTeam(id) {
        return this.teams.get(id);
    }
    tasksList() {
        return Array.from(this.tasks.values());
    }
}
exports.CollaborationManager = CollaborationManager;
