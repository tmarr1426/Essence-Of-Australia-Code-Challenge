import api from "./api";
import type { User } from "../types/User";

export async function login(
    email: string,
    password: string
): Promise<User> {

    const response = await api.post<User>(
        "/login.php",
        {
            email,
            password
        }
    );

    return response.data;
}

export async function register(
    username: string,
    email: string,
    password: string
) {

    const response = await api.post(
        "/register.php",
        {
            username,
            email,
            password
        }
    );

    return response.data;
}