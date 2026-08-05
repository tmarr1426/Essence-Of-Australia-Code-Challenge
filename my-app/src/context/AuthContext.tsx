import {
    createContext,
    useContext,
    useState,
} from "react";

import type { ReactNode } from "react";

import type { User } from "../types/User";

interface AuthContextType {
    user: User | null;

    login: (user: User) => void;

    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
    children
}: AuthProviderProps) {

    const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem("user");

    return savedUser
        ? JSON.parse(savedUser)
        : null;

});

    // useEffect(() => {

    //     const storedUser = localStorage.getItem("user");

    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser));
    //     }

    // }, []);

    const login = (user: User) => {

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setUser(user);
    };

    const logout = () => {

        localStorage.removeItem("user");

        setUser(null);
    };

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>

    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within an AuthProvider"
        );
    }

    return context;
}