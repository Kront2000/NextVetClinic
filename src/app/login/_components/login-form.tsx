'use client'
import React, { FormEvent } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared";
import { useRouter } from 'next/navigation';
import { Spinner } from "@/components/ui/spinner";

interface Props {
    className?: string;
}

export const LoginForm: React.FC<Props> = ({ className }) => {

    const [isLoading, setIsLoading] = React.useState(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)

        if (!formData.get('login')) return alert("Введите логин");
        if (!formData.get('password')) return alert("Введите пароль");

        setIsLoading(true);

        const response = await fetch('/api/login', {
            method: 'POST',
            body: formData,
        });

        setIsLoading(false);

        if (response.ok) {
            window.location.href = "/admin";
        } else {
            try {
                const data = await response.json();
                alert(data.error);
            } catch {
                alert("Ошибка авторизации");
            }
        }
    }

    return (
        <Container className="py-96 items-center">
            <div className="border-2 border-blue-500 rounded-2xl mx-auto w-[70%] sm:w-[40%]  p-4">
                <h1 className="text-center text-2xl xs:text-3xl sm:text-4xl xl:text-5xl font-extrabold text-stone-800">
                    Авторизация
                </h1>

                <form onSubmit={onSubmit} className="py-6 flex flex-col gap-10">
                    <div>
                        <h2 className="text-xl font-bold text-stone-800">Введите логин:</h2>
                        <input type="text" name="login" className="border-1 border-blue-500 rounded-lg w-full p-1" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-stone-800">Введите пароль:</h2>
                        <input type="password" name="password" className="border-1 border-blue-500 rounded-lg w-full p-1" />
                    </div>

                    <button className="text-xl font-extrabold text-white bg-blue-500 hover:bg-blue-400 w-fit mx-auto px-3 rounded-xl" type="submit">
                        {isLoading ? <Spinner className="size-6" /> : "Войти"}
                    </button>
                </form>
            </div>
        </Container>
    );
};
