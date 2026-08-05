import api from "./api";


export const voteForGame = async (id: number) => {

    const response = await api.post(
        "/vote.php",
        {
            id
        }
    );

    return response.data;

};

export const removeVote = async (id: number) => {
    const response = await api.post(
        "/remove-vote.php",
        {
            id
        }
    );
    
    return response.data;
    
}