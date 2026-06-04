"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import {
  DICTIONARIES,
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
} from "@/lib/i18n/dictionary";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (typeof DICTIONARIES)[Locale];
  /** True while server components re-render after a locale switch (e.g. the
   *  article body is being (re)translated). UI can show a subtle indicator. */
  pending: boolean;
};

const LocaleContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "ss-locale";
const COOKIE_KEY = "ss-locale";

function readCookieLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_KEY}=([^;]+)`));
  if (m && (LOCALES as readonly string[]).includes(m[1])) return m[1] as Locale;
  return null;
}

function writeCookieLocale(l: Locale) {
  if (typeof document === "undefined") return;
  // 1 year, path=/
  document.cookie = `${COOKIE_KEY}=${l}; path=/; max-age=31536000; samesite=lax`;
}

export function LocaleProvider({
  initialLocale = DEFAULT_LOCALE,
  children,
}: {
  initialLocale?: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  // Hydrate from storage / cookie if it disagrees with initial.
  useEffect(() => {
    let chosen: Locale | null = null;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && (LOCALES as readonly string[]).includes(stored)) {
        chosen = stored as Locale;
      }
    } catch {
      // ignore
    }
    if (!chosen) chosen = readCookieLocale();
    if (chosen && chosen !== locale) {
      setLocaleState(chosen);
      document.documentElement.lang = chosen;
    } else {
      document.documentElement.lang = locale;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = useCallback(
    (next: Locale) => {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }
      writeCookieLocale(next);
      document.documentElement.lang = next;
      setLocaleState(next);
      // Server Components (e.g. the post body, which is chosen by the
      // ss-locale cookie at request time) don't know the cookie changed.
      // Re-fetch them in place — no full browser reload, client state kept —
      // so the article re-renders in the new language immediately. Wrapped in
      // a transition so `pending` stays true until the (possibly translated)
      // content is ready, letting the UI show a loading hint.
      startTransition(() => {
        router.refresh();
      });
    },
    [router]
  );

  return (
    <LocaleContext.Provider
      value={{ locale, setLocale, t: DICTIONARIES[locale], pending }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: DICTIONARIES[DEFAULT_LOCALE],
      pending: false,
    };
  }
  return ctx;
}
