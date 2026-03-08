/**
 * Custom SVG Icons
 *
 * Every icon is hand-drawn SVG. No icon library is used.
 * All icons accept size and color props.
 */

import React from "react";
import { C } from "./tokens";

interface IconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export const IconUpload = ({ size = 24, color = C.black }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 3v12M12 3L7 8M12 3l5 5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 17v2a2 2 0 002 2h14a2 2 0 002-2v-2" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconDocument = ({ size = 24, color = C.black }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8L14 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 2v6h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 13h8M8 17h5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconCheck = ({ size = 20, color = C.white }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M4 10l4 4 8-8" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconClose = ({ size = 18, color = C.gray }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M4 4l10 10M14 4L4 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconDownload = ({ size = 18, color = C.white }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M9 3v9M9 12l-4-4M9 12l4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 15h12" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconSpinner = ({ size = 20, color = C.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" style={{ animation: "spin 0.9s linear infinite" }}>
    <circle cx="10" cy="10" r="7" stroke={C.grayBorder} strokeWidth="2.5" />
    <path d="M10 3a7 7 0 017 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const IconBolt = ({ size = 22, color = C.green }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
    <path d="M13 2L4 13h7l-2 7 9-11h-7l2-7z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const IconCopy = ({ size = 16, color = C.gray }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <rect x="5" y="5" width="9" height="9" rx="1.5" stroke={color} strokeWidth="1.5" />
    <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-7A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconWarning = ({ size = 18, color = C.amber }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <path d="M9 2l7.5 13H1.5L9 2z" stroke={color} strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 7v3M9 12.5v.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const IconEye = ({ size = 16, color = C.gray }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke={color} strokeWidth="1.5" />
    <circle cx="8" cy="8" r="2" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const IconRefresh = ({ size = 16, color = C.gray }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M13.5 2.5A6.5 6.5 0 112.5 8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    <path d="M2.5 4V8h3.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
