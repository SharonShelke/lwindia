// ============================================================================
// NEWS CONNECT: Official SVG Brand Badges & Icons
// ============================================================================

const BRAND_ICONS = {
  newsmax: `
    <svg viewBox="0 0 100 40" class="source-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="6" fill="#002B49"/>
      <path d="M12 28V12H16L24 23V12H28V28H24L16 17V28H12Z" fill="#FFFFFF"/>
      <path d="M31 28V12H42V15.5H35.5V18.5H41V21.5H35.5V24.5H42.5V28H31Z" fill="#FFFFFF"/>
      <path d="M44 28L48.5 12H52.5L57 28H52.8L51.8 24H49.2L48.2 28H44ZM49.8 20.8H51.2L50.5 16.5L49.8 20.8Z" fill="#D12630"/>
      <path d="M58 28L63.5 12H67.5L73 28H68.8L65.5 17.5L62.2 28H58Z" fill="#FFFFFF"/>
      <path d="M74 28L80 12H84L78 28H74Z" fill="#D12630"/>
      <path d="M84 12L78 28H74L80 12H84Z" fill="#D12630"/>
      <path d="M75 12L81 28H85L79 12H75Z" fill="#FFFFFF"/>
    </svg>
  `,
  foxnews: `
    <svg viewBox="0 0 100 40" class="source-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="6" fill="#003366"/>
      <rect x="3" y="3" width="94" height="34" rx="4" stroke="#CC0000" stroke-width="2"/>
      <text x="12" y="26" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" font-size="20" fill="#FFFFFF" letter-spacing="1">FOX</text>
      <text x="56" y="25" font-family="'Arial', sans-serif" font-weight="700" font-size="11" fill="#CC0000" letter-spacing="0.5">NEWS</text>
    </svg>
  `,
  ln24international: `
    <svg viewBox="0 0 100 40" class="source-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="6" fill="#0C2340"/>
      <circle cx="20" cy="20" r="12" stroke="#D4AF37" stroke-width="2"/>
      <circle cx="20" cy="20" r="6" fill="#D4AF37"/>
      <text x="36" y="24" font-family="'Montserrat', sans-serif" font-weight="800" font-size="15" fill="#FFFFFF">LN</text>
      <text x="58" y="24" font-family="'Montserrat', sans-serif" font-weight="900" font-size="16" fill="#D4AF37">24</text>
      <text x="36" y="33" font-family="'Arial', sans-serif" font-weight="700" font-size="6.5" fill="#93C5FD" letter-spacing="1.5">INTERNATIONAL</text>
    </svg>
  `,
  ln247: `
    <svg viewBox="0 0 100 40" class="source-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="6" fill="#0A2540"/>
      <rect x="8" y="8" width="24" height="24" rx="12" fill="#00D4B2"/>
      <text x="13" y="25" font-family="'Montserrat', sans-serif" font-weight="900" font-size="13" fill="#0A2540">LN</text>
      <text x="38" y="24" font-family="'Montserrat', sans-serif" font-weight="900" font-size="16" fill="#FFFFFF">24/7</text>
      <text x="38" y="32" font-family="'Arial', sans-serif" font-weight="600" font-size="7" fill="#00D4B2" letter-spacing="1">GLOBAL NEWS</text>
    </svg>
  `,
  loveworldeurope: `
    <svg viewBox="0 0 100 40" class="source-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="6" fill="#1E3A8A"/>
      <polygon points="18,10 24,24 10,24" fill="#F59E0B"/>
      <circle cx="20" cy="20" r="10" stroke="#F59E0B" stroke-width="1.5" stroke-dasharray="2,2"/>
      <text x="36" y="20" font-family="'Cinzel', 'Trajan Pro', serif" font-weight="700" font-size="9" fill="#FFFFFF" letter-spacing="0.5">LOVEWORLD</text>
      <text x="36" y="32" font-family="'Arial', sans-serif" font-weight="800" font-size="11" fill="#F59E0B" letter-spacing="1.5">EUROPE</text>
    </svg>
  `,
  loveworldsat: `
    <svg viewBox="0 0 100 40" class="source-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="6" fill="#1A365D"/>
      <circle cx="20" cy="20" r="11" fill="#EA580C"/>
      <ellipse cx="20" cy="20" rx="14" ry="4" stroke="#FFFFFF" stroke-width="1.5" transform="rotate(-30 20 20)"/>
      <text x="38" y="20" font-family="'Montserrat', sans-serif" font-weight="800" font-size="9" fill="#FFFFFF">LOVEWORLD</text>
      <text x="38" y="32" font-family="'Impact', sans-serif" font-weight="900" font-size="12" fill="#EA580C" letter-spacing="1">SAT TV</text>
    </svg>
  `,
  skynews_australia: `
    <svg viewBox="0 0 100 40" class="source-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="6" fill="#990000"/>
      <rect x="2" y="2" width="96" height="36" rx="4" fill="#E60000"/>
      <text x="10" y="24" font-family="'Arial Black', sans-serif" font-weight="900" font-size="16" fill="#FFFFFF" letter-spacing="0.5">sky</text>
      <text x="44" y="24" font-family="'Arial', sans-serif" font-weight="800" font-size="13" fill="#FFFFFF">NEWS</text>
      <text x="10" y="33" font-family="'Arial', sans-serif" font-weight="700" font-size="6.5" fill="#FED7D7" letter-spacing="1">AUSTRALIA</text>
    </svg>
  `,
  ani: `
    <svg viewBox="0 0 100 40" class="source-logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="40" rx="6" fill="#8B0000"/>
      <rect x="2" y="2" width="96" height="36" rx="4" fill="#C8102E"/>
      <text x="12" y="28" font-family="'Arial Black', 'Impact', sans-serif" font-weight="900" font-size="22" fill="#FFFFFF" letter-spacing="1">ANI</text>
      <text x="60" y="20" font-family="'Arial', sans-serif" font-weight="700" font-size="6.5" fill="#FFFFFF">NEWS</text>
      <text x="60" y="29" font-family="'Arial', sans-serif" font-weight="600" font-size="5" fill="#FFD7D7">INDIA</text>
    </svg>
  `
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = BRAND_ICONS;
}

