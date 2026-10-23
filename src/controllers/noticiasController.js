import noticiasModel from '../models/noticiasModel.js';

export const criar = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const { titulo, resumo, conteudoCompleto, dataPublicacao, fonte, urlImagem, urlNoticia } = req.body;

        if (!titulo || typeof titulo !== 'string' || !titulo.trim()) {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        }
        if (titulo.length > 100) {
            return res.status(400).json({ error: 'O titulo deve ter no máximo 100 caracteres (incluindo espaços)!' });
        }

        if (!resumo || typeof resumo !== 'string') {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        }

        if (!conteudoCompleto || typeof conteudoCompleto !== 'string') {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        }
        if (!dataPublicacao || typeof dataPublicacao !== 'DateTime') {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        }
        if (!fonte || typeof fonte !== 'string') {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        }
        if (urlImagem || typeof urlImagem !== 'string') {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        }
        if (!urlNoticia || typeof urlNoticia !== 'string') {
            return res.status(400).json({ error: 'O campo "titulo" é obrigatório!' });
        }
        
        const data = await noticia.criar();

        return res.status(201).json({ message: 'Registro criado com sucesso!', data });
    } catch (error) {

        console.error('Erro ao criar:', error);
        return res.status(500).json({ error: 'Erro interno ao salvar o registro.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await noticiasModel.buscarTodos(req.query);

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
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const noticia = await noticiasModel.buscarPorId(parseInt(id));

        if (!noticia) {
            return res.status(404).json({ error: 'Registro não encontrado.' });
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
            return res.status(400).json({ error: 'ID inválido.' });
        }

        if (!req.body) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const noticia = await noticiasModel.buscarPorId(parseInt(id));

        if (!noticia) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        if (req.body.titulo !== undefined) {
            usuario.titulo = req.body.titulo;
        }

        if (req.body.resumo !== undefined) {
            usuario.resumo = req.body.resumo;
        }

        if (req.body.conteudoCompleto !== undefined) {
            usuario.conteudoCompleto = req.body.conteudoCompleto;
        }

        if (req.body.dataPublicacao !== undefined) {
            usuario.dataPublicacao = req.body.dataPublicacao;
        }

        if (req.body.fonte !== undefined) {
            usuario.fonte = req.body.fonte;
        }

        if (req.body.urlNoticia !== undefined) {
            usuario.urlNoticia = req.body.urlNoticia;
        }

        const data = await noticia.atualizar();

        return res.status(200).json({ message: `O registro "${data.titulo}" foi atualizado com sucesso!`, data });
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

        const noticia = await noticiasModel.buscarPorId(parseInt(id));

        if (!noticia) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await noticia.deletar();

        return res.status(200).json({ message: `O registro "${usuario.noticia}" foi deletado com sucesso!`, deletado: titulo });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};