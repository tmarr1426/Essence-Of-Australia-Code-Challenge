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

    return (

        <div className="max-w-7xl mx-auto p-6">

        {/* Controls Section */}
        <div className="
            flex
            flex-col
            md:flex-row
            gap-4
            mb-8
            justify-center
        ">

            <AddGameForm
                onAddGame={addNewGame}
            />


<SearchGames
onSearch={searchGameList}
/>
</div>
<div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-6
            ">
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
        </div>

    );
}