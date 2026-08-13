export interface SubjectDTO {
    name: string;
    quantity_questions: number;
    points_per_questions: number;
    topics: TopicDTO[];
}

export interface TopicDTO {
    name: string;
}

export interface ISubject {
    id: string;
    name: string;
    quantity_questions: number;
    points_per_questions: number;
    topics: ITopic[]
}


export interface ITopic {
    id: string;
    name: string
}