import { ButtonDefault } from "@/src/components/ButtonDefault";
import { InputDefault } from "@/src/components/InputDefault";
import { CloseButton } from "@/src/components/CloseButton";
import { SubjectDTO } from "@/src/types/subject";

interface NewSubjectModelProps {
    toggleSubjectModal: () => void;
    createSubject: () => void;
    handleChangeSubject: (event: React.ChangeEvent<HTMLInputElement>) => void;
    subject: SubjectDTO
}

export function NewSubjectModal({toggleSubjectModal, createSubject, handleChangeSubject, subject} : NewSubjectModelProps) {

  
    return (
        <div onClick={toggleSubjectModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <main onClick={(e) => e.stopPropagation()} className="flex flex-col items-center w-full max-w-xl rounded-4xl bg-white p-8 shadow-xl">
                <div className='w-full flex items-center justify-end'>
                    <CloseButton aria-label="Fechar Modal" onClick={toggleSubjectModal} />
                </div>
                <h1 className="text-2xl font-bold">
                    Nova Disciplina
                </h1>

                <form 
                    action="POST" 
                    onSubmit={async (e) => {
                        e.preventDefault();
                            await createSubject();
                            toggleSubjectModal();
                    }} 
                    className="w-full mt-12 space-y-4">
                    <InputDefault 
                        label="Nome da disciplina" 
                        name="name" 
                        isRequired={true}
                        onChange={handleChangeSubject}
                        value={subject.name}
                    />

                    <div className='flex gap-3 items-center justify-center'>
                        <InputDefault
                            label="Quantidade de questões"
                            name="quantity_questions"
                            type="number"
                            isRequired={true}
                            onChange={handleChangeSubject}
                            value={subject.quantity_questions}
                        />
                        <InputDefault
                            label="Pontos por questão"
                            name="points_per_questions"
                            type="number"
                            isRequired={true}
                            onChange={handleChangeSubject}
                            value={subject.points_per_questions}
                        />
                    </div>

                    <ButtonDefault type="submit" wFull={true}>
                        Criar
                    </ButtonDefault>
                </form>
            </main>
        </div>
    );
}