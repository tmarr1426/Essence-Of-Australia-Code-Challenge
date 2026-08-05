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