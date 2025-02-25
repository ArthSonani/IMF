-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AVAILABLE', 'DEPLOYED', 'DESTROYED', 'DECOMMISSIONED');

-- CreateTable
CREATE TABLE "gadgets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'AVAILABLE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "decommissionedAt" TIMESTAMP(3),

    CONSTRAINT "gadgets_pkey" PRIMARY KEY ("id")
);
