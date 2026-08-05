import GameCard from "./GameCard";
import AddGameForm from "./AddGameForm";
import { useGames } from "../../hooks/useGames";
import SearchGames from "./SearchGames";

export default function GameList() {

    const {
        games,
        searchResults,
        searchGameList,
        loading,
        error,
        addNewGame,
        voteOnGame,
        selectedVote,
        removeGameById
    } = useGames();


    if (loading) {
        return <p>Loading games...</p>;
    }


    if (error) {
        return <p>{error}</p>;
    }

    console.log("Games:", games);
console.log("Search Results:", searchResults);

const displayedGames =
games;
    // searchResults.length > 0
    //     ? searchResults
    //     : games;

    return (

        <div>

            <AddGameForm
                onAddGame={addNewGame}
            />


<SearchGames
onSearch={searchGameList}
/>

            {
                displayedGames?.map(game => (
                    <GameCard
                        key={game.id}
                        game={game}
                        onVote={voteOnGame}
                        selectedVote={selectedVote}
                        onRemove={removeGameById}
                    />
                ))
            }

        </div>

    );
}