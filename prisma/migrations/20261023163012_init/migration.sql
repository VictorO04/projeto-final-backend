-- CreateTable
CREATE TABLE "noticias" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "conteudoCompleto" TEXT NOT NULL,
    "dataPublicacao" TIMESTAMP(3) NOT NULL,
    "fonte" TEXT NOT NULL,
    "urlImagem" TEXT,
    "urlNoticia" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "noticias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filosofos" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "periodoHistorico" TEXT NOT NULL,
    "areaEstudo" TEXT NOT NULL,
    "correntePrincipal" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3),
    "dataFalescimento" TIMESTAMP(3),
    "urlImagem" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filosofos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obras" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "resumo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "dataPublicacao" TIMESTAMP(3),
    "dataComposicao" TIMESTAMP(3),
    "urlImagem" TEXT,
    "filosofoId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "obras_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "noticias_urlNoticia_key" ON "noticias"("urlNoticia");

-- CreateIndex
CREATE UNIQUE INDEX "filosofos_nome_key" ON "filosofos"("nome");

-- AddForeignKey
ALTER TABLE "obras" ADD CONSTRAINT "obras_filosofoId_fkey" FOREIGN KEY ("filosofoId") REFERENCES "filosofos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
