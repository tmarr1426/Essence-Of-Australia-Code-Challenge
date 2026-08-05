import { useEffect, useState } from "react";
import type { Game } from "../types/Game";
import { createGame, fetchGames, deleteGame, findGames } from "../services/GameService";
import { castVote, deleteVote } from "../services/VoteService";
import { useAuth } from "./useAuth";


export function useGames() {

    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVote] = useState<number | null>(null);
    const [searchResults, setSearchResults] = useState<Game[]>([]);
    const { user } = useAuth();


    async function loadGames() {

        try {

            setLoading(true);

            const data = await fetchGames(user?.id ?? 0);

            user ? user.id: 0

            console.log("Hook data:", data);

            setGames(data);

            setError(null);

        } catch (err) {

            console.error("Game loading error:", err);
            setError("Unable to load games");

        } finally {

            setLoading(false);

        }
    }


    async function addNewGame(name: string, userId: number) {

        try {

            await createGame(name, userId);

            // Refresh the game list after adding
            await loadGames();

        } catch (err:any){

    if(err.response?.status === 429){

        setError(
            err.response.data.error
        );

    }
    else {

        console.error("Backend error:", err.response?.data || err);

setError(
    err.response?.data?.error || "Something went wrong"
);

    }

}
    }

    async function voteOnGame(gameId: number) {

    try {

        if (!user) {
            throw new Error("User is not logged in");
        }


        const game = games.find(
            game => game.id === gameId
        );


        if (!game) {
            throw new Error("Game not found");
        }


        if (game.userVoted) {

            await deleteVote(
                gameId,
                user.id
            );

        } else {

            await castVote(
                gameId,
                user.id
            );

        }


        await loadGames();


    } catch(err: any) {

        console.error(
            "Vote error:",
            err
        );


        if (err.response?.status === 429) {

            setError(
                err.response.data.error
            );

        } else {

            setError(
                "Something went wrong"
            );

        }

    }

}


async function removeGameById(id: number) {

    try {

        await deleteGame(id);

        await loadGames();

    } catch(err) {

        console.error("Remove game error:", err);

        setError("Unable to remove game");

    }

}

async function searchGameList(query: string) {

    try {

        const results = await findGames(query);

        setSearchResults(results);

    } catch(err) {

        console.error("Search error:", err);

        setError("Unable to search games");

    }

}

    useEffect(() => {

        loadGames();

    }, []);


    return {
        games,
        searchResults,
        searchGameList,
        loading,
        error,
        addNewGame,
        refreshGames: loadGames,
        voteOnGame,
        removeGameById,
        selectedVote
    };

}