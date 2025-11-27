import { NextResponse } from "next/server"
import { prisma } from "../../../../prisma/prisma-client"
import { NextApiRequest, NextApiResponse } from "next";
import app from "next/app";
import { Api } from "../../../../service/api-client";

export async function GET() {
    const categoryProcedure = await prisma.categoryProcedure.findMany();
    return NextResponse.json(categoryProcedure)
}

export async function POST(req: Request) {
    const data = await req.formData();
    
    const url = await Api.imageUploader.upload(data.get('image') as File, data.get('name') as string)

    if (!data.get('name')) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

    try {
        const result = await prisma.categoryProcedure.create({
            data: {
                imgUrl: url,
                name: data.get('name') as string,
            }
        })
        console.log("Категория успешно добавлена");
        return NextResponse.json(result)
    }
    catch(e) {
        console.log(e);
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();
        if (!id) return NextResponse.json({ error: "No ID provided" }, { status: 400 });
        const procedure = await prisma.procedure.deleteMany({where: {categoryId: Number(id)}})
        const category = await prisma.categoryProcedure.delete({ where: { id: Number(id) } });
        return NextResponse.json(category);
    }
    catch(e) {
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
        const image = formData.get("image") as File;

        if (!name) {
            return NextResponse.json({ error: "Name is required" }, { status: 400 });
        }

        const updateData: any = { name };

        // Если юзер загрузил новое фото — загружаем и обновляем
        if (image && image.size > 0) {
            const url = await Api.imageUploader.upload(image, name);
            updateData.imgUrl = url;
        }

        const category = await prisma.categoryProcedure.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(category);
    }
    catch (e) {
        console.log(e);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}