import type { MetadataRoute } from "next";
import { projectsData } from "@/data/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://antony-saleeb-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projectsData.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projectRoutes,
  ];
}
