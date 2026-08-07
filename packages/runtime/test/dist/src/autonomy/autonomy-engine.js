"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutonomyEngine = void 0;
class AutonomyEngine {
    states;
    constructor() {
        this.states =
            new Map();
    }
    start(agentId, goalId) {
        const state = {
            id: crypto.randomUUID(),
            agentId,
            goalId,
            status: "initialized",
            currentStep: "bootstrap",
            progress: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        this.states.set(state.id, state);
        return state;
    }
    update(id, status, step, progress) {
        const state = this.states.get(id);
        if (!state) {
            throw new Error("Autonomy state not found");
        }
        state.status =
            status;
        state.currentStep =
            step;
        state.progress =
            progress;
        state.updatedAt =
            new Date();
        return state;
    }
    get(id) {
        const state = this.states.get(id);
        if (!state) {
            throw new Error("Autonomy state not found");
        }
        return state;
    }
    list() {
        return Array.from(this.states.values());
    }
}
exports.AutonomyEngine = AutonomyEngine;
