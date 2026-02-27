import { Router } from "express";
import type { TaskController } from "../controllers/taskController";

export const createTaskRouter = (taskController: TaskController): Router => {
  const router = Router();

  router.post("/tasks", taskController.createTask);
  router.get("/tasks", taskController.listTasks);
  router.get("/tasks/:id", taskController.getTaskById);

  return router;
};
