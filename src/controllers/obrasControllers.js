import obrasModel from '../models/obrasModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { titulo, resumo, tipo, dataPublicacao, dataComposicao, urlImagem } = req.body;

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
        if (!dataPublicacao || typeof dataPublicacao !== "DateTime") {
            return res.status(400).json({ error: 'O campo "Data de publicação" é obrigatório'});
        }
        if (!dataComposicao || typeof dataComposicao !== "DateTime") {
            return res.status(400).json({ error: 'O campo "Data de Composição" é obrigatório'});
        }
        if (urlImagem || typeof urlImagem !== 'string') {
            return res.status(400).json({ error: 'O campo "URL" é obrigatório!' });
        }

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
        const { id } = req.prams;

        if (isNaN(id)) {
            return res.status(400).json({ erro: 'O ID enviado não é um número válido.' });
        }

        const obra = await obrasModel.buscarPorId(parseInt(id));

        if (!obra) {
            return res.status(404).json({ erro: 'Registro não encontrado.' });
        }

        return res.status(200).json({ data: usuario });
    } catch (error) {
        console.error('Erro ao buscar:', error);
        return res.status(500).json({ error: 'Erro ao buscar registro.' });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'ID inválido.'});
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const obra = await obrasModel.buscarPorId(parseInt(id));

        if (!obra) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.titulo !== undefined) {
            usuario.titulo = req.body.titulo;
        }

        if (req.body.resumo !== undefined) {
            usuario.resumo = req.body.resumo;
        }

        if (req.body.tipo !== undefined) {
            usuario.tipo = req.body.tipo;
        }

        if (req.body.dataPublicacao !== undefined) {
            usuario.dataPublicacao = req.body.dataPublicacao;
        }

        if (req.body.dataComposicao !== undefined) {
            usuario.dataComposicao = req.body.dataComposicao;
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

        return res.status(200).json({ message: `O registro "${usurio.obra}" foi deletado com sucesso!` });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};