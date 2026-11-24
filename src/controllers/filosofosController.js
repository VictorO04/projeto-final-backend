import FilosofosModel from "../models/filosofosModel.js";

export const getAllFilosofos = async (req, res) => {
    const filosofos = await FilosofosModel.buscarTodos(req.query);

    res.json({
        total: filosofos.length,
        filosofos
    });
}

export const getFilosofoById = async (req, res) => {
    const id = Number(req.params.id);
    const filosofo = await FilosofosModel.buscaPorId(id);

    res.json({
        mensagem: `Filósofo com o ID ${id} encontrado`,
        filosofo
    });
}

export const deleteFilosofo = async (req, res) => {
    const id = Number(req.params.id);
    const filosofo = await FilosofosModel.deletar(id)

    res.json({
        mensagem: "Filósofo deletado com sucesso",
        filosofo
    });
}

export const postFilosofo = async (req, res) => {
    const filosofo = new FilosofosModel(req.body);
    const novoFilosofo = await filosofo.criar();
    
    res.status(201).json({
        mensagem: "Filósofo criado com sucesso",
        filosofo: novoFilosofo
    });
}

    
export const putFilosofo = async (req, res) => {
    const filosofo = new FilosofosModel(req.body);
    const id = Number(req.params.id);
    const { filosofoAntigo, filosofoNovo } = await filosofo.atualizar(id);
    
    res.json({
        mensagem: "Filósofo atualizado com sucesso",
        filosofoAntigo,
        filosofoNovo
    })
}