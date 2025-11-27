import React, { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../../../components/ui";
import { Api } from "../../../../service/api-client";
import { delay, motion, scale, Variant, Variants } from "framer-motion";
import { Roboto_Condensed } from "next/font/google";
import { Container, Title } from "../../../components/shared"
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { CategoryProcedureCard } from "./category-procedure-card";
import { CategoryModal } from "./category-modal";
import { CreateCategoryProcedureForm } from "./create-category-procedure-form";
import { DeleteCategoryProcedureForm } from "./delete-category-procedure";
import { EditCategoryProcedureForm } from "./edit-category-procedure";
import { CreateProcedureForm } from "./create-procedure-form";
import { DeleteProcedureForm } from "./delete-procedure-form";
import { EditProcedureForm } from "./edit-procedure-form";

interface Props {
    className?: string;
}
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

const robotoCondensed = Roboto_Condensed({
    variable: "--font-nunito",
    subsets: ["latin", "cyrillic"],
    weight: ['400', '500', '600', '700', '800', '900'],
});

export const Procedure: React.FC<Props> = ({ className }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedProcedure, setSelectedProcedure] = useState<ProcedureItem | null>(null);
    const [modalType, setModalType] = useState<'addCat' | 'editCat' | 'delCat' | 'addProc' | 'editProc' | 'delProc' | null>(null);


    const [showId, setShowId] = React.useState<number | null>(null);
    const toggleShowId = (id: number) => {
        setShowId(prev => (prev === id ? null : id));
    };

    

    React.useEffect(() => {

        const fetchData = async () => {
            try {
                const categories = await Api.categoryProcedure.search();

                const categoriesWithProcedures: Category[] = await Promise.all(
                    categories.map(async (item: { id: number; name: string; imgUrl: string }) => {
                        const procedures = await Api.procedure.search(item.id.toString());
                        return { ...item, procedures };
                    })
                );
                console.log(categoriesWithProcedures);
                setCategories(categoriesWithProcedures);
            }
            catch (err) {
                console.log(err);
            }
        }

        if(modalType == null){
            fetchData()
        }
        
    }, [modalType])

    

    const { ref: refCat, inView: inViewCat } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });
    const { ref: refProcedure, inView: inViewProcedure } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    return (
        <>
            <img src="bg2.webp" className="w-full md:mt-16 mt-6" alt="" />
            <section id="procedures" className={cn("grid w-full grid-cols-1 bg-primary-foreground pb-10", className)}>
                <Container className="md:px-10 px-5">

                    <Title mainText="Услуги нашей" mainTextBlue="клиники" smallText="Нажмите на услугу, чтобы посмотреть описание" />

                    <div className="flex flex-col-reverse md:flex-row w-full gap-10 mt-16 md:mt-16">

                        <Image ref={refCat} alt="Кот" width={2675} height={2679} src="/cat2.webp" className={cn("w-[90%] h-fit md:w-[50%] transition duration-500 ease-in-out", inViewCat ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3")} />

                        <div ref={refProcedure} className="grid grid-cols-2  gap-2 xl:gap-8 md:w-[50%] md:h-fit">
                            {categories.map((item, index) => (
                                <CategoryProcedureCard key={index} index={index} category={item} inView={inViewProcedure} onClick={toggleShowId} setModalType={setModalType} setSelectedCategory={setSelectedCategory} />
                            ))}

                            <div onClick={() => setModalType('addCat')} className={cn("w-full relative rounded-2xl cursor-pointer transition duration-500", inViewProcedure ? "opacity-100 scale-100" : "opacity-0 -scale-50", className)}>
                                <Image alt="Добавить категорию" width={338} height={202} src='/addImage.webp' className="object-cover w-full rounded-t-2xl aspect-[5/3]" />
                                <Button className="w-full text-lg shadow-xl rounded-t-none bg-blue-400">Добавить категорию</Button>
                            </div>

                            
                            <CategoryModal showId={showId} toggleShowId={toggleShowId} list={categories} setModalType={setModalType} setSelectedProcedure={setSelectedProcedure} setSelectedCategory={setSelectedCategory} />
                            <CreateCategoryProcedureForm modalType={modalType} setModalType={setModalType} />
                            <DeleteCategoryProcedureForm modalType={modalType} setModalType={setModalType} selectedCategory={selectedCategory} />
                            <EditCategoryProcedureForm modalType={modalType} setModalType={setModalType} selectedCategory={selectedCategory} />
                            <CreateProcedureForm modalType={modalType} setModalType={setModalType} selectedCategory={selectedCategory}></CreateProcedureForm>
                            <DeleteProcedureForm modalType={modalType} setModalType={setModalType} selectedProcedure={selectedProcedure} />
                            <EditProcedureForm modalType={modalType} setModalType={setModalType} selectedProcedure={selectedProcedure} />
                        </div>
                    </div>

                </Container>
            </section>
        </>
    );
};