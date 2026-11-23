-- CreateTable
CREATE TABLE "noticias" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "conteudoCompleto" TEXT NOT NULL,
    "dataPublicacao" TIMESTAMPTZ(3) NOT NULL,
    "tipo" TEXT NOT NULL,
    "urlImagem" TEXT,
    "urlNoticia" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "noticias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "correntes_filosoficas" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "correntes_filosoficas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filosofos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "biografia" TEXT,
    "dataNascimento" TIMESTAMP(3),
    "dataFalecimento" TIMESTAMP(3),
    "urlImagem" TEXT,
    "correnteId" INTEGER,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "filosofos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obras" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataPublicacao" DATE,
    "dataComposicao" DATE,
    "urlImagem" TEXT,
    "filosofoId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "obras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "banner" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "noticias_urlNoticia_key" ON "noticias"("urlNoticia");

-- CreateIndex
CREATE INDEX "noticias_dataPublicacao_idx" ON "noticias"("dataPublicacao");

-- CreateIndex
CREATE INDEX "noticias_tipo_idx" ON "noticias"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "correntes_filosoficas_nome_key" ON "correntes_filosoficas"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "filosofos_nome_key" ON "filosofos"("nome");

-- CreateIndex
CREATE INDEX "filosofos_correnteId_idx" ON "filosofos"("correnteId");

-- CreateIndex
CREATE INDEX "obras_filosofoId_idx" ON "obras"("filosofoId");

-- CreateIndex
CREATE INDEX "obras_tipo_idx" ON "obras"("tipo");

-- AddForeignKey
ALTER TABLE "filosofos" ADD CONSTRAINT "filosofos_correnteId_fkey" FOREIGN KEY ("correnteId") REFERENCES "correntes_filosoficas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obras" ADD CONSTRAINT "obras_filosofoId_fkey" FOREIGN KEY ("filosofoId") REFERENCES "filosofos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
