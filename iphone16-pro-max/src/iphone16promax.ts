/**
 * iphone16promax.ts
 * Extended iOS device driver constants and helpers for iPhone 16 Pro Max
 * Plugs into GlacierEQ/mobile-mcp APEX architecture
 *
 * iPhone 16 Pro Max specs:
 *   Physical: 2868 × 1320 px
 *   Logical:   956 × 440 pt (scale factor 3x)
 *   ProMotion: 120Hz adaptive
 *   Dynamic Island: center (478, 11), w:120 h:37 pt
 */

export const IPHONE_16_PRO_MAX = {
  name: 'iPhone 16 Pro Max',
  model: 'A3293',

  screen: {
    physicalWidth: 2868,
    physicalHeight: 1320,
    logicalWidth: 956,
    logicalHeight: 440,
    scaleFactor: 3,
    ppi: 460,
    refreshRate: 120,
  },

  safeArea: {
    top: 59,
    bottom: 34,
    left: 0,
    right: 0,
  },

  dynamicIsland: {
    centerX: 478,
    centerY: 11,
    width: 120,
    height: 37,
    safeMargin: 20,
    /** Returns true if a point is inside the Dynamic Island exclusion zone */
    isExcluded(x: number, y: number): boolean {
      return (
        Math.abs(x - IPHONE_16_PRO_MAX.dynamicIsland.centerX) < 80 &&
        y < IPHONE_16_PRO_MAX.dynamicIsland.centerY + IPHONE_16_PRO_MAX.dynamicIsland.safeMargin
      );
    },
  },

  zones: {
    statusBar:     { y: 0,   height: 59  },
    safeContent:   { y: 59,  height: 847 },
    homeIndicator: { y: 906, height: 34  },
  },

  /** Common tap targets in logical points */
  coords: {
    center:       { x: 478, y: 478 },
    topLeft:      { x: 20,  y: 80  },
    topRight:     { x: 936, y: 80  },
    bottomLeft:   { x: 20,  y: 880 },
    bottomRight:  { x: 936, y: 880 },
    shutter:      { x: 478, y: 820 },  // Camera shutter button (portrait)
    backButton:   { x: 30,  y: 100 },  // Standard back button area
    alertOK:      { x: 478, y: 390 },  // Typical alert OK button
    alertCancel:  { x: 200, y: 390 },  // Typical alert Cancel button
    shareButton:  { x: 478, y: 900 },  // Share sheet first row center
  },

  /** Gesture paths for common iOS navigation */
  gestures: {
    goHome: {
      start: { x: 478, y: 935 },
      end:   { x: 478, y: 400 },
      durationMs: 300,
    },
    appSwitcher: {
      start: { x: 478, y: 935 },
      end:   { x: 478, y: 500 },
      durationMs: 300,
      holdAfterMs: 500,
    },
    controlCenter: {
      start: { x: 936, y: 5   },
      end:   { x: 936, y: 300 },
      durationMs: 300,
    },
    notificationCenter: {
      start: { x: 20, y: 5   },
      end:   { x: 20, y: 300 },
      durationMs: 300,
    },
    backGesture: {
      start: { x: 5,   y: 440 },
      end:   { x: 200, y: 440 },
      durationMs: 250,
    },
    scrollDown: {
      start: { x: 478, y: 700 },
      end:   { x: 478, y: 300 },
      durationMs: 400,
    },
    scrollUp: {
      start: { x: 478, y: 300 },
      end:   { x: 478, y: 700 },
      durationMs: 400,
    },
  },

  /** App bundle IDs commonly used in APEX workflows */
  apps: {
    files:       'com.apple.DocumentsApp',
    camera:      'com.apple.camera',
    photos:      'com.apple.mobileslideshow',
    shortcuts:   'com.apple.shortcuts',
    settings:    'com.apple.Preferences',
    safari:      'com.apple.mobilesafari',
    voiceMemos:  'com.apple.VoiceMemos',
    notes:       'com.apple.mobilenotes',
    mail:        'com.apple.mobilemail',
    calendar:    'com.apple.mobilecal',
    maps:        'com.apple.Maps',
    facetime:    'com.apple.facetime',
    messages:    'com.apple.MobileSMS',
    health:      'com.apple.Health',
    protonMail:  'com.protonmail.ProtonMail',
    signal:      'org.whispersystems.signal',
    notion:      'notion.id',
  },

  wda: {
    host: 'localhost',
    port: 8100,
    bundleId: 'com.facebook.WebDriverAgentRunner',
    sessionTimeout: 60000,
  },
} as const;

/**
 * Validates that a tap coordinate is within the safe content zone
 * and not inside the Dynamic Island exclusion area.
 */
export function isSafeCoord(x: number, y: number): boolean {
  const { safeArea, screen, dynamicIsland } = IPHONE_16_PRO_MAX;
  if (x < 0 || x > screen.logicalWidth) return false;
  if (y < safeArea.top || y > screen.logicalHeight - safeArea.bottom) return false;
  if (dynamicIsland.isExcluded(x, y)) return false;
  return true;
}

/**
 * Converts physical pixel coordinates to logical points.
 */
export function physicalToLogical(px: number, py: number): { x: number; y: number } {
  const scale = IPHONE_16_PRO_MAX.screen.scaleFactor;
  return { x: Math.round(px / scale), y: Math.round(py / scale) };
}

/**
 * Returns the center point of a screen zone (e.g., 'safeContent').
 */
export function zoneCenter(zone: keyof typeof IPHONE_16_PRO_MAX.zones): { x: number; y: number } {
  const z = IPHONE_16_PRO_MAX.zones[zone];
  return {
    x: Math.round(IPHONE_16_PRO_MAX.screen.logicalWidth / 2),
    y: Math.round(z.y + z.height / 2),
  };
}
