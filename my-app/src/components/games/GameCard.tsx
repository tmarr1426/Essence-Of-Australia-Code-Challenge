import type { Game } from "../../types/Game";


interface Props {
    game: Game;
    onVote: (id:number) => Promise<void>;
    selectedVote: number | null;
    onRemove: (id:number) => Promise<void>;
}


export default function GameCard({ game, onVote, onRemove }: Props) {

    return (
        <div className="game-card">

            <h2>
                {game.title}
            </h2>

            <p>
                Votes: {game.vote_count}
            </p>

            <button onClick={() => onVote(game.id)}>
    {game.userVoted
        ? "Remove Vote"
        : "Vote"
    }
</button>
            <button
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