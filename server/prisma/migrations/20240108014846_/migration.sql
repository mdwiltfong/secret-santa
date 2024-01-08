/*
  Warnings:

  - You are about to drop the `Tokens` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `sessionID` on table `SessionUserGifts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `SessionUserGifts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "SessionUserGifts" DROP CONSTRAINT "SessionUserGifts_sessionID_fkey";

-- DropForeignKey
ALTER TABLE "SessionUserGifts" DROP CONSTRAINT "SessionUserGifts_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tokens" DROP CONSTRAINT "Tokens_userId_fkey";

-- AlterTable
ALTER TABLE "SessionUserGifts" ALTER COLUMN "sessionID" SET NOT NULL,
ALTER COLUMN "userId" SET NOT NULL;

-- DropTable
DROP TABLE "Tokens";

-- CreateTable
CREATE TABLE "UsersInventory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "giftId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UsersInventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailTokens" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "jwtToken" TEXT NOT NULL,
    "valid" BOOLEAN NOT NULL DEFAULT true,
    "expiration" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "EmailTokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailTokens_jwtToken_key" ON "EmailTokens"("jwtToken");

-- AddForeignKey
ALTER TABLE "SessionUserGifts" ADD CONSTRAINT "SessionUserGifts_sessionID_fkey" FOREIGN KEY ("sessionID") REFERENCES "Sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionUserGifts" ADD CONSTRAINT "SessionUserGifts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInventory" ADD CONSTRAINT "UsersInventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersInventory" ADD CONSTRAINT "UsersInventory_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailTokens" ADD CONSTRAINT "EmailTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
