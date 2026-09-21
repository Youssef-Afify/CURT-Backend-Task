-- Migration: drop DEFAULT from users.user_id
-- Run this on your Neon DB (psql or Neon query editor)

BEGIN;

-- (optional) inspect current default
-- SELECT column_default
-- FROM information_schema.columns
-- WHERE table_schema='public' AND table_name='users' AND column_name='user_id';

ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;

COMMIT;

-- (optional) verify removal
-- SELECT column_default
-- FROM information_schema.columns
-- WHERE table_schema='public' AND table_name='users' AND column_name='user_id';
