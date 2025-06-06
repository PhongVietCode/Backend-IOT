import { Request, Response, NextFunction } from 'express';
import { roomService } from './room.service';
import { success } from '../../utils/response';
import { CreateCardAccessSchema, CreateRoomSchema, CreateScheduleRoom, GetCardAccessSchema, GetRoomScheduleSchema, GetRoomSchema, UpdateCardAccessToRoom, UpdateRoomSchema, UpdateScheduleSchema } from './room.schema';
import { BookingSchedule, BookingStatus, CardAccessRoomStatus, RoomStatus, RoomType } from '../../../generated/prisma';
import { coreIOTService } from '../thirdparty/core-iot/coreiot.service';

class RoomController {
  getAllRooms = async (req: Request, res: Response) => {
    const rooms = await roomService.getAllRooms();
    res.json(success(rooms, 'Fetched rooms successfully'));
  };

  createNewRoom = async (req: Request<any, any, CreateRoomSchema>, res: Response) => {
    const { roomName, status, type } = req.body
    const room = await roomService.createNewRoom({ roomName, status: status as RoomStatus, type: type as RoomType })
    res.json(success(room, "Create room successfully"))
  }
  getRoom = async (req: Request<GetRoomSchema>, res: Response) => {
    const { roomUUID } = req.params
    const room = await roomService.getRoom({ uuid: roomUUID })
    res.json(success(room, "Get room detail successfully"))
  }
  updateRoom = async (req: Request<GetRoomSchema, any, UpdateRoomSchema>, res: Response) => {
    const { roomUUID } = req.params
    const { roomName, status, type, } = req.body
    const room = await roomService.updateRoom({ roomUUID, roomName, status: status as RoomStatus, type: type as RoomType })
    res.json(success(room, "Update room successfully"))
  }
  // CARD ACCESS
  createCardAccessToRoom = async (req: Request<GetRoomSchema, any, CreateCardAccessSchema>, res: Response) => {
    const { roomUUID } = req.params
    const { cardUUID } = req.body
    const cardAccess = await roomService.createCardAccessToRoom({ roomUUID, cardUUID })
    res.json(success(cardAccess, "Card can access room now!"))
  }
  getCardAccessToRoom = async (req: Request<GetCardAccessSchema>, res: Response) => {
    const { roomUUID, cardUUID } = req.params
    const cardAccess = await roomService.getCardAccessToRoom({ roomUUID, cardUUID })
    console.log(cardAccess)
    res.json(success(cardAccess, "Get card access to room success"))
  }
  getAllCardAccess = async (req: Request<GetRoomSchema>, res: Response) => {
    const { roomUUID } = req.params
    const cardAccess = await roomService.getAllCardAccess({ roomUUID })
    res.json(success(cardAccess, "Get all card access to room success"))
  }
  updateCardAccessToRoom = async (req: Request<GetCardAccessSchema, any, UpdateCardAccessToRoom>, res: Response) => {
    const { roomUUID, cardUUID } = req.params
    const { status } = req.body
    const cardAccess = await roomService.updateCardAccessToRoom({ roomUUID, cardUUID, status: status as CardAccessRoomStatus })
    res.json(success(cardAccess, "Update card access to room!"))
  }
  deleteCardAccessToRoom = async (req: Request<GetCardAccessSchema>, res: Response) => {
    const { roomUUID, cardUUID } = req.params
    await roomService.deleteCardAccessToRoom({ roomUUID, cardUUID})
    res.json(success({}, "Update card access to room!"))
  }
  getCardAccessWebhook = async (req: Request<GetRoomSchema>, res: Response) => {
    const { roomUUID } = req.params
    const cardAccesses = await roomService.getRoomCardAccessWebhook({ roomUUID })
    res.json(success(cardAccesses, "Get access to room webhook successfully!"))
  }
  // ROOM SCHEDULE
  createScheduleRoom = async (req: Request<GetRoomSchema, any, CreateScheduleRoom>, res: Response) => {
    const user = req.user
    const { roomUUID } = req.params
    const schedule = await roomService.createScheduleRoom({ ...req.body, roomUUID, userId: user.id })
    res.json(success(schedule, "Create Schedule success!"))
  }
  getRoomSchedule = async (req: Request<GetRoomSchema>, res: Response) => {
    const { roomUUID } = req.params
    const schedule = await roomService.getRoomSchedule({ roomUUID })
    res.json(success(schedule, "Get Room Schedule success!"))
  }
  updateScheduleRoom = async (req: Request<GetRoomScheduleSchema, any, UpdateScheduleSchema>, res: Response) => {
    const { scheduleUUID } = req.params
    const { description, endTime, startTime, status } = req.body
    const schedule = await roomService.updateScheduleRoom({
      bookingUUID: scheduleUUID, data: {
        status: status as BookingStatus,
        description,
        endTime, startTime,
      }
    })
    res.json(success(schedule, "Create Schedule success!"))
  }
}
export const roomController = new RoomController(); 