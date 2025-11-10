import React from "react";
import { cn } from "@/lib/utils";
import { Dog } from "lucide-react";
import { useInView } from "react-intersection-observer"

interface Props {
  className?: string;
  children?: React.ReactNode;
  text?: string;
}

export const HeroCard: React.FC<Props> = ({ className, children, text }) => {

  const { ref, inView } = useInView({

    threshold: 1,
  });


  return (
    <div ref={ref} className={cn('relative p-2 bg-white rounded-full md:rounded-bl-none md:rounded-tr-none md:rounded-tl-2xl rounded-br-2xl shadow-xl items-center transition duration-400', className, inView ? 'opacity-100 ' : 'opacity-0 translate-y-4')}>
      {children}
      <p className="pl-14 text-left md:text-sm lg:text-2xl lg:font-light 2xl:text-3xl">{text}</p>
    </div>
  );
};