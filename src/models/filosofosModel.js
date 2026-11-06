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

    const { nome, descricao, periodoHistorico, areaEstudo, correntePrincipal, dataNascimento, dataFalescimento } = body;
    
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

    const camposObrigatoriosString = ["nome", "descricao", "periodoHistorico", "areaEstudo", "correntePrincipal"];

    if (typeof nome !== "string" || typeof descricao !== "string" || typeof periodoHistorico !== "string" || typeof areaEstudo !== "string" || typeof correntePrincipal !== "string") {
        throw new AppError(`Os campos ${camposObrigatoriosString.join(", ")} precisam ser do tipo string`, 400);
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
    const filosofo = await buscarFilosofoPorId(id);

    await prisma.filosofo.delete({
        where: {
            id: id
        }
    });

    return filosofo;
}

export const atualizarFilosofo = async (body, id) => {
    if (!body) {
        throw new AppError("O corpo da requisição está faltando", 400);
    }

    const filosofo = await buscarFilosofoPorId(id);

    const { nome, descricao, periodoHistorico, areaEstudo, correntePrincipal, dataNascimento, dataFalescimento, urlImagem } = body;

    if (nome !== undefined) {
        if (typeof nome !== "string") {
            throw new AppError("O campo nome precisa ser do tipo string", 400);
        }

        if (!nome.trim()) {
            throw new AppError("O campo nome não pode ser vazio", 400);
        }
    }

    if (descricao !== undefined) {
        if (typeof descricao !== "string") {
            throw new AppError("O campo descricao precisa ser do tipo string", 400);
        }

        if (!descricao.trim()) {
            throw new AppError("O campo descricao não pode ser vazio", 400);
        }
    }

    if (periodoHistorico !== undefined) {
        if (typeof periodoHistorico !== "string") {
            throw new AppError("O campo periodoHistorico precisa ser do tipo string", 400);
        }

        const periodosHistoricos = ["antiguidade", "idade média", "renascimento", "idade moderna", "idade contemporânea"];
        const periodoNormalizado = periodoHistorico.trim().toLowerCase();
        const periodoValido = periodosHistoricos.includes(periodoNormalizado);

        if (!periodoValido) {
            throw new AppError(`Periodos históricos permitidos: ${periodosHistoricos.join(", ")}`, 400);
        }
    }

    if (areaEstudo !== undefined) {
        if (typeof periodoHistorico !== "string") {
            throw new AppError("O campo areaEstudo precisa ser do tipo string", 400);
        }

        const areasEstudo = [
            "Metafísica",
            "Ética",
            "Epistemologia",
            "Lógica",
            "Estética",
            "Filosofia Política",
            "Filosofia da Ciência",
            "Filosofia da Linguagem",
            "Filosofia da Mente",
            "Filosofia da Religião",
            "Filosofia do Direito",
            "Filosofia da Educação",
            "Filosofia Social",
            "Filosofia da História"
        ];
        const areaEstudoNormalizado = areaEstudo.trim().toLowerCase();
        const areaEstudoValido = areasEstudo.includes(areaEstudoNormalizado);

        if (!areaEstudoValido) {
            throw new AppError(`Areas de estudo permitidas: ${areasEstudo.join(", ")}`, 400);
        }
    }




    if (correntePrincipal !== undefined) {
        if (typeof periodoHistorico !== "string") {
            throw new AppError("O campo areaEstudo precisa ser do tipo string", 400);
        }

        const correntes = [
            "Idealismo",
            "Realismo",
            "Racionalismo",
            "Empirismo",
            "Existencialismo",
            "Estoicismo",
            "Epicurismo",
            "Ceticismo",
            "Pragmatismo",
            "Utilitarismo",
            "Marxismo",
            "Liberalismo",
            "Niilismo",
            "Fenomenologia",
            "Hermenêutica",
            "Positivismo",
            "Estruturalismo",
            "Pós-estruturalismo",
            "Humanismo",
            "Materialismo",
            "Platonismo",
            "Aristotelismo",
            "Tomismo"
        ];

        const correnteNormalizada = correntePrincipal.trim().toLowerCase();
        const correnteValida = correntes.includes(correnteNormalizada);

        if (!correnteValida) {
            throw new AppError(`Correntes permitidas: ${correntes.join(", ")}`, 400);
        }
    }
}