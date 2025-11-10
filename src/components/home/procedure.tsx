import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { Api } from "../../../service/api-client";
import { delay, motion, scale, Variant, Variants } from "framer-motion";

interface Props {
    className?: string;
}
interface ProcedureItem {
    id: number;
    name: string;
    price: number;
}

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

    const [list, setList] = React.useState<any[]>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const categories = await Api.categoryProcedure.search();

                const categoriesWithProcedures = await Promise.all(
                    categories.map(async (item: any) => {
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
        <section id="procedures" className={cn("grid w-full grid-cols-1 p-2 mt-6 md:px-8 md:mt-16 lg:px-20 xl:px-40 ", className)}>
            <h1 className="my-2 text-5xl font-medium text-center">Наши услуги</h1>
            <h1 className="mb-8 text-base font-light leading-none text-center">
                нажмите на услугу, чтобы посмотреть описание
            </h1>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 xl:gap-8">
                {list.map((item, index) => (
                    <motion.div custom={index} variants={variant} initial='hidden' whileInView='visible' key={item.id} onClick={() => toggleShowId(item.id)} className="w-full rounded-2xl cursor-pointer">
                        <img src={item.imgUrl} alt="" className="object-cover w-full rounded-t-2xl aspect-[5/3]" />
                        <Button className="w-full text-lg shadow-xl rounded-t-none">{item.name}</Button>
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
        </section>
    );
};