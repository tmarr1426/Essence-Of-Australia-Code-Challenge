import { getGames, addGame } from "../api/gameApi";
import type { Game } from "../types/Game";


export async function fetchGames(): Promise<Game[]> {

    const response = await getGames();

    return response.games;
}


export async function createGame(name: string): Promise<void> {

    await addGame(name);

}