import { prisma } from "../lib/prisma.js";
import AppError from "../utils/AppError.js";

export const buscarCorrentes = () => {
    return prisma.correnteFilosofica.findMany();
}