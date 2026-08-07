import { ConcursoDTO } from "@/src/types/concurso"
import { useState } from "react"
import { createConcursoService } from "./concurso.service";
import { toast } from "sonner";

export default function useConcurso() {
    const [loading, setLoading] = useState<boolean>(false);
    const [concursoRequest, setConcursoRequest] = useState<ConcursoDTO>({
        name: "",
        date: "",
        examining_board: "",
    });
    
    const handleChangeConcurso = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setConcursoRequest((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const createConcurso = async () => {
        try {
            setLoading(true)
            const data = await createConcursoService({
                name: concursoRequest.name,
                date: concursoRequest.date,
                examining_board: concursoRequest.examining_board
            })

            console.log('2 -service terminou')
            toast.success("Concurso criado com sucesso")
            console.log('teste', data)
        } catch (error) {
            if(error instanceof Error) {
                toast.error(error.message)
            } else{
                toast.error("Erro interno no servidor")
                console.log("Erro ao criar concurso", error)
            }
            throw error;
        } finally {
            setLoading(false)
        }
    }

    return {
        concursoRequest, 
        handleChangeConcurso,
        createConcurso
    }
}