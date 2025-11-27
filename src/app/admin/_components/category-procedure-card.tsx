import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import Image from "next/image";
import { Pencil, Trash } from "lucide-react";

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
    setModalType: (type: 'addCat' | 'editCat' | 'delCat' | 'addProc' | 'editProc' | 'delProc' | null) => void;
    setSelectedCategory: (category: Category | null) => void;
}

export const CategoryProcedureCard: React.FC<Props> = ({ className, index, category, inView, onClick, setModalType, setSelectedCategory }) => {

    function normalizeImageUrl(url: string) {
        return url.startsWith("http") ? url : "/" + url;
    }

    const setModalTypeAndCategory = (category: Category, type: 'addCat' | 'editCat' | 'delCat' | 'addProc' | 'editProc' | 'delProc' | null) => {
        setSelectedCategory(category);
        setModalType(type);

    }

    const delays = ["delay-0", "delay-150", "delay-300", "delay-500", "delay-600", "delay-700", "delay-800", "delay-900", "delay-1000"];

    return (
        <div onClick={() => onClick(category.id)} className={cn("w-full relative rounded-2xl cursor-pointer transition duration-500", delays[index], inView ? "opacity-100 scale-100" : "opacity-0 -scale-50", className)}>
            <div className="flex absolute top-2 gap-3 right-2">
                <button onClick={(e) => { e.stopPropagation(); setModalTypeAndCategory(category, 'delCat'); }} className="p-0 "><Trash color="white" size={35} className="bg-red-600 hover:bg-red-500 rounded-sm p-1" /></button>
                <button onClick={(e) => { e.stopPropagation(); setModalTypeAndCategory(category, 'editCat'); }} className="p-0"><Pencil size={35} className="bg-gray-100 hover:bg-gray-300 rounded-sm p-1" /></button>
            </div>

            <Image alt={category.name} width={328} height={202} src={normalizeImageUrl(category.imgUrl) && normalizeImageUrl(category.imgUrl) !== "/" ? normalizeImageUrl(category.imgUrl) : "/placeholder.webp"} className="object-cover w-full rounded-t-2xl aspect-[5/3]" />
            <Button className="w-full text-lg shadow-xl rounded-t-none bg-blue-400">{category.name}</Button>
        </div>
    );
};