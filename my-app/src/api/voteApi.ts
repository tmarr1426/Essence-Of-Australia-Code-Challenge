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