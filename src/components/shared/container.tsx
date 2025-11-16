import React from "react";
import { cn } from "@/lib/utils";

interface Props {
    className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({className, children }) => {
    return (
        <div className={cn("md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] mx-auto", className)}>
            {children}
        </div>
    );
};