/*
  Warnings:

  - You are about to drop the column `areaEstudo` on the `filosofos` table. All the data in the column will be lost.
  - You are about to drop the column `correntePrincipal` on the `filosofos` table. All the data in the column will be lost.
  - You are about to drop the column `dataFalescimento` on the `filosofos` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `filosofos` table. All the data in the column will be lost.
  - You are about to drop the column `periodoHistorico` on the `filosofos` table. All the data in the column will be lost.
  - You are about to drop the column `urlImagem` on the `filosofos` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `filosofos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `filosofos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "filosofos" DROP COLUMN "areaEstudo",
DROP COLUMN "correntePrincipal",
DROP COLUMN "dataFalescimento",
DROP COLUMN "descricao",
DROP COLUMN "periodoHistorico",
DROP COLUMN "urlImagem",
ADD COLUMN     "biografia" TEXT,
ADD COLUMN     "correnteId" INTEGER,
ADD COLUMN     "dataFalecimento" TIMESTAMP(3),
ADD COLUMN     "imagem" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "correntes_filosoficas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "descricao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "correntes_filosoficas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "correntes_filosoficas_nome_key" ON "correntes_filosoficas"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "correntes_filosoficas_slug_key" ON "correntes_filosoficas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "filosofos_slug_key" ON "filosofos"("slug");

-- CreateIndex
CREATE INDEX "filosofos_correnteId_idx" ON "filosofos"("correnteId");

-- AddForeignKey
ALTER TABLE "filosofos" ADD CONSTRAINT "filosofos_correnteId_fkey" FOREIGN KEY ("correnteId") REFERENCES "correntes_filosoficas"("id") ON DELETE SET NULL ON UPDATE CASCADE;
