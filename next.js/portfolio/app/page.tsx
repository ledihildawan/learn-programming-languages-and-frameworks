"use client";

import { FloatingNav } from "@/components/ui/FloatingNav";

import { navItems } from "@/data";

import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import Footer from "@/components/footer";
import Clients from "@/components/Clients";
import Approach from "@/components/Approach";
import Experience from "@/components/Experience";
import RecentProjects from "@/components/RecentProjects";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex jusitfy-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <RecentProjects />
        <Clients />
        <Experience />
        <Approach />
        <Footer />
      </div>
    </main>
  );
}
