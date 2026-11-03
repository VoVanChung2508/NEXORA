-- ─────────────────────────────────────────────────────────────
-- Flowie · 0011 · System Admin
-- ─────────────────────────────────────────────────────────────

ALTER TABLE users
ADD COLUMN IF NOT EXISTS is_system_admin BOOLEAN NOT NULL DEFAULT FALSE;