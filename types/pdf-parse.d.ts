// We import pdf-parse from its internal entry (`pdf-parse/lib/pdf-parse.js`)
// to avoid the debug harness in the package index that breaks the Next.js
// build. That subpath ships no types, so we declare the minimal shape we use.
declare module "pdf-parse/lib/pdf-parse.js" {
  function pdf(dataBuffer: Buffer): Promise<{ text: string; numpages: number }>;
  export default pdf;
}
