import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui";

interface Category {
    id: number;
    name: string;
    imgUrl: string;
    procedures: ProcedureItem[];
}

interface ProcedureItem {
    id: number;
    name: string;
    price: number;
}

interface Props {
    className?: string;
    index: number;
    category: Category
    inView: boolean;
    onClick: (index: number) => void;
    isLoaded: boolean
}

export const CategoryProcedureCard: React.FC<Props> = ({ className, index, category, inView, onClick, isLoaded }) => {



    const delays = ["delay-0", "delay-150", "delay-300", "delay-500", "delay-600", "delay-700", "delay-800", "delay-900", "delay-1000"];

    function normalizeImageUrl(url: string) {
        return url.startsWith("http") ? url : "/" + url;
    }

    return (

        <div onClick={() => onClick(category.id)} className={cn("w-full rounded-2xl cursor-pointer transition duration-500", delays[index], inView && isLoaded ? "opacity-100 scale-100" : "opacity-0 -scale-50", className)}>
            <Image alt={category.name} width={164} height={98} src={normalizeImageUrl(category.imgUrl) && normalizeImageUrl(category.imgUrl) !== "/" ? normalizeImageUrl(category.imgUrl) : "/placeholder.webp"} className="object-cover w-full rounded-t-2xl aspect-[5/3]" />
            <Button className="w-full text-lg shadow-xl rounded-t-none bg-blue-400">{category.name}</Button>
        </div>

    );
};