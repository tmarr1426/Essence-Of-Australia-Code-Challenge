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