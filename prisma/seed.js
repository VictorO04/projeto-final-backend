import pg from 'pg';
import 'dotenv/config';
import { PrismaClient } from '../prisma/generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';

console.log('🔗 URL de Conexão:', process.env.DATABASE_URL);

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log('🌱 Resetando tabela noticia...');

    // Remove todos os registros
    // await prisma.noticias.deleteMany();

    console.log('📦 Inserindo novos registros...');

    await prisma.noticia.createMany({
        data: [
            { titulo: 'Exemplo Alpha', resumo: 'Resumo do exemplo alpha', conteudoCompleto: 'Conteúdo completo do exemplo alpha', tipo: 'teste', dataPublicacao: new Date(), urlNoticia: 'https://example.com/noticia-alpha' },
            { titulo: 'Exemplo Beta', resumo: 'Resumo do exemplo beta', conteudoCompleto: 'Conteúdo completo do exemplo beta', tipo: 'teste', dataPublicacao: new Date(), urlNoticia: 'https://example.com/noticia-beta' },
            { titulo: 'Exemplo Gamma', resumo: 'Resumo do exemplo gamma', conteudoCompleto: 'Conteúdo completo do exemplo gamma', tipo: 'teste', dataPublicacao: new Date(), urlNoticia: 'https://example.com/noticia-gamma' },
            { titulo: 'Exemplo Delta', resumo: 'Resumo do exemplo delta', conteudoCompleto: 'Conteúdo completo do exemplo delta', tipo: 'teste', dataPublicacao: new Date(), urlNoticia: 'https://example.com/noticia-delta' },
        ],
    });

    console.log('✅ Seed concluído!');
}

main()
    .catch((e) => {
        console.error('❌ Erro no seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });