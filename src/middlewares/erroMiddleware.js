const erroMiddleware = (error, req, res, next) => {
    const mensagem = error.message || "Erro interno do servidor";
    const status = error.statusCode || 500;

    if (status >= 500) console.error(error);

    res.status(status).json({ mensagem });
}

export default erroMiddleware;