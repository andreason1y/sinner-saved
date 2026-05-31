import { SITE, absoluteUrl } from "./site";
import type { Post } from "./types";
import { getCategory } from "./categories";

/**
 * Schema.org builders for JSON-LD. Kept framework-agnostic so they can be
 * unit-tested and reused by any route that needs structured data.
 */

/** WebSite schema for the homepage — enables the Google sitelinks search box. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "id-ID",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/arsip?q={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Organization schema — establishes the brand entity for Google. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    logo: absoluteUrl("/icon.png"),
  };
}

/** Article schema for a single post — the big win for blog rich results. */
export function articleSchema(post: Post & { contentHtml?: string }) {
  const url = absoluteUrl(`/${post.mainCategory}/${post.slug}`);
  const category = getCategory(post.mainCategory);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover ? [post.cover] : [absoluteUrl("/og.png")],
    datePublished: post.createdAt,
    dateModified: post.updatedAt ?? post.createdAt,
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/icon.png"),
      },
    },
    articleSection: category?.name,
    inLanguage: "id-ID",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };
}

/** BreadcrumbList schema — shows the category path under the search result. */
export function breadcrumbSchema(post: Post) {
  const category = getCategory(post.mainCategory);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE.name,
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category?.name ?? post.mainCategory,
        item: absoluteUrl(`/kategori/${post.mainCategory}`),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: absoluteUrl(`/${post.mainCategory}/${post.slug}`),
      },
    ],
  };
}
