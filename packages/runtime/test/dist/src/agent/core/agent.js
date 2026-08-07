"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = void 0;
const memory_1 = require("../../memory");
class Agent {
    id;
    name;
    state;
    memory;
    constructor(config) {
        this.id =
            config.id;
        this.name =
            config.name;
        this.state = {
            status: "idle"
        };
        this.memory =
            new memory_1.AgentMemory();
    }
    /**
     * Start execution
     */
    start() {
        this.state.status =
            "running";
    }
    /**
     * Complete execution
     */
    complete() {
        this.state.status =
            "completed";
    }
    /**
     * Fail execution
     */
    fail() {
        this.state.status =
            "failed";
    }
    /**
     * Current state
     */
    getState() {
        return this.state;
    }
    /**
     * Store memory
     */
    remember(key, value) {
        this.memory.set(key, value);
    }
    /**
     * Retrieve memory
     */
    recall(key) {
        return this.memory.get(key);
    }
    /**
     * List memories
     */
    memories() {
        return this.memory.list();
    }
}
exports.Agent = Agent;
