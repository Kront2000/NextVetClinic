"use client"

import React from "react";
import { Procedure } from "./_components";
export default function Home() {


  const [showId, setShowId] = React.useState<number | null>(null);
  const toggleShowId = (id: number) => {
    setShowId(prev => (prev === id ? null : id));
  };

  return (
    <>
      
      <Procedure/>
      
      
    </>
  );
}