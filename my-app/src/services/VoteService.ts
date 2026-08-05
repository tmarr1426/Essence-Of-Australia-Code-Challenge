/**
 * VoteService.ts (src/services/VoteService.ts)
 *
 * Service layer responsible for handling voting operations.
 *
 * Responsibilities:
 * - Submits votes for games
 * - Removes existing votes
 *
 * Functions:
 * - castVote()
 * - deleteVote()
 *
 * Notes:
 * - Keeps voting API logic separate from UI components
 * - Used by useGames hook
 */

import { 
    voteForGame, 
    removeVote as removeVoteApi 
} from "../api/voteApi";


export async function castVote(
    gameId: number,
    userId: number
) {

    await voteForGame(
        gameId,
        userId
    );

}


export async function deleteVote(
    gameId: number,
    userId: number
) {

    await removeVoteApi(
        gameId,
        userId
    );

}