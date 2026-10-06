import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { posts } from "@/content/posts";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
  lastModified?: string;
};

const staticEntries: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/for-seekers", changeFrequency: "weekly", priority: 0.9 },
  { path: "/for-experts", changeFrequency: "weekly", priority: 0.9 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
  { path: "/ai-score", changeFrequency: "monthly", priority: 0.8 },
  { path: "/eligibility", changeFrequency: "monthly", priority: 0.9 },
  { path: "/trust-and-safety", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const buildDate = new Date();

  return [
    ...staticEntries.map((entry) => ({
      url: `${site.url}${entry.path === "/" ? "" : entry.path}`,
      lastModified: entry.lastModified ?? buildDate,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
    })),
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
