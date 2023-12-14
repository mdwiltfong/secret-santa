/*
  Warnings:

  - You are about to drop the column `emailToken` on the `Tokens` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Tokens` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jwtToken]` on the table `Tokens` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Tokens_emailToken_key";

-- AlterTable
ALTER TABLE "Tokens" DROP COLUMN "emailToken",
DROP COLUMN "type",
ADD COLUMN     "jwtToken" TEXT;

-- DropEnum
DROP TYPE "TokenTypes";

-- CreateIndex
CREATE UNIQUE INDEX "Tokens_jwtToken_key" ON "Tokens"("jwtToken");
