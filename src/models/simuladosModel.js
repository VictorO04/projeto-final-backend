import { prisma } from "../lib/prisma.js";
import AppError from "../utils/AppError.js";

export const buscar = () => {
  return prisma.simulado.findMany({
    where: { publicado: true },
    orderBy: { criadoEm: "desc" },
    include: {
      _count: {
        select: { questoes: true },
      },
    },
  });
};

export const buscarPeloId = async (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("ID precisa ser um inteiro válido", 400);
  }

  const simulado = await prisma.simulado.findFirst({
    where: { id, publicado: true },
    include: {
      questoes: {
        orderBy: { ordem: "asc" },
        include: {
          questao: {
            select: {
              id: true,
              enunciado: true,
              textoBase: true,
              fonteTexto: true,
              urlImagem: true,
              banca: true,
              ano: true,
              dificuldade: true,
              explicacao: true,
              filosofo: { select: { id: true, nome: true } },
              corrente: { select: { id: true, nome: true } },
              obra: { select: { id: true, titulo: true } },
              alternativas: {
                select: {
                  id: true,
                  texto: true,
                  correta: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!simulado) {
    throw new AppError(`Simulado com o ID ${id} não encontrado`, 404);
  }

  return simulado;
};
