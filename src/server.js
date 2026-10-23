import express from "express";
import "dotenv/config";
import noticiasRoutes from './routes/noticiasRoutes.js'

const app = express();
app.use(express.json());

const porta = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Servidor ligado");
});

app.use('/api/noticias', noticiasRoutes);

app.use((req, res) => {
    res.status(404).json({
        mensagem: "Rota não encontrada"
    });
});

app.listen(porta, () => {
    console.log(`🚀 http://localhost:${porta}`);
});