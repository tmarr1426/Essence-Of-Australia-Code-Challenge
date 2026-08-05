import { voteForGame, removeVote } from "../api/voteApi";


export async function castVote(gameId: number, id: number) {

    await voteForGame(gameId, id);

}

export async function deleteVote(id:number) {
    await removeVote(id);
}