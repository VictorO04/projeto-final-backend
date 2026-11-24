import { prisma } from "../lib/prisma.js";
import AppError from "../utils/AppError.js";

export default class FilosofosModel {
    constructor (body) {
        if (!body || typeof body !== "object" || Array.isArray(body)) {
            throw new AppError("Corpo da requisição inválido", 400);
        }

        const { id = null, nome, biografia = null, dataNascimento = null, dataFalescimento = null, urlImagem = null,  } = body;

        this.id = id;
        this.nome = nome;
        this.biografia = biografia;
        this.dataNascimento = dataNascimento;
        this.dataFalescimento = dataFalescimento;
        this.urlImagem = urlImagem;
    }

    static buscarTodos() {
        return prisma.filosofo.findMany();
    }

    static async buscaPorId(id) {
        if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
            throw new AppError("ID precisa ser um inteiro válido", 400);
        }

        const filosofo = await prisma.filosofo.findUnique({
            where: { id }
        });
        
        if (!filosofo) {
            throw new AppError(`Filósofo com o ID ${id} não encontrado`, 404);
        }
        
        return filosofo;
    }

    static async deletar(id) {
        const filosofo = await FilosofosModel.buscaPorId(id);

        await prisma.filosofo.delete({
            where: { id }
        });

        return filosofo;
    }
}