"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternStore = void 0;
class PatternStore {
    patterns;
    constructor() {
        this.patterns =
            new Map();
    }
    add(pattern) {
        this.patterns.set(pattern.id, pattern);
        return pattern;
    }
    find(agentId) {
        return Array.from(this.patterns.values())
            .filter(p => p.agentId === agentId);
    }
    search(trigger) {
        return Array.from(this.patterns.values())
            .filter(p => p.trigger.includes(trigger));
    }
    list() {
        return Array.from(this.patterns.values());
    }
}
exports.PatternStore = PatternStore;
