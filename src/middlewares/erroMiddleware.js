const erroMiddleware = (error, req, res, next) => {
    const status = error.statusCode || 500;

    const mensagem = status >= 500
        ? "Erro interno do servidor"
        : error.message || "Erro interno do servidor";

    if (status >= 500) {
        console.error(error);
    }

    return res.status(status).json({ mensagem });
};

export default erroMiddleware;
