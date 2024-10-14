/*
  Warnings:

  - The values [USER,ADMIN,SUPERADMIN] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tuition` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TuitionHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ATHLETE', 'COACH', 'HEADCOACH');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ATHLETE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_UserId_fkey";

-- DropForeignKey
ALTER TABLE "TuitionHistory" DROP CONSTRAINT "TuitionHistory_MemberId_fkey";

-- DropForeignKey
ALTER TABLE "TuitionHistory" DROP CONSTRAINT "TuitionHistory_TuitionId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ATHLETE';

-- DropTable
DROP TABLE "Member";

-- DropTable
DROP TABLE "Tuition";

-- DropTable
DROP TABLE "TuitionHistory";

-- CreateTable
CREATE TABLE "Athlete" (
    "id" SERIAL NOT NULL,
    "UserId" TEXT NOT NULL,
    "height" INTEGER,
    "weight" INTEGER,
    "brithday" TIMESTAMP(3),
    "grade" TEXT,
    "gender" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Athlete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeeHistory" (
    "id" SERIAL NOT NULL,
    "AthleteId" INTEGER NOT NULL,
    "FeeId" INTEGER NOT NULL,
    "note" TEXT,
    "amount" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FeeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Fee_name_key" ON "Fee"("name");

-- AddForeignKey
ALTER TABLE "Athlete" ADD CONSTRAINT "Athlete_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeeHistory" ADD CONSTRAINT "FeeHistory_AthleteId_fkey" FOREIGN KEY ("AthleteId") REFERENCES "Athlete"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeeHistory" ADD CONSTRAINT "FeeHistory_FeeId_fkey" FOREIGN KEY ("FeeId") REFERENCES "Fee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
