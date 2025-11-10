import React from "react";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

interface Props {
  className?: string;
}



export const About: React.FC<Props> = ({ className }) => {

  const variant: Variants = {
    visible: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, delay: custom * 0.2 },
    }),
    hidden: {
      y: 30,
      opacity: 0
    }
  }

  return (
    <motion.section viewport={{ once: true }} initial='hidden' whileInView='visible' id="about" className={cn("flex flex-col items-center w-full p-6 mt-12 lg:mt-32 lg:px-32", className)} >
      <h1 className="mb-8 text-4xl font-medium text-center lg:mb-16">О нас</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-10 xl:gap-24">
        <motion.div variants={variant}  custom={1} className="w-full xl:col-start-1 xl:col-end-3 aspect-[7/5]">
          <img loading="lazy" src="about.webp" alt="" className="w-full h-[75%]" />
          <div className="flex flex-col items-center w-full px-4 pt-4 mb-8 lg:mb-20 bg-stone-100 shadow-lg aspect-[3/1] md:aspect-auto h-[25%] lg:text-xl rounded-b-2xl">
            <p className="font-light text-center">Все услуги в одном месте — от прививок до операций</p>
          </div>
        </motion.div>

        <motion.div variants={variant} custom={2} className="w-full aspect-[7/5] xl:col-start-3 xl:col-end-5">
          <img loading="lazy" src="about2.webp" alt="" className="w-full h-[75%]" />
          <div className="flex flex-col items-center w-full px-4 pt-4 mb-8 lg:mb-20 bg-stone-100 shadow-lg aspect-[3/1] md:aspect-auto h-[25%] lg:text-xl rounded-b-2xl">
            <p className="font-light text-center">Высококвалифицированные специалисты с многолетним опытом</p>
          </div>
        </motion.div>
        <motion.div variants={variant} custom={3} className="w-full aspect-[7/5] xl:col-start-5 xl:col-end-7">
          <img loading="lazy" src="about3.webp" alt="" className="w-full h-[75%]" />
          <div className="flex flex-col items-center w-full px-4 pt-4 mb-8 lg:mb-20 bg-stone-100 shadow-lg aspect-[3/1] md:aspect-auto h-[25%] lg:text-xl rounded-b-2xl">
            <p className="font-light text-center">Современное оборудование и доказательные методы терапии</p>
          </div>
        </motion.div>
        <motion.div variants={variant} custom={4} className="w-full aspect-[7/5] xl:col-start-2 xl:col-end-4">
          <img loading="lazy" src="about4.webp" alt="" className="w-full h-[75%]" />
          <div className="flex flex-col items-center w-full px-4 pt-4 mb-8 lg:mb-20 bg-stone-100 shadow-lg aspect-[3/1] md:aspect-auto h-[25%] lg:text-xl rounded-b-2xl">
            <p className="font-light text-center">Оперативная помощь и забота о здоровье животных на всех этапах жизни</p>
          </div>
        </motion.div>
        <motion.div variants={variant} custom={5} className="w-full aspect-[7/5] lg:col-span-2 lg:w-1/2 lg:mx-auto xl:w-full xl:col-start-4 xl:col-end-6">
          <div className="flex justify-between w-full h-[75%]">
            <img loading="lazy" src="spec2.webp" alt="" className="object-cover w-[49%]" />
            <img loading="lazy" src="spec1.webp" alt="" className="object-cover w-[49%]" />
          </div>
          <div className="flex flex-col items-center w-full px-4 pt-4 mb-8 bg-stone-100 shadow-lg aspect-[3/1] md:aspect-auto h-[25%] lg:text-xl rounded-b-2xl">
            <p className="font-light text-center">Высококвалифицированные специалисты с многолетним опытом</p>
          </div>
        </motion.div>
      </div>

    </motion.section>
  );
};