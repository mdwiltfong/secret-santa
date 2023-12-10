/*
  Warnings:

  - You are about to drop the column `name` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `giftSessionId` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_userId_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "name",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "giftSessionId" INTEGER NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "Posts";

-- DropTable
DROP TABLE "Profiles";

-- CreateTable
CREATE TABLE "GiftGivingSessions" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GiftGivingSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_GiftGivingSessions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "giftGivingSessionId" INTEGER NOT NULL,

    CONSTRAINT "Users_GiftGivingSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gifts_GiftGivingSessions" (
    "id" SERIAL NOT NULL,
    "giftGivingSessionId" INTEGER NOT NULL,
    "giftId" INTEGER NOT NULL,

    CONSTRAINT "Gifts_GiftGivingSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Gifts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "link" TEXT,
    "giftSessionId" INTEGER,

    CONSTRAINT "Gifts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Gifts" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "giftId" INTEGER NOT NULL,

    CONSTRAINT "Users_Gifts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Users_GiftGivingSessions" ADD CONSTRAINT "Users_GiftGivingSessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_GiftGivingSessions" ADD CONSTRAINT "Users_GiftGivingSessions_giftGivingSessionId_fkey" FOREIGN KEY ("giftGivingSessionId") REFERENCES "GiftGivingSessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gifts_GiftGivingSessions" ADD CONSTRAINT "Gifts_GiftGivingSessions_giftGivingSessionId_fkey" FOREIGN KEY ("giftGivingSessionId") REFERENCES "GiftGivingSessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gifts_GiftGivingSessions" ADD CONSTRAINT "Gifts_GiftGivingSessions_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Gifts" ADD CONSTRAINT "Users_Gifts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Gifts" ADD CONSTRAINT "Users_Gifts_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gifts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
