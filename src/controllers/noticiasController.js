import noticiasModel from '../models/noticiasModel.js';
import prisma from "../lib/prisma.js";

export const criar = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: "Corpo da requisição vazio. Envie os dados!"
            });
        }

        const {
            titulo,
            resumo,
            conteudoCompleto,
            dataPublicacao,
            fonte,
            urlImagem,
            urlNoticia
        } = req.body;

        if (!titulo || typeof titulo !== "string" || !titulo.trim()) {
            return res.status(400).json({
                error: 'O campo "titulo" é obrigatório!'
            });
        }

        if (titulo.length > 100) {
            return res.status(400).json({
                error: "O título deve ter no máximo 100 caracteres!"
            });
        }

        if (!resumo || typeof resumo !== "string") {
            return res.status(400).json({
                error: 'O campo "resumo" é obrigatório!'
            });
        }

        if (!conteudoCompleto || typeof conteudoCompleto !== "string") {
            return res.status(400).json({
                error: 'O campo "conteudoCompleto" é obrigatório!'
            });
        }

        if (!dataPublicacao || isNaN(Date.parse(dataPublicacao))) {
            return res.status(400).json({
                error: 'O campo "dataPublicacao" deve ser uma data válida!'
            });
        }

        if (!fonte || typeof fonte !== "string") {
            return res.status(400).json({
                error: 'O campo "fonte" é obrigatório!'
            });
        }

        if (urlImagem != null && typeof urlImagem !== "string") {
            return res.status(400).json({
                error: 'O campo "urlImagem" deve ser um texto!'
            });
        }

        if (!urlNoticia || typeof urlNoticia !== "string") {
            return res.status(400).json({
                error: 'O campo "urlNoticia" é obrigatório!'
            });
        }

        const data = await prisma.noticia.create({
            data: {
                titulo: titulo.trim(),
                resumo,
                conteudoCompleto,
                dataPublicacao: new Date(dataPublicacao),
                fonte,
                urlImagem: urlImagem || null,
                urlNoticia
            }
        });

        return res.status(201).json({
            message: "Registro criado com sucesso!",
            data
        });

    } catch (error) {
        console.error("Erro ao criar:", error);

        if (error.code === "P2002") {
            return res.status(409).json({
                error: "Esta URL de notícia já está cadastrada."
            });
        }

        return res.status(500).json({
            error: "Erro interno ao salvar o registro."
        });
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

        return res.status(200).json({ data: noticia });
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
            noticia.titulo = req.body.titulo;
        }

        if (req.body.resumo !== undefined) {
            noticia.resumo = req.body.resumo;
        }

        if (req.body.conteudoCompleto !== undefined) {
            noticia.conteudoCompleto = req.body.conteudoCompleto;
        }

        if (req.body.dataPublicacao !== undefined) {
            noticia.dataPublicacao = req.body.dataPublicacao;
        }

        if (req.body.fonte !== undefined) {
            noticia.fonte = req.body.fonte;
        }

        if (req.body.urlNoticia !== undefined) {
            noticia.urlNoticia = req.body.urlNoticia;
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