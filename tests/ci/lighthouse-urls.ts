import { parse as parseYaml } from "jsr:@std/yaml@^1";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/\/$/, "");

const toSlug = (name: string): string =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

try {
  const raw = Deno.readTextFileSync(`${ROOT}/content/01-sitemap.yaml`);
  const data = parseYaml(raw) as Record<string, unknown>;
  const primary = (data.primary_navigation as string[]) || [];

  const urls = primary.map((name) => {
    const slug = toSlug(name as string);
    return slug === "home" ? "http://localhost:8000/" : `http://localhost:8000/${slug}`;
  });

  if (urls.length === 0) {
    urls.push("http://localhost:8000/");
  }

  // Update lighthouserc.json with discovered URLs
  const rcPath = `${ROOT}/.github/lighthouse/lighthouserc.json`;
  const rc = JSON.parse(Deno.readTextFileSync(rcPath));
  rc.ci.collect.url = urls;
  Deno.writeTextFileSync(rcPath, JSON.stringify(rc, null, 2) + "\n");

  console.log(`Lighthouse will audit ${urls.length} URLs:`);
  urls.forEach((u) => console.log(`  ${u}`));
} catch (e) {
  console.log(`Could not generate Lighthouse URLs: ${e}`);
  console.log("Falling back to homepage only.");
}
