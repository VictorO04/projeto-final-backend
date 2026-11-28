import { prisma } from "../lib/prisma.js";
import AppError from "../utils/AppError.js";

export default class CorrentesFilosoficasModel {
    constructor(body) {
        if (!body || typeof body !== "object" || Array.isArray(body)) {
            throw new AppError("Corpo da requisição inválido", 400);
        }

        const { nome, descricao } = body;

        this.nome = nome;
        this.descricao = descricao;
    }

    static buscarTodos() {
        return prisma.correnteFilosofica.findMany();
    }

    static async buscarPorId(id) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("ID precisa ser um inteiro válido", 400);
        }

        const corrente = await prisma.correnteFilosofica.findUnique({
            where: { id }
        });
        
        if (!corrente) {
            throw new AppError(`Corrente filosófica com o ID ${id} não encontrado`, 404);
        }
        
        return corrente;
    }

    static async deletar(id) {
        const corrente = await CorrentesFilosoficasModel.buscarPorId(id);

        await prisma.correnteFilosofica.delete({
            where: { id }
        });

        return corrente;
    }

    async criar() {
        if (typeof this.nome !== "string" || !this.nome.trim()) {
            throw new AppError("Nome é obrigatório e precisa ser um texto", 400);
        }

        await CorrentesFilosoficasModel.validarNome(this.nome.trim());

        if (this.descricao !== undefined && this.descricao !== null) {
            if (typeof this.descricao !== "string" || !this.descricao.trim()) {
                throw new AppError("Descrição precisa ser um texto e não pode ser vazio", 400);
            }
        }

        const corrente = await prisma.correnteFilosofica.create({
            data: {
                nome: this.nome.trim(),
                descricao: this.descricao?.trim() ?? null
            }
        });

        return corrente;
    }

    async atualizar(id) {
        if (this.nome !== undefined) {
            if (typeof this.nome !== "string" || !this.nome.trim()) {
                throw new AppError("Nome é obrigatório e precisa ser um texto", 400);
            }
            await CorrentesFilosoficasModel.validarNome(this.nome.trim(), id);
        }
        if (this.descricao !== undefined && this.descricao !== null) {
            if (typeof this.descricao !== "string" || !this.descricao.trim()) {
                throw new AppError("Descrição precisa ser um texto e não pode ser vazio", 400);
            }
        }

        const correnteAntiga = await CorrentesFilosoficasModel.buscarPorId(id);
        const correnteNova = await prisma.correnteFilosofica.update({
            where: { id },
            data: {
                nome: this.nome?.trim(),
                descricao: this.descricao === null ? null : this.descricao?.trim(),
            }
        });

        return { correnteAntiga, correnteNova };
    }

    static async validarNome(nome, id = undefined) {
        const corrente = await prisma.correnteFilosofica.findUnique({
            where: { nome }
        });
    
        if (corrente && corrente.id !== id) {
            throw new AppError("Já existe uma corrente filosófica com esse nome", 409);
        }
    }
}