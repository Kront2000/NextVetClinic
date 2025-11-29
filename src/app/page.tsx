'use client'
import { About, Hero, Procedure, Reviews } from "@/components/home";
import React from "react";
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Ветеринарная клиника Затоболовка | Лечение животных, операции, вакцинация",
  description:
    "Ветеринарная клиника в Затоболовке. Лечение собак и кошек, операции, вакцинация, диагностика. Принимаем ежедневно. Доступные цены.",
};



export default function Home() {


  const [showId, setShowId] = React.useState<number | null>(null);
  const toggleShowId = (id: number) => {
    setShowId(prev => (prev === id ? null : id));
  };

  return (
    <>
      <Hero />
      <About />
      <Procedure />
      <Reviews />

    </>
  );
}
