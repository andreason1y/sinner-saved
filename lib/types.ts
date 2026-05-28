export type MainCategorySlug =
  | "ruang-alkitab"
  | "ruang-teologi"
  | "ruang-lensa"
  | "sinners-note";

export type SubCategory = {
  slug: string;
  name: string;
};

export type MainCategory = {
  slug: MainCategorySlug;
  name: string;
  tagline: string;
  blurb: string;
  subcategories: SubCategory[];
};

export type PostStatus = "draft" | "published";

/**
 * Phase 2 content model — block-based, forward-compatible with the
 * Phase 3 WYSIWYG which will serialize to the same shape.
 */
export type ContentBlock =
  | { type: "heading"; level: 2 | 3; text: string; id?: string }
  | { type: "paragraph"; text: string }
  | { type: "blockquote"; text: string; cite?: string }
  | { type: "scripture"; text: string; reference: string }
  | { type: "code"; lang?: string; code: string; caption?: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "divider" };

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: ContentBlock[];
  cover?: string;
  mainCategory: MainCategorySlug;
  subCategory: string;
  tags?: string[];
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  readingMinutes?: number;
  author?: { name: string; bio?: string };
  titleEn?: string;
  excerptEn?: string;
  contentHtmlEn?: string;
};

export type BiblicalFact = {
  id: string;
  question: string;
  answer: string;
  reference: string;
};
