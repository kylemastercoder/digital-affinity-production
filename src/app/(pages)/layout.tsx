import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React from "react";

const LandingContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex-1">{children}</div>
      <Footer />
    </main>
  );
};

export default LandingContainer;
