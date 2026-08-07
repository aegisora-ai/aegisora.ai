"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionEngine = void 0;
class PermissionEngine {
    check(request) {
        if (!request.agentId) {
            return {
                action: "deny",
                reason: "Missing agent identity",
                confidence: 1
            };
        }
        return {
            action: "allow",
            reason: `Permission granted for ${request.tool}`,
            confidence: 0.9
        };
    }
}
exports.PermissionEngine = PermissionEngine;
