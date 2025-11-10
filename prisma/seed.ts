import { procedure, procedureCategory } from "./constants";
import { prisma } from "./prisma-client";

async function up() {
    await prisma.categoryProcedure.createMany({
        data: procedureCategory,
    });
    await prisma.procedure.createMany({
        data: procedure,
    });
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "Procedure" RESTART IDENTITY CASCADE`;
    await prisma.$executeRaw`TRUNCATE TABLE "CategoryProcedure" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });