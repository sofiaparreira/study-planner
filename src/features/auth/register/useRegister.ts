import { useState } from "react"
import { LoginDTO } from "../auth"
import { register, RegisterRequest } from "../auth.service";


export default function useRegister() {
    const [credentials, setCredentials] = useState<RegisterRequest>({
        name: "",
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("")

    const handleRegister = async () => {
        try {
            setLoading(true);
            const response = await register({
                name: credentials.name,
                email: credentials.email, 
                password: credentials.password,

            })
            
            return response

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
        handleRegister,
        credentials, 
        handleChange,
        loading
    }
}