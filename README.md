# Task Management API (Spec-Driven)

Backend-only application implementing a task workflow with schema validation, modular architecture, and deterministic tests.

- Runtime requirement: Node.js 20+
- Persistence model: in-memory store only (no database)
- Test model: deterministic unit and integration tests

## PR-Style Summary
- Built a complete Express + TypeScript API with separated routes/controllers/services/schemas/middleware.
- Added explicit request/response schema validation using Zod at application boundaries.
- Added reusable fixtures/helpers and split tests into unit/integration suites.
- Added parameterized tests for invalid payloads and query validation.
- Added repository hygiene updates (`.gitignore`, clean structure, no generated artifacts committed).

Detailed PR notes are in [docs/PR_DESCRIPTION.md](docs/PR_DESCRIPTION.md).
Specification index is in [SPECS/INDEX.md](SPECS/INDEX.md).

## Architecture Overview
- `src/app.ts`: app composition and middleware registration
- `src/server.ts`: runtime entrypoint
- `src/routes/taskRoutes.ts`: endpoint routing
- `src/controllers/taskController.ts`: HTTP boundary handlers
- `src/services/taskService.ts`: business logic + in-memory store
- `src/schemas/taskSchema.ts`: request/response/query schemas
- `src/middleware/errorHandler.ts`: central error normalization
- `src/utils/id.ts`: deterministic id utility

## API
- `POST /tasks`
  - body: `{ title: string, description?: string, status?: "todo"|"in_progress"|"done" }`
  - returns `201` with created task
- `GET /tasks?status=<status>`
  - optional status filter
  - returns `200` with `{ tasks: Task[] }`
- `GET /tasks/:id`
  - returns `200` task or `404` if missing
- `GET /health`
  - returns `200 { status: "ok" }`

## Setup
```bash
npm install
```

## Run
```bash
npm run dev
```

Production-style run:
```bash
npm run build
npm run start
```

## Smoke Test
```bash
# 1) Health check (expected: 200)
curl -i http://localhost:3000/health

# 2) Create task (expected: 201)
curl -i -X POST http://localhost:3000/tasks \
  -H "content-type: application/json" \
  -d '{"title":"Smoke task","status":"todo"}'

# 3) List tasks (expected: 200)
curl -i http://localhost:3000/tasks

# 4) Get task by id (expected: 200 for existing id, 404 for unknown id)
curl -i http://localhost:3000/tasks/task-1
```

## Test
```bash
npm test
```

## Coverage
```bash
npm run coverage
```
- Uses Vitest with the V8 coverage provider.
- Reports are generated in `coverage/` (text summary, `coverage-final.json`, and HTML report).

Optional watch mode:
```bash
npm run test:watch
```

## Quality Checks
```bash
npm run lint
npm run build
```

## Configuration
- `PORT` (optional): default `3000`

## Troubleshooting
- If TypeScript errors appear, run `npm run lint` to surface typing issues.
- If tests fail after local edits, rerun with `npm test` to confirm deterministic behavior.
- If port `3000` is in use, start with `PORT=3001 npm run dev`.

## Assumptions
- Assessment scope accepts in-memory persistence.
- No authentication/authorization required.
- Node.js 20+ is available.

## Tools Used
- GPT-5 Codex for spec-driven implementation workflow and refactoring.
