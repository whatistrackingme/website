import { chromium } from "@playwright/test";
import { stat, mkdir } from "node:fs/promises";
import { join } from "node:path";

const BASE_URL = "http://localhost:4321";
const SCREENSHOTS_DIR = join(import.meta.dirname, "screenshots");
const WATCHED_FILE = join(
  import.meta.dirname,
  "src/components/HowItWorks.astro",
);

const PAGES = [
  { path: "/", locale: "en" },
  { path: "/ja/", locale: "ja" },
];

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];

const THEMES = [
  { name: "dark", attr: "witm" },
  { name: "light", attr: "witm-latte" },
];

async function takeScreenshots(browser, stage) {
  const results = [];

  for (const { path, locale } of PAGES) {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
      });
      const page = await context.newPage();

      for (const theme of THEMES) {
        const url = `${BASE_URL}${path}`;
        await page.goto(url, { waitUntil: "networkidle" });

        // Set theme
        await page.evaluate(
          (t) => document.documentElement.setAttribute("data-theme", t),
          theme.attr,
        );

        // Wait for any theme transition to settle
        await page.waitForTimeout(500);

        const prefix = `${stage}-${viewport.name}-${locale}-${theme.name}`;

        // Full-page screenshot
        const fullFilename = `${prefix}.png`;
        await page.screenshot({
          path: join(SCREENSHOTS_DIR, fullFilename),
          fullPage: true,
        });
        results.push(fullFilename);
        console.log(`  Captured: ${fullFilename}`);

        // Section-specific screenshot
        const section = page.locator("#how-it-works");
        if ((await section.count()) > 0) {
          const sectionFilename = `${prefix}-howitworks.png`;
          await section.screenshot({
            path: join(SCREENSHOTS_DIR, sectionFilename),
          });
          results.push(sectionFilename);
          console.log(`  Captured: ${sectionFilename}`);
        }
      }

      await context.close();
    }
  }

  return results;
}

async function getFileMtime() {
  try {
    const s = await stat(WATCHED_FILE);
    return s.mtimeMs;
  } catch {
    return null;
  }
}

async function waitForFileChange(
  initialMtime,
  maxWaitMs = 300000,
  intervalMs = 30000,
) {
  const start = Date.now();
  console.log(
    `\nPolling for changes to HowItWorks.astro (every ${intervalMs / 1000}s, max ${maxWaitMs / 1000}s)...`,
  );

  while (Date.now() - start < maxWaitMs) {
    const currentMtime = await getFileMtime();
    if (currentMtime !== null && currentMtime !== initialMtime) {
      console.log(
        `  HowItWorks.astro changed! (mtime: ${initialMtime} -> ${currentMtime})`,
      );
      return true;
    }
    const elapsed = Math.round((Date.now() - start) / 1000);
    console.log(`  No change detected (${elapsed}s elapsed). Waiting...`);
    await new Promise((r) => setTimeout(r, intervalMs));
  }

  console.log("  Timed out waiting for HowItWorks.astro changes.");
  return false;
}

async function main() {
  await mkdir(SCREENSHOTS_DIR, { recursive: true });

  // Verify dev server is accessible
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    console.log(`Dev server is accessible at ${BASE_URL}\n`);
  } catch (e) {
    console.error(
      `ERROR: Dev server at ${BASE_URL} is not accessible: ${e.message}`,
    );
    process.exit(1);
  }

  const browser = await chromium.launch();

  // Record initial file mtime
  const initialMtime = await getFileMtime();
  console.log(`HowItWorks.astro initial mtime: ${initialMtime}\n`);

  // --- Stage 1: Baseline screenshots ---
  console.log("=== Taking BASELINE screenshots ===");
  const baselineFiles = await takeScreenshots(browser, "baseline");
  console.log(`\nBaseline complete: ${baselineFiles.length} screenshots\n`);

  // --- Stage 2: Wait for file changes ---
  const changed = await waitForFileChange(initialMtime);

  if (changed) {
    // Give the dev server a moment to hot-reload
    console.log("  Waiting 5s for dev server hot-reload...");
    await new Promise((r) => setTimeout(r, 5000));

    // --- Stage 3: Final screenshots ---
    console.log("\n=== Taking FINAL screenshots ===");
    const finalFiles = await takeScreenshots(browser, "final");
    console.log(`\nFinal complete: ${finalFiles.length} screenshots\n`);

    // --- Stage 4: Compare ---
    console.log("=== Comparison Summary ===");
    console.log("Baseline screenshots:");
    for (const f of baselineFiles) console.log(`  ${f}`);
    console.log("Final screenshots:");
    for (const f of finalFiles) console.log(`  ${f}`);
    console.log(
      "\nVisual comparison: Review the screenshots in ~/Code/website/screenshots/",
    );
  } else {
    console.log("No changes detected. Only baseline screenshots were taken.");
  }

  await browser.close();
  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
