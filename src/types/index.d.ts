export interface JWTPayload {
    userUUID: string
}
export interface WebhookPayload {
    roomUUID: string
    cardUUID: string
}