import { useState } from "react"
import { login } from "../auth.service";
import { useRouter } from "next/navigation";
import { LoginDTO } from "@/src/types/auth";


export default function useLogin() {
    const [credentials, setCredentials] = useState<LoginDTO>({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("")
    const router = useRouter()

    const handleLogin = async () => {
        try {
            setLoading(true);
            const response = await login({
                email: credentials.email, 
                password: credentials.password
            })
            
            router.push("/")
            return response;

        } catch (error) {
            const message = 
                error instanceof Error ? error.message : "Erro ao fazer login";
            setError(message);
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCredentials((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    return {
        handleLogin,
        credentials, 
        handleChange,
        loading
    }
}