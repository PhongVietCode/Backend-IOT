import { BookingStatus, CardAccessRoomStatus, RoomStatus, RoomType } from '../../../generated/prisma';
import { BadRequestError } from '../../errors/AppError';
import { dayService } from '../../utils/day';
import { cardRepository } from '../card/card.repository';
import { roomRepository } from './room.repository';

class RoomService {
  async getAllRooms() {
    return roomRepository.findAll();
  }
  async createNewRoom({ roomName, status, type }: {
    roomName: string;
    status: RoomStatus;
    type: RoomType;
  }) {
    return roomRepository.createNewRoom({ room_name: roomName, status, type })
  }
  async getRoom({ uuid }: { uuid: string }) {
    return roomRepository.getRoomByUUID(uuid);
  }
  async updateRoom({ roomUUID, roomName, status, type }: {
    roomUUID: string
    roomName?: string;
    status?: RoomStatus;
    type?: RoomType;
  }) {
    const room = await roomRepository.getRoomByUUID(roomUUID);
    if (!room) {
      throw new BadRequestError("Cannot find room!");
    }
    return roomRepository.updateRoom(room.id, { room_name: roomName, status, type });
  }
  // CARD ACCESS
  async createCardAccessToRoom({ roomUUID, cardUUID }: { roomUUID: string, cardUUID: string }) {
    const room = await roomRepository.getRoomByUUID(roomUUID);
    if (!room) {
      throw new BadRequestError("Cannot find room!");
    }
    let card = await cardRepository.getCardByUUID(cardUUID);
    if (!card) {
      card = await cardRepository.createCard(['BASE'], cardUUID)
    }
    const cardAccess = await roomRepository.createCardAccessToRoom(room.id, card.id)
    await roomRepository.deleteCardAccessToRoomWebHook(roomUUID, cardUUID)
    return cardAccess
  }
  async getCardAccessToRoom({ roomUUID, cardUUID }: { roomUUID: string, cardUUID: string }) {
    const room = await roomRepository.getRoomByUUID(roomUUID);
    if (!room) {
      throw new BadRequestError("Cannot find room!");
    }
    const card = await cardRepository.getCardByUUID(cardUUID);
    if (!card) {
      throw new BadRequestError("Card may not register by admin.")
    }
    return roomRepository.getCardAccessToRoom(room.id, card.id);
  }
  async getAllCardAccess({ roomUUID }: { roomUUID: string }) {
    const room = await roomRepository.getRoomByUUID(roomUUID);
    if (!room) {
      throw new BadRequestError("Cannot find room!");
    }
    return roomRepository.getAllCardAccess(room.id);
  }
  async updateCardAccessToRoom({ roomUUID, cardUUID, status }: { roomUUID: string, cardUUID: string, status: CardAccessRoomStatus }) {
    const room = await roomRepository.getRoomByUUID(roomUUID);
    if (!room) {
      throw new BadRequestError("Cannot find room!");
    }
    const card = await cardRepository.getCardByUUID(cardUUID);
    if (!card) {
      throw new BadRequestError("Card may not register by admin.")
    }
    return roomRepository.updateCardAccessToRoom(room.id, card.id, status);
  }
  async deleteCardAccessToRoom({ roomUUID, cardUUID }: { roomUUID: string, cardUUID: string }) {
    const room = await roomRepository.getRoomByUUID(roomUUID);
    if (!room) {
      throw new BadRequestError("Cannot find room!");
    }
    const card = await cardRepository.getCardByUUID(cardUUID);
    if (!card) {
      throw new BadRequestError("Card may not register by admin.")
    }
    return roomRepository.deleteCardAccessToRoom(room.id, card.id);
  }
  async getRoomCardAccessWebhook({ roomUUID }: { roomUUID: string }) {
    const room = await roomRepository.getRoomByUUID(roomUUID);
    if (!room) {
      throw new BadRequestError("Cannot find room!");
    }
    const cardAccesses = await roomRepository.getRoomCardAccessWebhook(roomUUID)
    return {
      roomName: room.room_name,
      cardAccesses
    }
  }
  // ROOM SCHEDULE
  async createScheduleRoom({ roomUUID, description, startTime, endTime, userId }: { roomUUID: string, description: string, startTime: string, endTime: string, userId: number }) {
    const room = await roomRepository.getRoomByUUID(roomUUID);
    if (!room) {
      throw new BadRequestError("Cannot find room!");
    }
    try {
      const formatedStartTime = dayService.formatDateTime(startTime)
      const formatedEndTime = dayService.formatDateTime(endTime)

      const preSchedule = await this.checkAvailRoomScheduleRange({ roomUUID, startTime, endTime })
      if (preSchedule.length > 0) {
        throw new BadRequestError("Time range is in schedule!")
      }
      return roomRepository.createScheduleRoom(room.id, description, formatedStartTime, formatedEndTime, userId);
    } catch (error) {
      throw error
    }
  }
  async getRoomSchedule({ roomUUID }: { roomUUID: string }) {
    const room = await roomRepository.getRoomByUUID(roomUUID);
    if (!room) {
      throw new BadRequestError("Cannot find room!");
    }
    return roomRepository.getRoomSchedule(room.id)
  }
  async updateScheduleRoom({ bookingUUID, data }: {
    bookingUUID: string, data: {
      status?: BookingStatus;
      description?: string;
      startTime?: string;
      endTime?: string;
    }
  }) {
    const booking = await roomRepository.getBookingByUUID(bookingUUID)
    if (!booking) {
      throw new BadRequestError("Booking Schedule is invalid");
    }
    try {
      const formatedStartTime = dayService.formatDateTime(data.startTime || '')
      const formatedEndTime = dayService.formatDateTime(data.endTime || '')
      return roomRepository.updateScheduleRoom(booking.id, {
        description: data.description,
        ...(data.startTime ? { start_time: formatedStartTime } : {}),
        ...(data.endTime ? { end_time: formatedEndTime } : {}),
        status: data.status as BookingStatus
      })
    } catch (error) {
      throw error
    }

  }
  async checkAvailRoomScheduleRange({ roomUUID, startTime, endTime }: { roomUUID: string, startTime: string, endTime: string }) {
    const room = await roomRepository.getRoomByUUID(roomUUID);
    if (!room) {
      throw new BadRequestError("Cannot find room!");
    }
    try {
      const formatedStartTime = dayService.formatDateTime(startTime)
      const formatedEndTime = dayService.formatDateTime(endTime)
      return roomRepository.checkAvailRoomScheduleRange(room.id, formatedStartTime, formatedEndTime)
    } catch (error) {
      throw error
    }
  }
}
export const roomService = new RoomService(); 