import { NextResponse } from "next/server"
import { prisma } from "../../../../prisma/prisma-client"

export async function GET() {
    const categoryProcedure = await prisma.categoryProcedure.findMany();
    return NextResponse.json(categoryProcedure)
}