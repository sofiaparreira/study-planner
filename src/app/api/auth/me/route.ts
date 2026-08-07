import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

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
            const decode = jwt.verify(token, process.env.JWT_SECRET!);
            return NextResponse.json({
                authenticated: true,
                user: decode
            })
        } catch (error) {
             return NextResponse.json(
            { authenticated: false },
            { status: 401 }
        );
        }
}