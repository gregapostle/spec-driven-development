import type { Request, Response, NextFunction } from "express";
import {
  createTaskRequestSchema,
  listTasksQuerySchema,
  listTasksResponseSchema,
  taskResponseSchema
} from "../schemas/taskSchema";
import type { TaskService } from "../services/taskService";
import { ApiError } from "../middleware/errorHandler";

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  createTask = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const input = createTaskRequestSchema.parse(req.body);
      const task = this.taskService.createTask(input);
      const response = taskResponseSchema.parse(task);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  listTasks = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const query = listTasksQuerySchema.parse(req.query);
      const tasks = this.taskService.listTasks(query.status);
      const response = listTasksResponseSchema.parse({ tasks });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  getTaskById = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const task = this.taskService.getTaskById(req.params.id);
      if (!task) {
        throw new ApiError(404, "Task not found");
      }

      const response = taskResponseSchema.parse(task);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
