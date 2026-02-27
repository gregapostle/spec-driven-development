# Feature Spec: Validation and Error Semantics

## Goal
- Define boundary-validation behavior and the exact error classification model used by the implemented API.

## Scope
- In:
- Request/response boundary validation strategy and 400/404/500 semantics.
- Out:
- Endpoint catalog details already defined in `02-api-contract.md`.

## Requirements
- Constraints:
  - Validation must occur at controller boundaries using Zod schemas.
  - Error classification must match middleware behavior.
- Error classification:
  - `400 ValidationError`: request/query/response parsing failures.
  - `404 Task not found`: missing task id from domain lookup.
  - `404 Not Found`: unmatched route.
  - `500 Internal Server Error`: non-classified exceptions.
- Traceability:
  - `src/controllers/taskController.ts`
  - `src/schemas/taskSchema.ts`
  - `src/middleware/errorHandler.ts`

## Acceptance Criteria
- [x] Boundary validation strategy is documented.
- [x] Error classes and status mapping are documented.
- [x] Failure scenarios are documented with expected outcomes.
- [x] Semantics match implemented middleware/controller behavior.

## Examples
- Missing `title` on `POST /tasks` -> `400 ValidationError`.
- Invalid `status` query on `GET /tasks` -> `400 ValidationError`.
- Unknown id on `GET /tasks/:id` -> `404 Task not found`.
- Unmatched route -> `404 Not Found`.
