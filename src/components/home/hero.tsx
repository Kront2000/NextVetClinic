import React from "react";
import { cn } from "@/lib/utils";
import { Dog, HouseHeart, PhoneCall } from "lucide-react";
import { HeroCard } from "./heroCard";
import { useInView } from "react-intersection-observer";
import { delay, motion, Variants } from "framer-motion"
import { Roboto_Condensed } from "next/font/google";
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
    <>
      <motion.section className={cn('flex flex-col items-center w-full bg-primary-foreground pt-30 md:pt-0 pb-10 xs:pb-14 md:pb-0 lg:pt-10', className)}>
        <Container>
          <div className="w-full flex flex-col md:flex-row-reverse gap-4 md:translate-y-28">
            <Image alt="dog" width={370} height={426} src="/dog4.webp" className="w-[90%] md:w-[50%] mx-auto md:col-start-2 " />

            {/* ЗАГОЛОВОК  */}
            <div className="flex flex-col gap-6 sm:gap-12 md:gap-6 xl:gap-12 md:col-start-1 md:w-[65%] md:pt-2 lg:pt-10 md:pl-10 ">
              <h1 className={cn("md:w-full  text-center md:text-left text-3xl xs:text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-5 xs:leading-6 sm:leading-8 xl:leading-10 text-stone-800 text-shadow-lg", robotoCondensed)}>Забота о ваших<br /> <p className="text-blue-400">питомцах</p></h1>
              <p className="w-[75%] md:w-full xl:w-[76%] mx-auto xl:mx-0  text-xs xs:text-sm sm:text-lg lg:text-xl xl:text-2xl  font-extralight text-stone-600 text-center md:text-left ">В нашей клинике мы верим, что каждое животное заслуживает самого лучшего лечения и безграничной любви</p>
              <div className="py-1 px-3  w-fit rounded-2xl text-base sm:text-lg lg:text-2xl xl:text-3xl text-center mx-auto md:mx-0 bg-blue-400 text-white shadow-2xl">Приходите к нам</div>
            </div>
          </div>
        </Container>
      </motion.section>
      <div className="w-full aspect-7/1"></div>
    </>
  );
}