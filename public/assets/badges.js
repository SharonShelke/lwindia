// ============================================================================
// NEWS CONNECT: Official Authentic Network Brand Badges
// Uses real official brand logo assets uploaded by the user
// ============================================================================

const BRAND_ICONS = {
  newsmax: '<img src="assets/logos/newsmax.png" class="source-logo-img" alt="Newsmax Logo" />',
  foxnews: '<img src="assets/logos/foxnews.png" class="source-logo-img" alt="Fox News Logo" />',
  ln24international: '<img src="assets/logos/ln24international.png" class="source-logo-img" alt="LoveWorld LN24 International Logo" onerror="this.src=\'assets/logos/ln24international.jpg\'" />',
  ln247: '<img src="assets/logos/ln247.png" class="source-logo-img" alt="LN247 Logo" />',
  loveworldeurope: '<img src="assets/logos/loveworldeurope.png" class="source-logo-img" alt="LoveWorld Europe Logo" onerror="this.src=\'assets/logos/loveworldeurope.jpg\'" />',
  loveworldsat: '<img src="assets/logos/loveworldsat.png" class="source-logo-img" alt="LoveWorld Sat Logo" />',
  skynews_australia: '<img src="assets/logos/skynews_australia.png" class="source-logo-img" alt="Sky News Australia Logo" />',
  ani: '<img src="assets/logos/ani.png" class="source-logo-img" alt="ANI News Logo" />',
  loveworldindia: '<img src="assets/logos/loveworldindia.svg" class="source-logo-img" alt="LoveWorld India Logo" />'
};

if (typeof window !== 'undefined') {
  window.BRAND_ICONS = BRAND_ICONS;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = BRAND_ICONS;
}
