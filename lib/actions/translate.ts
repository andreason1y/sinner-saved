"use server";

import { createClient } from "@supabase/supabase-js";

type TranslateResult = {
  titleEn: string;
  excerptEn: string;
  contentHtmlEn: string;
};

async function translateText(text: string): Promise<string> {
  // Use Google Translate via the public endpoint
  const { translate } = await import("@vitalets/google-translate-api");
  const result = await translate(text, { from: "id", to: "en" });
  return result.text;
}

export async function translatePostAction(
  postId: string,
  fields: { title: string; excerpt: string; contentHtml: string }
): Promise<TranslateResult | null> {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY
  ) {
    return null;
  }

  try {
    const [titleEn, excerptEn, contentHtmlEn] = await Promise.all([
      translateText(fields.title),
      translateText(fields.excerpt),
      translateText(fields.contentHtml),
    ]);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false, autoRefreshToken: false } }
    );

    await supabase
      .from("posts")
      .update({ title_en: titleEn, excerpt_en: excerptEn, content_html_en: contentHtmlEn })
      .eq("id", postId);

    return { titleEn, excerptEn, contentHtmlEn };
  } catch (e) {
    console.warn("[translate] failed:", (e as Error).message);
    return null;
  }
}
