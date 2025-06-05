import { Request, Response } from "express"
import { WebhookPayload } from "../types"
import { BadRequestError } from "../errors/AppError"
import { roomRepository } from "../features/room/room.repository"
import { cardRepository } from "../features/card/card.repository"

const webhookRouter = async (req: Request, res: Response) => {
    try {
        const { roomUUID, cardUUID } = req.body as WebhookPayload
        const room = await roomRepository.getRoomByUUID(roomUUID)
        if (!room) {
            throw new BadRequestError("Room not found")
        }
        const card =  await cardRepository.getCardByUUID(cardUUID)
        if (card) {
            throw new BadRequestError("Card has been registered")
        }
        const existingWebhook = await roomRepository.getCardAccessToRoomWebhook(roomUUID, cardUUID)
        if (!existingWebhook) {
            await roomRepository.createRoomCardAccessWebhook(roomUUID, cardUUID, req.body)
        }
        res.status(200).json("OK")
    } catch (error) {
        throw new BadRequestError("Required roomUUID and cardUUID")
    }
}

export default webhookRouter