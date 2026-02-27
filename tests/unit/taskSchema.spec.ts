import {
  createTaskRequestSchema,
  listTasksQuerySchema,
  taskResponseSchema
} from "../../src/schemas/taskSchema";
import { invalidTaskPayloads } from "../fixtures/taskFixtures";

describe("task schema", () => {
  it.each(invalidTaskPayloads)(
    "rejects invalid create payload: $name",
    ({ payload }) => {
      const result = createTaskRequestSchema.safeParse(payload);
      expect(result.success).toBe(false);
    }
  );

  it("accepts valid create payload", () => {
    const result = createTaskRequestSchema.safeParse({
      title: "Title",
      description: "Description",
      status: "done"
    });

    expect(result.success).toBe(true);
  });

  it.each([
    { query: { status: "todo" }, valid: true },
    { query: { status: "in_progress" }, valid: true },
    { query: { status: "done" }, valid: true },
    { query: { status: "bad" }, valid: false }
  ])("validates list query %#", ({ query, valid }) => {
    const result = listTasksQuerySchema.safeParse(query);
    expect(result.success).toBe(valid);
  });

  it("rejects invalid task response", () => {
    const result = taskResponseSchema.safeParse({
      id: "x",
      title: "x",
      status: "todo",
      createdAt: "not-iso"
    });

    expect(result.success).toBe(false);
  });
});
