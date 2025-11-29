import React, { FormEvent } from "react";
import { handleError } from "../../../../service/error-handler"
import { cn } from "@/lib/utils";
import Image from "next/image";
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
    selectedCategory: Category | null;
}

export const EditCategoryProcedureForm: React.FC<Props> = ({ className, modalType, setModalType, selectedCategory }) => {

    const [isLoading, setIsLoading] = React.useState(false);

    async function onSubmit(event: FormEvent<HTMLFormElement>, link: string) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        if (!formData.get('name')) {
            alert("Введите название");
            return;
        }
        setIsLoading(true)
        const response = await fetch(link, {
            method: "PUT",
            body: formData
        });

        if (response.ok) {
            alert("Категория обновлена!");
            setModalType(null);
            setIsLoading(false)
        }
        else {
            setIsLoading(true)
            alert("Ошбика обновления!");
        }
    }

    function normalizeImageUrl(url: string) {
        return url.startsWith("http") ? url : "/" + url;
    }

    return (
        <div className={cn('', className)}>
            <div className={cn(modalType == 'editCat' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none', "transition duration-300 z-50")}>
                <div
                    onClick={() => setModalType(null)}
                    className="fixed top-0 left-0 w-screen h-screen bg-gray-600/40"
                />
                <div className="fixed flex flex-col items-center w-72 p-4 bg-white rounded-2xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h1 className="mb-4 text-lg font-normal ">Редактировать категорию</h1>
                    <form onSubmit={(e) => onSubmit(e, '/api/admin/categoryProcedure?id=' + selectedCategory?.id)} className="flex flex-col w-full items-center gap-8" action="">
                        <div className="flex flex-col w-full items-center">
                            <h3 className="text-center">Название</h3>
                            <input type="text" className="border-1 rounded-lg w-full"  defaultValue={selectedCategory?.name ?? ""} name="name" />
                        </div>
                        <Image alt={selectedCategory?.name ?? "Категория не найдена"} width={164} height={98} src={normalizeImageUrl(selectedCategory?.imgUrl ?? "")} className="object-cover w-full rounded-t-2xl aspect-[5/3]" />
                        <div className="flex flex-col w-full items-center">
                            <h3 className="text-center">Загрузите изображение</h3>
                            <input type="file" accept="image/*" className="border-1 rounded-lg w-full" name="image" />
                        </div>

                        <button className="mx-auto bg-blue-400 hover:bg-blue-300 rounded-2xl px-4 py text-white" type="submit">{isLoading ? <Spinner className="size-6"/> : "Изменить"}</button>
                    </form>

                </div>
            </div>
        </div>
    );
};