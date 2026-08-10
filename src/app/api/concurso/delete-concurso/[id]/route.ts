import { getAuthenticatedUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params } : { params: Promise<{ id: string }>}) {
    try {
        const user = getAuthenticatedUser(request);
        if (!user) return NextResponse.json({ error: "Não autorizado" }, { status: 401 })

        const { id } = await params;
        const concurso = await prisma.concurso.findFirst({
            where: { 
                id, 
                userId: user.id
            }
        });

        if (!concurso) {
            return NextResponse.json(
                { error: "Concurso não encontrado" },
                { status: 401 }
            )
        }

        await prisma.concurso.delete({ where: { id } })

        return NextResponse.json(
            { message: "Concurso excluido" },
            { status: 200 }
        );

    } catch (error) {
      console.error("Erro ao excluir concurso: ", error)
        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        )  
    }
}