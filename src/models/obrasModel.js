import prisma from '../lib/services/prismaClient.js';

export default class obrasModel {
    constructor({ id = null, titulo, resumo, tipo, dataPublicacao, dataComposicao, urlImagem } = {}) {
        this.id = id;
        this.titulo = titulo;
        this.resumo = resumo;
        this.tipo = tipo;
        this.dataPublicacao = dataPublicacao;
        this.dataComposicao = dataComposicao;
        this.urlImagem = urlImagem;
    }

    async criar() {
        return prisma.obra.create({
            data: {
                titulo: this.titulo,
                resumo: this.resumo,
                tipo: this.tipo,
                dataPublicacao: this.dataPublicacao,
                dataComposicao: this.dataComposicao,
            },
        });
    }

    async atualizar() {
        return prisma.obra.update({
            where: { id: this.id },
            data: { titulo: this.titulo, resumo: this.resumo, tipo: this.tipo, dataPublicacao: this.dataPublicacao, dataComposicao: this.dataComposicao },
        });
    }

    async deletar() {
        return prisma.usuario.delete({ where: { id: this.id } });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.titulo) {
            where.titulo = { contains: filtros.titulo, mode: 'insensitive' };
        }
        if (filtros.resumo !== undefined) {
            where.resumo = filtros.resumo;
        }
        if (filtros.tipo !== undefined) {
            where.tipo = filtros.tipo;
        }
        if (filtros.dataPublicacao !== undefined) {
            where.dataPublicacao = filtros.dataPublicacao;
        }
        if (filtros.dataComposicao !== undefined) {
            where.dataComposicao = filtros.dataComposicao;
        }

        return prisma.obra.fidMany({ where });
    }

    static async buscarPorId(id) {
        const data = await prisma.obra.findUnique({ where: {id} });
        if (!data) {
            return null;
        }
        return new obrasModel(data);
    }
} 