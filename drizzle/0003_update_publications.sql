-- Add new columns to publications table
ALTER TABLE "publications" ADD COLUMN IF NOT EXISTS "title" varchar(512);
ALTER TABLE "publications" ADD COLUMN IF NOT EXISTS "slug" varchar(512);
ALTER TABLE "publications" ADD COLUMN IF NOT EXISTS "description" text;
ALTER TABLE "publications" ADD COLUMN IF NOT EXISTS "hero_image" text;
ALTER TABLE "publications" ADD COLUMN IF NOT EXISTS "is_draft" boolean DEFAULT true;

-- Make date_published nullable (it was NOT NULL before)
ALTER TABLE "publications" ALTER COLUMN "date_published" DROP NOT NULL;

-- Update existing records to have default values
UPDATE "publications" 
SET 
  "title" = 'Untitled Publication',
  "slug" = 'untitled-publication-' || id::text,
  "description" = '',
  "is_draft" = false
WHERE "title" IS NULL;

-- Now make the columns NOT NULL
ALTER TABLE "publications" ALTER COLUMN "title" SET NOT NULL;
ALTER TABLE "publications" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "publications" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "publications" ALTER COLUMN "is_draft" SET NOT NULL;

-- Add unique constraint on slug
ALTER TABLE "publications" ADD CONSTRAINT "publications_slug_unique" UNIQUE ("slug");

