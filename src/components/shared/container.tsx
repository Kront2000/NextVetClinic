import React from "react";
import { cn } from "@/lib/utils";

interface Props {
    w: number;
    className?: string;
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({w, className, children }) => {
    return (
        <div className={cn(`w-[${w}%] flex flex-col`, className)}>
            {children}
        </div>
    );
};