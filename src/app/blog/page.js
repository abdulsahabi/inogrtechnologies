import React from "react";
import Footer from "@/components/layout/footer";
import BlogClient from "./blog-client"; // Import the client part
import { getPublicPosts } from "./actions"; // Server Action

export const metadata = {
  title: "InoGr Insights | Technology & Business Blog",
  description:
    "Latest news, tutorials, and tech trends from Kebbi State's premier tech hub.",
};

// FORCE DYNAMIC: Ensure new posts appear instantly without rebuild
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  // Fetch data ON THE SERVER
  const posts = await getPublicPosts();

  return (
    <main className="min-h-screen bg-white dark:bg-black">
      {/* Pass initial data to the client component */}
      <BlogClient initialPosts={posts} />
      <Footer />
    </main>
  );
}
