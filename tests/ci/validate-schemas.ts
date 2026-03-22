import { parse as parseYaml } from "jsr:@std/yaml@^1";

const ROOT = new URL("../../", import.meta.url).pathname.replace(/\/$/, "");

const readYaml = <T>(path: string): T => {
  const content = Deno.readTextFileSync(`${ROOT}/${path}`);
  return parseYaml(content) as T;
};

interface SchemaProperty {
  type?: string;
  required?: string[];
  properties?: Record<string, SchemaProperty>;
}

interface Schema {
  type: string;
  required?: string[];
  properties?: Record<string, SchemaProperty>;
}

const SCHEMA_MAP: Record<string, string> = {
  "business/01-business-input.yaml": "agency/schemas/business-input.yaml",
  "business/03-brand-identity.yaml": "agency/schemas/brand-identity.yaml",
  "content/01-sitemap.yaml": "agency/schemas/sitemap.yaml",
};

let errors = 0;

const pass = (msg: string) => console.log(`  ✓ ${msg}`);
const fail = (msg: string) => { console.error(`  ✗ ${msg}`); errors++; };

console.log("\n🔍 Schema Validation\n");

for (const [dataFile, schemaFile] of Object.entries(SCHEMA_MAP)) {
  console.log(`\n  Validating ${dataFile} against ${schemaFile}`);

  try {
    Deno.statSync(`${ROOT}/${dataFile}`);
  } catch {
    console.log(`  ⊘ ${dataFile} does not exist — skipping`);
    continue;
  }

  try {
    const schema = readYaml<Schema>(schemaFile);
    const data = readYaml<Record<string, unknown>>(dataFile);

    if (!data || typeof data !== "object") {
      fail(`${dataFile} is not a valid YAML object`);
      continue;
    }

    // Check required fields
    const required = schema.required || [];
    for (const field of required) {
      if (data[field] !== undefined && data[field] !== null && data[field] !== "") {
        pass(`${field} is present`);
      } else {
        fail(`${dataFile}: missing required field "${field}"`);
      }
    }

    // Check that top-level keys exist in schema
    if (schema.properties) {
      const schemaKeys = Object.keys(schema.properties);
      for (const key of Object.keys(data)) {
        if (!schemaKeys.includes(key)) {
          console.log(`  ⚠ ${dataFile}: unknown field "${key}" (not in schema)`);
        }
      }
    }
  } catch (e) {
    fail(`Could not validate ${dataFile}: ${e}`);
  }
}

console.log(`\n${"═".repeat(50)}`);
if (errors > 0) {
  console.error(`  ${errors} schema validation error(s) found.`);
  Deno.exit(1);
} else {
  console.log("  All schema validations passed.");
}
