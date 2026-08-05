import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import * as AuthService from "../../services/AuthService";
import { useAuth } from "../../hooks/useAuth";


export default function RegisterForm() {

    const [username, setUsername] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");


    const { login: loginUser } = useAuth();

    const navigate = useNavigate();



    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ) => {

        e.preventDefault();


        try {

            const user = await AuthService.register(
                username,
                email,
                password
            );


            loginUser(user);


            navigate("/");


        } catch (err) {

            console.error(err);

            setError(
                "Unable to create account."
            );

        }

    };


    return (

        <form onSubmit={handleSubmit}>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                    setUsername(e.target.value)
                }
            />


            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />


            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />


            <button 
            className="rounded-xl
    bg-white
    shadow-md
    p-6
    border
    border-gray-200"
            type="submit">
                Register
            </button>


            {error && <p>{error}</p>}

        </form>

    );

}