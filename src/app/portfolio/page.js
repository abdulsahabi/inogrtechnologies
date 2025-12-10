import React, { Suspense } from "react";
import Footer from "@/components/layout/footer";
import PortfolioClient from "./portfolio-client"; // <--- We will create this next
import { getPublicProjects } from "./actions"; // <--- Import Action

// 1. SET CACHE POLICY (ISR)
export const revalidate = 3600; // Cache for 1 hour

export const metadata = {
  title: "Our Portfolio | InoGr Technologies",
  description:
    "Explore our case studies in Web Development, Mobile Apps, and Branding.",
};

export default async function PortfolioPage() {
  // 2. FETCH DATA ON SERVER
  const projects = await getPublicProjects();

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <Suspense fallback={<div className="h-screen bg-white dark:bg-black" />}>
        {/* Pass initial data to client */}
        <PortfolioClient initialProjects={projects} />
      </Suspense>
      <Footer />
    </main>
  );
}
