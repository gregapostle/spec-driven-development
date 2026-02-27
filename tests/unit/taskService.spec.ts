import { TaskService } from "../../src/services/taskService";
import { resetIdCounter } from "../../src/utils/id";
import { buildCreateTaskInput } from "../fixtures/taskFixtures";

describe("task service", () => {
  let service: TaskService;

  beforeEach(() => {
    resetIdCounter();
    service = new TaskService();
  });

  it("creates a task", () => {
    const task = service.createTask(buildCreateTaskInput());

    expect(task.id).toBe("task-1");
    expect(task.title).toBe("Write deterministic tests");
  });

  it.each([
    { status: "todo", expected: 1 },
    { status: "in_progress", expected: 1 },
    { status: "done", expected: 1 }
  ] as const)("filters by status: $status", ({ status, expected }) => {
    service.createTask(buildCreateTaskInput({ status: "todo" }));
    service.createTask(buildCreateTaskInput({ status: "in_progress" }));
    service.createTask(buildCreateTaskInput({ status: "done" }));

    expect(service.listTasks(status).length).toBe(expected);
  });

  it("returns undefined for unknown task", () => {
    expect(service.getTaskById("task-999")).toBeUndefined();
  });
});
