import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { Api } from "../../../service/api-client";
import { delay, motion, scale, Variant, Variants } from "framer-motion";
import { Roboto_Condensed } from "next/font/google";
import { Container } from "../shared";
import Image from "next/image";

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

    const variant: Variants = {
        hidden: {
            opacity: 0,
            scale: 1.2,
        },
        visible: (custom: number) => ({
            opacity: 1,
            scale: 1,
            transition: { delay: custom * 0.2, duration: 0.5, type: 'tween' },
        })
    }

    const [showId, setShowId] = React.useState<number | null>(null);

    const toggleShowId = (id: number) => {
        setShowId(prev => (prev === id ? null : id));
    };

    const [list, setList] = React.useState<Category[]>([]);

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
                setList(categoriesWithProcedures);
            }
            catch (err) {
                console.log(err);
            }
        }

        fetchData()
    }, [])


    return (
        <>
            <img src="bg2.webp" className="w-full md:mt-16 mt-6" alt="" />
            <section id="procedures" className={cn("grid w-full grid-cols-1 bg-primary-foreground pb-10", className)}>
                <Container className="md:px-10 px-5">
                    <div className="flex w-full flex-col md:flex-row md:justify-between md:items-start " >
                        <h1 className={cn("md:w-[45%] my-2 text-left text-2xl xs:text-3xl sm:text-4xl xl:text-5xl font-extrabold leading-5 xs:leading-6 sm:leading-8 xl:leading-10 text-stone-800 text-shadow-lg", robotoCondensed)}>Услуги нашей<br /> <p className="text-blue-400">клиники</p></h1>
                        <p className="w-[90%] md:w-[35%] xs:max-w-[70%] xl:w-[30%] text-xs xs:text-sm sm:text-base xl:text-xl  font-extralight text-stone-600 md:text-left md:pt-6">Нажмите на услугу, чтобы посмотреть описание</p>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row w-full gap-10 mt-16 md:mt-16">
                        
                        <Image alt="Кот" width={164} height={98} src="cat2.webp" className="w-[90%] md:w-[50%]" />

                        <div className="grid grid-cols-2  gap-2 xl:gap-8 md:w-[50%] md:h-fit">
                        {list.map((item, index) => (
                            <motion.div custom={index} variants={variant} initial='hidden' whileInView='visible' key={item.id} onClick={() => toggleShowId(item.id)} className="w-full rounded-2xl cursor-pointer">
                                <Image alt={item.name} width={164} height={98} src={"/" + item.imgUrl} className="object-cover w-full rounded-t-2xl aspect-[5/3]" />
                                <Button className="w-full text-lg shadow-xl rounded-t-none bg-blue-400">{item.name}</Button>
                            </motion.div>
                        ))}


                        <div className={cn(showId === null ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto', "transition duration-300 z-50")}>
                            <div
                                onClick={() => toggleShowId(showId === null ? 0 : showId)}
                                className="fixed top-0 left-0 w-screen h-screen bg-gray-600/40"
                            />
                            <div className="fixed flex flex-col items-center w-72 p-4 bg-white rounded-2xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <h1 className="mb-4 text-lg font-normal">{list.map((cat) => cat.id === showId ? cat.name : null)}</h1>
                                {list.map((cat) => cat.id === showId ? cat.procedures.map((procedure: ProcedureItem) => (
                                    <div key={procedure.id} className="flex justify-between w-full mb-4 border-b">
                                        <p>{procedure.name}</p>
                                        <p>{procedure.price}</p>
                                    </div>
                                )
                                ) : null)}
                            </div>
                        </div>
                    </div>
                    </div>
                    
                </Container>
            </section>
        </>
    );
};