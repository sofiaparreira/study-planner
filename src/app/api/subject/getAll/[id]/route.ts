import { getAuthenticatedUser } from "@/src/lib/auth";
import { prisma } from "@/src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params } : { params: Promise<{ id: string }>}) {
  try {
    
    const user = getAuthenticatedUser(request);
    if (!user) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
    const { id } = await params;
    const subject = await prisma.subject.findMany({
      where: { 
        concursoId: id,
        concurso: {
          userId: user.id
        }
      },
      include: {
        topics: true
      }
    })

    return NextResponse.json(
      subject,
      { status: 200 }
    )
  } catch (error) {
    console.error("Erro ao criar matéria:", error);

        return NextResponse.json(
            { error: "Erro interno do servidor" },
            { status: 500 }
        );
  }
}
