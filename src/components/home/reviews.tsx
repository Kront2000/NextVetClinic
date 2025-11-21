import React from "react";
import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Container, Title } from "../shared";
import { Roboto_Condensed } from "next/font/google";
import { useInView } from "react-intersection-observer";

interface Props {
    className?: string;
}

const robotoCondensed = Roboto_Condensed({
    variable: "--font-nunito",
    subsets: ["latin", "cyrillic"],
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const Reviews: React.FC<Props> = ({ className }) => {

    const { ref, inView } = useInView({
            threshold: 0.5,
            triggerOnce: true,
        });

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
                <Title mainText="Отзывы наших" mainTextBlue="клиентов" smallText="Больше отзывов у нас в 2gis" />
            </Container>

            <div ref={ref} className="w-full flex flex-col items-center p-6 ">
                <Carousel className={cn("w-[80%] max-w-xl transition duration-500 ease-in-out", inView ? "opacity-100 translate-0" : "opacity-0 translate-y-4")}>
                    <CarouselContent>
                        {list.map((elem, index) => (
                            <CarouselItem key={index} className="flex items-center ">
                                <div className="flex items-center mx-auto bg-blue-400 rounded-2xl p-4">
                                    <img src={elem.src} loading="lazy" className="rounded-2xl" alt="Отзыв" />
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