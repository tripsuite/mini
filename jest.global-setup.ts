import { execSync } from 'child_process';
import which from 'npm-which';
import fs from 'fs';
import path from 'path';

const globalSetup = async () => {
  console.log('\nStarting global setup...');
  const start = new Date().getTime();

  try {
    await resetDatabase();
    await generatePrismaClient();
    console.log(`Global setup completed in ${new Date().getTime() - start}ms`);
  } catch (error) {
    console.error('Error during global setup:', error);
    process.exit(1);
  }
};

const resetDatabase = async () => {
  console.log('Resetting database...');
  const prismaBin = which(process.cwd()).sync('prisma');
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');

  try {
    // Remove the existing database file if it exists
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
      console.log('Existing database file removed');
    }

    // Run migrations to create a fresh database
    execSync(`${prismaBin} migrate deploy`, { stdio: 'ignore' });
    console.log('Database reset successful');
  } catch (error) {
    console.error('Error resetting database:', error);
    throw error;
  }
};

const generatePrismaClient = async () => {
  console.log('Generating Prisma client...');
  const prismaBin = which(process.cwd()).sync('prisma');

  try {
    execSync(`${prismaBin} generate`, { stdio: 'ignore' });
    console.log('Prisma client generation successful');
  } catch (error) {
    console.error('Error generating Prisma client:', error);
    throw error;
  }
};

export default globalSetup;
