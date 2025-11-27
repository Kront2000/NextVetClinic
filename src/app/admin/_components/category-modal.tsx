import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { Pencil, Trash } from "lucide-react";

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
    list: Category[]
    setModalType: (type: 'addCat' | 'editCat' | 'delCat' | 'addProc' | 'editProc' | 'delProc' | null) => void;
    setSelectedProcedure: (procedure: ProcedureItem | null) => void;
    setSelectedCategory: (category: Category | null) => void;
}

export const CategoryModal: React.FC<Props> = ({ className, showId, toggleShowId, list, setModalType, setSelectedProcedure, setSelectedCategory }) => {
    const selectedCategory = list.find((cat) => cat.id === showId) ?? null;

    return (
        <div className={cn(showId === null ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto', "transition duration-300 z-50", className)}>
            <div
                onClick={() => toggleShowId(showId === null ? 0 : showId)}
                className="fixed top-0 left-0 w-screen h-screen bg-gray-600/40"
            />
            <div className="fixed flex flex-col items-center w-96 p-4 bg-white rounded-2xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1 className="mb-4 text-lg font-normal">{selectedCategory ? selectedCategory.name : ""}</h1>
                {selectedCategory?.procedures.map((procedure: ProcedureItem) => (
                    <div key={procedure.id} className="flex justify-between w-full mb-4 border-b">
                        <p>{procedure.name}</p>
                        <div className="flex gap-2">
                            <p>{procedure.price}</p>
                            <Pencil className="bg-gray-100 hover:bg-gray-300 rounded-sm p-1"  onClick={() => { toggleShowId(showId === null ? 0 : showId); setModalType('editProc'); setSelectedProcedure(procedure);}}/>
                            <Trash className="bg-red-600 hover:bg-red-500 rounded-sm p-1" color="white" onClick={() => { toggleShowId(showId === null ? 0 : showId); setModalType('delProc'); setSelectedProcedure(procedure);}}/>
                        </div>

                    </div>
                ))}
                <div className="flex justify-center w-full mb-4">
                    <Button onClick={() => { toggleShowId(showId === null ? 0 : showId); setModalType('addProc'); setSelectedCategory(selectedCategory); }}>Добавить процедуру</Button>
                </div>
            </div>
        </div>

    );
};