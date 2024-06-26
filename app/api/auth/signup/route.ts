import db from "@/app/auth/_auth/dbUser";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password, name } = await request.json();
        const result = await db.register(email, password, name);
        
        if (result) db.requestVerification(email);
        
        return NextResponse.json(result || {});
    } catch (err: any) {
        return new Response(
            JSON.stringify({ error: err.message || err.toString() }),
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
    }
}