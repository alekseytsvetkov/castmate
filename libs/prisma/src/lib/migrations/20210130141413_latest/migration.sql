/*
  Warnings:

  - You are about to drop the column `currentMedia` on the `Room` table. All the data in the column will be lost.
  - You are about to drop the `_membersRoom` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `mediaId` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_membersRoom" DROP CONSTRAINT "_membersRoom_A_fkey";

-- DropForeignKey
ALTER TABLE "_membersRoom" DROP CONSTRAINT "_membersRoom_B_fkey";

-- AlterTable
ALTER TABLE "Room" DROP COLUMN "currentMedia",
ADD COLUMN     "mediaId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RoomMedia" (
    "id" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_roomMembers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- DropTable
DROP TABLE "_membersRoom";

-- CreateIndex
CREATE UNIQUE INDEX "_roomMembers_AB_unique" ON "_roomMembers"("A", "B");

-- CreateIndex
CREATE INDEX "_roomMembers_B_index" ON "_roomMembers"("B");

-- AddForeignKey
ALTER TABLE "RoomMedia" ADD FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roomMembers" ADD FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_roomMembers" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
