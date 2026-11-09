import prisma from '../lib/prisma.js';
import { PrismaClient } from '../../prisma/generated/prisma/index.js';

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
        const registros = await prisma.noticia.findMany();

        if (!registros || registros.length === 0) {
            return res.status(404).json({ message: 'Nenhum registro encontrado.' });
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

        const noticia = await prisma.noticia.findUnique({
            where: { id: parseInt(id) }
        });

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

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'Corpo da requisição vazio. Envie os dados!' });
        }

        const noticiaExiste = await prisma.noticia.findUnique({
            where: { id: parseInt(id) }
        });

        if (!noticiaExiste) {
            return res.status(404).json({ error: 'Registro não encontrado para atualizar.' });
        }

        const dataAtualizada = await prisma.noticia.update({
            where: { id: parseInt(id) },
            data: {
                ...(req.body.titulo && { titulo: req.body.titulo }),
                ...(req.body.resumo && { resumo: req.body.resumo }),
                ...(req.body.conteudoCompleto && { conteudoCompleto: req.body.conteudoCompleto }),
                ...(req.body.dataPublicacao && { dataPublicacao: new Date(req.body.dataPublicacao) }),
                ...(req.body.fonte && { fonte: req.body.fonte }),
                ...(req.body.urlImagem !== undefined && { urlImagem: req.body.urlImagem }),
                ...(req.body.urlNoticia && { urlNoticia: req.body.urlNoticia }),
            }
        });

        return res.status(200).json({ 
            message: `O registro "${dataAtualizada.titulo}" foi atualizado com sucesso!`, 
            data: dataAtualizada 
        });
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

        const noticia = await prisma.noticia.findUnique({
            where: { id: parseInt(id) }
        });

        if (!noticia) {
            return res.status(404).json({ error: 'Registro não encontrado para deletar.' });
        }

        await prisma.noticia.delete({
            where: { id: parseInt(id) }
        });

        return res.status(200).json({ 
            message: `O registro "${noticia.titulo}" foi deletado com sucesso!`, 
            deletado: noticia.titulo 
        });
    } catch (error) {
        console.error('Erro ao deletar:', error);
        return res.status(500).json({ error: 'Erro ao deletar registro.' });
    }
};