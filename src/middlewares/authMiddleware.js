import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
    // 1. Pega o cabeçalho Authorization da requisição
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            error: "Acesso negado. Token não fornecido."
        });
    }

    // 2. O formato esperado é: "Bearer eyJhbGciOiJIUzI1NiIs..."
    const partes = authHeader.split(" ");

    if (partes.length !== 2 || partes[0] !== "Bearer") {
        return res.status(401).json({
            error: "Token mal formatado. Use o padrão: Bearer <token>"
        });
    }

    const token = partes[1];

    // 3. Verifica se o token é verdadeiro e não expirou
    try {
        const dadosDecodificados = jwt.verify(token, process.env.JWT_SECRET);
        
        // Salva os dados do usuário logado na requisição para uso futuro, se precisar
        req.usuarioLogado = dadosDecodificados;
        
        return next(); // Libera a passagem para o controller!
    } catch (error) {
        return res.status(401).json({
            error: "Token inválido ou expirado. Faça login novamente."
        });
    }
}