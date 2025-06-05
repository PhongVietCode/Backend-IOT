/*
  Warnings:

  - You are about to drop the `CardPermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CardAccessRoomStatus" AS ENUM ('ACTIVE', 'DEACTIVATED');

-- DropForeignKey
ALTER TABLE "CardPermission" DROP CONSTRAINT "CardPermission_cardId_fkey";

-- AlterTable
ALTER TABLE "Booking_schedule" ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "permissions" "Permission"[];

-- AlterTable
ALTER TABLE "CardRoomAccess" ADD COLUMN     "status" "CardAccessRoomStatus" NOT NULL DEFAULT 'ACTIVE';

-- DropTable
DROP TABLE "CardPermission";
