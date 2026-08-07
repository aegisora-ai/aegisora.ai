"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningEngine = void 0;
class LearningEngine {
    records;
    constructor() {
        this.records =
            new Map();
    }
    learn(record) {
        this.records.set(record.id, record);
        return record;
    }
    findByAgent(agentId) {
        return Array.from(this.records.values())
            .filter(record => record.agentId === agentId);
    }
    getLessons(agentId) {
        return this.findByAgent(agentId)
            .map(record => record.lesson);
    }
    list() {
        return Array.from(this.records.values());
    }
    clear() {
        this.records.clear();
    }
}
exports.LearningEngine = LearningEngine;
