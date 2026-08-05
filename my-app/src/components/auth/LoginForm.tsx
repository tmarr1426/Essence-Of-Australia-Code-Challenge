import type { FormEvent } from "react";
import { useState } from "react";
import * as AuthService from "../../services/AuthService";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function LoginForm() {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const { login: loginUser } = useAuth();

    const navigate = useNavigate();

    const handleSubmit = async (
        e: FormEvent
    ) => {

        e.preventDefault();

        try {

            const user = await AuthService.login(
                email,
                password
            );

            loginUser(user);

            navigate("/")

        } catch (err) {

            setError("Invalid email or password.");

            console.error(err);

        }

    };

    return (

        <form
        className="grid-cols-2 bg-green-100 border border-black-200 shadow" 
        onSubmit={handleSubmit}>

            <input
            className="border border-black-200 m-2"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
            className="border border-black-200 m-2"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button 
            className="rounded-xl
    bg-white
    shadow-md
    p-2
    border
    border-gray-200
    flex
    justify-center"
            type="submit">
                Login
            </button>
            <p className="m-5">
    Don't have an account?
    <Link to="/register"
    className="text-blue-600">
        Register
    </Link>
</p>

            {error && <p>{error}</p>}

        </form>

    );

}