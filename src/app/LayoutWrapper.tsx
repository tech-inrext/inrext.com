"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./components/Header/Navbar";
import Footer from "./components/footer/Footer";
import WhatsAppButton from "./whatsappbutton/page";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // hide layout for visiting card pages
  const hideLayout = pathname?.includes("/visiting-card");

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
      {!hideLayout && <WhatsAppButton />}
    </>
  );
}