import { writeText, resolve, fileExists } from "./_shared/files.ts";
import { printSuccess, printError, printInfo, printSection } from "./_shared/log.ts";
import { generateAllBrandedFiles } from "./_shared/brand-gen.ts";

const WEBSITE_DIR = "website";

// ── Pre-flight checks ────────────────────────────────────

const requiredFiles = [
  "business/01-business-input.yaml",
  "business/03-brand-identity.yaml",
  "content/01-sitemap.yaml",
];

const missingFiles = requiredFiles.filter((f) => !fileExists(f));
if (missingFiles.length > 0) {
  printError("Missing required business files:");
  for (const f of missingFiles) console.log(`  - ${f}`);
  printInfo("Complete these files before running init-website.");
  Deno.exit(1);
}

// ── Confirm overwrite if website exists ──────────────────

const hasFiles = (() => {
  try {
    for (const entry of Deno.readDirSync(resolve(WEBSITE_DIR))) {
      if (entry.name !== ".gitkeep") return true;
    }
  } catch {
    // directory doesn't exist
  }
  return false;
})();

if (hasFiles) {
  printInfo("website/ already has files — rebuilding from business files.");
}

// ── Step 1: Scaffold Fresh project ───────────────────────

printSection("Step 1/3", "Scaffolding Fresh 2.2+ project");

const command = new Deno.Command("deno", {
  args: ["run", "-Ar", "jsr:@fresh/init", resolve(WEBSITE_DIR)],
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
});

const { code } = await command.output();

if (code !== 0) {
  printError("Fresh init failed. Check the output above.");
  Deno.exit(1);
}

printSuccess("Fresh project created in website/");

// ── Step 2: Generate branded files from business data ────

printSection("Step 2/3", "Generating branded files from business/");

try {
  const written = await generateAllBrandedFiles();
  printSuccess(`Generated ${written.length} branded files:`);
  for (const f of written) {
    console.log(`  + ${f}`);
  }
} catch (err) {
  printError(`Brand generation failed: ${err instanceof Error ? err.message : String(err)}`);
  Deno.exit(1);
}

// ── Step 3: Write tech stack decision record ─────────────

printSection("Step 3/3", "Writing decision records");

const techStackDoc = `# Tech Stack Decision

## Date
${new Date().toISOString().split("T")[0]}

## Stack
- **Framework:** Fresh 2.2+ (Deno)
- **Bundler:** Vite
- **Styling:** Tailwind CSS 4 (via @tailwindcss/vite)
- **Runtime:** Deno 2.x
- **Rendering:** Server-side with island architecture

## Rationale
Fresh provides server-rendered HTML with minimal JavaScript, island-based hydration,
and native Deno support. Tailwind CSS 4 via Vite integrates cleanly without a
separate plugin. This stack prioritizes performance, simplicity, and modern standards.
`;

await writeText("docs/decisions/tech-stack.md", techStackDoc);
printSuccess("Wrote docs/decisions/tech-stack.md");

// ── Next steps ───────────────────────────────────────────

console.log("");
printSection("What's next", "The branded scaffold is ready. Now populate content with your AI tool.");
console.log("  Run this command in Claude Code:\n");
console.log("  /init-website");
console.log("");
console.log("  The AI will read your content deck, page briefs, and SEO brief");
console.log("  to populate each route with actual copy, meta tags, and islands.");
console.log("");
