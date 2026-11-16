import { prisma } from "../lib/prisma.js";
import AppError from "../utils/AppError.js";

export const buscar = () => {
    return prisma.correnteFilosofica.findMany();
}

export const buscarPeloId = async (id) => {
    if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
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

const validarNomeUnico = async (nome, idIgnorado = null) => {
    const corrente = await prisma.correnteFilosofica.findUnique({
        where: {
            nome: nome.trim()
        }
    });

    if (corrente && corrente.id !== idIgnorado) {
        throw new AppError(`Corrente filosófica com o nome ${nome} já existe`, 400);
    }
}

export const criar = async (body) => {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw new AppError("Corpo da requisição não pode ser vazio", 400);
    }

    const { nome, descricao } = body;

    if (typeof nome !== "string") {
        throw new AppError("Nome é um campo obrigatório e precisa ser um texto", 400);
    }

    if (!nome.trim()) {
        throw new AppError("Nome não pode ser um texto vazio", 400);
    }

    await validarNomeUnico(nome);

    if (descricao !== undefined) {
        if (typeof descricao !== "string") {
            throw new AppError("Descrição precisa ser um texto", 400);
        }

        if (!descricao.trim()) {
            throw new AppError("Descrição não pode ser um texto vazio", 400);
        }
    }

    const novaCorrente = await prisma.correnteFilosofica.create({
        data: {
            nome: nome.trim(),
            descricao: descricao ? descricao.trim() : null
        }
    });

    return novaCorrente;
}

export const deletar = async (id) => {
    const correnteDeletada = await buscarPeloId(id);

    await prisma.correnteFilosofica.delete({
        where: {
            id: id
        }
    });

    return correnteDeletada;
}

export const atualizar = async (id, body) => {
    const correnteAntiga = await buscarPeloId(id);
        
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw new AppError("Corpo da requisição não pode ser vazio", 400);
    }

    const { nome, descricao } = body;
    
    if (nome !== undefined) {
        if (typeof nome !== "string") {
            throw new AppError("Nome é um campo obrigatório e precisa ser um texto", 400);
        }
        
        if (!nome.trim()) {
            throw new AppError("Nome não pode ser um texto vazio", 400);
        }

        await validarNomeUnico(nome);
    }
    
    if (descricao !== undefined) {
        if (typeof descricao !== "string") {
            throw new AppError("Descrição precisa ser um texto", 400);
        }
        
        if (!descricao.trim()) {
            throw new AppError("Descrição não pode ser um texto vazio", 400);
        }
    }
    
    const correnteAtualizada = await prisma.correnteFilosofica.update({
        where: { id },
        data: {
            nome: nome !== undefined ? nome.trim() : undefined,
            descricao: descricao !== undefined ? descricao.trim(): undefined
        }
    });

    return [correnteAntiga, correnteAtualizada];
}