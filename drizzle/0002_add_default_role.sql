-- Custom SQL migration file, put your code below! --

ALTER TABLE "user"
ALTER COLUMN "role_id"
SET DEFAULT 3;