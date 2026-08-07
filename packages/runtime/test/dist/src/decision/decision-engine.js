"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecisionEngine = void 0;
class DecisionEngine {
    decide(goal) {
        if (!goal || goal.trim().length === 0) {
            return {
                type: "stop",
                reason: "No goal provided",
                confidence: 1
            };
        }
        return {
            type: "plan",
            reason: `Create execution plan for goal: ${goal}`,
            confidence: 0.9
        };
    }
}
exports.DecisionEngine = DecisionEngine;
