import { prisma } from "../lib/prisma.js";

export default class noticiasModel {
    constructor({ id = null, titulo, resumo, conteudoCompleto, tipo, dataPublicacao, urlImagem, urlNoticia } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.resumo = resumo;
        this.conteudoCompleto = conteudoCompleto;
        this.tipo = tipo;
        this.dataPublicacao = dataPublicacao;
        this.urlImagem = urlImagem;
        this.urlNoticia = urlNoticia;
    }

    async criar() {

        // Verifica se já existe uma notícia com a mesma URL ou mesmo Título
        const noticiaDuplicada = await prisma.noticia.findFirst({
            where: {
                OR: [
                    { urlNoticia: urlNoticia.trim() },
                    { titulo: { equals: titulo.trim(), mode: 'insensitive' } }
                ]
            }
        });

        if (noticiaDuplicada) {
            return res.status(409).json({
                error: "Conflito: já existe uma notícia cadastrada com este título ou URL."
            });
        }

        const data = await prisma.noticia.create({
            data: {
                titulo: titulo.trim(),
                resumo,
                conteudoCompleto,
                tipo: tipo.trim(),
                dataPublicacao: new Date(dataPublicacao),
                urlImagem: urlImagem || null,
                urlNoticia: urlNoticia.trim()
            }
        });

        return prisma.noticia.create({
            data: {
                titulo: this.titulo,
                resumo: this.resumo,
                conteudoCompleto: this.conteudoCompleto,
                tipo: this.tipo,
                dataPublicacao: new Date(this.dataPublicacao),
                urlImagem: this.urlImagem,
                urlNoticia: this.urlNoticia
            },
        });
    }

    async atualizar() {

        if (req.body.titulo || req.body.urlNoticia) {
            const condicoes = [];

            if (req.body.urlNoticia) {
                condicoes.push({ urlNoticia: req.body.urlNoticia.trim() });
            }
            if (req.body.titulo) {
                condicoes.push({ titulo: { equals: req.body.titulo.trim(), mode: 'insensitive' } });
            }

            const conflito = await prisma.noticia.findFirst({
                where: {
                    AND: [
                        { NOT: { id: parseInt(id) } },
                        { OR: condicoes }
                    ]
                }
            });

            if (conflito) {
                return res.status(409).json({
                    error: "Conflito: já existe outra notícia cadastrada com este título ou URL."
                });
            }
        }

        return prisma.noticia.update({
            where: { id: this.id },
            data: {
                titulo: this.titulo,
                resumo: this.resumo,
                conteudoCompleto: this.conteudoCompleto,
                tipo: this.tipo,
                dataPublicacao: this.dataPublicacao ? new Date(this.dataPublicacao) : undefined,
                urlImagem: this.urlImagem,
                urlNoticia: this.urlNoticia
            },
        });
    }

    async deletar() {
        return prisma.noticia.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.resumo !== undefined) {
            where.resumo = filtros.resumo;
        }
        if (filtros.conteudoCompleto !== undefined) {
            where.conteudoCompleto = filtros.conteudoCompleto;
        }
        if (filtros.tipo !== undefined) {
            where.tipo = filtros.tipo;
        }
        if (filtros.dataPublicacao !== undefined) {
            where.dataPublicacao = new Date(filtros.dataPublicacao);
        }
        if (filtros.urlImagem !== undefined) {
            where.urlImagem = filtros.urlImagem;
        }
        if (filtros.urlNoticia !== undefined) {
            where.urlNoticia = filtros.urlNoticia;
        }

        return prisma.noticia.findMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.noticia.findUnique({ where: { id } });
        if (!data) {
            return null;
        }
        return new noticiasModel(data);
    }
}