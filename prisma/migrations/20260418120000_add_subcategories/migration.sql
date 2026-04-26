-- CreateTable
CREATE TABLE "SubCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SubCategory_pkey" PRIMARY KEY ("id")
);

-- Seed one default sub-category for each existing category so current products keep working.
INSERT INTO "SubCategory" ("id", "name", "slug", "categoryId", "createdAt", "updatedAt")
SELECT
    'default-' || "id",
    'General',
    'general',
    "id",
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM "Category";

-- AddColumn
ALTER TABLE "Product" ADD COLUMN "subCategoryId" TEXT;

-- Backfill products into their category's default sub-category.
UPDATE "Product"
SET "subCategoryId" = 'default-' || "categoryId"
WHERE "categoryId" IS NOT NULL;

-- Make the new relation required after backfill.
ALTER TABLE "Product" ALTER COLUMN "subCategoryId" SET NOT NULL;

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- DropIndex
DROP INDEX "Product_categoryId_idx";

-- DropColumn
ALTER TABLE "Product" DROP COLUMN "categoryId";

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_categoryId_name_key" ON "SubCategory"("categoryId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_categoryId_slug_key" ON "SubCategory"("categoryId", "slug");

-- CreateIndex
CREATE INDEX "SubCategory_categoryId_idx" ON "SubCategory"("categoryId");

-- CreateIndex
CREATE INDEX "Product_subCategoryId_idx" ON "Product"("subCategoryId");

-- AddForeignKey
ALTER TABLE "SubCategory" ADD CONSTRAINT "SubCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
