import { z } from 'zod'
import { BookingStatus, CardAccessRoomStatus, RoomStatus, RoomType } from '../../../generated/prisma';
const roomStatus = Object.values(RoomStatus) as string[];
const roomTypes = Object.values(RoomType) as string[];
const cardAccessStatus = Object.values(CardAccessRoomStatus) as string[]
const bookingStatus = Object.values(BookingStatus) as string[]
export const createRoomSchema = z.object({
    roomName: z.string(),
    status: z.enum([roomStatus[0], ...roomStatus.slice(1)]).optional(),
    type: z.enum([roomTypes[0], ...roomTypes.slice(1)]).optional()
})
export type CreateRoomSchema = z.infer<typeof createRoomSchema>

export const updateRoomSchema = createRoomSchema.extend({
    roomName: z.string().optional()
})
export type UpdateRoomSchema = z.infer<typeof updateRoomSchema>

export const getRoomSchema = z.object({
    roomUUID: z.string().min(1)
})
export type GetRoomSchema = z.infer<typeof getRoomSchema>

export const getRoomScheduleSchema = getRoomSchema.extend({
    scheduleUUID: z.string().min(1),
})
export type GetRoomScheduleSchema = z.infer<typeof getRoomScheduleSchema>

export const updateScheduleSchema = z.object({
    status: z.enum([bookingStatus[0], ...bookingStatus.slice(1)]).optional(),
    description: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
})
export type UpdateScheduleSchema = z.infer<typeof updateScheduleSchema>

export const createCardAccessSchema = z.object({
    cardUUID: z.string().min(1),
})
export type CreateCardAccessSchema = z.infer<typeof createCardAccessSchema>

export const getCardAccessSchema = getRoomSchema.extend({
    cardUUID: z.string().min(1),
})
export type GetCardAccessSchema = z.infer<typeof getCardAccessSchema>

export const updateCardAccessToRoom = z.object({
    status: z.enum([cardAccessStatus[0], ...cardAccessStatus.slice(1)]),
})
export type UpdateCardAccessToRoom = z.infer<typeof updateCardAccessToRoom>

export const createScheduleRoom = z.object({
    description: z.string().min(1),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
})
export type CreateScheduleRoom = z.infer<typeof createScheduleRoom>
