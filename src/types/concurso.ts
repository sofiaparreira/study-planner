export interface ConcursoDTO {
    name: string;
    date: string;
    examining_board?: string;   
}

export interface IConcurso {
    id: string;
    name: string;
    date: string;
    examining_board?: string;   
}