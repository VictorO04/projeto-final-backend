import express from "express";
import "dotenv/config";
import erroMiddleware from "./middlewares/erroMiddleware.js";
import filosofosRoutes from "./routes/filosofosRoutes.js";

const app = express();
app.use(express.json());

const porta = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Servidor ligado");
});

app.use("/api/filosofos", filosofosRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        mensagem: "Rota não encontrada"
    });
});

app.use(erroMiddleware);

app.listen(porta, () => {
    console.log(`🚀 http://localhost:${porta}`);
});