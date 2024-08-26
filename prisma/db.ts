import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: 'file:./dev.db',
      },
    },
  });
global.prisma = prisma;

export default prisma;
