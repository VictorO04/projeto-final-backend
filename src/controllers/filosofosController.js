import * as filosofosModel from "../models/filosofosModel.js";

export const getFilosofos = async (req, res) => {
    const filosofos = await filosofosModel.buscarFilosofos();

    res.json({
        total: filosofos.length,
        filosofos
    });
}

export const getFilosofoPeloId = async (req, res) => {
    const id = Number(req.params.id);
    
    const filosofo = await filosofosModel.buscarFilosofoPorId(id);

    res.json({
        filosofo
    });
}

export const postFilosofos = async (req, res) => {
    const filosofo = await filosofosModel.criarFilosofo(req.body);

    res.status(201).json({
        mensagem: "Filósofo criado com sucesso",
        filosofo
    });
}