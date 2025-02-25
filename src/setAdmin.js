import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function makeAdmin() {
  await prisma.user.update({
    where: { email: "admin@imf.com" },
    data: { role: "admin" },
  });

  console.log("User role updated to admin.");
  await prisma.$disconnect();
}

makeAdmin().catch((error) => {
  console.error(error);
  prisma.$disconnect();
});
