import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client/index.js';

const client = new pg.Client({ 
  connectionString: process.env.DATABASE_URL 
});

await client.connect();

const adapter = new PrismaPg(client);
const prisma = new PrismaClient({ adapter });

export default prisma;