/*
  Warnings:

  - You are about to drop the column `cardUUID` on the `CardAccessWebhook` table. All the data in the column will be lost.
  - You are about to drop the column `roomUUID` on the `CardAccessWebhook` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[room_uuid,card_uuid]` on the table `CardAccessWebhook` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `card_uuid` to the `CardAccessWebhook` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_uuid` to the `CardAccessWebhook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CardAccessWebhook" DROP COLUMN "cardUUID",
DROP COLUMN "roomUUID",
ADD COLUMN     "card_uuid" TEXT NOT NULL,
ADD COLUMN     "room_uuid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CardAccessWebhook_room_uuid_card_uuid_key" ON "CardAccessWebhook"("room_uuid", "card_uuid");
