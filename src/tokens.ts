/**
 * Design tokens derived from the aykeni.com color palette.
 * All colors, spacing, and radius values live here.
 * Nothing in the UI hardcodes a color string directly.
 */

export const C = {
  white:      "#FFFFFF",
  warmGray:   "#F4F2EE",
  lightBlue:  "#E8F4F8",
  cyan:       "#67E8F9",
  green:      "#1DB954",
  greenDark:  "#17A349",
  greenMuted: "#D4F5E2",
  brown:      "#5C1F00",
  black:      "#111111",
  gray:       "#888888",
  grayLight:  "#CCCCCC",
  grayBorder: "#E8E8E8",
  amber:      "#F59E0B",
  amberMuted: "#FEF3C7",
  red:        "#EF4444",
  redMuted:   "#FEE2E2",
  codeBase:   "#F8FAFC",
  codeText:   "#334155",
} as const;

export const FONT_SERIF  = "Georgia, 'Times New Roman', serif";
export const FONT_SANS   = "'Helvetica Neue', Helvetica, Arial, sans-serif";
