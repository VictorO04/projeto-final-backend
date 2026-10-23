import { prisma } from "../lib/prisma.js";

export default class noticiasModel {
    constructor({ id = null, titulo, resumo, conteudoCompleto, dataPublicacao, fonte, urlImagem, urlNoticia } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.resumo = resumo;
        this.conteudoCompleto = conteudoCompleto;
        this.dataPublicacao = dataPublicacao;
        this.fonte = fonte;
        this.urlImagem = urlImagem;
        this.urlNoticia = urlNoticia;
    }

    async criar() {
        return prisma.noticia.create({
            data: {
                titulo: this.titulo,
                resumo: this.resumo,
                conteudoCompleto: this.conteudoCompleto,
                dataPublicacao: new Date(this.dataPublicacao),
                fonte: this.fonte,
                urlImagem: this.urlImagem,
                urlNoticia: this.urlNoticia
            },
        });
    }

    async atualizar() {
        return prisma.noticia.update({
            where: { id: this.id },
            data: { titulo: this.titulo, resumo: this.resumo, conteudoCompleto: this.conteudoCompleto, dataPublicacao: this.dataPublicacao ? new Date(this.dataPublicacao) : undefined, fonte: this.fonte, urlNoticia: this.urlNoticia },
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
        if (filtros.dataPublicacao !== undefined) {
            where.dataPublicacao = new Date(this.dataPublicacao)
        }
        if (filtros.fonte !== undefined) {
            where.fonte = filtros.fonte;
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