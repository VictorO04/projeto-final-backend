import obrasRoutes from "./routes/obrasRoutes.js";
import express from "express";
import "dotenv/config";
import erroMiddleware from "./middlewares/erroMiddleware.js";
import filosofosRoutes from "./routes/filosofosRoutes.js";
import noticiasRoutes from "./routes/noticiasRoutes.js";

const app = express();
app.use(express.json());

const porta = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Servidor ligado");
});

app.use("/api/filosofos", filosofosRoutes);
app.use("/api/obras", obrasRoutes);
app.use("/api/noticias", noticiasRoutes);

app.use((req, res) => {
    res.status(404).json({
        mensagem: "Rota não encontrada"
    });
});

app.use(erroMiddleware);

app.listen(porta, () => {
    console.log(`🚀 http://localhost:${porta}`);
});