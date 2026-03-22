import { fileExists, readText, resolve } from "./files.ts";
import { createHash } from "node:crypto";

// ── Dependency graph ────────────────────────────────────
// Each business file maps to its downstream dependents.
// When a file changes, everything downstream is potentially stale.

const DEPENDENCY_MAP: Record<string, string[]> = {
  "business/01-business-input.yaml": [
    "business/02-brand-strategy.md",
  ],
  "business/02-brand-strategy.md": [
    "business/03-brand-identity.yaml",
    "business/04-business-model.md",
    "business/05-value-proposition.md",
    "business/06-personas-jtbd.md",
  ],
  "business/03-brand-identity.yaml": [
    "website/assets/styles.css",
  ],
  "business/04-business-model.md": [
    "content/01-sitemap.yaml",
  ],
  "business/05-value-proposition.md": [
    "content/01-sitemap.yaml",
  ],
  "business/06-personas-jtbd.md": [
    "content/01-sitemap.yaml",
  ],
  "content/01-sitemap.yaml": [
    "content/03-seo-brief.md",
  ],
  "content/03-seo-brief.md": [
    "content/04-content-deck.md",
  ],
  "content/04-content-deck.md": [
    "website/routes/",
  ],
};

// All tracked business files
const TRACKED_FILES = [
  "business/01-business-input.yaml",
  "business/02-brand-strategy.md",
  "business/03-brand-identity.yaml",
  "business/04-business-model.md",
  "business/05-value-proposition.md",
  "business/06-personas-jtbd.md",
  "content/01-sitemap.yaml",
  "content/03-seo-brief.md",
  "content/04-content-deck.md",
  "content/05-checklist.md",
];

// ── File state ──────────────────────────────────────────

export interface FileState {
  hash: string;
  mtime: number;
}

export interface SyncState {
  last_sync: string;
  files: Record<string, FileState>;
}

const STATE_FILE = ".contenty-state.json";

const computeHash = (content: string): string => {
  const hash = createHash("sha256");
  hash.update(content);
  return hash.digest("hex").slice(0, 12);
};

const getFileState = (path: string): FileState | null => {
  if (!fileExists(path)) return null;
  try {
    const content = readText(path);
    const stat = Deno.statSync(resolve(path));
    return {
      hash: computeHash(content),
      mtime: stat.mtime?.getTime() ?? 0,
    };
  } catch {
    return null;
  }
};

// ── Public API ──────────────────────────────────────────

export const loadState = (): SyncState | null => {
  if (!fileExists(STATE_FILE)) return null;
  try {
    const raw = readText(STATE_FILE);
    return JSON.parse(raw) as SyncState;
  } catch {
    return null;
  }
};

export const saveState = async (): Promise<void> => {
  const files: Record<string, FileState> = {};
  for (const path of TRACKED_FILES) {
    const state = getFileState(path);
    if (state) files[path] = state;
  }
  const data: SyncState = {
    last_sync: new Date().toISOString(),
    files,
  };
  await Deno.writeTextFile(resolve(STATE_FILE), JSON.stringify(data, null, 2) + "\n");
};

export interface ChangeReport {
  changed: string[];
  stale: string[];
  isFirstRun: boolean;
}

export const detectChanges = (): ChangeReport => {
  const prev = loadState();

  if (!prev) {
    return {
      changed: [],
      stale: [],
      isFirstRun: true,
    };
  }

  const changed: string[] = [];

  for (const path of TRACKED_FILES) {
    const current = getFileState(path);
    const previous = prev.files[path];

    if (!current && !previous) continue;
    if (!current && previous) {
      changed.push(path);
      continue;
    }
    if (current && !previous) {
      changed.push(path);
      continue;
    }
    if (current!.hash !== previous!.hash) {
      changed.push(path);
    }
  }

  const stale = getStaleFiles(changed);

  return { changed, stale, isFirstRun: false };
};

export const getStaleFiles = (changedFiles: string[]): string[] => {
  const stale = new Set<string>();
  const queue = [...changedFiles];

  while (queue.length > 0) {
    const file = queue.shift()!;
    const dependents = DEPENDENCY_MAP[file] ?? [];
    for (const dep of dependents) {
      if (!stale.has(dep) && !changedFiles.includes(dep)) {
        stale.add(dep);
        queue.push(dep);
      }
    }
  }

  return [...stale];
};

export const getWorkflowSuggestions = (changed: string[], stale: string[]): string[] => {
  const suggestions: string[] = [];
  const all = new Set([...changed, ...stale]);

  if (all.has("business/03-brand-identity.yaml") || all.has("website/assets/styles.css")) {
    suggestions.push("Brand identity changed → website styles need regeneration");
  }
  if (all.has("content/01-sitemap.yaml")) {
    suggestions.push("Sitemap changed → check for new/removed pages, update routes");
  }
  if (all.has("content/03-seo-brief.md")) {
    suggestions.push("SEO brief changed → update meta tags across all routes");
  }
  if (all.has("content/04-content-deck.md") || all.has("website/routes/")) {
    suggestions.push("Content changed → update route content to match");
  }
  if (all.has("business/02-brand-strategy.md")) {
    suggestions.push("Brand strategy changed → review tone across content deck and website");
  }

  return suggestions;
};

export { TRACKED_FILES, STATE_FILE };
