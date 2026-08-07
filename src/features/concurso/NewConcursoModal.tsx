import { ButtonDefault } from "@/src/components/ButtonDefault";
import { InputDefault } from "@/src/components/InputDefault";
import useConcurso from "./useConcurso";
import { create } from "domain";
import { X } from "lucide-react";
import { CloseButton } from "@/src/components/CloseButton";

interface NewConcursoModalProps {
    toggleModal: () => void;
}

export function NewConcursoModal({ toggleModal }: NewConcursoModalProps) {

    const {
        concursoRequest, 
        handleChangeConcurso, 
        createConcurso
    } = useConcurso()

    return (
        <div onClick={toggleModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <main onClick={(e) => e.stopPropagation()} className="flex flex-col items-center w-full max-w-xl rounded-4xl bg-white p-8 shadow-xl">
                <div className='w-full flex items-center justify-end'>
                    <CloseButton aria-label="Fechar Modal" onClick={toggleModal} />
                </div>
                <h1 className="text-2xl font-bold">
                    Novo Concurso
                </h1>

                <form 
                    action="POST" 
                    onSubmit={async (e) => {
                        e.preventDefault();
                            await createConcurso();
                            toggleModal();
                    }} 
                    className="w-full mt-12 space-y-4">
                    <InputDefault 
                        label="Nome do concurso" 
                        name="name" 
                        isRequired={true}
                        onChange={handleChangeConcurso}
                        value={concursoRequest.name}
                    />

                    <InputDefault 
                        label="Nome da banca" 
                        name="examining_board" 
                        onChange={handleChangeConcurso}
                        value={concursoRequest.examining_board}
                    />

                    <InputDefault 
                        label="Data do concurso" 
                        name="date" 
                        type="date" 
                        isRequired={true}
                        onChange={handleChangeConcurso}
                        value={concursoRequest.date}
                    />
                    
                    <ButtonDefault type="submit" wFull={true}>
                        Criar
                    </ButtonDefault>
                </form>
            </main>
        </div>
    );
}