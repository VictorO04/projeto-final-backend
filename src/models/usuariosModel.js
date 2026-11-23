import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

export default class usuariosModel {
    constructor({ id = null, nome, email, senha } = {}) {
        this.id = id ? Number(id) : null;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    async criar() {
        const senhaHash = await bcrypt.hash(this.senha, 10);

        return prisma.usuario.create({
            data: {
                nome: this.nome,
                email: this.email,
                senha: senhaHash,
            },
            select: {
                id: true,
                nome: true,
                email: true,
                criadoEm: true,
                atualizadoEm: true,
            },
        });
    }

    static async buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.nome) {
            where.nome = {
                contains: String(filtros.nome),
                mode: "insensitive",
            };
        }

        if (filtros.email) {
            where.email = {
                contains: String(filtros.email),
                mode: "insensitive",
            };
        }

        return prisma.usuario.findMany({
            where,
            orderBy: { id: "asc" },
            select: {
                id: true,
                nome: true,
                email: true,
                criadoEm: true,
                atualizadoEm: true,
            },
        });
    }

    static async buscarPorId(id) {
        const idNumerico = Number(id);
        if (isNaN(idNumerico)) return null;

        const data = await prisma.usuario.findUnique({
            where: { id: idNumerico },
            select: {
                id: true,
                nome: true,
                email: true,
                criadoEm: true,
                atualizadoEm: true,
            },
        });

        if (!data) {
            return null;
        }

        return new usuariosModel(data);
    }

    async atualizar() {
        const dadosAtualizacao = {};

        if (this.nome !== undefined) {
            dadosAtualizacao.nome = this.nome;
        }

        if (this.email !== undefined) {
            dadosAtualizacao.email = this.email;
        }

        if (this.senha !== undefined && String(this.senha).trim() !== "") {
            dadosAtualizacao.senha = await bcrypt.hash(this.senha, 10);
        }

        return prisma.usuario.update({
            where: { id: Number(this.id) },
            data: dadosAtualizacao,
            select: {
                id: true,
                nome: true,
                email: true,
                criadoEm: true,
                atualizadoEm: true,
            },
        });
    }

    async deletar() {
        return prisma.usuario.delete({
            where: { id: Number(this.id) },
            select: {
                id: true,
                nome: true,
                email: true,
            },
        });
    }

    static async buscarPorEmailComSenha(email) {
        return prisma.usuario.findUnique({
            where: { email: String(email).trim().toLowerCase() },
        });
    }
}