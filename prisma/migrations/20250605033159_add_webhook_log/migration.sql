-- CreateTable
CREATE TABLE "CardAccessWebhook" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardUUID" TEXT NOT NULL,
    "roomUUID" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,

    CONSTRAINT "CardAccessWebhook_pkey" PRIMARY KEY ("id")
);
