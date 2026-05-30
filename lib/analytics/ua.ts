// Lightweight user-agent parser. Deliberately dependency-free: we only need
// coarse buckets for the analytics dashboard (device class, browser family,
// OS family), not exhaustive UA detection. Order of checks matters — more
// specific tokens are tested before generic ones (e.g. Edge/Chrome, iPad/iPhone).

export type ParsedUA = {
  device: "mobile" | "tablet" | "desktop" | null;
  browser: string | null;
  os: string | null;
};

export function parseUserAgent(ua: string | null | undefined): ParsedUA {
  if (!ua) return { device: null, browser: null, os: null };

  const s = ua.toLowerCase();

  // Device class -------------------------------------------------------
  let device: ParsedUA["device"];
  if (/ipad|tablet|(android(?!.*mobile))|kindle|silk|playbook/.test(s)) {
    device = "tablet";
  } else if (/mobi|iphone|ipod|android.*mobile|blackberry|opera mini|iemobile/.test(s)) {
    device = "mobile";
  } else {
    device = "desktop";
  }

  // Browser family (test specific before generic) ---------------------
  let browser: string | null = null;
  if (/edg\//.test(s)) browser = "Edge";
  else if (/opr\/|opera/.test(s)) browser = "Opera";
  else if (/samsungbrowser/.test(s)) browser = "Samsung Internet";
  else if (/firefox|fxios/.test(s)) browser = "Firefox";
  else if (/chrome|crios/.test(s)) browser = "Chrome";
  else if (/safari/.test(s)) browser = "Safari";
  else if (/msie|trident/.test(s)) browser = "Internet Explorer";

  // OS family ----------------------------------------------------------
  let os: string | null = null;
  if (/windows/.test(s)) os = "Windows";
  else if (/iphone|ipad|ipod|ios/.test(s)) os = "iOS";
  else if (/mac os x|macintosh/.test(s)) os = "macOS";
  else if (/android/.test(s)) os = "Android";
  else if (/linux/.test(s)) os = "Linux";
  else if (/cros/.test(s)) os = "ChromeOS";

  return { device, browser, os };
}
