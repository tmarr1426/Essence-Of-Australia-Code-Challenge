/**
 * GameList.tsx (src/components/GameList.tsx)
 *
 * Main container component responsible for displaying the available games.
 *
 * Responsibilities:
 * - Retrieves game data through the useGames custom hook
 * - Displays loading and error states
 * - Renders the Add Game form
 * - Renders the Search Games component
 * - Maps game data into individual GameCard components
 * - Passes voting and removal functionality to child components
 *
 * Dependencies:
 * - useGames hook for game state management
 * - AddGameForm component
 * - SearchGames component
 * - GameCard component
 *
 * Props:
 * - None
 *
 * Notes:
 * - Acts as a presentation container
 * - Game business logic is handled by useGames.ts
 */

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