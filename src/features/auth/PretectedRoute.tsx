"use client"
import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function ProtectedRoute({children}: {children: React.ReactNode}) {

    const { authenticated, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if(!loading && !authenticated) {
            toast.error("Faça login para ter acesso a página")
            router.push("/login")
        }
    }, [authenticated, loading, router])

    if(loading) {
        return <p>Carregando...</p>
    }

    if(!authenticated) return null;
    return children;
}