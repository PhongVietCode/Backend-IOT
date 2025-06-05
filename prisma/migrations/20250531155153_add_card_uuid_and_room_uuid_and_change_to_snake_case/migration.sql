/*
  Warnings:

  - You are about to drop the column `userId` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `cardId` on the `CardRoomAccess` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `CardRoomAccess` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[card_id,room_id]` on the table `CardRoomAccess` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uuid]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uuid` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `card_id` to the `CardRoomAccess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `CardRoomAccess` table without a default value. This is not possible if the table is not empty.
  - The required column `uuid` was added to the `Room` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Card" DROP CONSTRAINT "Card_userId_fkey";

-- DropForeignKey
ALTER TABLE "CardRoomAccess" DROP CONSTRAINT "CardRoomAccess_cardId_fkey";

-- DropForeignKey
ALTER TABLE "CardRoomAccess" DROP CONSTRAINT "CardRoomAccess_roomId_fkey";

-- DropIndex
DROP INDEX "CardRoomAccess_cardId_roomId_key";

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER,
ADD COLUMN     "uuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "CardRoomAccess" DROP COLUMN "cardId",
DROP COLUMN "roomId",
ADD COLUMN     "card_id" INTEGER NOT NULL,
ADD COLUMN     "room_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CardRoomAccess_card_id_room_id_key" ON "CardRoomAccess"("card_id", "room_id");

-- CreateIndex
CREATE UNIQUE INDEX "Room_uuid_key" ON "Room"("uuid");

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardRoomAccess" ADD CONSTRAINT "CardRoomAccess_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "Card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardRoomAccess" ADD CONSTRAINT "CardRoomAccess_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
