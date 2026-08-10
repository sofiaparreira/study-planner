"use client"
import { Plus } from "lucide-react";
import useConcursoById from "./useConcursoById";
import { ButtonDefault } from "@/src/components/ButtonDefault";
import { useSubject } from "../subject/useSubject";
import { NewSubjectModal } from "../subject/NewSubjectModal";
import { useState } from "react";

export function ConcursoContentPage() {

    const {
        concurso
    } = useConcursoById();

     const {
          handleChangeSubject,
          subject,
          createSubject,
      } = useSubject();
  

   const [isOpenSubjectModal, setIsOpenSubjectModal] = useState<boolean>(false);
   const toggleSubjectModal = () => {
    setIsOpenSubjectModal(!isOpenSubjectModal)
  }


    return( 
        <section className='flex items-center justify-between'>
            <h1>{concurso?.name}</h1>
            <ButtonDefault onClick={toggleSubjectModal}><Plus />Adicionar Disciplina</ButtonDefault>

            {isOpenSubjectModal && 
                <NewSubjectModal 
                    createSubject={createSubject} 
                    subject={subject} 
                    handleChangeSubject={handleChangeSubject} 
                    toggleSubjectModal={toggleSubjectModal} 
                />}
        </section>
    )
}