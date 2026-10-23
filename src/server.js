import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

const porta = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Servidor ligado");
});

app.use((req, res) => {
    res.status(404).json({
        mensagem: "Rota não encontrada"
    });
});

app.listen(porta, () => {
    console.log(`🚀 http://localhost:${porta}`);
});