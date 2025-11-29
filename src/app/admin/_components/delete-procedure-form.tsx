import React, { FormEvent } from "react";
import { handleError } from "../../../../service/error-handler"
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

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
    modalType: 'addCat' | 'editCat' | 'delCat' | 'addProc' | 'editProc' | 'delProc' | null;
    setModalType: (type: 'addCat' | 'editCat' | 'delCat' | 'addProc' | 'editProc' | 'delProc' | null) => void;
    selectedProcedure: ProcedureItem | null;


}

export const DeleteProcedureForm: React.FC<Props> = ({ className, modalType, setModalType, selectedProcedure }) => {

    const [isLoading, setIsLoading] = React.useState(false);

    async function handleDeleteProcedure(id: number | undefined) {
        setIsLoading(true);
        const response = await fetch("/api/admin/procedure", { method: "DELETE", body: JSON.stringify({ id }) });
        setModalType(null);
        if(response.ok){
            setModalType(null);
            setIsLoading(false)
            alert("Услуга удалена");
        }
        else{
            setIsLoading(false)
            alert("Ошибка удаления");
        }
    }

    return (
        <div className={cn('', className)}>
            <div className={cn(modalType == 'delProc' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none', "transition duration-300 z-50")}>
                <div
                    onClick={() => setModalType(null)}
                    className="fixed top-0 left-0 w-screen h-screen bg-gray-600/40"
                />
                <div className="fixed flex flex-col items-center w-72 p-4 bg-red-400/80 backdrop-blur-sm rounded-2xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h1 className="mb-4 text-lg font-normal text-center text-white">Вы точно собираетесь удалить услугу {selectedProcedure?.name}</h1>
                    <form className="flex flex-col items-center gap-8" action="">


                        <button onClick={() => handleDeleteProcedure(selectedProcedure?.id)} className="mx-auto bg-blue-400 hover:bg-blue-300 rounded-2xl px-4 py text-white" type="button">{isLoading ? <Spinner className="size-6"/> : "Удалить"}</button>
                    </form>

                </div>
            </div>
        </div>
    );
};