import request from "supertest";
import { makeTestApp } from "../helpers/testApp";
import { buildCreateTaskInput, invalidTaskPayloads } from "../fixtures/taskFixtures";

describe("task api integration", () => {
  it("creates and fetches task", async () => {
    const { app } = makeTestApp();

    const createResponse = await request(app)
      .post("/tasks")
      .send(buildCreateTaskInput({ status: "in_progress" }));

    expect(createResponse.status).toBe(201);
    expect(createResponse.body).toMatchObject({
      id: "task-1",
      title: "Write deterministic tests",
      status: "in_progress"
    });

    const getResponse = await request(app).get(`/tasks/${createResponse.body.id}`);
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.id).toBe(createResponse.body.id);
  });

  it.each(invalidTaskPayloads)(
    "rejects invalid create payload: $name",
    async ({ payload }) => {
      const { app } = makeTestApp();

      const response = await request(app)
        .post("/tasks")
        .send(payload as string | object);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe("ValidationError");
    }
  );

  it.each([
    { status: "todo", expectedCount: 1 },
    { status: "in_progress", expectedCount: 1 },
    { status: "done", expectedCount: 1 }
  ])("filters list by status: $status", async ({ status, expectedCount }) => {
    const { app } = makeTestApp();

    await request(app).post("/tasks").send(buildCreateTaskInput({ status: "todo" }));
    await request(app)
      .post("/tasks")
      .send(buildCreateTaskInput({ title: "B", status: "in_progress" }));
    await request(app).post("/tasks").send(buildCreateTaskInput({ title: "C", status: "done" }));

    const response = await request(app).get("/tasks").query({ status });

    expect(response.status).toBe(200);
    expect(response.body.tasks).toHaveLength(expectedCount);
  });

  it("returns 404 for unknown task id", async () => {
    const { app } = makeTestApp();

    const response = await request(app).get("/tasks/task-404");

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Task not found");
  });

  it("returns 400 for invalid status query", async () => {
    const { app } = makeTestApp();

    const response = await request(app).get("/tasks").query({ status: "invalid" });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("ValidationError");
  });
});
