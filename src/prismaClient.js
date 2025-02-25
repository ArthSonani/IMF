import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Connected to PostgreSQL with Prisma");
  } catch (error) {
    console.error("Error connecting to PostgreSQL:", error);
  }
}

testConnection();

export default prisma;