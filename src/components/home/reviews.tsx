import React from "react";
import { cn } from "@/lib/utils";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface Props {
    className?: string;
}

export const Reviews: React.FC<Props> = ({ className }) => {
    return (
        <section id="reviews" className={cn('flex flex-col items-center w-full py-12 mt-20 md:mt-32', className)}>
            <h1 className="text-5xl font-medium text-center">Ваши отзывы </h1>
            <p className="mb-10">Больше отзывов у нас в <a className="text-blue-500 underline decoration-solid" href="https://go.2gis.com/81Tsk">2gis</a></p>
            <div className="w-full flex flex-col items-center p-6 bg-center bg-cover bg-[url(/Rectangle_40.webp)]">
                <Carousel className="w-[80%] max-w-xl">
                <CarouselContent>
                    
                        <CarouselItem className="flex items-center">
                            <img src="/review1.png" className="mx-auto" alt="" />
                        </CarouselItem>
                        <CarouselItem className="flex items-center">
                            <img src="/review2.png" className="mx-auto" alt="" />
                        </CarouselItem>
                        <CarouselItem className="flex items-center">
                            <img src="/review3.png" className="mx-auto" alt="" />
                        </CarouselItem>
                        <CarouselItem className="flex items-center">
                            <img src="/review4.png" className="mx-auto" alt="" />
                        </CarouselItem>
                        <CarouselItem className="flex items-center">
                            <img src="/review5.png" className="mx-auto" alt="" />
                        </CarouselItem>
                        <CarouselItem className="flex items-center">
                            <img src="/review6.png" className="mx-auto" alt="" />
                        </CarouselItem>
                        <CarouselItem className="flex items-center">
                            <img src="/review7.png" className="mx-auto" alt="" />
                        </CarouselItem>
                        <CarouselItem className="flex items-center">
                            <img src="/review8.png" className="mx-auto" alt="" />
                        </CarouselItem>
                    
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            </div>
            
        </section>
    );
};