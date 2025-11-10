import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
    const query = Number(req.nextUrl.searchParams.get('query')) || 0;

    const procedures = await prisma.procedure.findMany({
        where: {
            categoryId: query,
        },
    })

    return NextResponse.json(procedures)
}