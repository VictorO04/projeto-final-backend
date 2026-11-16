import { buscar, buscarPeloId, criar, deletar, atualizar } from "../models/correntesModel.js";

export const getCorrentes = async (req, res) => {
    const correntes = await buscar();

    res.json({
        total: correntes.length,
        correntes
    });
}

export const getCorrenteById = async (req, res) => {
    const id = Number(req.params.id);
    const corrente = await buscarPeloId(id);

    res.json({
        corrente
    });
}

export const postCorrente = async (req, res) => {
    const body = req.body;
    const corrente = await criar(body);

    res.status(201).json({
        mensagem: "Corrente filosófica criada com sucesso",
        corrente
    });
}

export const deleteCorrente = async (req, res) => {
    const id = Number(req.params.id);
    const corrente = await deletar(id);

    res.json({
        mensagem: "Corrente filosófica deletada com sucesso",
        corrente
    });
}

export const putCorrente = async (req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const [correnteAntiga, correnteAtualizada] = await atualizar(id, body);

    res.json({
        mensagem: "Corrente filosófica atualizada com sucesso",
        correnteAntiga,
        correnteAtualizada
    });
}