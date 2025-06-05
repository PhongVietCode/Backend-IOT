import { Router } from 'express';
import { userController } from './user.controller';
import { asyncWrapper } from '../../middlewares/asyncWrapper';
import { validateRequest } from '../../middlewares/zodValidate';
import { createUserSchema, getUserSchema } from './user.schema';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/', validateRequest({ body: createUserSchema }), asyncWrapper(userController.createNewUser));
router.get('/me', authMiddleware, asyncWrapper(userController.getUserProfile));

export default router;  