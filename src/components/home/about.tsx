import React from "react";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import { Roboto_Condensed } from "next/font/google";
import { AboutText } from "./about-text";
import { Container, Title } from "../shared";
import Image from "next/image";
import { useInView } from "react-intersection-observer";


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

  const { ref:refImage, inView:inViewImage } = useInView({

    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref:refText, inView:inViewText } = useInView({

    threshold: 0.5,
    triggerOnce: true,
  });

  

  return (
    <Container>
    
      <motion.section id="about" className={cn('mt-20', className)}>

        {/* Заголовок */}
        <div className="p-4 sm:px-8">
          
          <Title mainText="Всесторонняя" mainTextBlue="забота о питомце" smallText="Мы стремимся быть вашим надежным партнером на протяжении всей жизни вашего четвероногого друга."/>

          {/* ТЕКСТ И КАРТИНКИ */}

          {/* ТЕКСТ */}
          <div  className="flex flex-col-reverse md:flex-row mt-10 lg:mt-14 xl:mt-22 2xl:mt-32 gap-12 sm:gap-20 md:gap-2 2xl:justify-between">
            <div ref={refText} className="grid grid-rows-4 gap-2 xs:gap-4 sm:gap-12 md:gap-1 xl:gap-3 w-full md:h-fit md:w-[30%] lg:w-[35%] lg:pt-2 xl:pt-8">
              {list.map((item, index) => (
                <AboutText inView={inViewText} index={index} key={index} src={item.src} text={item.text} />
              ))}
            </div>

            {/* БЛОК с КАРТИНКАМИ */}
            <div ref={refImage} className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 md:gap-2 px-2 md:w-[70%] lg:w-[65%] 2xl:w-[55%] h-fit items-end ">
              <Image alt="about" width={3000} height={2000} src="/about.webp" className={cn("w-full aspect-2/3 object-cover rounded-2xl shadow-2xl transition duration-500 ease-in-out delay-0", inViewImage ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")} />
              <div className=" flex flex-col gap-2 w-full">
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Image alt="about-5" width={1000} height={1000} src="/spec5.webp" className={cn("w-full aspect-square object-cover rounded-4xl shadow-2xl transition duration-500 ease-in-out delay-75", inViewImage ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")} />
                  <Image alt="about-6" width={1000} height={1000} src="/spec6.webp" className={cn("w-full aspect-square object-cover rounded-4xl shadow-2xl transition duration-500 ease-in-out delay-100", inViewImage ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")} />
                </div>
                <Image alt="about-2" width={2000} height={1000} src="/about2.webp" className={cn("w-full  aspect-3/2 object-cover rounded-2xl shadow-2xl transition duration-500 ease-in-out delay-150", inViewImage ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")} />
              </div>

            </div>
          </div>
        </div>
      </motion.section>
    
    </Container>
  );


};