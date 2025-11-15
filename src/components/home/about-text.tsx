import React from "react";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
    src?: string;
    text?: string;
}

export const AboutText: React.FC<Props> = ({ className, src, text }) => {
    return (
        <div className={cn('flex my-1 justify-between', className)}>
            <div className="w-[9%] ">
                <img src={src} className="  aspect-square" alt="" />
            </div>
            <p className="w-[89%] text-sm  xs:text-base font-extralight sm:text-xl md:text-sm lg:text-lg xl:text-xl text-stone-700 ">{text}</p>
        </div >
    );
};