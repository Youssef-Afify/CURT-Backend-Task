-- ============================================================
-- schema.sql
-- Database schema for Teams / Users / Projects / Tasks system
-- Dialect: PostgreSQL (targeting Neon)
-- ============================================================

-- gen_random_uuid() is built into PostgreSQL core since v13,
-- which Neon runs, so no extension needs to be created.

-- ------------------------------------------------------------
-- Trigger function to auto-update "updated_at" on row changes
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------
-- Table: users
-- ------------------------------------------------------------
CREATE TABLE users (
    user_id     UUID PRIMARY KEY,
    name        VARCHAR(255)    NOT NULL,
    email       VARCHAR(255)    NOT NULL UNIQUE,
    password    VARCHAR(255)    NOT NULL,
    "timestamp" TIMESTAMP       NOT NULL DEFAULT now()
);

-- ------------------------------------------------------------
-- Table: teams
-- "created by" (teams:users = N:1) -> creator_id on teams
--   must at teams end  -> creator_id NOT NULL
--   may  at users end  -> no constraint needed on users side
-- ------------------------------------------------------------
CREATE TABLE teams (
    team_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)    NOT NULL,
    description TEXT,
    "timestamp" TIMESTAMP       NOT NULL DEFAULT now(),
    creator_id  UUID            NOT NULL,
    CONSTRAINT fk_teams_creator
        FOREIGN KEY (creator_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- ------------------------------------------------------------
-- Table: projects
-- "created by" (projects:users = N:1) -> creator_id on projects
--   must at projects end -> creator_id NOT NULL
--   may  at users end    -> no constraint needed on users side
-- ------------------------------------------------------------
CREATE TABLE projects (
    project_id  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        VARCHAR(255)    NOT NULL,
    description TEXT,
    progress    VARCHAR(20)     NOT NULL DEFAULT 'To Do'
        CHECK (progress IN ('To Do', 'In Progress', 'Done')),
    created_at  TIMESTAMP       NOT NULL DEFAULT now(),
    updated_at  TIMESTAMP       NOT NULL DEFAULT now(),
    creator_id  UUID            NOT NULL,
    CONSTRAINT fk_projects_creator
        FOREIGN KEY (creator_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

CREATE TRIGGER trg_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- ------------------------------------------------------------
-- Table: tasks
-- "have" (projects:tasks = 1:N) -> project_id on tasks
--   must at tasks end    -> project_id NOT NULL
--   may  at projects end -> no constraint needed on projects side
-- ------------------------------------------------------------
CREATE TABLE tasks (
    task_id     UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title       VARCHAR(255)    NOT NULL,
    description TEXT,
    priority    VARCHAR(10)     NOT NULL DEFAULT 'Medium'
        CHECK (priority IN ('Low', 'Medium', 'High')),
    status      VARCHAR(20)     NOT NULL DEFAULT 'To Do'
        CHECK (status IN ('To Do', 'In Progress', 'Done')),
    created_at  TIMESTAMP       NOT NULL DEFAULT now(),
    updated_at  TIMESTAMP       NOT NULL DEFAULT now(),
    project_id  UUID            NOT NULL,
    CONSTRAINT fk_tasks_project
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TRIGGER trg_tasks_updated_at
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

-- ------------------------------------------------------------
-- Table: user_teams
-- "participate in" (teams:users = M:N) junction table
-- ------------------------------------------------------------
CREATE TABLE user_teams (
    user_id     UUID NOT NULL,
    team_id     UUID NOT NULL,
    PRIMARY KEY (user_id, team_id),
    CONSTRAINT fk_user_teams_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_user_teams_team
        FOREIGN KEY (team_id) REFERENCES teams(team_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Table: user_projects
-- "participate in" (projects:users = M:N) junction table
-- ------------------------------------------------------------
CREATE TABLE user_projects (
    user_id     UUID NOT NULL,
    project_id  UUID NOT NULL,
    PRIMARY KEY (user_id, project_id),
    CONSTRAINT fk_user_projects_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_user_projects_project
        FOREIGN KEY (project_id) REFERENCES projects(project_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- Table: user_tasks
-- "participate in" (tasks:users = M:N) junction table
-- may at both ends -> no NOT NULL constraints needed beyond PK
-- ------------------------------------------------------------
CREATE TABLE user_tasks (
    user_id     UUID NOT NULL,
    task_id     UUID NOT NULL,
    PRIMARY KEY (user_id, task_id),
    CONSTRAINT fk_user_tasks_user
        FOREIGN KEY (user_id) REFERENCES users(user_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_user_tasks_task
        FOREIGN KEY (task_id) REFERENCES tasks(task_id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

-- ============================================================
-- Indices
-- ============================================================
-- PostgreSQL automatically indexes PRIMARY KEY and UNIQUE
-- columns (user_id, team_id, project_id, task_id, users.email,
-- and the composite PKs on the junction tables), so those are
-- not repeated below.

-- Foreign key columns are NOT auto-indexed in PostgreSQL, so
-- add them explicitly to speed up joins and FK constraint checks.
CREATE INDEX idx_teams_creator_id ON teams (creator_id);
CREATE INDEX idx_projects_creator_id ON projects (creator_id);

-- Composite indexes for GET /projects/:project_id/tasks, optionally
-- filtered by status and/or priority. Each index's leading column
-- (project_id) also serves plain "all tasks in this project" lookups,
-- so a separate standalone index on tasks.project_id is not needed.
CREATE INDEX idx_tasks_project_status ON tasks (project_id, status);
CREATE INDEX idx_tasks_project_priority ON tasks (project_id, priority);

-- Junction tables: the composite PK (user_id, item_id) already indexes
-- lookups by the first column, but not by the second alone.
-- Add these to speed up "all teams/projects/tasks a given user
-- belongs to" queries.
CREATE INDEX idx_user_teams_team_id ON user_teams (team_id);
CREATE INDEX idx_user_projects_project_id ON user_projects (project_id);
CREATE INDEX idx_user_tasks_task_id ON user_tasks (task_id);

-- Common filter columns.
CREATE INDEX idx_projects_progress ON projects (progress);
CREATE INDEX idx_tasks_status ON tasks (status);
CREATE INDEX idx_tasks_priority ON tasks (priority);