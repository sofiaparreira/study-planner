import { SubjectDTO } from "@/src/types/subject";

export async function createSubjectService(concursoId: string, body: SubjectDTO) {
    const response = await fetch(`/api/subject/create-subject/${concursoId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    const data = await response.json();
    if(!response.ok) {
        throw new Error(data.error);
    }
    return data;
    
}