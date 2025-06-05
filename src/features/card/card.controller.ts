import { Request, Response } from 'express';
import { cardService } from './card.service';
import { success } from '../../utils/response';
import { CreateCardSchema, UpdateCardSchema, WhiteListCardToRoomSchema } from './card.schema';

class CardController {
  getAllCards = async (req: Request, res: Response) => {
    const cards = await cardService.getAllCards();
    res.json(success(cards, 'Fetched cards successfully'));
  };
  createCard = async (req: Request<any, any, CreateCardSchema>, res: Response) => {
    const user = req.user
    const card = await cardService.createCard({ ...req.body, userId: user.id })
    res.json(success(card, 'Create card sucessfully'))
  }
  whiteListCardToRoom = async (req: Request<any, any, WhiteListCardToRoomSchema>, res: Response) => {
    const card = await cardService.whiteListCardToRoom(req.body)
    res.json(success(card, 'White list sucessfully'))
  }
  updateCardPermission = async (req: Request<any, any, UpdateCardSchema>, res: Response) => {
    const card = await cardService.updateCardPermission(req.body)
    res.json(success(card, 'Update card sucessfully'))
  }
}
export const cardController = new CardController(); 