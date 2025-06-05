import { z } from 'zod'
import { Role } from '../../../generated/prisma'
const userRole = Object.values(Role) as string[]
export const getUserSchema = z.object({
    userUUID: z.string().min(1)
})
export type GetUserSchema = z.infer<typeof getUserSchema>

export const createUserSchema = z.object({
    email: z.string().email(),
    role: z.enum([userRole[0], ...userRole[1].slice()]),
    name: z.string().min(1)
})
export type CreateUserSchema = z.infer<typeof createUserSchema>