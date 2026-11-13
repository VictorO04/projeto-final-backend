-- CreateTable
CREATE TABLE "videos" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "banner" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);
