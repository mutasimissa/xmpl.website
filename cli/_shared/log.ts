export const printSuccess = (msg: string): void =>
  console.log(`\n✅ ${msg}`);

export const printInfo = (msg: string): void =>
  console.log(`ℹ️  ${msg}`);

export const printError = (msg: string): void =>
  console.error(`❌ ${msg}`);

export const printNext = (msg: string): void =>
  console.log(`\n👉 Next step: ${msg}\n`);

export const printSection = (title: string, subtitle: string): void => {
  console.log(`\n${"─".repeat(60)}`);
  console.log(`  ${title}`);
  console.log(`  ${subtitle}`);
  console.log(`${"─".repeat(60)}\n`);
};

export const printHint = (hint: string): void =>
  console.log(`  💡 ${hint}\n`);
