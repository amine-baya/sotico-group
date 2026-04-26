-- Add the gallery column expected by the Prisma schema.
ALTER TABLE "Product" ADD COLUMN IF NOT EXISTS "imageUrls" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

-- Preserve the legacy single image value when it exists.
UPDATE "Product"
SET "imageUrls" = ARRAY["imageUrl"]
WHERE
    "imageUrl" IS NOT NULL
    AND "imageUrl" <> ''
    AND cardinality("imageUrls") = 0;

-- Keep the database aligned with the current Prisma schema.
ALTER TABLE "Product" DROP COLUMN IF EXISTS "imageUrl";
