import React from "react";
import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Container } from "../shared";
import { Roboto_Condensed } from "next/font/google";

interface Props {
    className?: string;
}

const robotoCondensed = Roboto_Condensed({
    variable: "--font-nunito",
    subsets: ["latin", "cyrillic"],
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const Reviews: React.FC<Props> = ({ className }) => {

    const list = [
        {
            src: "/review1.png",
        },
        {
            src: "/review2.png",
        },
        {
            src: "/review3.png",
        },
        {
            src: "/review4.png",
        },
        {
            src: "/review5.png",
        },
        {
            src: "/review6.png",
        },
        {
            src: "/review7.png",
        },
        {
            src: "/review8.png",
        },

    ]

    return (
        <section id="reviews" className={cn('flex flex-col  w-full py-12 mt-20 md:mt-32', className)}>
            <Container className="w-full px-4">
                <div className="flex w-full flex-col md:flex-row md:justify-between md:items-start " >
                    <h1 className={cn("md:w-[45%] my-2 text-left text-2xl xs:text-3xl sm:text-4xl xl:text-5xl font-extrabold leading-5 xs:leading-6 sm:leading-8 xl:leading-10 text-stone-800 text-shadow-lg", robotoCondensed)}>Отзывы наших<br /> <p className="text-blue-400">клиентов</p></h1>
                    <p className="w-[90%] md:w-[35%] xs:max-w-[70%] xl:w-[30%] text-xs xs:text-sm sm:text-base xl:text-xl  font-extralight text-stone-600 md:text-left md:pt-6">Больше отзывов у нас в <a className="text-blue-500 underline decoration-solid" href="https://go.2gis.com/81Tsk">2gis</a></p>
                </div>
            </Container>

            <div className="w-full flex flex-col items-center p-6 ">
                <Carousel className="w-[80%] max-w-xl">
                    <CarouselContent>

                        {list.map((elem, index) => (
                            <CarouselItem key={index} className="flex items-center ">
                            <div className="flex items-center mx-auto bg-blue-400 rounded-2xl p-4">
                                <img src={elem.src} className="rounded-2xl" alt="" />
                            </div>
                        </CarouselItem>
                        ))}
                        
                        
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>

        </section>
    );
};