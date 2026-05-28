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

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  cover?: string;
  mainCategory: MainCategorySlug;
  subCategory: string;
  tags?: string[];
  status: PostStatus;
  createdAt: string;
  updatedAt: string;
  readingMinutes?: number;
};

export type BiblicalFact = {
  id: string;
  question: string;
  answer: string;
  reference: string;
};
