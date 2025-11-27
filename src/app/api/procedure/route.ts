import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";
import { Prisma } from "@prisma/client";

export async function POST(req: Request) {
    const data = await req.formData();
    const url = new URL(req.url);
    const categoryId = Number(url.searchParams.get("id")); 
    if (!categoryId) return NextResponse.json({ error: "No category ID provided" }, { status: 400 });
    
    try {
        const result = await prisma.procedure.create({
            data: {
                name: data.get('name') as string,
                price: parseInt(data.get('price') as string),
                categoryId: categoryId,
            }
        })
        
        return NextResponse.json(result)
    }
    catch(e) {
        NextResponse.json({ error: "POST error" }, { status: 500 });
        console.log(e);
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });
        const category = await prisma.procedure.delete({ where: { id: Number(id) } });
        return NextResponse.json(category);
    }
    catch(e) {
       NextResponse.json({ error: "DELETE error" }, { status: 500 });
       console.log(e);
    }
}

export async function PUT(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const id = Number(searchParams.get("id"));

        if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });

        const formData = await req.formData();

        const name = formData.get("name") as string;
        const price = parseInt(formData.get("price") as string);

        if (!price) {
            return NextResponse.json({ error: "price is required" }, { status: 400 });
        }

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const updateData: Prisma.ProcedureUpdateInput = { name, price };

        console.log(updateData);
        const procedure = await prisma.procedure.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(procedure);
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}