"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDecomposer = void 0;
class TaskDecomposer {
    decompose(goalId, objective) {
        const steps = [
            "Analyze objective",
            "Create execution plan",
            "Select required tools",
            "Execute task",
            "Evaluate result",
            "Improve strategy"
        ];
        return steps.map((step, index) => ({
            id: crypto.randomUUID(),
            goalId,
            title: step,
            description: `${step} for ${objective}`,
            order: index + 1,
            completed: false
        }));
    }
}
exports.TaskDecomposer = TaskDecomposer;
