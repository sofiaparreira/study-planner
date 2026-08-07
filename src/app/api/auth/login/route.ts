import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if(!email || !password) {
            return NextResponse.json({ message: "E-mail e senha são campos obrigatórios."}, {status: 400})
        }
        
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if(!user) return NextResponse.json({error: "Usuário não encontrado"}, { status: 404})

        const passwordValid = await bcrypt.compare(password, user.password);
        if(!passwordValid) return NextResponse.json({ error: "Senha inválida"}, {status: 401})

        const response = NextResponse.json({
            message: "Login realizado",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }, { status: 201 })

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, 
        process.env.JWT_SECRET!,
        { expiresIn: "7d",

        })

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7
        })

        return response;
      
    } catch(error) {
        console.error("Erro ao realizar login", error)
        return NextResponse.json({error: "Erro interno do servidor"}, { status: 500 })
    }
}

