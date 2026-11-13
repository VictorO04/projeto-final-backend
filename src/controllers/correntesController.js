import { buscarCorrentes } from "../models/correntesModel.js";

export const getCorrentes = async (req, res) => {
    const correntes = await buscarCorrentes();

    res.json({
        total: buscarCorrentes.length,
        correntes
    });
}