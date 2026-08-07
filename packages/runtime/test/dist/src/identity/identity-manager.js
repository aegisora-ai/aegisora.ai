"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityManager = void 0;
class IdentityManager {
    profiles;
    constructor() {
        this.profiles =
            new Map();
    }
    create(profile) {
        const agent = {
            ...profile,
            createdAt: new Date()
        };
        this.profiles.set(agent.id, agent);
        return agent;
    }
    get(id) {
        const agent = this.profiles.get(id);
        if (!agent) {
            throw new Error(`Agent profile not found: ${id}`);
        }
        return agent;
    }
    list() {
        return Array.from(this.profiles.values());
    }
    remove(id) {
        return this.profiles.delete(id);
    }
}
exports.IdentityManager = IdentityManager;
