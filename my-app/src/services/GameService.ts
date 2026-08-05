import { getGames, addGame, removeGame, searchGames } from "../api/gameApi";
import type { Game } from "../types/Game";


export async function fetchGames(): Promise<Game[]> {

    const response = await getGames();

    return response;
}


export async function createGame(name: string, userId: number): Promise<void> {

    await addGame(name, userId);

}

export async function deleteGame(id:number) : Promise<void> {

    await removeGame(id);

}

export async function findGames(query: string) {
    const response = await searchGames(query);
    return response.games;
}