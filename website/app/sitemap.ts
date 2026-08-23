import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aegisora-ai.vercel.app";

  return [
    { url: `${baseUrl}/`, lastModified: new Date(), priority: 1 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/security`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), priority: 0.5 },
  ];
}
