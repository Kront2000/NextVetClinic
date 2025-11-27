import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import { NextRequest, NextResponse } from 'next/server';

const r2 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT ?? '',
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',  
    },
})


export const upload = async (file: File, name: string): Promise<string> => {
    const contentType = file.type
    
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME ?? '',
        Key: name,
        Body:buffer,
        ContentType: contentType,
    });
    try {
        const response = await r2.send(putObjectCommand);
        console.log("Фотография загруженна");
        return `${process.env.R2_PUBLIC_URL}/${name}`;
    } catch(error) {
        console.log("Ошибка загрузки изображения");
        return 'ошибка';
    }
}