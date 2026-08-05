import { useEffect, useState } from "react";
import type { Game } from "../types/Game";
import { createGame, fetchGames, deleteGame, findGames } from "../services/GameService";
import { castVote, deleteVote } from "../services/VoteService";


export function useGames() {

    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVote, setSelectedVote] = useState<number | null>(null);
    const [searchResults, setSearchResults] = useState<Game[]>([]);


    async function loadGames() {

        try {

            setLoading(true);

            const data = await fetchGames();

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


    async function addNewGame(name: string) {

        try {

            await createGame(name);

            // Refresh the game list after adding
            await loadGames();

        } catch (err) {

            console.error("Game add error:", err);
            setError("Unable to add game");

        }
    }

    async function voteOnGame(id: number) {

    try {

        if (selectedVote === id) {
            return;
        }


        if (selectedVote !== null) {

            await deleteVote(selectedVote);

        }


        await castVote(id);


        setSelectedVote(id);


        await loadGames();


    } catch(err) {

        console.error("Vote error:", err);
        setError("Unable to update vote");

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