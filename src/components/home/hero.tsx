import React from "react";
import { cn } from "@/lib/utils";
import { Dog, HouseHeart, PhoneCall } from "lucide-react";
import { HeroCard } from "./heroCard";
import { useInView } from "react-intersection-observer";
import { delay, motion, Variants } from "framer-motion"

interface Props {
  className?: string;
}

export const Hero: React.FC<Props> = ({ className }) => {

  const textAnimation: Variants = {
    hidden: {
      x: 70,
      opacity: 0,
    },
    visible: (custom: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: custom * 2.0, duration: 0.7, type: 'tween' },
    })
  }

  const cardVariant: Variants = {
    hidden: {
      opacity: 0,
      y: '20px',
    },
    visible: (custom: number) => ({
      opacity: 1,
      y: '0px',
      transition: { delay: custom * 0.2, duration: 0.5, type: 'tween' },
    })
  }

  const { ref, inView } = useInView({

    threshold: 0.2,
  });

  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <motion.section className={cn('flex flex-col items-center overflow-hidden  w-full h-[950px] md:h-[550px] lg:h-[700px] xl:h-[770px] 2xl:h-[820px] relative p-6 lg:px-32 pt-16 bg-center bg-cover bg-[url(/bg.webp)] ', className)}>

      {/* Тайтл */}
      <h1 className="mb-8 text-4xl font-bold text-center md:hidden">Забота о ваших петомцах</h1>


      {/* Собака */}
      <div ref={ref} className="relative md:absolute md:-bottom-10 md:right-10 lg:right-16 flex flex-col items-center w-full md:w-2/5 md:max-h-[90%] mb-10 md:mb-0 xl:max-h-[80%]">
        <motion.img onLoad={() => setIsLoaded(true)} variants={textAnimation} initial="hidden" animate={inView ? "visible" : "hidden"} src="/dog.webp" alt="" className={cn("w-[70%] md:w-[90%] xl:w-[70%] filter drop-shadow-[8px_8px_15px_rgba(0,0,0,0.4)] lg:drop-shadow-[8px_8px_15px_rgba(0,0,0,0.8)]")} />
        <p className="absolute md:hidden -bottom-10 border-2 border-double border-primary-dark bg-white rounded-xl text-center shadow-xl ">
          Мы предлагаем полный спектр ветеринарных услуг — от диагностики до лечения и профилактики.
        </p>
      </div>

      {/* Описание */}
      <div className="hidden md:flex flex-col w-[50%] absolute top-1/3 left-5 lg:left-32 2xl:left-36">
        <h1 className={cn("text-3xl lg:text-5xl mb-2 font-medium text-left transition duration-700 text-sidebar-primary filter drop-shadow-[8px_8px_15px_rgba(0,0,0,0.4)]", inView ? "opacity-100" : "opacity-0 -translate-x-5")}>Забота о ваших петомцах</h1>
        <p className={cn("font-light text-xl lg:text-4xl text-left pr-5 transition duration-700 drop-shadow-[8px_8px_15px_rgba(0,0,0,0.4)]", inView ? "opacity-100" : "opacity-0 translate-y-5")}>
          Мы предлагаем полный спектр ветеринарных услуг — от диагностики до лечения и профилактики.
        </p>
      </div>

      {/* Карточки */}
      <div className="grid grid-cols-1 md:grid-cols-3 pt-14 gap-6 md:absolute bottom-4 lg:px-14">
        <motion.div variants={cardVariant} custom={1} initial="hidden" whileInView="visible" className={cn('relative p-2 bg-white rounded-full md:rounded-bl-none md:rounded-tr-none md:rounded-tl-2xl rounded-br-2xl shadow-xl items-center  ', className)}>
          <PhoneCall size={40} className="absolute top-1/2 -translate-y-1/2 " />
          <p className="pl-14 text-left md:text-sm lg:text-2xl lg:font-light 2xl:text-3xl">Экстренно реагируем на звонки в режиме 24/7</p>
        </motion.div>
        <motion.div variants={cardVariant} custom={2} initial="hidden" whileInView="visible" className={cn('relative p-2 bg-white rounded-full md:rounded-bl-none md:rounded-tr-none md:rounded-tl-2xl rounded-br-2xl shadow-xl items-center ', className)}>
          <HouseHeart size={40} className="absolute top-1/2 -translate-y-1/2" />
          <p className="pl-14 text-left md:text-sm lg:text-2xl lg:font-light 2xl:text-3xl">Обеспечиваем качественное лечение</p>
        </motion.div>
        <motion.div variants={cardVariant} custom={3} initial="hidden" whileInView="visible" className={cn('relative p-2 bg-white rounded-full md:rounded-bl-none md:rounded-tr-none md:rounded-tl-2xl rounded-br-2xl shadow-xl items-center ', className)}>
          <Dog size={40} className="absolute top-1/2 -translate-y-1/2" />
          <p className="pl-14 text-left md:text-sm lg:text-2xl lg:font-light 2xl:text-3xl">Экстренно реагируем на звонки в режиме 24/7</p>
        </motion.div>
      </div>
    </motion.section>
  );
};