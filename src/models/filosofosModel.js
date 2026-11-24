import { prisma } from "../lib/prisma.js";
import AppError from "../utils/AppError.js";

export default class FilosofosModel {
    constructor (body) {
        if (!body || typeof body !== "object" || Array.isArray(body)) {
            throw new AppError("Corpo da requisição inválido", 400);
        }

        const { id, nome, biografia, dataNascimento, dataFalecimento, urlImagem, correnteId } = body;

        this.id = id;
        this.nome = nome;
        this.biografia = biografia;
        this.dataNascimento = dataNascimento === undefined
            ? undefined
            : dataNascimento === null
                ? null
                : new Date(`${dataNascimento}T00:00:00.000Z`);

        this.dataFalecimento = dataFalecimento === undefined
            ? undefined
            : dataFalecimento === null
                ? null
                : new Date(`${dataFalecimento}T00:00:00.000Z`);
        this.urlImagem = urlImagem;
        this.correnteId = correnteId;
    }

    static buscarTodos(filtros = {}) {
        const where = {};

        if (filtros.corrente) {
            where.corrente = {
                nome: {
                    contains: filtros.corrente,
                    mode: "insensitive"
                }
            }
        }

        return prisma.filosofo.findMany({
            where,
            include: {
                corrente: true
            }
        });
    }

    static async buscaPorId(id) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("ID precisa ser um inteiro válido", 400);
        }

        const filosofo = await prisma.filosofo.findUnique({
            where: { id },
            include: {
                corrente: true
            }
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

    async criar() {
        if (typeof this.nome !== "string" || !this.nome.trim()) {
            throw new AppError("Nome é obrigatório e precisa ser um texto", 400);
        }

        await FilosofosModel.validarNome(this.nome.trim());

        if (this.biografia !== undefined && this.biografia !== null) {
            if (typeof this.biografia !== "string" || !this.biografia.trim()) {
                throw new AppError("Biografia precisa ser um texto e não pode ser vazio", 400);
            }
        }

        if (this.dataNascimento !== undefined && this.dataNascimento !== null) {
            if (!(this.dataNascimento instanceof Date) || isNaN(this.dataNascimento.getTime())) {
                throw new AppError("Data de nascimento inválida", 400);
            }
        }

        if (this.dataFalecimento !== undefined && this.dataFalecimento !== null) {
            if (!(this.dataFalecimento instanceof Date) || isNaN(this.dataFalecimento.getTime())) { 
                throw new AppError("Data de falecimento inválida", 400);
            }
        }

        if (this.urlImagem !== undefined && this.urlImagem !== null) {
            if (typeof this.urlImagem !== "string" || !this.urlImagem.trim()) {
                throw new AppError("URL da imagem precisa ser um texto e não pode ser vazio", 400);
            }
        }

        await FilosofosModel.validarCorrente(this.correnteId);

        const filosofo = await prisma.filosofo.create({
            data: {
                nome: this.nome.trim(),
                biografia: this.biografia?.trim() ?? null,
                dataNascimento: this.dataNascimento ?? null,
                dataFalecimento: this.dataFalecimento ?? null,
                urlImagem: this.urlImagem?.trim() ?? null,
                correnteId: this.correnteId
            },
            include: {
                corrente: true
            }
        });

        return filosofo;
    }

    async atualizar(id) {
        if (this.nome !== undefined) {
            if (typeof this.nome !== "string" || !this.nome.trim()) {
                throw new AppError("Nome é obrigatório e precisa ser um texto", 400);
            }
            await FilosofosModel.validarNome(this.nome.trim(), id);
        }

        if (this.biografia !== undefined && this.biografia !== null) {
            if (typeof this.biografia !== "string" || !this.biografia.trim()) {
                throw new AppError("Biografia precisa ser um texto e não pode ser vazio", 400);
            }
        }

        if (this.dataNascimento !== undefined && this.dataNascimento !== null) {
            if (!(this.dataNascimento instanceof Date) || isNaN(this.dataNascimento.getTime())) {
                throw new AppError("Data de nascimento inválida", 400);
            }
        }

        if (this.dataFalecimento !== undefined && this.dataFalecimento !== null) {
            if (!(this.dataFalecimento instanceof Date) || isNaN(this.dataFalecimento.getTime())) {
                throw new AppError("Data de falecimento inválida", 400);
            }
        }

        if (this.urlImagem !== undefined && this.urlImagem !== null) {
            if (typeof this.urlImagem !== "string" || !this.urlImagem.trim()) {
                throw new AppError("URL da imagem precisa ser um texto e não pode ser vazio", 400);
            }
        }

        if (this.correnteId !== undefined) {
            await FilosofosModel.validarCorrente(this.correnteId);
        }

        const filosofoAntigo = await FilosofosModel.buscaPorId(id);
        const filosofoNovo = await prisma.filosofo.update({
            where: { id },
            data: {
                nome: this.nome?.trim(),
                biografia: this.biografia === null ? null : this.biografia?.trim(),
                dataNascimento: this.dataNascimento,
                dataFalecimento: this.dataFalecimento,
                urlImagem: this.urlImagem === null ? null : this.urlImagem?.trim(),
                correnteId: this.correnteId
            },
            include: {
                corrente: true
            }
        });
        
        return { filosofoAntigo, filosofoNovo };
    }

    static async validarCorrente(id) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new AppError("ID da corrente filosófica é obrigatório e precisa ser um número", 400);
        }

        const corrente = await prisma.correnteFilosofica.findUnique({
            where: { id }
        });

        if (!corrente) {
            throw new AppError("Corrente filosófica não encontrada", 404);
        }
    }

    static async validarNome(nome, id = undefined) {
        const filosofo = await prisma.filosofo.findUnique({
            where: { nome }
        });

        if (filosofo && filosofo.id !== id) {
            throw new AppError("Já existe um filósofo com esse nome", 409);
        }
    }
}