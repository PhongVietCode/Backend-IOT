/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `BookingSchedule` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `CardRoomAccess` will be added. If there are existing duplicate values, this will fail.
  - The required column `uuid` was added to the `BookingSchedule` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `uuid` was added to the `CardRoomAccess` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "BookingSchedule" ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CardRoomAccess" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BookingSchedule_uuid_key" ON "BookingSchedule"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "CardRoomAccess_uuid_key" ON "CardRoomAccess"("uuid");
