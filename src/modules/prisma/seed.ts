import { prisma } from "../../lib/prisma";

(async () => {
  await prisma.prompt.deleteMany();
  await prisma.answer.deleteMany();
})();

export {};