# Feature Spec: API Contract

## Goal
- Define the exact public HTTP interface implemented by the service, including success and failure contracts.

## Scope
- In:
- Documented endpoints, request/query schemas, response shapes, status codes, and examples.
- Out:
- Internal persistence mechanics and service-level implementation details.

## Requirements
- Constraints:
  - Must match route/controller behavior exactly.
  - Must not include unimplemented endpoints.
- Endpoints:
  - `GET /health`
  - `POST /tasks`
  - `GET /tasks`
  - `GET /tasks/:id`
- Error object structures:
  - `400` validation payload from Zod failures.
  - `404` domain not found and route not found payloads.
  - `500` fallback payload.
- Traceability:
  - `src/routes/taskRoutes.ts`
  - `src/controllers/taskController.ts`
  - `src/schemas/taskSchema.ts`
  - `src/middleware/errorHandler.ts`

## Acceptance Criteria
- [x] All implemented public endpoints are documented.
- [x] Request/query and response contracts are documented.
- [x] Status code semantics align with implementation.
- [x] Positive and negative examples are present.
- [x] Error object structures are documented.

## Examples
### Shared Types
- `TaskStatus`: `"todo" | "in_progress" | "done"`
- `Task`: `{ id, title, description?, status, createdAt }`

### GET /health
- Success: `200 { "status": "ok" }`

### POST /tasks
- Request body:
  - `title: string` (trimmed, min 1, max 120)
  - `description?: string` (trimmed, max 500)
  - `status?: TaskStatus` (default `"todo"`)
- Success: `201` with `Task`.
- Validation failure: `400`.

Positive example:
```json
{
  "title": "Write deterministic tests",
  "description": "Cover edge cases",
  "status": "todo"
}
```

Negative example:
```json
{
  "title": "Write deterministic tests",
  "status": "blocked"
}
```

### GET /tasks
- Query: `status?: TaskStatus`
- Success: `200 { "tasks": Task[] }`
- Validation failure: `400`

Positive example: `GET /tasks?status=done`

Negative example: `GET /tasks?status=invalid`

### GET /tasks/:id
- Success: `200` with `Task`
- Not found: `404 { "error": "Task not found" }`

### Error Structures
```json
{
  "error": "ValidationError",
  "details": [{ "path": "status", "message": "Invalid enum value" }]
}
```

```json
{ "error": "Task not found" }
```

```json
{ "error": "Not Found" }
```

```json
{ "error": "Internal Server Error" }
```
