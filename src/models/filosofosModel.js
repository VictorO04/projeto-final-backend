import { prisma } from "../lib/prisma.js";
import AppError from "../utils/AppError.js";

export const buscarFilosofos = () => {
    return prisma.filosofo.findMany();
}

export const buscarFilosofoPorId = async (id) => {
    if (id <= 0 || isNaN(id) || !Number.isInteger(id)) {
        throw new AppError("O ID precisa ser um número inteiro positivo", 400);
    }

    const filosofo = await prisma.filosofo.findUnique({
        where: {
            id: id
        }
    });

    if (!filosofo) {
        throw new AppError(`Filosofo com o ID ${id} não encontrado`, 404);
    }

    return filosofo;
}

export const criarFilosofo = async (body) => {
    
    if (!body) {
        throw new AppError("O corpo da requisição está faltando", 400);
    }

    const { nome, descricao, periodoHistorico, areaEstudo, correntePrincipal, dataNascimento, dataFalescimento, urlImagem } = body;
    
    const camposFaltando = [
        !nome && "nome",
        !descricao && "descricao",
        !periodoHistorico && "periodoHistorico",
        !areaEstudo && "areaEstudo",
        !correntePrincipal && "correntePrincipal"
    ].filter(Boolean);
    
    if (camposFaltando.length > 0) {
        throw new AppError(`Digite todos os campos obrigatórios: ${camposFaltando.join(", ")}`, 400);
    }

    const camposString = ["nome", "descricao", "periodoHistorico", "areaEstudo", "correntePrincipal"];

    if (typeof nome !== "string" || typeof descricao !== "string" || typeof periodoHistorico !== "string" || typeof areaEstudo !== "string" || typeof correntePrincipal !== "string") {
        throw new AppError(`Os campos ${camposString.join(", ")} precisam ser do tipo string`, 400);
    }

    if (dataNascimento !== undefined && (typeof dataNascimento !== "string" || isNaN(Date.parse(dataNascimento)))) {
        throw new AppError("O campo dataNascimento precisa ser do tipo data", 400);
    }

    if (dataFalescimento !== undefined && (typeof dataFalescimento !== "string" || isNaN(Date.parse(dataFalescimento)))) {
        throw new AppError("O campo dataFalescimento precisa ser do tipo data", 400);
    }

    const periodosHistoricos = ["antiguidade", "idade média", "renascimento", "idade moderna", "idade contemporânea"];
    const periodoNormalizado = periodoHistorico.trim().toLowerCase();
    const periodoValido = periodosHistoricos.includes(periodoNormalizado);

    if (!periodoValido) {
        throw new AppError(`Periodos históricos permitidos: ${periodosHistoricos.join(", ")}`, 400);
    }

    return await prisma.filosofo.create({
        data: {
            ...body,
            periodoHistorico: periodoNormalizado
        }
    });
}

export const deletarFilosofo = async (id) => {
    if (id <= 0 || isNaN(id) || !Number.isInteger(id)) {
        throw new AppError("O ID precisa ser um número inteiro positivo", 400);
    }

    const filosofo = await prisma.filosofo.findUnique({
        where: {
            id: id
        }
    });

    if (!filosofo) {
        throw new AppError(`Filosofo com o ID ${id} não encontrado`, 404);
    }

    await prisma.filosofo.delete({
        where: {
            id: id
        }
    });

    return filosofo;
}