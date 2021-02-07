/*
  Warnings:

  - Added the required column `secondsElapsed` to the `RoomMedia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomMedia" ADD COLUMN     "secondsElapsed" INTEGER NOT NULL;
