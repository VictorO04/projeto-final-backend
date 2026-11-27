import {
  buscar,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  responderQuestao,
  corrigirSimulado,
} from "../models/questoesModel.js";

export const getQuestoes = async (req, res) => {
  const questoes = await buscar(req.query);

  res.json({
    total: questoes.length,
    questoes,
  });
};

export const getQuestaoId = async (req, res) => {
  const id = Number(req.params.id);
  const questao = await buscarPorId(id);

  res.json({
    questao,
  });
};

export const postQuestao = async (req, res) => {
  const novaQuestao = await criar(req.body);

  res.status(201).json({
    message: "Questão criada com sucesso",
    questao: novaQuestao,
  });
};

export const putQuestao = async (req, res) => {
  const id = Number(req.params.id);
  const questao = await atualizar(id, req.body);

  res.json({
    message: "Questão atualizada com sucesso",
    questao,
  });
};

export const deleteQuestao = async (req, res) => {
  const id = Number(req.params.id);
  await deletar(id);

  res.status(204).send();
};

export const postResponderQuestao = async (req, res) => {
  const id = Number(req.params.id);
  const { resposta } = req.body;
  const resultado = await responderQuestao(id, resposta);

  res.json({ resultado });
};

export const postCorrigirSimulado = async (req, res) => {
  const { respostas } = req.body;
  const resultado = await corrigirSimulado(respostas);

  res.json({ resultado });
};