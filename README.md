# CURT Backend (CURT-Backend-Task)

## Project overview

CURT Backend is a task-and-project management REST API implemented with Node.js, Express and TypeScript following a clean-architecture style. It provides endpoints for authentication, projects, tasks, teams and user links (user-project, user-task, user-team).

## Deployment

- **Base URL:** https://curt-backend-task-production.up.railway.app

## Technologies used

- Node.js
- Express
- TypeScript
- PostgreSQL (pg)
- node-pg-migrate (migrations)
- dotenv
- bcrypt (password hashing)
- jose (JWT handling)
- winston (logging)
- zod (schema validation)

## Setup

1. Install dependencies:

```
npm install
```

2. Create a `.env` file in the project root with at least the following variables:

- `DATABASE_URL` — Postgres connection string (e.g. `postgres://user:pass@localhost:5432/dbname`)
- `NEON_AUTH_BASE_URL` — (if using Neon Auth integration)
- `PORT` — optional, defaults in code if omitted

Example `.env`:

```
DATABASE_URL=postgres://postgres:password@localhost:5432/curtdb
NEON_AUTH_BASE_URL=https://<neon-auth-base>
PORT=4000
```

## Database setup & migrations

This project uses `node-pg-migrate` and includes SQL migration files in the `migrations/` folder (see [migrations/schema.sql](migrations/schema.sql)). To apply migrations:

```
# ensure DATABASE_URL is set in your environment or .env
npm run migrate up
```

To create a new migration, use `node-pg-migrate` directly (see its docs) or add .sql files to the `migrations/` directory and apply them.

## How to run the project

- Development (live typescript runner):

```
npm run dev
```

- Build + start:

```
npm run build
npm start
```

## API Documentation / Endpoints

Base URL: https://curt-backend-task-production.up.railway.app

Health

- GET /health

Auth

- POST /signup
- POST /login
- POST /logout

Creator

- GET /creators/:id/projects
- GET /creators/:id/teams

Project

- POST /projects
- GET /projects/:id
- PUT /projects/:id
- DELETE /projects/:id
- GET /projects/:id/users
- GET /projects/:id/tasks

Task

- POST /tasks
- GET /tasks/:id
- PUT /tasks/:id
- DELETE /tasks/:id
- GET /tasks/:id/users

Team

- POST /teams
- GET /teams/:id
- PUT /teams/:id
- DELETE /teams/:id
- GET /teams/:id/users

User

- POST /users
- GET /users/:id
- PUT /users/:id
- DELETE /users/:id
- GET /users/:id/projects
- GET /users/:id/tasks
- GET /users/:id/teams

User-Project Link

- POST /user-projects
- DELETE /user-projects

User-Task Link

- POST /user-tasks
- DELETE /user-tasks

User-Team Link

- POST /user-teams
- DELETE /user-teams

## Database design

See `src/core/entities` for the TypeScript entity definitions representing database models. Primary tables represented in the codebase:

- `users` — user records (name, email, password hash, etc.)
- `projects` — project metadata (name, description, progress)
- `tasks` — task metadata (title, description, priority, status, projectId)
- `teams` — team metadata (name, description)
- linking tables: `user_projects`, `user_tasks`, `user_teams` for many-to-many relations

The SQL migration files in `migrations/` contain the schema used for the project. Review [migrations/schema.sql](migrations/schema.sql) for the full DDL.

## Assumptions & additional notes

- Authentication: the code integrates with Neon Auth (see `src/infrastructure/auth/neonAuthClient.ts`); JWT/session handling relies on that service.
- Environment: `DATABASE_URL` must be provided; production deployments (Railway) are preconfigured and available at the base URL above.
- Migrations: `node-pg-migrate` is used; the `migrate` npm script runs the tool.
- Error handling: centralized error middleware located in `src/api/middlewares/errorMiddleware.ts`.

## Useful links

- Postman collection (endpoints & examples): [postman_collection.json](postman_collection.json)
- Code entrypoints: [src/server.ts](src/server.ts) and [src/app.ts](src/app.ts)

## Swagger UI

The project serves an interactive Swagger UI at the `/docs` path when an OpenAPI spec (`openapi.json`) exists at the repository root.

1. Install dependencies (if not already done):

```bash
npm install
```

2. Run the app in development mode:

```bash
npm run dev
```

3. Open the docs in your browser (default port 3000):

```
http://localhost:3000/docs
```

Notes:

- The server port defaults to `3000` unless `PORT` is set in `.env`.
- If `/docs` returns a 404 or an empty page, ensure `openapi.json` exists at the project root and is valid JSON.
