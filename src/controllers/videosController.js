import VideosModel from "../models/videosModel.js";

export const getAllVideos = async (req, res) => {
    const videos = await VideosModel.getAll();

    res.json({
        total: videos.length,
        videos
    });
}

export const getVideoById = async (req, res) => {
    const id = Number(req.params.id);
    const video = await VideosModel.getById(id);

    res.json({
        mensagem: `Vídeo com o ID ${id} encontrado`,
        video
    });
}

export const postVideo = async (req, res) => {
    const video = new VideosModel(req.body);
    const novoVideo = await video.criar();

    res.status(201).json({
        mensagem: "Vídeo criado com sucesso",
        video: novoVideo
    });
}

export const deleteVideo = async (req, res) => {
    const id = Number(req.params.id);
    const video = await VideosModel.deletar(id)

    res.json({
        mensagem: "Vídeo deletado com sucesso",
        video
    });
}

export const putVideo = async (req, res) => {
    const video = new VideosModel(req.body);
    const id = Number(req.params.id);
    const { videoAntigo, videoNovo } = await video.atualizar(id);

    res.json({
        mensagem: "Vídeo atualizado com sucesso",
        videoAntigo,
        videoNovo
    })
}