export type UserActivityMessage = {
    eventType: string
    userActivity: Message[]
}

export type Message = {
    userId: string
    username: string
    message: string
    timestamp: string
}