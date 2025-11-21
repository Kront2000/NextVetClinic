import React from "react";
import { cn } from "@/lib/utils";
import { Roboto_Condensed } from "next/font/google";
import { useInView } from "react-intersection-observer";

interface Props {
    className?: string;
    mainText?: string;
    mainTextBlue?: string;
    smallText?: string;
}

const robotoCondensed = Roboto_Condensed({
    variable: "--font-nunito",
    subsets: ["latin", "cyrillic"],
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const Title: React.FC<Props> = ({ className, mainText, mainTextBlue, smallText }) => {

    const { ref, inView } = useInView({

        threshold: 1,
        triggerOnce: true,
    });

    return (
        <div ref={ref} className={cn('flex w-full flex-col md:flex-row md:justify-between md:items-start', className)}>
            <h1 className={cn("md:w-[45%] my-2 text-left text-2xl xs:text-3xl sm:text-4xl xl:text-5xl font-extrabold leading-5 xs:leading-6 sm:leading-8 xl:leading-10 text-stone-800 text-shadow-lg transition duration-500 ease-in-out", inView ? "translate-x-0 opacity-100" : "-translate-x-3  opacity-0", robotoCondensed)}>{mainText}<br /> <p className="text-blue-400">{mainTextBlue}</p></h1>
            <p className={cn("w-[90%] md:w-[35%] xs:max-w-[70%] xl:w-[30%] text-xs xs:text-sm sm:text-base xl:text-xl  font-extralight text-stone-600 md:text-left md:pt-6 transition delay-100 duration-500 ease-in-out", inView ? "translate-x-0 opacity-100" : "-translate-x-3 md:translate-x-3 opacity-0")}>{smallText}</p>
        </div>

    );
};