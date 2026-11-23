import obrasModel from '../models/obrasModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const {
            titulo,
            resumo,
            tipo,
            dataPublicacao,
            dataComposicao,
            urlImagem,
            filosofoId
        } = req.body;

        if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório' });
        }
        if (titulo.length > 100) {
            return res.status(400).json({ error: 'O titulo deve ter no máximo 100 caracteres (incluindo espaços)!'});
        }
        if (!resumo || typeof resumo !== 'string') {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        }
        if (!tipo || typeof tipo !== 'string') {
            return res.status(400).json({ error: 'O campo "tipo" é obrigatório!'});
        }
        if (dataPublicacao && isNaN(Date.parse(dataPublicacao))) {
            return res.status(400).json({ error: 'dataPublicacao deve ser uma data válida.' });
        }

        if (dataComposicao && isNaN(Date.parse(dataComposicao))) {
            return res.status(400).json({ error: 'dataComposicao deve ser uma data válida.' });
        }
        if (urlImagem !== undefined && urlImagem !== null && typeof urlImagem !== 'string') {
            return res.status(400).json({ error: 'urlImagem deve ser um texto.' });
        }
        if (!filosofoId || typeof filosofoId !== 'number' || filosofoId <= 0) {
            return res.status(400).json({ error: 'O campo "filosofoId" é obrigatório e deve ser um número positivo.' });
        }

        const obra = new obrasModel({
            titulo,
            resumo,
            tipo,
            dataPublicacao: dataPublicacao ? new Date(dataPublicacao) : null,
            dataComposicao: dataComposicao ? new Date(dataComposicao) : null,
            urlImagem,
            filosofoId
        });

        const data = await obra.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data});
    } catch (error) {
        console.error('Error ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await obrasModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(400).json({ message: 'Nenhum registro encontrado.' });
        }

        return res.status(200).json(registros); 
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registros.' });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ erro: 'O ID enviado não é um número válido.' });
        }

        const obra = await obrasModel.buscarPorId(parseInt(id));

        if (!obra) {
            return res.status(404).json({ erro: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: obra });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const obra = await obrasModel.buscarPorId(parseInt(id));

        if (!obra) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.titulo !== undefined) {
            obra.titulo = req.body.titulo;
        }

        if (req.body.resumo !== undefined) {
            obra.resumo = req.body.resumo;
        }

        if (req.body.tipo !== undefined) {
            obra.tipo = req.body.tipo;
        }

        if (req.body.dataPublicacao !== undefined) {
            obra.dataPublicacao = new Date(req.body.dataPublicacao);
        }

        if (req.body.dataComposicao !== undefined) {
            obra.dataComposicao = new Date(req.body.dataComposicao);
        }

        if (req.body.urlImagem !== undefined) {
            obra.urlImagem = req.body.urlImagem;
        }

        const data = await obra.atualizar();

        return res.status(200).json({ message: `O registro "${data.titulo}" foi atualizado com sucesso!`, data});
    } catch (error) {
        console.error('Erro ao atualizar:', error);
        return res.status(500).json({ error: 'Erro ao atualizar registro.' });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.' });
        }

        const obra = await obrasModel.buscarPorId(parseInt(id));

        if (!obra) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await obra.deletar();

        return res.status(200).json({ message: `O registro "${obra.titulo}" foi deletado com sucesso!` });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};