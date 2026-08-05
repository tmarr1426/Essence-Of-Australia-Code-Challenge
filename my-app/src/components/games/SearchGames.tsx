import { useState } from "react";


interface Props {

    onSearch: (query:string) => Promise<void>;

}


export default function SearchGames({
    onSearch
}: Props) {


    const [query, setQuery] = useState("");


    async function handleSubmit(
        e: React.FormEvent
    ) {

        e.preventDefault();

        await onSearch(query);

    }


    return (

        <form onSubmit={handleSubmit}>

            <input
                value={query}
                onChange={(e) =>
                    setQuery(e.target.value)
                }
                placeholder="Search games..."
            />


            <button type="submit">
                Search
            </button>

        </form>

    );

}