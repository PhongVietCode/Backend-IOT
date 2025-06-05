import { z } from 'zod';
import { Permission } from '../../../generated/prisma';

const permissionValues = Object.values(Permission) as string[];

export const createCardSchema = z.object({
  permissions: z.array(z.enum([permissionValues[0], ...permissionValues.slice(1)])),
  uuid: z.string().min(1, { message: 'UUID của thẻ không được để trống' })
});
export type CreateCardSchema = z.infer<typeof createCardSchema>
export const whiteListCardToRoomSchema = z.object({
  cardUUID: z.string().min(1, { message: 'UUID của thẻ không được để trống' }),
  roomUUID: z.string().min(1, { message: 'UUID của phòng không được để trống' })
});
export type WhiteListCardToRoomSchema = z.infer<typeof whiteListCardToRoomSchema>
export const updateCardSchema = z.object({
  cardUUID: z.string().min(1, { message: 'UUID của thẻ không được để trống' }),
  permissions: z.array(z.enum([permissionValues[0], ...permissionValues.slice(1)])),
});
export type UpdateCardSchema = z.infer<typeof updateCardSchema>