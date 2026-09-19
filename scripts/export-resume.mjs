import { execSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const inputHtmlPath = path.resolve(projectRoot, 'resume', 'resume.html');
const outputPdfPath = path.resolve(projectRoot, 'public', 'documents', 'taejung-resume.pdf');
const distPdfPath = path.resolve(projectRoot, 'dist', 'documents', 'taejung-resume.pdf');

if (!existsSync(inputHtmlPath)) {
  console.error(`[Error] Resume HTML file not found at ${inputHtmlPath}`);
  process.exit(1);
}

mkdirSync(path.dirname(outputPdfPath), { recursive: true });

// Find Chrome binary
const possibleChromePaths = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  'google-chrome',
  'google-chrome-stable',
  'chromium',
  'chromium-browser'
];

const chromeBin = possibleChromePaths.find((p) => {
  if (p.startsWith('/')) {
    return existsSync(p);
  }
  try {
    execSync(`which ${p}`, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
});

if (!chromeBin) {
  console.error('[Error] Google Chrome or Chromium executable was not found on your system.');
  console.error('Please open resume/resume.html directly in your browser and use "Print -> Save as PDF".');
  process.exit(1);
}

console.log(`[1/4] Found Chrome binary: ${chromeBin}`);
console.log(`[2/4] Rendering ${inputHtmlPath} to PDF...`);

try {
  const cmd = `"${chromeBin}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputPdfPath}" "file://${inputHtmlPath}"`;
  execSync(cmd, { stdio: 'inherit' });

  console.log(`[3/4] Successfully exported to: ${outputPdfPath}`);

  if (existsSync(path.dirname(distPdfPath))) {
    copyFileSync(outputPdfPath, distPdfPath);
    console.log(`      Synced to dist: ${distPdfPath}`);
  }

  // Page check
  console.log('[4/4] Verifying page count...');
  let pageCount = null;
  try {
    const swiftCmd = `swift -e 'import Foundation; import PDFKit; let url = URL(fileURLWithPath: "${outputPdfPath}"); if let pdf = PDFDocument(url: url) { print(pdf.pageCount) }'`;
    pageCount = execSync(swiftCmd, { encoding: 'utf8' }).trim();
  } catch {
    try {
      pageCount = execSync(`mdls -name kMDItemNumberOfPages -raw "${outputPdfPath}"`, { encoding: 'utf8' }).trim();
    } catch {}
  }

  if (pageCount === '2') {
    console.log(`✅ [PASS] Strict 2-Page Requirement Satisfied (Total Pages: ${pageCount})`);
  } else {
    console.error(`❌ [FAIL] Page count is ${pageCount} (Expected exactly 2 pages)`);
    process.exit(1);
  }
} catch (error) {
  console.error('[Error] Failed to export PDF:', error.message);
  process.exit(1);
}
