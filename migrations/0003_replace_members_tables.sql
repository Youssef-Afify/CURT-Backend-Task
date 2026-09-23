-- Migration: replace junction tables with user_* variants
-- These tables keep the same data and FK rules, but the column order
-- is changed so user_id is the first attribute in each composite key.

BEGIN;

CREATE TABLE user_teams (
    user_id UUID NOT NULL,
    team_id UUID NOT NULL,
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

INSERT INTO user_teams (user_id, team_id)
SELECT user_id, team_id
FROM team_members;

DROP TABLE team_members;

CREATE TABLE user_projects (
    user_id    UUID NOT NULL,
    project_id UUID NOT NULL,
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

INSERT INTO user_projects (user_id, project_id)
SELECT user_id, project_id
FROM project_members;

DROP TABLE project_members;

CREATE TABLE user_tasks (
    user_id UUID NOT NULL,
    task_id UUID NOT NULL,
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

INSERT INTO user_tasks (user_id, task_id)
SELECT user_id, task_id
FROM task_members;

DROP TABLE task_members;

COMMIT;
