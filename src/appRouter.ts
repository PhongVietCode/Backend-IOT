import { Router } from 'express';
import authRouter from './features/auth/auth.route';
import userRouter from './features/user/user.route';
import cardRouter from './features/card/card.route';
import roomRouter from './features/room/room.route';
import coreIOTRoute from './features/thirdparty/core-iot/coreiot.route';
import { authMiddleware } from './middlewares/authMiddleware';
import webhookRouter from './webhook';

const appRouter = Router();
appRouter.post('/webhook', webhookRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/user', userRouter);
appRouter.use('/card', authMiddleware, cardRouter);
appRouter.use('/room', authMiddleware, roomRouter);
appRouter.use('/core-iot', authMiddleware, coreIOTRoute);

export default appRouter; 