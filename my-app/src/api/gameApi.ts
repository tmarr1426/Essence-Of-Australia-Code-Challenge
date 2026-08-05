/**
 * gameApi.ts (src/api/gameApi.ts)
 *
 * API client functions for game-related backend requests.
 *
 * Responsibilities:
 * - Sends HTTP requests to PHP game endpoints
 * - Handles API communication through Axios instance
 * - Returns backend responses to service layer
 *
 * Endpoints:
 * - Retrieve games
 * - Add games
 * - Remove games
 * - Search games
 *
 * Notes:
 * - Does not contain business logic
 * - Only responsible for API communication
 */

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