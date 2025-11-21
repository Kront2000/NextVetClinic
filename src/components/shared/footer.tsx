'use client'

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Container } from "./container";


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
        triggerOnce: true,

    });
    return (


        <footer className="bg-blue-300">
            <motion.footer
                ref={ref}
                className={cn('bg-blue-400   relative overflow-hidden', className)}
                initial={{ clipPath: 'circle(0% at 50% 10%)' }}
                animate={{ clipPath: inView ? 'circle(150% at 50% 10%)' : 'circle(0% at 50% 10%)' }}
                transition={{ duration: 1, ease: 'easeInOut' }}

            >
                <Container className="pt-10 lg:pt-0 lg:pb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 w-full xl:grid-cols-4 px-4 ">
                        <div className="flex gap-2 items-start md:mb-8 md:mt-6 xl:mt-20  ">
                            <Image width={321} height={321} alt="logo" src={'/logo5-neg.webp'} className="w-10 h-10 xl:w-16 xl:h-16" />
                            <h1 className=" leading-none font-bold text-white xl:text-2xl xl:font-medium">ZOOVET<br />KONSALTING</h1>
                        </div>
                        <div className="md:row-start-2 md:row-end-3 xl:row-start-auto xl:row-end-auto xl:mt-20">
                            <h1 className="text-lg py-2 font-semibold text-white ">Адрес</h1>
                            <p className="text-sm py-2  font-light text-white">Улица Тауелсыздык, 76
                                Тобыл, Костанайская область</p>
                            <p className="text-sm py-2  font-light text-white"><a className="border-b" href="https://go.2gis.com/bmhM1">2Gis</a></p>
                            <p className="text-sm py-2  font-light text-white"><a className="border-b" href="https://yandex.kz/maps/ru/-/CLSzUZM~">Яндекс Карты</a></p>

                        </div>
                        <div id="contacts" className="md:row-start-2 md:row-end-3 xl:row-start-auto xl:row-end-auto xl:mt-20">
                            <h1 className="text-lg py-2 font-semibold text-white">Контакты</h1>
                            <p className="text-sm py-2  font-light text-white "><a href="https://api.whatsapp.com/send/?phone=77051991255&text=Здравствуйте!%0A%0AПишу+с+сайта.%0A%0A&type=phone_number&app_absent=0" className="border-b">WhatsApp-1</a></p>
                            <p className="text-sm py-2  font-light text-white "><a href="https://api.whatsapp.com/send/?phone=77011093116&text=Здравствуйте!%0A%0AПишу+с+сайта.%0A%0A&type=phone_number&app_absent=0" className="border-b">WhatsApp-2</a></p>
                            <p className="text-sm py-2  font-light text-white "><a href="tel:+77051991255" className="border-b">+7‒705‒199‒12‒55</a></p>
                            <p className="text-sm py-2  font-light text-white "><a href="tel:+77011093116" className="border-b">+7‒701‒109‒31‒16</a></p>
                            <p className="text-sm py-2  font-light text-white "><a href="tel:+77087466057" className="border-b">+7‒708‒746‒60‒57</a></p>
                            <p className="text-sm py-2  font-light text-white ">Instagram: <a className="border-b" href="https://www.instagram.com/vetklinikakost/">vetklinikakost</a></p>
                        </div>
                        <div className="md:row-start-2 md:row-end-3 xl:row-start-auto xl:row-end-auto xl:mt-20">
                            <h1 className="text-lg py-2 font-semibold text-white">Режим работы</h1>
                            <p className="text-sm py-2  font-light text-white">Ежедневно с 09:00 до 22:00 </p>
                            <p className="text-sm py-2  font-light text-white">Обед c 13:00 до 14:00</p>
                        </div>
                    </div>
                </Container>
            </motion.footer>
        </footer>

    );
};