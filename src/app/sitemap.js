import { getPublicPosts } from "@/app/blog/actions";
import { getPublicProjects } from "@/app/portfolio/actions";

export default async function sitemap() {
  const baseUrl = "https://www.inogrtechnologies.com.ng";

  // 1. Fetch Dynamic Data
  const posts = await getPublicPosts();
  const projects = await getPublicProjects();

  // 2. Define Static Routes
  const routes = [
    "",
    "/about",
    "/contact",
    "/blog",
    "/portfolio",
    "/software",
    "/cafe",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  // 3. Generate Blog URLs
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 4. Generate Portfolio URLs
  const portfolioRoutes = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(project.createdAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 5. Combine All
  return [...routes, ...blogRoutes, ...portfolioRoutes];
}
