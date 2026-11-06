import express from "express";
import "dotenv/config";
<<<<<<< HEAD
import erroMiddleware from "./middlewares/erroMiddleware.js";
import filosofosRoutes from "./routes/filosofosRoutes.js";
=======
import noticiasRoutes from './routes/noticiasRoutes.js'
>>>>>>> 55fb187845da7fa66556e6ca455ef6021b0c9c80

const app = express();
app.use(express.json());

const porta = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Servidor ligado");
});

<<<<<<< HEAD
app.use("/api/filosofos", filosofosRoutes);

app.use((req, res, next) => {
=======
app.use('/api/noticias', noticiasRoutes);

app.use((req, res) => {
>>>>>>> 55fb187845da7fa66556e6ca455ef6021b0c9c80
    res.status(404).json({
        mensagem: "Rota não encontrada"
    });
});

app.use(erroMiddleware);

app.listen(porta, () => {
    console.log(`🚀 http://localhost:${porta}`);
});