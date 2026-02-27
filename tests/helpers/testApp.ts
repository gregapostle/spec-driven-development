import { createApp } from "../../src/app";
import { resetIdCounter } from "../../src/utils/id";
import { TaskService } from "../../src/services/taskService";

export const makeTestApp = () => {
  resetIdCounter();
  const service = new TaskService();
  const { app } = createApp(service);
  return { app, service };
};
