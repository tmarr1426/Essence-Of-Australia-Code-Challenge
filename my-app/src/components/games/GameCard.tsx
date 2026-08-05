import type { Game } from "../../types/Game";


interface Props {
    game: Game;
    onVote: (id:number) => Promise<void>;
    selectedVote: number | null;
    onRemove: (id:number) => Promise<void>;
}


export default function GameCard({ game, onVote, selectedVote, onRemove }: Props) {

    return (
        <div className="game-card">

            <h2>
                {game.title}
            </h2>

            <p>
                Votes: {game.votes}
            </p>

            <button onClick={() => onVote(game.id)}
                disabled={selectedVote === game.id}>
                {selectedVote === game.id
                ? "Voted"
            : "Vote"}
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