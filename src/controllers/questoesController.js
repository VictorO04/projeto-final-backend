import { buscar, buscarPeloId } from "../models/simuladosModel.js";

export const getSimulados = async (req, res) => {
  const simulados = await buscar();

  res.json({
    total: simulados.length,
    simulados,
  });
};

export const getSimuladoById = async (req, res) => {
  const id = Number(req.params.id);
  const simulado = await buscarPeloId(id);

  res.json({
    simulado,
  });
};