import React from "react";
import { cn } from "@/lib/utils";
import { Api } from "../../../service/api-client";
import { Roboto_Condensed } from "next/font/google";
import { Container, Title } from "../shared";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { CategoryProcedureCard } from "./category-procedure-card";
import { CategoryModal } from "./category-modal";



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


    const [showId, setShowId] = React.useState<number | null>(null);

    const toggleShowId = (id: number) => {
        setShowId(prev => (prev === id ? null : id));
    };

    const [categories, setCategories] = React.useState<Category[]>([]);

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

        fetchData()
    }, [])

    const { ref: refCat, inView: inViewCat } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });
    const { ref: refProcedure, inView: inViewProcedure } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const [isLoaded, setIsLoaded] = React.useState(false);

    return (
        <>
            <img src="bg2.webp" className="w-full md:mt-16 mt-6" alt="" />
            <section id="procedures" className={cn("grid w-full grid-cols-1 bg-primary-foreground pb-10", className)}>
                <Container className="md:px-10 px-5">

                    <Title mainText="Услуги нашей" mainTextBlue="клиники" smallText="Нажмите на услугу, чтобы посмотреть описание" />

                    <div className="flex flex-col-reverse md:flex-row w-full gap-10 mt-16 md:mt-16">

                        <Image ref={refCat} alt="Кот" width={2675} height={2679} src="/cat2.webp" className={cn("w-[90%] md:w-[50%] h-fit transition duration-500 ease-in-out", inViewCat ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3")} />

                        <div onLoad={() => setIsLoaded(true)} ref={refProcedure} className="grid grid-cols-2  gap-2 xl:gap-8 md:w-[50%] md:h-fit">
                            {categories.map((item, index) => (
                                <CategoryProcedureCard isLoaded={isLoaded} key={index} index={index} category={item} inView={inViewProcedure} onClick={toggleShowId} />
                            ))}

                            <CategoryModal showId={showId} toggleShowId={toggleShowId} categories={categories}/>
                        </div>
                    </div>

                </Container>
            </section>
        </>
    );
};