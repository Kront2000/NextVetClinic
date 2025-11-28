import React from "react";
import { cn } from "@/lib/utils";

interface ProcedureItem {
    id: number;
    name: string;
    price: number;
}
interface Category {
    id: number;
    name: string;
    imgUrl: string;
    procedures: ProcedureItem[];
}

interface Props {
    className?: string;
    showId: number | null;
    toggleShowId: (index: number) => void;
    categories: Category[];
}

export const CategoryModal: React.FC<Props> = ({ className, showId, toggleShowId, categories }) => {
    return (
        <div className={cn('', className)}>
            <div className={cn(showId === null ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto', "transition duration-300 z-50")}>
                                <div className="fixed z-50 flex flex-col items-center w-72 p-4 bg-white rounded-2xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <h1 className="mb-4 text-lg font-normal">{categories.map((cat) => cat.id === showId ? cat.name : null)}</h1>
                                    {categories.map((cat) => cat.id === showId ? cat.procedures.map((procedure: ProcedureItem) => (
                                        <div key={procedure.id} className="flex justify-between w-full mb-4 border-b">
                                            <p>{procedure.name}</p>
                                            <p>{procedure.price}</p>
                                        </div>
                                    )
                                    ) : null)}
                                </div>
                                <div
                                    onClick={() => toggleShowId(showId === null ? 0 : showId)}
                                    className="fixed top-0 left-0 w-screen h-screen bg-gray-600/30"
                                />
                                
                            </div>
        </div>
    );
};