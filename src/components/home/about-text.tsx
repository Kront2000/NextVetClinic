import React from "react";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
    src?: string;
    text?: string;
    inView?: boolean;
    index?: number;
}

export const AboutText: React.FC<Props> = ({ className, src, text, inView, index = 0 }) => {

    const delays = ["delay-0", "delay-150", "delay-300", "delay-500"];

    return (
        <div className={cn('flex my-1 justify-between transition duration-300', delays[index], inView ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0", className)}>
            <div className="w-[9%] ">
                <img src={src} className="  aspect-square" alt="" />
            </div>
            <p className="w-[89%] text-sm  xs:text-base font-extralight sm:text-xl md:text-sm lg:text-lg xl:text-xl text-stone-700 ">{text}</p>
        </div >
    );
};