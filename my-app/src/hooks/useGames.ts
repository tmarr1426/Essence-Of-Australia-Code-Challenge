import { useEffect, useState } from "react";
import type { Game } from "../types/Game";
import { createGame, fetchGames } from "../services/GameService";


export function useGames() {

    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    async function loadGames() {

        try {

            setLoading(true);

            const data = await fetchGames();

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


    useEffect(() => {

        loadGames();

    }, []);


    return {
        games,
        loading,
        error,
        addNewGame,
        refreshGames: loadGames
    };

}