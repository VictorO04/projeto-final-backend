import CorrentesFilosoficasModel from "../models/CorrentesFilosoficasModel.js";

export const getAllCorrentes = async (req, res) => {
<<<<<<< HEAD
    const correntes = await CorrentesFilosoficasModel.buscarTodos(req.query);

    res.json({
        total: correntes.length,
        correntes
=======
    const correntesFilosoficas = await CorrentesFilosoficasModel.buscarTodos();

    res.json({
        total: correntesFilosoficas.length,
        correntesFilosoficas
>>>>>>> 2df086054de3b7e24f6412748a6b07ba76cb984b
    });
}

export const getCorrenteById = async (req, res) => {
    const id = Number(req.params.id);
<<<<<<< HEAD
    const corrente = await CorrentesFilosoficasModel.buscaPorId(id);

    res.json({
        mensagem: `Corrente filosófica com o ID ${id} encontrado`,
        corrente
    });
}

export const deleteCorrente = async (req, res) => {
    const id = Number(req.params.id);
    const corrente = await CorrentesFilosoficasModel.deletar(id)

    res.json({
        mensagem: "Corrente filosófica deletada com sucesso",
        corrente
    });
}

export const postCorrente = async (req, res) => {
    const corrente = new CorrentesFilosoficasModel(req.body);
    const novacorrente = await corrente.criar();
    
    res.status(201).json({
        mensagem: "Corrente filosófica criada com sucesso",
        corrente: novacorrente
    });
}

    
export const putCorrente = async (req, res) => {
    const corrente = new CorrentesFilosoficasModel(req.body);
    const id = Number(req.params.id);
    const { correnteAntiga, correnteNova } = await corrente.atualizar(id);
    
    res.json({
        mensagem: "Corrente filosófica atualizado com sucesso",
        correnteAntiga,
        correnteNova
    })
=======
    const correnteFilosofica = await CorrentesFilosoficasModel.buscaPorId(id);

    res.json({
        mensagem: `Corrente filosófica com o ID ${id} encontrada`,
        correnteFilosofica
    });
>>>>>>> 2df086054de3b7e24f6412748a6b07ba76cb984b
}