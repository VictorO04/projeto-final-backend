import FilosofosModel from "../models/filosofosModel";

export const getAllFilosofos = async (req, res) => {
    const filosofos = await FilosofosModel.buscarTodos();

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