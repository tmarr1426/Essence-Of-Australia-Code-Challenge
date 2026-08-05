import type { Game } from "../../types/Game";


interface Props {
    game: Game;
}


export default function GameCard({ game }: Props) {

    return (
        <div className="game-card">

            <h2>
                {game.name}
            </h2>

            <p>
                Votes: {game.votes}
            </p>

            <button>
                Vote
            </button>

        </div>
    );
}