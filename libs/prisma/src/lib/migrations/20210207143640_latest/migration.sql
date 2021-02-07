-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "currentMediaId" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "currentMediaTitle" TEXT NOT NULL DEFAULT E'';
