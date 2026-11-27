import { prisma } from "../lib/prisma.js";
import AppError from "../utils/AppError.js";

export default class CorrentesFilosoficasModel {
    constructor(body) {
        if (!body || typeof body !== "object" || Array.isArray(body)) {
            throw new AppError("Corpo da requisição inválido", 400);
        }

<<<<<<< HEAD
        const { nome, descricao } = body;

        this.nome = nome;
=======
        const {id, nome, descricao} = body;

        this.id = id;
        this.nome = nome
>>>>>>> 2df086054de3b7e24f6412748a6b07ba76cb984b
        this.descricao = descricao;
    }

    static buscarTodos() {
<<<<<<< HEAD
        return prisma.correnteFilosofica.findMany();
    }

    static async buscarPorId() {
=======
        return prisma.correnteFilosofica.findMany({});
    }

    static async buscaPorId(id) {
>>>>>>> 2df086054de3b7e24f6412748a6b07ba76cb984b
        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("ID precisa ser um inteiro válido", 400);
        }

        const corrente = await prisma.correnteFilosofica.findUnique({
<<<<<<< HEAD
            where: { id }
=======
            where: { id },
>>>>>>> 2df086054de3b7e24f6412748a6b07ba76cb984b
        });
        
        if (!corrente) {
            throw new AppError(`Corrente filosófica com o ID ${id} não encontrado`, 404);
        }
        
        return corrente;
    }
<<<<<<< HEAD

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

        await FilosofosModel.validarNome(this.nome.trim());

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
            await FilosofosModel.validarNome(this.nome.trim(), id);
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
=======
>>>>>>> 2df086054de3b7e24f6412748a6b07ba76cb984b
}