import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.$executeRawUnsafe(`
    DELETE FROM "Booking";
    DELETE FROM "Supplier";
    DELETE FROM "Trip";
  `);
});

export { prisma };
