import dayjs from 'dayjs';
import { BookingSchedule, CardAccessRoomStatus, Room } from '../../../generated/prisma';
import { orm } from '../../utils/orm';
import { json } from 'express';

class RoomRepository {
  async findAll() {
    return orm.room.findMany();
  }

  // Room
  async createNewRoom(data: Omit<Room, 'id' | 'uuid'>) {
    return orm.room.create({
      data,
    });
  }
  async getRoomByUUID(uuid: string) {
    return orm.room.findUnique({
      where: { uuid: uuid },
      include: {
        bookings: true,
      }
    });
  }
  async getRoomById(id: number) {
    return orm.room.findUnique({
      where: { id },
    });
  }

  async updateRoom(id: number, data: Partial<Omit<Room, 'id' | 'uuid'>>) {
    return orm.room.update({
      where: { id },
      data,
    });
  }

  // Card access to room
  async createCardAccessToRoom(roomId: number, cardId: number) {
    return orm.cardRoomAccess.create({
      data: {
        room_id: roomId,
        card_id: cardId,
      },
    });
  }
  async getCardAccessToRoom(roomId: number, cardId: number) {
    return orm.cardRoomAccess.findUnique({
      where: {
        card_id_room_id: { card_id: cardId, room_id: roomId }
      }
    })
  }

  async updateCardAccessToRoom(roomId: number, cardId: number, status: CardAccessRoomStatus) {
    return orm.cardRoomAccess.update({
      where: {
        card_id_room_id: { card_id: cardId, room_id: roomId }
      },
      data: { status },
    });
  }
  async getRoomCardAccessWebhook(roomUUID: string) {
    return orm.cardAccessWebhook.findMany({
      where: {
        room_uuid: roomUUID,
        status: 'ACTIVE'
      }
    })
  }
  async getCardAccessToRoomWebhook(roomUUID: string, cardUUID: string,) {
    return orm.cardAccessWebhook.findUnique({
      where: {
        room_uuid_card_uuid: { room_uuid: roomUUID, card_uuid: cardUUID },
        status: 'ACTIVE'
      },
    })
  }
  async deleteCardAccessToRoom(roomUUID: string, cardUUID: string,) {
    return orm.cardAccessWebhook.delete({
      where: {
        room_uuid_card_uuid: { room_uuid: roomUUID, card_uuid: cardUUID },
      },
    })
  }
  async createRoomCardAccessWebhook(roomUUID: string, cardUUID: string, metadata: any) {
    const expiredAt = dayjs().add(60, 'second').toDate();
    return orm.cardAccessWebhook.create({
      data: {
        card_uuid: cardUUID,
        room_uuid: roomUUID,
        metadata: JSON.stringify(metadata),
        expired_at: expiredAt
      }
    })
  }

  // Schedule
  async createScheduleRoom(roomId: number, description: string, startTime: Date, endTime: Date, userId: number) {
    return orm.bookingSchedule.create({
      data: {
        room_id: roomId,
        description: description,
        start_time: startTime,
        end_time: endTime,
        created_by: userId,
      }
    })
  }
  async getRoomSchedule(roomId: number) {
    return orm.bookingSchedule.findMany({
      where: {
        room_id: roomId
      }
    })
  }
  async getBookingByUUID(bookingUUID: string) {
    return orm.bookingSchedule.findFirst({
      where: {
        uuid: bookingUUID
      }
    })
  }
  async updateScheduleRoom(bookingId: number, data: Partial<Omit<BookingSchedule, 'id' | 'created_by' | 'room_id' | 'uuid'>>) {
    return orm.bookingSchedule.update({
      where: {
        id: bookingId,
      },
      data
    })
  }
  async checkAvailRoomScheduleRange(roomId: number, startTime: Date, endTime: Date) {
    return orm.bookingSchedule.findMany({
      where: {
        room_id: roomId,
        OR: [
          {
            AND: {
              start_time: {
                lt: endTime
              },
              end_time: {
                gt: endTime
              }
            }
          }, {
            AND: {
              start_time: {
                lt: startTime
              },
              end_time: {
                gt: startTime
              }
            }
          }
        ]
      },
    })
  }

}
export const roomRepository = new RoomRepository(); 