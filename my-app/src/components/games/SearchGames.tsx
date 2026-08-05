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
            className="rounded-xl
    bg-white
    shadow-md
    p-6
    border
    border-gray-200
    m-5"
                value={query}
                onChange={(e) =>
                    setQuery(e.target.value)
                }
                placeholder="Search games..."
            />


            <button className="rounded-xl
    bg-white
    shadow-md
    p-6
    border
    border-gray-200"
     type="submit">
                Search
            </button>

        </form>

    );

}