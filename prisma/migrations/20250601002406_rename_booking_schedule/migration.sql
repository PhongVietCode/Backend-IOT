/*
  Warnings:

  - You are about to drop the `Booking_schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking_schedule" DROP CONSTRAINT "Booking_schedule_created_by_fkey";

-- DropForeignKey
ALTER TABLE "Booking_schedule" DROP CONSTRAINT "Booking_schedule_room_id_fkey";

-- DropTable
DROP TABLE "Booking_schedule";

-- CreateTable
CREATE TABLE "BookingSchedule" (
    "id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'CONFIRMED',

    CONSTRAINT "BookingSchedule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookingSchedule" ADD CONSTRAINT "BookingSchedule_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingSchedule" ADD CONSTRAINT "BookingSchedule_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
