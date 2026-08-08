import { ConcursoDTO } from "@/src/types/concurso";

export async function getAllConcursoService() {
    const response = await fetch("/api/concurso/getAll-concurso");
    const data = await response.json();

    if(!response.ok) throw new Error(data.error);
    return data;
}

export async function createConcursoService(body: ConcursoDTO) {
    const response = await fetch("/api/concurso/create-concurso", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    if(!response.ok) {
        throw new Error(data.error);
    }
    return data;
}