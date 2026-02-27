# Feature Spec: Domain Model and Invariants

## Goal
- Define domain entities, constraints, transitions, and invariants enforced by the implemented service layer.

## Scope
- In:
- Task entity model, storage model, invariants, and state transitions for implemented operations.
- Out:
- HTTP status/error handling rules (see `04-validation-error-semantics.md`).

## Requirements
- Constraints:
  - `Task` fields must align with `src/types/task.ts` and `src/schemas/taskSchema.ts`.
  - Invariants must reflect `TaskService` behavior only.
- Entity definition:
  - `id`: non-empty string from `nextId()`.
  - `title`: trimmed, non-empty, max 120.
  - `description`: optional, max 500.
  - `status`: `todo | in_progress | done`.
  - `createdAt`: ISO datetime.
- Storage model:
  - In-memory array in `TaskService`.
- Traceability:
  - `src/types/task.ts`
  - `src/schemas/taskSchema.ts`
  - `src/services/taskService.ts`
  - `src/utils/id.ts`

## Acceptance Criteria
- [x] Task entity fields and constraints are documented.
- [x] Storage model and lifecycle limits are documented.
- [x] Domain invariants are documented.
- [x] Implemented state transitions are documented.
- [x] Traceability to domain implementation exists.

## Examples
- Transition example: `POST /tasks` appends one new `Task` into in-memory storage.
- Invariant example: `listTasks("done")` returns only tasks with `status === "done"`.
