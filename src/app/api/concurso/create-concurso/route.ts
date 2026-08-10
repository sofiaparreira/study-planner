import { getAuthenticatedUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { createConcursoSchema } from "@/src/schemas/concurso.schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const user = getAuthenticatedUser(request)
        if (!user) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            )
        }

        const body = await request.json();
        const result = createConcursoSchema.safeParse(body)

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.issues[0].message },
                { status: 400 }
            )
        }

        const concurso = await prisma.concurso.create({
            data: {
                ...result.data,
                userId: user.id
            }
        })

        return NextResponse.json(
            concurso,
            { status: 201 }
        )

    } catch (error) {
        console.error("ERRO AO CRIAR CONCURSO:", error);
        return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
    }
}