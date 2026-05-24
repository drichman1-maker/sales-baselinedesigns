// Capture website preview screenshots for the demo cards.
//
// Usage:
//   bun add puppeteer
//   bun run scripts/shoot.mjs ./previews
//
// Renders each URL at 1280×720, writes JPEGs at quality 82.

import puppeteer from 'puppeteer';
import { join } from 'node:path';
import { mkdirSync } from 'node:fs';

const urls = {
  barbershop: 'https://demo-barbershop-tau.vercel.app',
  hvac: 'https://test-hvac.vercel.app',
  landscaping: 'https://demo-landscaping.vercel.app',
  medical: 'https://demo-medical-v2.vercel.app',
  electrician: 'https://demo-electrician.vercel.app',
  pool: 'https://demo-pool-ivory.vercel.app',
};

const outDir = process.argv[2] ?? './previews';
mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const results = [];

for (const [name, url] of Object.entries(urls)) {
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, 800)); // let above-fold animations settle
    const path = join(outDir, `${name}.jpg`);
    await page.screenshot({
      path,
      type: 'jpeg',
      quality: 82,
      clip: { x: 0, y: 0, width: 1280, height: 720 },
    });
    await page.close();
    results.push(`OK  ${name} -> ${path}`);
  } catch (e) {
    results.push(`ERR ${name} ${e.message}`);
  }
}

await browser.close();
console.log(results.join('\n'));
