import { FormEvent, useState } from "react";


interface Props {
    onAddGame: (name: string) => Promise<void>;
}


export default function AddGameForm({
    onAddGame
}: Props) {

    const [name, setName] = useState("");

    const [loading, setLoading] = useState(false);


    async function handleSubmit(
        event: FormEvent
    ) {

        event.preventDefault();


        if (!name.trim()) {
            return;
        }


        try {

            setLoading(true);

            await onAddGame(name);

            setName("");

        } finally {

            setLoading(false);

        }

    }


    return (

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Game title"
                value={name}
                onChange={(event) =>
                    setName(event.target.value)
                }
            />


            <button disabled={loading}>

                {loading
                    ? "Adding..."
                    : "Add Game"
                }

            </button>

        </form>

    );

}