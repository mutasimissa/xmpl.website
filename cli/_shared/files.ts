import { parse as parseYaml, stringify as stringifyYaml } from "@std/yaml";
import { dirname } from "@std/path";
import { ensureDir } from "@std/fs";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/\/$/, "");

export const resolve = (...segments: string[]): string =>
  `${ROOT}/${segments.join("/")}`;

export const readText = (path: string): string =>
  Deno.readTextFileSync(resolve(path));

export const writeText = async (path: string, content: string): Promise<void> => {
  const full = resolve(path);
  await ensureDir(dirname(full));
  await Deno.writeTextFile(full, content);
};

export const readYaml = <T = Record<string, unknown>>(path: string): T =>
  parseYaml(readText(path)) as T;

export const writeYaml = (path: string, data: Record<string, unknown>): Promise<void> =>
  writeText(path, stringifyYaml(data, { lineWidth: -1 }));

export const fileExists = (path: string): boolean => {
  try {
    Deno.statSync(resolve(path));
    return true;
  } catch {
    return false;
  }
};

export const getLocales = (): { defaultLocale: string; locales: string[] } => {
  try {
    const input = readYaml<Record<string, unknown>>("business/01-business-input.yaml");
    const defaultLocale = (input.default_locale as string) || "en";
    const locales = (input.locales as string[]) || [];
    return { defaultLocale, locales };
  } catch {
    return { defaultLocale: "en", locales: [] };
  }
};

export const isMultilingual = (): boolean => {
  const { locales } = getLocales();
  return locales.length > 1;
};

export const toSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export { ROOT };
