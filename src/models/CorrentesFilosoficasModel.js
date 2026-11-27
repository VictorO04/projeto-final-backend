import { prisma } from "../lib/prisma.js";
import AppError from "../utils/AppError.js";

export default class CorrentesFilosoficasModel {
    constructor(body) {
        if (!body || typeof body !== "object" || Array.isArray(body)) {
            throw new AppError("Corpo da requisição inválido", 400);
        }

        const {id, nome, descricao} = body;

        this.id = id;
        this.nome = nome
        this.descricao = descricao;
    }

    static buscarTodos() {
        return prisma.correnteFilosofica.findMany({});
    }

    static async buscaPorId(id) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("ID precisa ser um inteiro válido", 400);
        }

        const corrente = await prisma.correnteFilosofica.findUnique({
            where: { id },
        });
        
        if (!corrente) {
            throw new AppError(`Corrente filosófica com o ID ${id} não encontrado`, 404);
        }
        
        return corrente;
    }
}