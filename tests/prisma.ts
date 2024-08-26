import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  // Clear all tables before each test
  const tableNames = await prisma.$queryRaw<Array<{ name: string }>>`
    SELECT 
      name 
    FROM
      sqlite_master 
    WHERE 
          type='table' 
      AND name NOT LIKE 'sqlite_%' 
      AND name NOT LIKE '_prisma_migrations';
  `;

  for (const { name } of tableNames) {
    await prisma.$executeRawUnsafe(`DELETE FROM "${name}"`);
  }
});

export { prisma };
