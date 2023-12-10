/*
  Warnings:

  - You are about to drop the column `giftSessionId` on the `Gifts` table. All the data in the column will be lost.
  - You are about to drop the column `giftSessionId` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `GiftGivingSessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Gifts_GiftGivingSessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users_GiftGivingSessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users_Gifts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gifts_GiftGivingSessions" DROP CONSTRAINT "Gifts_GiftGivingSessions_giftGivingSessionId_fkey";

-- DropForeignKey
ALTER TABLE "Gifts_GiftGivingSessions" DROP CONSTRAINT "Gifts_GiftGivingSessions_giftId_fkey";

-- DropForeignKey
ALTER TABLE "Users_GiftGivingSessions" DROP CONSTRAINT "Users_GiftGivingSessions_giftGivingSessionId_fkey";

-- DropForeignKey
ALTER TABLE "Users_GiftGivingSessions" DROP CONSTRAINT "Users_GiftGivingSessions_userId_fkey";

-- DropForeignKey
ALTER TABLE "Users_Gifts" DROP CONSTRAINT "Users_Gifts_giftId_fkey";

-- DropForeignKey
ALTER TABLE "Users_Gifts" DROP CONSTRAINT "Users_Gifts_userId_fkey";

-- AlterTable
ALTER TABLE "Gifts" DROP COLUMN "giftSessionId";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "giftSessionId";

-- DropTable
DROP TABLE "GiftGivingSessions";

-- DropTable
DROP TABLE "Gifts_GiftGivingSessions";

-- DropTable
DROP TABLE "Users_GiftGivingSessions";

-- DropTable
DROP TABLE "Users_Gifts";

-- CreateTable
CREATE TABLE "Sessions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessionUserGifts" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sessionID" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "giftId" INTEGER NOT NULL,

    CONSTRAINT "SessionUserGifts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SessionUserGifts" ADD CONSTRAINT "SessionUserGifts_sessionID_fkey" FOREIGN KEY ("sessionID") REFERENCES "Sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionUserGifts" ADD CONSTRAINT "SessionUserGifts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionUserGifts" ADD CONSTRAINT "SessionUserGifts_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
