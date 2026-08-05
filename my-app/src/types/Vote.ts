export interface Vote {
    gameId: number;
    userId: number;
    vote: "up" | "down";
}