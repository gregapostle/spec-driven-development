import { nextId } from "../utils/id";
import type { Task, TaskStatus } from "../types/task";
import type { CreateTaskRequest } from "../schemas/taskSchema";

export class TaskService {
  private tasks: Task[] = [];

  createTask(input: CreateTaskRequest): Task {
    const task: Task = {
      id: nextId(),
      title: input.title,
      description: input.description,
      status: input.status,
      createdAt: new Date().toISOString()
    };

    this.tasks.push(task);
    return task;
  }

  listTasks(status?: TaskStatus): Task[] {
    if (!status) {
      return [...this.tasks];
    }

    return this.tasks.filter((task) => task.status === status);
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  clear(): void {
    this.tasks = [];
  }
}
