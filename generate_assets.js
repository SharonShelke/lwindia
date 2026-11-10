// ============================================================================
// Generate placeholder app icons for Expo in assets/
// ============================================================================

const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// Minimal valid 1x1 PNG Buffer
const minimalPngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkWPjfDwAEeQHzk4tU7AAAAABJRU5ErkJggg==';
const pngBuffer = Buffer.from(minimalPngBase64, 'base64');

['icon.png', 'splash.png', 'adaptive-icon.png', 'favicon.png'].forEach(filename => {
  const targetPath = path.join(assetsDir, filename);
  if (!fs.existsSync(targetPath)) {
    fs.writeFileSync(targetPath, pngBuffer);
    console.log(`[Asset] Created placeholder: ${filename}`);
  }
});

// Also create an SVG logo in assets
const svgLogo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="100" fill="#0B1325"/>
  <circle cx="256" cy="256" r="160" stroke="#1E2F54" stroke-width="12" fill="none"/>
  <circle cx="256" cy="256" r="70" fill="#D4AF37"/>
  <path d="M256 96 L256 416 M96 256 L416 256" stroke="#0B1325" stroke-width="16"/>
  <circle cx="256" cy="256" r="28" fill="#FFFFFF"/>
</svg>`;

fs.writeFileSync(path.join(assetsDir, 'logo.svg'), svgLogo);
console.log('[Asset] Created logo.svg');

