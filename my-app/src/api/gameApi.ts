import api from "./api";
import type { GamesResponse } from "../types/Game";


export const getGames = async (): Promise<GamesResponse> => {

    const response = await api.get<GamesResponse>(
        "/games.php"
    );

    return response.data;
};

export const addGame = async (name: string) => {

    const response = await api.post(
        "/add-game.php",
        {
            name
        }
    );

    return response.data;
};