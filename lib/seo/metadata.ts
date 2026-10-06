import type { Metadata } from "next";
import { site } from "@/config/site";

export type PageSeo = {
  title: string;
  description: string;
  /** Site-relative path, always starting with "/". Drives the canonical tag. */
  path: string;
  /** Absolute or site-relative OG image. Defaults to the generated one. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
};

export function absoluteUrl(path: string): string {
  return path.startsWith("http") ? path : `${site.url}${path}`;
}

export function createMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  imageAlt,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: PageSeo): Metadata {
  const canonical = absoluteUrl(path);
  const ogImage = absoluteUrl(image);
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;

  return {
    // The root layout’s title template adds the brand suffix, so pass the bare
    // title and opt out of it on the home page.
    title: path === "/" ? { absolute: fullTitle } : title,
    description,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      url: canonical,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: "en_GB",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ],
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: site.twitterHandle,
      creator: site.twitterHandle,
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
