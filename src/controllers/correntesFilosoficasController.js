import CorrentesFilosoficasModel from "../models/CorrentesFilosoficasModel.js";

export const getAllCorrentes = async (req, res) => {
    const correntesFilosoficas = await CorrentesFilosoficasModel.buscarTodos();

    res.json({
        total: correntesFilosoficas.length,
        correntesFilosoficas
    });
}

export const getCorrenteById = async (req, res) => {
    const id = Number(req.params.id);
    const correnteFilosofica = await CorrentesFilosoficasModel.buscaPorId(id);

    res.json({
        mensagem: `Corrente filosófica com o ID ${id} encontrada`,
        correnteFilosofica
    });
}