import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/src/lib/prisma";

export async function GET(request: Request) {
    const cookie = request.headers
        .get("cookie")
        ?.split("; ")
        .find(cookie => cookie.startsWith("token="));

        if(!cookie) {
            return NextResponse.json({ authenticated: false }, { status: 401 })
        }

        const token = cookie.split("=")[1];
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

            const user = await prisma.user.findUnique({ 
                where: { id: decode.id },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            })

            if(!user) {
                return NextResponse.json(
                    { authenticated: false },
                    { status: 401 }
                )
            }
      
            return NextResponse.json({
                authenticated: true,
                user: user
            })

        } catch (error) {
            console.error("Erro no /api/auth/me:", error);
             return NextResponse.json(
            { authenticated: false },
            { status: 401 }
        );
        }
}