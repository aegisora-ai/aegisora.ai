"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolRegistry = void 0;
class ToolRegistry {
    tools = new Map();
    register(tool) {
        if (this.tools.has(tool.name)) {
            throw new Error(`Tool already registered: ${tool.name}`);
        }
        this.tools.set(tool.name, tool);
        return tool;
    }
    remove(name) {
        return this.tools.delete(name);
    }
    get(name) {
        const tool = this.tools.get(name);
        if (!tool) {
            throw new Error(`Tool not found: ${name}`);
        }
        return tool;
    }
    has(name) {
        return this.tools.has(name);
    }
    list() {
        return Array.from(this.tools.values());
    }
}
exports.ToolRegistry = ToolRegistry;
