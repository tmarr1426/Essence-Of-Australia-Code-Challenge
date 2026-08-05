import GameCard from "./GameCard";
import AddGameForm from "./AddGameForm";
import { useGames } from "../../hooks/useGames";


export default function GameList() {

    const {
        games,
        loading,
        error,
        addNewGame
    } = useGames();


    if (loading) {
        return <p>Loading games...</p>;
    }


    if (error) {
        return <p>{error}</p>;
    }


    return (

        <div>

            <AddGameForm
                onAddGame={addNewGame}
            />


            {
                games.map(game => (
                    <GameCard
                        key={game.id}
                        game={game}
                    />
                ))
            }

        </div>

    );
}