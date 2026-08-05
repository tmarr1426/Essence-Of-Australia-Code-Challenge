/**
 * AddGameForm.tsx (src/components/AddGameForm.tsx)
 *
 * Form component used to submit new game suggestions.
 *
 * Responsibilities:
 * - Captures user input for a new game
 * - Validates submitted data
 * - Calls parent callback when submitting a new game
 * - Clears form state after successful submission
 *
 * Props:
 * - onAddGame: Callback function used to create a new game
 *
 * Notes:
 * - Form state is locally managed
 * - API communication is handled through service functions
 */

import type { FormEvent } from "react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";


interface Props {
    onAddGame: (
        name: string,
        userId: number
    ) => Promise<void>;
}


export default function AddGameForm({
    onAddGame
}: Props) {

    const { user } = useAuth();

    const [name, setName] = useState("");

    const [loading, setLoading] = useState(false);


    async function handleSubmit(
        event: FormEvent
    ) {

        event.preventDefault();


        if (!name.trim() || !user) {
            return;
        }


        try {

            setLoading(true);


            await onAddGame(
                name,
                user.id
            );


            setName("");


        } finally {

            setLoading(false);

        }

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
                type="text"
                placeholder="Game title"
                value={name}
                onChange={(event) =>
                    setName(event.target.value)
                }
            />


            <button className="rounded-xl
    bg-white
    shadow-md
    p-6
    border
    border-gray-200
    m-5"
    disabled={loading}>

                {loading
                    ? "Adding..."
                    : "Add Game"
                }

            </button>

        </form>

    );

}