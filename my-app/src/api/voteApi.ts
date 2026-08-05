/**
 * voteApi.ts (src/api/voteApi.ts)
 *
 * API client functions for voting operations.
 *
 * Responsibilities:
 * - Sends vote creation requests
 * - Sends vote removal requests
 *
 * Endpoints:
 * - vote.php
 * - remove-vote.php
 *
 * Notes:
 * - Uses shared Axios configuration
 * - Keeps HTTP logic separate from services
 */

import api from "./api";


export async function voteForGame(
    gameId: number,
    userId: number
) {

    const response = await api.post(
        "/vote.php",
        {
            gameId: gameId,
            userId: userId
        }
    );

    return response.data;
}

export const removeVote = async (
    gameId: number,
    userId: number
) => {

    const response = await api.post(
        "/remove-vote.php",
        {
            gameId,
            userId
        }
    );

    return response.data;

};