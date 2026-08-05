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

        <form onSubmit={handleSubmit}>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">
                Login
            </button>
            <p>
    Don't have an account?
    <Link to="/register">
        Register
    </Link>
</p>

            {error && <p>{error}</p>}

        </form>

    );

}