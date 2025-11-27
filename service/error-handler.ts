import { NextResponse } from 'next/server';

export function handleError(err: unknown) {
    console.error(err);
    return NextResponse.json(
        { error: err instanceof Error ? err.message : "Ошибка сервера" },
        { status: 400 }
    );
}