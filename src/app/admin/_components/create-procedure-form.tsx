import React, { FormEvent } from "react";
import { handleError } from "../../../../service/error-handler"
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

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
  modalType: 'addCat' | 'editCat' | 'delCat' | 'addProc' | 'editProc' | 'delProc' | null;
  setModalType: (type: 'addCat' | 'editCat' | 'delCat' | 'addProc' | 'editProc' | 'delProc' | null) => void;
  selectedCategory: Category | null;
}

export const CreateProcedureForm: React.FC<Props> = ({ className, modalType, setModalType, selectedCategory }) => {

  const [isLoading, setIsLoading] = React.useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>, link: string) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    if (!formData.get('price')) {
      alert("Введите цену");
      return;
    }
    if (!formData.get('name')) {
      alert("Введите название");
      return;
    }
    setIsLoading(true);
    const response = await fetch(link, {
      method: 'POST',
      body: formData,
    })
    if (response.ok) {
      setIsLoading(false);
      alert("Услуга добавлена")
      setModalType(null);
    }
    else {
      alert("Ошибка добавления");

    }


  }

  return (
    <div className={cn('', className)}>
      <div className={cn(modalType == 'addProc' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none', "transition duration-300 z-50")}>
        <div
          onClick={() => setModalType(null)}
          className="fixed top-0 left-0 w-screen h-screen bg-gray-600/40"
        />
        <div className="fixed flex flex-col items-center w-72 p-4 bg-white rounded-2xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h1 className="mb-4 text-lg font-normal ">Добавить процедуру</h1>
          <form onSubmit={(e) => onSubmit(e, '/api/admin/procedure?id=' + selectedCategory?.id)} className="flex flex-col items-center gap-8" action="">
            <div className="flex flex-col items-center">
              <h3 className="text-center">Введите название</h3>
              <input type="text" className="border-1 rounded-lg" name="name" />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-center">Введите цену</h3>
              <input type="number" className="border-1 rounded-lg" name="price" />
            </div>

            <button className="mx-auto bg-blue-400 hover:bg-blue-300 rounded-2xl px-4 py text-white" type="submit">{isLoading ? <Spinner className="size-6"/> : "Добавить"}</button>
          </form>

        </div>
      </div>
    </div>
  );
};