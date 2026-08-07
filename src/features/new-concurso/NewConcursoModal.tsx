import { ButtonDefault } from "@/src/components/ButtonDefault";
import { InputDefault } from "@/src/components/InputDefault";

export function NewConcursoModal() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <main className="flex flex-col items-center w-full max-w-xl rounded-4xl bg-white p-8 shadow-xl">
                <h1 className="text-2xl font-bold">
                    Novo Concurso
                </h1>

                <form action="" className="w-full mt-12 space-y-4">
                    <InputDefault 
                        label="Nome do concurso" 
                        name="nomeConcurso" 
                    />

                    <InputDefault 
                        label="Data do concurso" 
                        name="dataConcurso" 
                        type="date" 
                    />
                    <ButtonDefault type="submit" wFull={true}>
                        Criar
                    </ButtonDefault>
                </form>
            </main>
        </div>
    );
}