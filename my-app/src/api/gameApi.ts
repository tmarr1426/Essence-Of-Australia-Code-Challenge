import api from "./api";
import type { GamesResponse } from "../types/Game";


export const getGames = async (
    userId: number
): Promise<GamesResponse> => {

    const response = await api.post<GamesResponse>(
        "/games.php",
        {
            userId
        }
    );

    return response.data;
};

export async function addGame(
    name: string,
    userId: number
) {

    return await api.post(
        "/add-game.php",
        {
            name,
            user_id: userId
        }
    );

}

export const removeGame = async (id: number) => {

    const response = await api.post(
        "/remove-game.php",
        {
            id
        }
    );

    return response.data
}

export const searchGames = async (query: string) => {

    const response = await api.post(
        "/search-game.php",
        {
            query
        }
    );

    return response.data;

};