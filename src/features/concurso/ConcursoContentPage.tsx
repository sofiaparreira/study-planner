"use client"
import { Plus } from "lucide-react";
import useConcursoById from "./useConcursoById";
import { ButtonDefault } from "@/src/components/ButtonDefault";

export function ConcursoContentPage() {

    const {
        concurso
    } = useConcursoById();

    return( 
        <section className='flex items-center justify-between'>
            <h1>{concurso?.name}</h1>
            <ButtonDefault><Plus />Adicionar Disciplina</ButtonDefault>
        </section>
    )
}