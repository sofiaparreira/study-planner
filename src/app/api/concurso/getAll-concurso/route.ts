import { getAuthenticatedUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) { 

    try {
        const user = getAuthenticatedUser(request)
        if (!user) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            )
        }
        const concurso = await prisma.concurso.findMany({ where: { userId: user.id }});
        return NextResponse.json(
            concurso,
            { status: 200 }
        )   
    } catch (error) {
        console.error("Erro ao buscar concursos: ", error)
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        )
    }

}