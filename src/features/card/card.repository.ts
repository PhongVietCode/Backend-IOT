import { Card, Permission } from '../../../generated/prisma';
import { orm } from '../../utils/orm';

class CardRepository {
  async findAll() {
    return orm.card.findMany();
  }
  async createCard(permissions: Permission[], uuid: string, userId?: number){
    return orm.card.create({
      data:{
        permissions: permissions,
        uuid: uuid,
        user_id: userId
      }
    })
  }
  async getCard(cardId: number) {
    return orm.card.findUnique({
      where:{
        id: cardId
      }
    })
  }
  async getCardByUUID(uuid: string) {
    return orm.card.findUnique({
      where:{
        uuid: uuid
      }
    })
  }
  async updateCard(cardId: number, data: Partial<Omit<Card, 'id' | 'created_at'>>){
    return orm.card.update({
      where:{
        id: cardId,
      },
      data: data
    })
  }
}
export const cardRepository = new CardRepository(); 