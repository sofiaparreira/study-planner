export interface IUser {
    id: string;
    name: string;
    email: string;
}

export interface ISession {
    authenticated: boolean;
    user: IUser;
}

export interface LoginDTO {
    email: string;
    password: string;
}

