-- CreateEnum
CREATE TYPE "MediaStatus" AS ENUM ('PAUSE', 'PLAY');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "mediaStatus" "MediaStatus" NOT NULL DEFAULT E'PAUSE';
