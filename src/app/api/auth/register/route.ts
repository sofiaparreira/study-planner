import { NextResponse } from "next/server"
import { prisma } from "@/src/lib/prisma";
import bcrypt from "bcrypt"


export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        const existingUser = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (existingUser) return NextResponse.json({error: "E-mail já cadastrado"}, {status: 409});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name, 
                email, 
                password: hashedPassword
            }
        })

        return NextResponse.json({
            message: "Usuário criado com sucesso", 
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }, { status: 200 })

    } catch (error) {
        console.error("Erro ao realizar cadastro", error)
        return NextResponse.json({error: "Erro interno no servidor"}, {status: 500})
    }
}