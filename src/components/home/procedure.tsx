import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { Api } from "../../../service/api-client";
import { delay, motion, scale, Variant, Variants } from "framer-motion";
import { Roboto_Condensed } from "next/font/google";
import { Container, Title } from "../shared";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

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

    const { ref: refCat, inView: inViewCat } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });
    const { ref: refProcedure, inView: inViewProcedure } = useInView({
        threshold: 0.5,
        triggerOnce: true,
    });

    const delays = ["delay-0", "delay-150", "delay-300", "delay-500", "delay-600", "delay-700", "delay-800", "delay-900", "delay-1000"];

    return (
        <>
            <img src="bg2.webp" className="w-full md:mt-16 mt-6" alt="" />
            <section id="procedures" className={cn("grid w-full grid-cols-1 bg-primary-foreground pb-10", className)}>
                <Container className="md:px-10 px-5">
                    
                    <Title mainText="Услуги нашей" mainTextBlue="клиники" smallText="Нажмите на услугу, чтобы посмотреть описание"/>

                    <div className="flex flex-col-reverse md:flex-row w-full gap-10 mt-16 md:mt-16">
                        
                        <Image ref={refCat} alt="Кот" width={2675} height={2679} src="/cat2.webp" className={cn("w-[90%] md:w-[50%] transition duration-500 ease-in-out", inViewCat ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3")} />

                        <div ref={refProcedure} className="grid grid-cols-2  gap-2 xl:gap-8 md:w-[50%] md:h-fit">
                        {list.map((item, index) => (
                            <div key={item.id} onClick={() => toggleShowId(item.id)} className={cn("w-full rounded-2xl cursor-pointer transition duration-500", delays[index], inViewProcedure ? "opacity-100 scale-100" : "opacity-0 -scale-50")}>
                                <Image alt={item.name} width={164} height={98} src={"/" + item.imgUrl} className="object-cover w-full rounded-t-2xl aspect-[5/3]" />
                                <Button className="w-full text-lg shadow-xl rounded-t-none bg-blue-400">{item.name}</Button>
                            </div>
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