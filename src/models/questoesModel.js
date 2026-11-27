import { prisma } from "../lib/prisma.js";
import AppError from "../utils/AppError.js";

const ALTERNATIVAS_VALIDAS = ["A", "B", "C", "D", "E"];

export const buscar = (filtros = {}) => {
  const { banca, ano } = filtros;

  return prisma.questao.findMany({
    where: {
    ...(banca && { banca: { contains: banca, mode: 'insensitive' } }),
    ...(ano && { ano: Number(ano) }),
    },
    orderBy: { criadoEm: "desc" },
  });
};

export const buscarPorId = async (id) => {
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError("ID precisa ser um inteiro válido", 400);
  }

  const questao = await prisma.questao.findUnique({
    where: { id },
  });

  if (!questao);
};


export const criar = async (dados) => {
  const {
    enunciado,
    banca,
    ano,
    alternativaA,
    alternativaB,
    alternativaC,
    alternativaD,
    alternativaE,
    correta,
  } = dados;

  if (!enunciado || !alternativaA || alternativaB || alternativaC || alternativaD || !correta) {
    throw new AppError(
      "Enunciado, alternativas A, B, C, D, e a alternativa correta são obrigatórias", 400
    );
  }

  const letraCorreta = String(correta).trim().toUpperCase();
  if (!ALTERNATIVAS_VALIDAS.includes(letraCorreta)) {
    throw new AppError("A alternativa correta deve ser A, B, C, D, ou E", 400);
  }

  if (letraCorreta === "E" && !alternativaE) {
    throw new AppError("Não é possível marcar 'E' como correta sem preencher a alternativaE", 400)
  }

  return prisma.questao.create({
    data: {
      enunciado,
      banca: banca || null,
      ano: ano ? Number(ano) : null,
      alternativaA,
      alternativaB,
      alternativaC,
      alternativaD,
      alternativaE: alternativaE || null,
      correta: letraCorreta,
    },
  });
};

export const atualizar = async (id, dados) => {
  const existe = await buscarPorId(id);

  let letraCorreta = existe.correta;
  if (dados.correta !== undefined) {
    letraCorreta = String(dados.correta).trim().toUpperCase();
    if (!ALTERNATIVAS_VALIDAS.includes(letraCorreta)) {
      throw new AppError("A alternativa correta deve ser A, B, C, D ou E", 400);
    }
  }

  return prisma.questao.update({
    where: { id },
    data: {
      enunciado: dados.enunciado ?? existe.enunciado,
      banca: dados.banca !== undefined ? dados.banca : existe.banca,
      ano: dados.ano !== undefined ? (dados.ano ? Number(dados.ano) : null) : existe.ano,
      alternativaA: dados.alternativaA ?? existe.alternativaA,
      alternativaA: dados.alternativaB ?? existe.alternativaB,
      alternativaA: dados.alternativaC ?? existe.alternativaC,
      alternativaA: dados.alternativaD ?? existe.alternativaD,
      alternativaA: dados.alternativaE !== undefined ? dados.alternativaE : existe.alternativaE,
      correta: letraCorreta,
    },
  });
};

export const deletar = async (id) => {
  await buscarPorId(id);
  return prisma.questao.delete({ where: { id } });
};

export const reponderQuestao = async (id, resposta) => {
  const questao = await buscarPorId(id);

  if (!resposta) {
    throw new AppError("Envie a letra da alternativa escolhida (A, B, C, D ou E)", 400);
  }

  const letraEnviada = String(resposta).trim().toUpperCase();
  const acertou = letraEnviada === questao.correta.toUpperCase();

  return {
    questaoId: questao.id,
    acertou,
    respostaEnviada: letraEnviada,
    correta: questao.correta,
  };
};

export const corrigirSimulado = async (respostasUsuario) => {
  if (!Array.isArray(respostasUsuario) || respostasUsuario.length === 0) {
    throw new AppError("Envie uma lista de respostas válidas", 400);
  }

  const ids = respostasUsuario.map((r) => Number(r.questaoId));
  const questoesBanco = await prisma.questao.findMany({
    where: { id: { in: ids } },
  });

  let acertos = 0;

  const detalhes = respostasUsuario.map((item) => {
    const questao = questoesBanco.find((q) => q.id === Number(item.questaoId));
    if (!questao) {
      return {
        questaoId: item.questaoId,
        erro: "Questão não encontrada",
        acertou: false,
      };
    }

    const letraEnviada = String(item.resposta || "").trim().toUpperCase();
    const acertou = letraEnviada === questao.correta.toUpperCase();
    if (acertou) acertos++;

    return {
      questaoId: questao.id,
      acertou,
      respostaEnviada: letraEnviada,
      correta: questao.correta,
    };
  });

  const total = respostasUsuario.length;

  return {
    totalQuestoes: total,
    acertos,
    erros: total - acertos,
    porcentagem: Math.round((acertos / total) * 100),
  };
};