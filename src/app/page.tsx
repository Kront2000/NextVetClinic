'use client'
import { About, Hero, Procedure, Reviews } from "@/components/home";
import React from "react";
export default function Home() {


  const [showId, setShowId] = React.useState<number | null>(null);
  const toggleShowId = (id: number) => {
    setShowId(prev => (prev === id ? null : id));
  };

  return (
    <>
      <Hero/>
      <About/>
      <Procedure/>
      <Reviews/>
      
    </>
  );
}
