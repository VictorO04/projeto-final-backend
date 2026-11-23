import prisma from '../lib/prisma.js';
import AppError from '../utils/AppError.js';

export default class VideosModel {
    constructor(body) {
        if (!body || typeof body !== "object" || Array.isArray(body)) {
            throw new AppError("Corpo da requisição inválido", 400);
        }

        const { id = null, titulo, url, banner = null } = body;
        
        this.id = id;
        this.titulo = titulo;
        this.url = url;
        this.banner = banner;
    }

    static buscarTodos() {
        return prisma.video.findMany();
    }

    static async buscaPorId(id) {
        if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new AppError("ID precisa ser um inteiro válido", 400);
        }

        const video = await prisma.video.findUnique({
            where: { id }
        });
        
        if (!video) {
            throw new AppError(`Vídeo com o ID ${id} não encontrado`, 404);
        }
        
        return video;
    }

    static async deletar(id) {
        const video = await VideosModel.buscaPorId(id);

        await prisma.video.delete({
            where: { id }
        });

        return video;
    }
    
    async criar() {

        if (typeof this.titulo !== "string") {
            throw new AppError("Título precisa ser uma string", 400);
        }

        if (!this.titulo.trim()) {
            throw new AppError("Título é obrigatório", 400);
        }

        if (typeof this.url !== "string") {
            throw new AppError("URL precisa ser uma string", 400);
        }

        if (!this.url.trim()) {
            throw new AppError("URL é obrigatório", 400);
        }

        if (this.banner !== undefined && this.banner !== null) {
            if (typeof this.banner !== "string") {
                throw new AppError("Banner precisa ser uma string", 400);
            }

            if (!this.banner.trim()) {
                throw new AppError("Banner não pode ser vazio", 400);
            }
        }

        const video = await prisma.video.create({
            data: {
                titulo: this.titulo.trim(),
                url: this.url.trim(),
                banner: this.banner?.trim() || null
            }
        });

        return video;
    }

    async atualizar(id) {
        if (this.titulo !== undefined) {
            if (typeof this.titulo !== "string") {
                throw new AppError("Título precisa ser uma string", 400);
            }

            if (!this.titulo.trim()) {
                throw new AppError("Título é obrigatório", 400);
            }
        }

        if (this.url !== undefined) {
            if (typeof this.url !== "string") {
                throw new AppError("URL precisa ser uma string", 400);
            }

            if (!this.url.trim()) {
                throw new AppError("URL é obrigatório", 400);
            }
        }

        if (this.banner !== undefined && this.banner !== null) {
            if (typeof this.banner !== "string") {
                throw new AppError("Banner precisa ser uma string", 400);
            }

            if (!this.banner.trim()) {
                throw new AppError("Banner não pode ser vazio", 400);
            }
        }

        const videoAntigo = await VideosModel.buscaPorId(id);
        const videoNovo = await prisma.video.update({
            where: { id },
            data: {
                titulo: this.titulo !== undefined
                    ? this.titulo.trim()
                    : undefined,

                url: this.url !== undefined
                    ? this.url.trim()
                    : undefined,

                banner: this.banner !== undefined
                    ? (this.banner === null ? null : this.banner.trim())
                    : undefined
            }
        });

        return { videoAntigo, videoNovo };
    }
}