// ============================================================================
// NEWS CONNECT: Color Palette & Typography Configuration (Dark & Light)
// ============================================================================

export const THEME = {
  dark: {
    name: 'dark',
    background: '#0B1325',         // Deep midnight navy
    backgroundSecondary: '#070C18',
    surface: '#111C35',            // Elevated surface navy
    surfaceHighlight: '#1A294C',
    surfaceSubtle: '#0F1A30',
    border: '#1E2F54',
    borderLight: '#2A3F6E',
    
    // Typography
    textPrimary: '#F8FAFC',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textInverse: '#0B1325',

    // Accents
    accentGold: '#D4AF37',         // Warm editorial gold
    accentGoldLight: '#FBF5D4',
    accentGoldDark: '#9A7D1C',
    accentRed: '#E53E3E',          // Breaking news ruby red
    accentBlue: '#3B82F6',
    
    // Status indicators
    statusLive: '#10B981',         // Emerald green for active feeds
    statusLiveBg: 'rgba(16, 185, 129, 0.15)',
    statusBroadcast: '#F59E0B',    // Amber for broadcast TV
    statusBroadcastBg: 'rgba(245, 158, 11, 0.15)',
    statusPortal: '#6366F1',       // Indigo for portal
    statusPortalBg: 'rgba(99, 102, 241, 0.15)',
    
    // Card & Shadow
    shadowColor: '#000000',
    cardBorder: 'rgba(255, 255, 255, 0.08)'
  },
  light: {
    name: 'light',
    background: '#F8FAFC',         // Off-white neutral grey
    backgroundSecondary: '#EDF2F7',
    surface: '#FFFFFF',            // Crisp card white
    surfaceHighlight: '#F1F5F9',
    surfaceSubtle: '#F8FAFC',
    border: '#E2E8F0',
    borderLight: '#CBD5E1',

    // Typography
    textPrimary: '#0F172A',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
    textInverse: '#FFFFFF',

    // Accents
    accentGold: '#B8860B',         // Deep gold
    accentGoldLight: '#FEF9E7',
    accentGoldDark: '#876200',
    accentRed: '#DC2626',          // News red
    accentBlue: '#2563EB',

    // Status indicators
    statusLive: '#059669',
    statusLiveBg: 'rgba(5, 150, 105, 0.1)',
    statusBroadcast: '#D97706',
    statusBroadcastBg: 'rgba(217, 119, 6, 0.1)',
    statusPortal: '#4F46E5',
    statusPortalBg: 'rgba(79, 70, 229, 0.1)',

    // Card & Shadow
    shadowColor: '#64748B',
    cardBorder: 'rgba(0, 0, 0, 0.06)'
  }
};

export default THEME;

