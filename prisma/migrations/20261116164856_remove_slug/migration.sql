/*
  Warnings:

  - You are about to drop the column `slug` on the `correntes_filosoficas` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `filosofos` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "correntes_filosoficas_slug_key";

-- DropIndex
DROP INDEX "filosofos_slug_key";

-- AlterTable
ALTER TABLE "correntes_filosoficas" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "filosofos" DROP COLUMN "slug";
