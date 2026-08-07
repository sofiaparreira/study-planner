import { LoginDTO } from "@/src/types/auth";


export async function login(body: LoginDTO) {
    const response = await fetch("/api/auth/login" , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })
    const data = await response.json();
    if(!response.ok) throw new Error(data.error)
    return data
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export async function register(body: RegisterRequest) {
    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
    const data = await response.json()
    if (!response.ok) throw new Error(data.error)
    return data
}


export async function logoutService() {
    const response = await fetch("api/auth/logout", {
        method: "POST",
    })
    const data = await response.json()
    if(!response.ok) throw new Error(data.error)
    
    return data;
}

export async function meService() {
    const response = await fetch("api/auth/me", {
        method: "GET"
    })
    const data = await response.json()
    if(!response.ok) throw new Error(data.error)
    return data
}