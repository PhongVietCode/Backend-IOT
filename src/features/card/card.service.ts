import { cardRepository } from './card.repository';
import { Card, Permission } from '../../../generated/prisma';
import { roomService } from '../room/room.service';
import { roomRepository } from '../room/room.repository';
import { BadRequestError, InternalServerError } from '../../errors/AppError';

class CardService {
  async getAllCards() {
    return cardRepository.findAll();
  }
  async createCard({ permissions, uuid, userId }: { permissions: string[], uuid: string, userId?: number }) {
    return cardRepository.createCard(permissions as Permission[], uuid, userId)
  }
  async whiteListCardToRoom({ cardUUID, roomUUID }: { cardUUID: string, roomUUID: string }) {
    const room = await roomRepository.getRoomByUUID(roomUUID);
    if (!room) {
      throw new BadRequestError("Room not found");
    }
    const card = await cardRepository.getCardByUUID(cardUUID);
    if (!card) {
      throw new BadRequestError("Card not found");
    }
    const existingCard = await roomRepository.getCardAccessToRoom(room.id, card.id)
    if (existingCard) {
      throw new BadRequestError("Card can access to this room already");
    }
    const newCardAccess = await roomRepository.createCardAccessToRoom(room.id, card.id);
    if (!newCardAccess) {
      throw new InternalServerError("Card not found");
    }
    return newCardAccess;
  }
  async updateCardPermission({ cardUUID, permissions }: { cardUUID: string, permissions: string[] }) {
    const card = await cardRepository.getCardByUUID(cardUUID);
    if (!card) {
      throw new BadRequestError("Card not found");
    }
    const updatedCard = await cardRepository.updateCard(card.id, {
      permissions: permissions as Permission[],
    })
    if (!updatedCard) {
      throw new InternalServerError("Card cannot not update");
    }
    return updatedCard;
  }
}
export const cardService = new CardService(); 