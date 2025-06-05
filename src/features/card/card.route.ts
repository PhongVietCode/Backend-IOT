import { Router } from 'express';
import { cardController } from './card.controller';
import { asyncWrapper } from '../../middlewares/asyncWrapper';
import { createCardSchema, updateCardSchema, whiteListCardToRoomSchema } from './card.schema';
import { validateRequest } from '../../middlewares/zodValidate';

const router = Router();

// Example route
router.get('/', asyncWrapper(cardController.getAllCards));
router.post('/', validateRequest({ body: createCardSchema }), asyncWrapper(cardController.createCard))
router.post('/whitelist-room', validateRequest({ body: whiteListCardToRoomSchema }), asyncWrapper(cardController.whiteListCardToRoom))
router.patch('/', validateRequest({ body: updateCardSchema }), asyncWrapper(cardController.updateCardPermission))
export default router;