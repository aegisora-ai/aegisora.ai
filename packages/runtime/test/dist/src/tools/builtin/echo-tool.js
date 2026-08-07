"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EchoTool = void 0;
class EchoTool {
    name = "echo";
    description = "Returns received input";
    async execute(input) {
        return {
            echo: input
        };
    }
}
exports.EchoTool = EchoTool;
