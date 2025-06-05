-- CreateEnum
CREATE TYPE "CardAccessRoomWebhookStatus" AS ENUM ('ACTIVE', 'DEACTIVATED');

-- AlterTable
ALTER TABLE "CardAccessWebhook" ADD COLUMN     "status" "CardAccessRoomWebhookStatus" NOT NULL DEFAULT 'ACTIVE';
