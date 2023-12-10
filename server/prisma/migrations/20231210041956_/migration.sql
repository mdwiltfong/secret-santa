-- DropForeignKey
ALTER TABLE "SessionUserGifts" DROP CONSTRAINT "SessionUserGifts_giftId_fkey";

-- DropForeignKey
ALTER TABLE "SessionUserGifts" DROP CONSTRAINT "SessionUserGifts_sessionID_fkey";

-- DropForeignKey
ALTER TABLE "SessionUserGifts" DROP CONSTRAINT "SessionUserGifts_userId_fkey";

-- AlterTable
ALTER TABLE "SessionUserGifts" ALTER COLUMN "sessionID" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "giftId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "SessionUserGifts" ADD CONSTRAINT "SessionUserGifts_sessionID_fkey" FOREIGN KEY ("sessionID") REFERENCES "Sessions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionUserGifts" ADD CONSTRAINT "SessionUserGifts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessionUserGifts" ADD CONSTRAINT "SessionUserGifts_giftId_fkey" FOREIGN KEY ("giftId") REFERENCES "Gifts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
