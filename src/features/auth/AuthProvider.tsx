"use client"
import { IUser } from "@/src/types/auth";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { logoutService, meService } from "./auth.service";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: IUser | null
    authenticated: boolean;
    loading: boolean;
    logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<IUser | null>(null)
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter();

    useEffect(() => {
        async function checkAuth() {
            try {
                setLoading(true)
                const data = await meService();
                setAuthenticated(data.authenticated)
                setUser(data.user)
                   
            } catch (error) {
                setAuthenticated(false)
            } finally {
                setLoading(false)
            }  
        }
        checkAuth();
    },[])

    const handleLogout = async () => {
        try {
            setLoading(true)
            await logoutService();
            setUser(null)
            setAuthenticated(false)
        } catch (error) {
            if (error instanceof Error) {
                console.log(error)
            }
            console.error("Erro ao encerrar sessão", error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthContext.Provider value={{ user, authenticated, loading, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}