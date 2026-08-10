import { getAuthenticatedUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { createSubjectSchema } from "@/src/schemas/subject.schema";
import { NextResponse } from "next/server";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = getAuthenticatedUser(request);

        if (!user) {
            return NextResponse.json(
                { error: "Não autorizado" },
                { status: 401 }
            );
        }

        const { id } = await params;

        const body = await request.json();

        const result = createSubjectSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { error: result.error.issues[0].message },
                { status: 400 }
            );
        }

        const concurso = await prisma.concurso.findFirst({
            where: {
                id,
                userId: user.id
            }
        });

        if (!concurso) {
            return NextResponse.json(
                { error: "Concurso não encontrado" },
                { status: 404 }
            );
        }

        const subject = await prisma.subject.create({
            data: {
                ...result.data,
                concurso: {
                    connect: {
                        id
                    }
                }
            }
        });

        return NextResponse.json(subject, { status: 201 });

    } catch (error) {
        console.error("Erro ao criar matéria:", error);

        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
    }
}