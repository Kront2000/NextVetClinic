'use client'

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";


interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {

    const [burgerShow, setBurgerShow] = React.useState(false);

    return (
        <header className={cn('flex justify-between px-4 lg:px-32 rounded-b-2xl z-50 py-2 fixed w-full top-0 shadow-xl bg-white/30 backdrop-blur-2xl', className)}>
            {/* Левая часть */}
            <div className="flex gap-2 items-center">
                <div  className="aspect-square w-12 h-auto lg:w-16 relative"><Image fill alt="logo" src={'/logo123.webp'} /></div>
                <h1 className=" leading-none font-bold lg:text-3xl text-secodnary">ZOOVET<br />KONSALTING</h1>
            </div>
            {/* Правая часть */}
            {/* Бургер */}
            <div onClick={() => setBurgerShow(!burgerShow)} className="md:hidden h-7 w-8 flex flex-col p-1 rounded-sm gap-2 my-auto">
                <div className="w-full h-[6px] bg-black"></div>
                <div className="w-full h-[6px] bg-black"></div>
                <div className="w-full h-[6px] bg-black"></div>
            </div>
            {/* Основное меню */}
            <div className="hidden md:flex items-center">
                <a className="text-lg h-10 px-4 font-medium 2xl:text-2xl hover:text-gray-700 hover:-translate-y-0.5  transition duration-300" href="#about">О нас</a>
                <a className="text-lg  h-10 px-4 font-medium  2xl:text-2xl hover:text-gray-700 hover:-translate-y-0.5 transition duration-300" href="#procedures">Услуги</a>
                <a className="text-lg  h-10 px-4 font-medium  2xl:text-2xl hover:text-gray-700 hover:-translate-y-0.5 transition duration-300" href="#reviews">Отзывы</a>
                <a className="text-lg  h-10 px-4 font-medium  2xl:text-2xl hover:text-gray-700 hover:-translate-y-0.5 transition duration-300" href="#contacts">Контакты</a>
            </div>

            {/* Бургер меню */}
            <div className={cn("bg-white shadow-xl fixed p-4 flex flex-col xl:hidden h-screen gap-3 z-40 w-[60%] transition duration-300 right-0 top-0", burgerShow ? "translate-x-0": "translate-x-full")}>
                <h1 className="text-2xl font-bold border-b-1 ">Навигация</h1>
                
                <a onClick={() => setBurgerShow(!burgerShow)} className="text-lg font-medium" href="#about">О нас</a>
                <a onClick={() => setBurgerShow(!burgerShow)} className="text-lg font-medium" href="#procedures">Услуги</a>
                <a onClick={() => setBurgerShow(!burgerShow)} className="text-lg font-medium" href="#reviews">Отзывы</a>
                <a onClick={() => setBurgerShow(!burgerShow)} className="text-lg font-medium" href="#contacts">Контакты</a>
            </div>
            {burgerShow && 
                <div onClick={() => setBurgerShow(!burgerShow)} className=" fixed h-screen w-screen z-10"></div>
            }
            

        </header>
    );
};