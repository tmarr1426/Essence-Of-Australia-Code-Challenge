export interface Game {

    id: number;

    title: string;

    description?: string;

    image_url?: string;

    vote_count: number;

    user_id: number;

    userVoted: boolean;

}


export interface GamesResponse {
    games: Game[];
}