export interface Game {
    id: number;
    name: string;
    votes: number;
}


export interface GamesResponse {
    games: Game[];
}