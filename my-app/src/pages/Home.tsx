import GameList from "../components/games/GameList";
import LogoutButton from "../components/auth/LogoutButton";


export default function Home() {

    return (

        <main>

            <h1>
                Game Voting
            </h1>

            <GameList />
            <LogoutButton />

        </main>

    );
}