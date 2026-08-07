"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluator = void 0;
class Evaluator {
    evaluate(output) {
        if (output) {
            return {
                status: "success",
                score: 0.9,
                feedback: "Execution completed successfully",
                timestamp: new Date()
            };
        }
        return {
            status: "failed",
            score: 0,
            feedback: "No output produced",
            timestamp: new Date()
        };
    }
}
exports.Evaluator = Evaluator;
