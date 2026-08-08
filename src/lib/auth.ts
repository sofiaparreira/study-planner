import jwt from "jsonwebtoken";

interface TokenPayload {
    id: string;
    name: string;
    email: string;
}


export function getAuthenticatedUser(request: Request) {
    const cookie = request.headers
        .get("cookie")
        ?.split("; ")
        .find(cookie => cookie.startsWith("token="));

        if(!cookie) return null;

        const token = cookie.split("=")[1];

        try {
            const decode = jwt.verify(
                token,
                process.env.JWT_SECRET!
            ) as TokenPayload;
            return decode
        } catch (error) {
            return null;
        }
}