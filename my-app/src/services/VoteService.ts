import { voteForGame, removeVote } from "../api/voteApi";


export async function castVote(id: number) {

    await voteForGame(id);

}

export async function deleteVote(id:number) {
    await removeVote(id);
}