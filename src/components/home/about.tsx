import React from "react";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { Roboto_Condensed } from "next/font/google";
import { AboutText } from "./about-text";
import { Container } from "../shared";
import Image from "next/image";


interface Props {
  className?: string;
}

const robotoCondensed = Roboto_Condensed({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic"],
  weight: ['400', '500', '600', '700', '800', '900'],
});

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

  const list = [
    {
      text: "Мы делаем все, чтобы визит в клинику был максимально комфортным и безболезненным",
      src: "about-icon1.webp",
    },
    {
      text: "Мы регулярно проходим стажировки и имеем богатый практический опыт",
      src: "about-icon2.webp",
    },
    {
      text: "Подбор лечебных и профилактических программ с учетом породы, возраста и образа жизни питомца",
      src: "about-icon3.webp",
    },
    {
      text: "Быстрая и точная диагностика для оперативного начала лечения",
      src: "about-icon4.webp",
    }
  ]

  return (
    <Container>
    <div className="md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] mx-auto">
      <motion.section className={cn('mt-20', className)}>

        {/* Заголовок */}
        <div className="p-4 sm:px-8">
          <div className="flex w-full flex-col md:flex-row md:justify-between md:items-start " >
            <h1 className={cn("md:w-[45%] my-2 text-left text-2xl xs:text-3xl sm:text-4xl xl:text-5xl font-extrabold leading-5 xs:leading-6 sm:leading-8 xl:leading-10 text-stone-800 text-shadow-lg", robotoCondensed)}>Всесторонняя <br /> <p className="text-blue-400">забота о питомце</p></h1>
            <p className="w-[90%] md:w-[35%] xs:max-w-[70%] xl:w-[30%] text-xs xs:text-sm sm:text-base xl:text-xl  font-extralight text-stone-600 md:text-left md:pt-6">Мы стремимся быть вашим надежным партнером на протяжении всей жизни вашего четвероногого друга.</p>
          </div>

          {/* ТЕКСТ И КАРТИНКИ */}

          {/* ТЕКСТ */}
          <div className="flex flex-col-reverse md:flex-row mt-10 lg:mt-14 xl:mt-22 2xl:mt-32 gap-12 sm:gap-20 md:gap-2 2xl:justify-between">
            <div className="grid grid-rows-4 gap-2 xs:gap-4 sm:gap-12 md:gap-1 xl:gap-3 w-full md:h-fit md:w-[30%] lg:w-[35%] lg:pt-2 xl:pt-8">
              {list.map((item, index) => (
                <AboutText key={index} src={item.src} text={item.text} />
              ))}
            </div>

            {/* БЛОК с КАРТИНКАМИ */}
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 px-2 md:w-[70%] lg:w-[65%] 2xl:w-[55%] h-fit items-end ">
              <Image alt="about" width={364} height={546} src="/about.webp" className="w-full aspect-2/3 object-cover rounded-2xl shadow-2xl" />
              <div className=" flex flex-col gap-2 w-full">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Image alt="about-5" width={178} height={178} src="/spec5.webp" className="w-full aspect-square object-cover rounded-4xl shadow-2xl" />
                  <Image alt="about-6" width={178} height={178} src="/spec6.webp" className="w-full aspect-square object-cover rounded-4xl shadow-2xl" />
                </div>
                <Image alt="about-2" width={364} height={242} src="/about2.webp" className="w-full  aspect-3/2 object-cover rounded-2xl shadow-2xl" />
              </div>

            </div>
          </div>
        </div>
      </motion.section>
    </div>
    </Container>
  );


};