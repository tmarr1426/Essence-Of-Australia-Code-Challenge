export interface Game {
    id: number;
    title: string;
    votes: number;
}


export interface GamesResponse {
    games: Game[];
}