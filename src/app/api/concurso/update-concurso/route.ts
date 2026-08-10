import { getAuthenticatedUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { createConcursoSchema } from "@/src/schemas/concurso.schema";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const user = getAuthenticatedUser(request)
        if (!user) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            )
        }
        
        const { id } = await params;
        const body = request.json();
        const result = createConcursoSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.issues[0].message },
                { status: 400 }
            )
        }

        const concurso = prisma.concurso.findUnique({ where: { id } })
        if (!concurso) {
            return NextResponse.json(
                { error: "Concurso não encontrado" },
                { status: 404 }
            )
        }

        await prisma.concurso.update({
            where: { id },
            data: { body }
        })

        return NextResponse.json(
            concurso,
            { status: 200 }
        )

    } catch (error) {
        return NextResponse.json(
            { error: "Erro no servidor" },
            { status: 500 }
        );
    }
}