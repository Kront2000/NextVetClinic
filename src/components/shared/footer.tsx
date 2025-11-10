'use client'

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Props {
    className?: string;
}

const variant: Variants = {
    hidden: {
        scale: 100,
        transition: { duration: 0.9, delay: 0.2 }
    },
    visible: {
        scale: 0,
        transition: { duration: 0.9, delay: 0.2 }

    }
}





export const Footer: React.FC<Props> = ({ className }) => {
    const { ref, inView } = useInView({

        rootMargin: '0px 0px -50px 0px',
    });
    return (
        <footer className="bg-indigo-400">
            <motion.footer
                ref={ref}
                className={cn('bg-indigo-500 py-4 px-4 lg:px-24 lg:pt-8 flex flex-col xl:flex-row md:items-start items-center m-0 lg:h-[25rem] md:h-100 md:mt-20 relative overflow-hidden', className)}
                initial={{ clipPath: 'circle(0% at 50% 10%)' }}
                animate={{ clipPath: inView ? 'circle(150% at 50% 10%)' : 'circle(0% at 50% 10%)' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full xl:grid-cols-4">
                    <div className="flex gap-2 items-center md:mb-14 md:mt-6  ">
                        <Image width={35} height={35} alt="logo" src={'/pawprint.png'} className="xl:w-12 xl:h-12" />
                        <h1 className=" leading-none font-bold text-white xl:text-3xl xl:font-medium">ZOOVET<br />KONSALTING</h1>
                    </div>
                    <div className="md:row-start-2 md:row-end-3 xl:row-start-auto xl:row-end-auto xl:mt-20">
                        <h1 className="text-lg py-2 font-semibold text-white ">Адрес</h1>
                        <p className="text-sm py-2  font-light text-white">Улица Тауелсыздык, 76
                            Тобыл, Костанайская область</p>
                    </div>
                    <div id="contacts" className="md:row-start-2 md:row-end-3 xl:row-start-auto xl:row-end-auto xl:mt-20">
                        <h1 className="text-lg py-2 font-semibold text-white">Контакты</h1>
                        <p className="text-sm py-2  font-light text-white ">+7‒705‒199‒12‒55</p>
                        <p className="text-sm py-2  font-light text-white ">+7‒701‒109‒31‒16</p>
                        <p className="text-sm py-2  font-light text-white ">+7‒708‒746‒60‒57</p>
                        <p className="text-sm py-2  font-light text-white ">Instagram: vetklinikakost</p>
                    </div>
                    <div className="md:row-start-2 md:row-end-3 xl:row-start-auto xl:row-end-auto xl:mt-20">
                        <h1 className="text-lg py-2 font-semibold text-white">Режим работы</h1>
                        <p className="text-sm py-2  font-light text-white">Ежедневно с 09:00 до 22:00 </p>
                        <p className="text-sm py-2  font-light text-white">Обед c 13:00 до 14:00</p>
                    </div>
                </div>
            </motion.footer>
        </footer>


    );
};