import * as authApi from "../api/authApi";
import type { User } from "../types/User";

export async function login(
    email: string,
    password: string
): Promise<User> {

    return await authApi.login(
        email,
        password
    );

}

export async function register(
    username: string,
    email: string,
    password: string
): Promise<User> {

    return await authApi.register(
        username,
        email,
        password
    );

}