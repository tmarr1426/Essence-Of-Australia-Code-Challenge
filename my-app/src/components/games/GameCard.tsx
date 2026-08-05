/**
 * GameCard.tsx (src/components/GameCard.tsx)
 *
 * Displays an individual game entry and related user actions.
 *
 * Responsibilities:
 * - Displays game information
 * - Shows current vote count
 * - Indicates whether the current user has voted
 * - Allows users to vote for a game
 * - Allows users to remove their vote
 * - Allows removal of games when permitted
 *
 * Props:
 * - game: Game object containing game information
 * - onVote: Function used to submit a vote
 * - onRemove: Function used to remove a game
 * - selectedVote: Tracks the currently selected user vote
 *
 * Notes:
 * - This component does not contain API logic
 * - Actions are passed from parent components/hooks
 */

import type { Game } from "../../types/Game";


interface Props {
    game: Game;
    onVote: (id:number) => Promise<void>;
    selectedVote: number | null;
    onRemove: (id:number) => Promise<void>;
}


export default function GameCard({ game, onVote, onRemove }: Props) {

    return (
        <div className="game-card h-full
    shadow-md
    p-6
    items-center 
    border-2 
    rounded-md 
    m-2 
    max-w-xs
    bg-green-100">

            <h2 className="items-center">
                {game.title}
            </h2>

            <p>
                Votes: {game.vote_count}
            </p>

            <button className="
    rounded-xl
    bg-white
    shadow-md
    p-6
    m-2
    border
    border-gray-200" onClick={() => onVote(game.id)}>
    {game.userVoted
        ? "Remove Vote"
        : "Vote"
    }
</button>
            <button
            className="
    rounded-xl
    bg-white
    shadow-md
    p-6
    border
    border-gray-200"
    
    onClick={() => {
        console.log("Removing game:", game.id);
        onRemove(game.id);
    }}
>
    Remove
</button>

        </div>
    );
}