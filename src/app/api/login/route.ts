import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import { checkLimit } from "@/lib/rateLimt";


export async function POST(req: Request) {
  // нормализуем IP
  let ip = req.headers.get("x-forwarded-for") || "unknown";
  ip = ip.split(",")[0].trim(); // берем первый IP если список

  // rate-limit
  if (!checkLimit(ip)) {
    return NextResponse.json({ error: "Слишком много попыток" }, { status: 429 });
  }

  const formData = await req.formData();
  const login = formData.get("login");
  const password = formData.get("password");

  if (
    login !== process.env.ADMIN_LOGIN ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ error: "Неверный логин или пароль" }, { status: 401 });
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
