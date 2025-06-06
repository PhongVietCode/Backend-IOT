import { Router } from 'express';
import { roomController } from './room.controller';
import { asyncWrapper } from '../../middlewares/asyncWrapper';
import { roomRepository } from './room.repository';
import { validateRequest } from '../../middlewares/zodValidate';
import { createCardAccessSchema, createRoomSchema, createScheduleRoom, getCardAccessSchema, getRoomScheduleSchema, getRoomSchema, updateCardAccessToRoom, updateRoomSchema, updateScheduleSchema } from './room.schema';

const router = Router();
router.get("/", asyncWrapper(roomController.getAllRooms))
router.post("/", validateRequest({ body: createRoomSchema }), asyncWrapper(roomController.createNewRoom))
router.get("/:roomUUID", validateRequest({ params: getRoomSchema }), asyncWrapper(roomController.getRoom))
router.patch("/:roomUUID", validateRequest({ params: getRoomSchema, body: updateRoomSchema }), asyncWrapper(roomController.updateRoom))

router.get("/:roomUUID/cardaccess", validateRequest({ params: getRoomSchema }), asyncWrapper(roomController.getCardAccessWebhook))
router.get("/:roomUUID/cardaccesses", validateRequest({ params: getRoomSchema }), asyncWrapper(roomController.getAllCardAccess))
router.post("/:roomUUID/cardaccess", validateRequest({ body: createCardAccessSchema, params: getRoomSchema }), asyncWrapper(roomController.createCardAccessToRoom))
router.get("/:roomUUID/cardaccess/:cardUUID", validateRequest({ params: getCardAccessSchema }), asyncWrapper(roomController.getCardAccessToRoom))
router.patch("/:roomUUID/cardaccess/:cardUUID", validateRequest({ params: getCardAccessSchema, body: updateCardAccessToRoom }), asyncWrapper(roomController.updateCardAccessToRoom))

router.delete("/:roomUUID/cardaccess/:cardUUID", validateRequest({ params: getCardAccessSchema }), asyncWrapper(roomController.deleteCardAccessToRoom))

router.post("/:roomUUID/schedule", validateRequest({ params: getRoomSchema, body: createScheduleRoom }), asyncWrapper(roomController.createScheduleRoom))
router.get("/:roomUUID/schedule", validateRequest({ params: getRoomSchema }), asyncWrapper(roomController.getRoomSchedule))
router.patch("/:roomUUID/schedule/:scheduleUUID", validateRequest({ params: getRoomScheduleSchema, body: updateScheduleSchema }), asyncWrapper(roomController.updateScheduleRoom))


export default router; 