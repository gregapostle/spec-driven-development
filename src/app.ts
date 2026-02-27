import express from "express";
import { TaskController } from "./controllers/taskController";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { createTaskRouter } from "./routes/taskRoutes";
import { TaskService } from "./services/taskService";

export const createApp = (taskService?: TaskService) => {
  const app = express();
  const service = taskService ?? new TaskService();
  const controller = new TaskController(service);

  app.use(express.json());
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });
  app.use(createTaskRouter(controller));
  app.use(notFoundHandler);
  app.use(errorHandler);

  return { app, service };
};
