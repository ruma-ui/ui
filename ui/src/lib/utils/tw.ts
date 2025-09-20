// Lightweight runtime-safe `tw` tagged template for Tailwind class strings
// Keeps your existing `tw` usage working in Storybook and TypeScript.
export type TwValue =
  | string
  | number
  | false
  | null
  | undefined
  | TwValue[]
  | Record<string, string | number | boolean>;

function serialize(val: TwValue): string {
  if (!val) return "";
  if (Array.isArray(val)) return val.map(serialize).filter(Boolean).join(" ");
  if (typeof val === "object") {
    return Object.entries(val)
      .filter(([, v]) => Boolean(v))
      .map(([k]) => k)
      .join(" ");
  }
  return String(val);
}

export function tw(strings: TemplateStringsArray, ...expr: TwValue[]): string {
  let out = "";
  for (let i = 0; i < strings.length; i++) {
    out += strings[i];
    if (i < expr.length) out += (out.endsWith(" ") ? "" : " ") + serialize(expr[i]);
  }
  return out.replace(/\s+/g, " ").trim();
}
