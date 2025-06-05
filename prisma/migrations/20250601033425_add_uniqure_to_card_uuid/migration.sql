/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Card` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Card_uuid_key" ON "Card"("uuid");
