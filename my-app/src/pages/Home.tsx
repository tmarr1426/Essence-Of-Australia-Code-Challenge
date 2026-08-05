import GameList from "../components/games/GameList";
import LogoutButton from "../components/auth/LogoutButton";


export default function Home() {

    return (

        <main>

            <h1 className="text-4xl font-bold text-blue-600 flex justify-center">
                Game Voting App
            </h1>

            <GameList />
            <LogoutButton />

        </main>

    );
}