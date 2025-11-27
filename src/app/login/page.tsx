"use client"

import React from "react";
import { LoginForm } from "./_components/login-form";

export default function Home() {


  const [showId, setShowId] = React.useState<number | null>(null);
  const toggleShowId = (id: number) => {
    setShowId(prev => (prev === id ? null : id));
  };

  return (
    <>
      <LoginForm />
    </>
  );
}