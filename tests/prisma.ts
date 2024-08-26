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
  const models = Reflect.ownKeys(prisma).filter(
    (key) => !key.toString().startsWith('_'),
  );

  console.log(models);

  return Promise.all(
    models.map((modelKey) => {
      return prisma[modelKey as keyof typeof prisma].deleteMany();
    }),
  );
});

export { prisma };
