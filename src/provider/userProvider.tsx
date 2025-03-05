import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authProvider";
import axios from "axios";

type User = {
    author: object
    email: string,
    fullname: string,
    id: number,
    username: string
}

type UserContextType = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}
const UserContext = createContext<UserContextType | null>(null)
const base = import.meta.env.VITE_BACKEND_API_URL_BASE

export const UserProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null)
    const { token } = useAuth()

    useEffect(() => {
        (() => {
            if (token) {
                axios.get(base + "/users/profile", {
                    withCredentials: true,
                })
                    .then(response => {
                        setUser(response.data)
                    })
                    .catch(error => {
                        console.error("Error:", error);
                    });
            } else {
                setUser(null)
            }
        })();
    }, [token])
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    if (!UserContext) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return useContext(UserContext);
};