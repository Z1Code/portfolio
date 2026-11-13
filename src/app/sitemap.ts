import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://7uanf.com/", changeFrequency: "monthly", priority: 1 },
    { url: "https://7uanf.com/llms.txt", changeFrequency: "monthly", priority: 0.5 },
  ];
}
