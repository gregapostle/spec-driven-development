import { z } from "zod";

export const taskStatusSchema = z.enum(["todo", "in_progress", "done"]);

export const createTaskRequestSchema = z.object({
  title: z.string().trim().min(1, "title is required").max(120),
  description: z.string().trim().max(500).optional(),
  status: taskStatusSchema.default("todo")
});

export const taskResponseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  status: taskStatusSchema,
  createdAt: z.string().datetime()
});

export const listTasksQuerySchema = z.object({
  status: taskStatusSchema.optional()
});

export const listTasksResponseSchema = z.object({
  tasks: z.array(taskResponseSchema)
});

export type CreateTaskRequest = z.infer<typeof createTaskRequestSchema>;
export type ListTasksQuery = z.infer<typeof listTasksQuerySchema>;
export type TaskResponse = z.infer<typeof taskResponseSchema>;
