import { prisma } from "@/src/lib/prisma";
import { createConcursoSchema } from "@/src/schemas/concurso.shema";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    try {
        const body = await request.json();
        const result = createConcursoSchema.safeParse(body)

        if(!result.success) {
            return NextResponse.json(
                { error: result.error.issues[0].message },
                { status: 400 }
            )
        }
        
        const concurso = await prisma.concurso.create({
            data: result.data
        })

        return NextResponse.json(
            concurso, 
            { status: 201 }
        )

    } catch (error) {
        return NextResponse.json({ error: "Erro interno do servidor"}, { status: 500 })
    }
}