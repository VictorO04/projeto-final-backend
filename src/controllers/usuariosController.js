import bcrypt from 'bcrypt';
import { prisma } from '../lib/prisma.js';

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

// Rota POST /usuarios/login
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

        return res.status(200).json({
            message: 'Login realizado com sucesso!',
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