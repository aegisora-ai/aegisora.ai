"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlannerEngine = void 0;
class PlannerEngine {
    goals;
    plans = new Map();
    constructor(goals) {
        this.goals = goals;
    }
    createFromGoal(goalId) {
        const goal = this.goals.get(goalId);
        const tasks = this.goals.tasks(goalId);
        const steps = tasks.map((task, index) => ({
            id: task.id,
            goalId,
            description: task.description,
            order: index + 1,
            completed: false
        }));
        const plan = {
            id: crypto.randomUUID(),
            goalId,
            steps,
            createdAt: new Date()
        };
        this.plans.set(plan.id, plan);
        return plan;
    }
    nextStep(planId) {
        return this.get(planId)
            .steps.find(s => !s.completed);
    }
    completeStep(planId, stepId) {
        const step = this.get(planId)
            .steps.find(s => s.id === stepId);
        if (step) {
            step.completed = true;
        }
    }
    get(id) {
        const plan = this.plans.get(id);
        if (!plan) {
            throw new Error("Plan not found");
        }
        return plan;
    }
    list() {
        return Array.from(this.plans.values());
    }
}
exports.PlannerEngine = PlannerEngine;
