

export const RuntimeEventType = {


AGENT_CREATED:
"agent.created",


AGENT_STARTED:
"agent.started",


AGENT_COMPLETED:
"agent.completed",


AGENT_FAILED:
"agent.failed",


AGENT_STOPPED:
"agent.stopped",


TOOL_CALLED:
"tool.called"


} as const;



export type RuntimeEventTypeValue =
typeof RuntimeEventType[keyof typeof RuntimeEventType];

