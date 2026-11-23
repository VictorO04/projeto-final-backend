import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma.js';
import usuariosModel from '../models/usuariosModel.js';
import jwt from "jsonwebtoken";

export const cadastrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await prisma.usuario.create({
            data: {
                nome,
                email,
                senha: senhaHash,
            },
            select: {
                id: true,
                nome: true,
                email: true,
                criadoEm: true,
            }
        });

        return res.status(201).json({ message: 'Usuário criado com sucesso!', data: usuario });
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(409).json({ error: 'Este e-mail já está cadastrado.' });
        }
        console.error('Erro ao cadastrar usuário:', error);
        return res.status(500).json({ error: 'Erro interno ao cadastrar usuário.' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
        }

        const usuario = await prisma.usuario.findUnique({
            where: { email }
        });

        if (!usuario) {
            return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(401).json({ error: 'E-mail ou senha inválidos.' });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ error: 'Erro interno ao realizar login.' });
    }
};

export const buscarTodos = async (req, res) => {
    try {
        const registros = await usuariosModel.buscarTodos(req.query);

        if (!registros || registros.length === 0) {
            return res.status(404).json({
                message: "Nenhum usuário encontrado."
            });
        }

        return res.status(200).json(registros);
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return res.status(500).json({
            error: "Erro ao buscar usuários."
        });
    }
};

export const buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({
                error: "O ID enviado não é um número válido."
            });
        }

        const usuario = await usuariosModel.buscarPorId(parseInt(id));

        if (!usuario) {
            return res.status(404).json({
                error: "Usuário não encontrado."
            });
        }

        return res.status(200).json({ data: usuario });
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return res.status(500).json({
            error: "Erro ao buscar usuário."
        });
    }
};

export const atualizar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido." });
        }

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                error: "Corpo da requisição vazio. Envie os dados!"
            });
        }

        const usuarioExiste = await usuariosModel.buscarPorId(parseInt(id));

        if (!usuarioExiste) {
            return res.status(404).json({
                error: "Usuário não encontrado para atualizar."
            });
        }

        const usuarioAtualizar = new usuariosModel({
            id: parseInt(id),
            nome: req.body.nome ? req.body.nome.trim() : undefined,
            email: req.body.email ? req.body.email.trim().toLowerCase() : undefined,
            senha: req.body.senha
        });

        const dataAtualizada = await usuarioAtualizar.atualizar();

        return res.status(200).json({
            message: `O usuário "${dataAtualizada.nome}" foi atualizado com sucesso!`,
            data: dataAtualizada
        });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);

        if (error.code === "P2002") {
            return res.status(409).json({
                error: "Este e-mail já está cadastrado."
            });
        }

        return res.status(500).json({
            error: "Erro ao atualizar usuário."
        });
    }
};

export const deletar = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido." });
        }

        const usuario = await usuariosModel.buscarPorId(parseInt(id));

        if (!usuario) {
            return res.status(404).json({
                error: "Usuário não encontrado para deletar."
            });
        }

        await usuario.deletar();

        return res.status(200).json({
            message: `O usuário "${usuario.nome}" foi deletado com sucesso!`,
            deletado: usuario.nome
        });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error);
        return res.status(500).json({
            error: "Erro ao deletar usuário."
        });
    }
};