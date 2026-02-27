import type { CreateTaskRequest } from "../../src/schemas/taskSchema";

export const buildCreateTaskInput = (
  overrides: Partial<CreateTaskRequest> = {}
): CreateTaskRequest => ({
  title: "Write deterministic tests",
  description: "Cover edge cases",
  status: "todo",
  ...overrides
});

export const invalidTaskPayloads: Array<{ name: string; payload: unknown }> = [
  { name: "missing title", payload: { status: "todo" } },
  { name: "empty title", payload: { title: "", status: "todo" } },
  { name: "invalid status", payload: { title: "x", status: "blocked" } },
  { name: "non-string description", payload: { title: "x", description: 1 } }
];
