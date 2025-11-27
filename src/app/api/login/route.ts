
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

export async function POST(req: Request) {
    const formData = await req.formData();

    const login = formData.get("login") as string;
    const password = formData.get("password") as string;
    console.log(login, password)

    if (
        login !== process.env.ADMIN_LOGIN ||
        password !== process.env.ADMIN_PASSWORD
    ) {
        return new Response("Unauthorized", { status: 401 });
    }


    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({ role: "admin" })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(secret);


    const res = NextResponse.json({ ok: true });

    res.cookies.set("admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });

    return res;
}
