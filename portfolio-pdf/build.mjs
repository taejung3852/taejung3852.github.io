// Prints the built home page to the submission PDF, so the PDF always matches the site.
// Usage: npm run build && node portfolio-pdf/build.mjs
// Needs Chrome and Playwright; set PLAYWRIGHT to its module path if it is not installed here.
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'portfolio-pdf', 'park-taejung-portfolio.pdf');
const SITE = 'https://taejung3852.github.io';
const PORT = 4318;
// A4 proportions at the desktop layout width.
const PAGE = { width: 1280, height: 1810 };

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT || 'playwright');

const server = spawn('npx', ['vite', 'preview', '--port', PORT, '--strictPort'], { cwd: root, stdio: 'ignore' });
try {
  await new Promise((r) => setTimeout(r, 2500));
  const browser = await chromium.launch({ channel: 'chrome' });
  const page = await browser.newPage({ viewport: PAGE, colorScheme: 'light' });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle' });
  await page.emulateMedia({ media: 'screen', reducedMotion: 'reduce' });
  await page.addStyleTag({
    content: `
      .skip-link, .site-header, .site-footer, .hero-cta-group { display: none !important; }
      .hero { min-height: 0 !important; padding-block: 72px 56px !important; }
      .home-reading section { padding-block: 56px !important; }
      .projects { break-before: page; padding-top: 0 !important; }
      .projects-heading { margin-bottom: 24px !important; }
      .project-card { padding: 32px !important; }
      .project-card + .project-card { margin-top: 20px !important; }
      .project-others { break-before: page; }
      .project-card, .capability, .project-others, .credentials { break-inside: avoid; }
      /* Chrome drops tabular digits from the PDF text layer. */
      * { font-variant-numeric: normal !important; }
    `,
  });
  await page.evaluate(async (site) => {
    document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager'));
    await Promise.all([...document.images].map((i) => i.decode().catch(() => {})));
    // The PDF has no header, so the site address goes with the contacts.
    const web = document.createElement('a');
    web.href = site + '/';
    web.innerHTML = '<span>웹</span>taejung3852.github.io';
    document.querySelector('.profile-contact').append(web);
    document.querySelectorAll('a[href^="/"]').forEach((a) => a.setAttribute('href', site + a.getAttribute('href')));
  }, SITE);
  await page.pdf({ path: out, width: PAGE.width + 'px', height: PAGE.height + 'px', printBackground: true });
  await browser.close();
  console.log(out);
} finally {
  server.kill();
}
