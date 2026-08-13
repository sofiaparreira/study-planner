export interface ConcursoDTO {
    name: string;
    date: string;
    examining_board?: string;   
    weekly_hours: number;
}

export interface IConcurso {
    id: string;
    name: string;
    date: string;
    examining_board?: string;   
}