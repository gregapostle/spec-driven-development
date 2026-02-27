# Specification Index

This index organizes the Task Management API specification into focused documents by concern.

## Navigation
- [01-system-overview.md](01-system-overview.md)
- [02-api-contract.md](02-api-contract.md)
- [03-domain-model-invariants.md](03-domain-model-invariants.md)
- [04-validation-error-semantics.md](04-validation-error-semantics.md)
- [05-test-architecture.md](05-test-architecture.md)

## Traceability Map
- System composition and boundaries
  - `src/app.ts`
  - `src/server.ts`
- API routing and controller behavior
  - `src/routes/taskRoutes.ts`
  - `src/controllers/taskController.ts`
- Schemas and contract types
  - `src/schemas/taskSchema.ts`
- Domain logic and invariants
  - `src/services/taskService.ts`
  - `src/types/task.ts`
  - `src/utils/id.ts`
- Error semantics
  - `src/middleware/errorHandler.ts`
- Test strategy and implementation
  - `tests/unit/*.spec.ts`
  - `tests/integration/*.spec.ts`
  - `tests/fixtures/taskFixtures.ts`
  - `tests/helpers/testApp.ts`

## Review Guidance
1. Read `01-system-overview.md` for scope and assumptions.
2. Read `02-api-contract.md` for endpoint and schema contracts.
3. Read `03-domain-model-invariants.md` and `04-validation-error-semantics.md` for correctness rules.
4. Read `05-test-architecture.md` for verification strategy.
