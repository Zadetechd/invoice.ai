import React from "react";
import { C, FONT_SERIF, FONT_SANS } from "../tokens";

interface NavProps {
  showReset?: boolean;
  onReset?: () => void;
}

export default function Nav({ showReset, onReset }: NavProps) {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 60,
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${C.grayBorder}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
      }}
    >
      {/* Logo — typography only */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 3 }}>
        <span
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 18,
            fontWeight: 700,
            color: C.black,
            letterSpacing: -0.5,
          }}
        >
          Invoice
        </span>
        <span
          style={{
            fontFamily: FONT_SANS,
            fontSize: 11,
            fontWeight: 700,
            color: C.green,
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          AI
        </span>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {showReset && onReset && (
          <button
            onClick={onReset}
            style={{
              padding: "7px 18px",
              borderRadius: 20,
              border: `1.5px solid ${C.black}`,
              background: "transparent",
              cursor: "pointer",
              fontFamily: FONT_SERIF,
              fontSize: 13,
              fontWeight: 600,
              color: C.black,
            }}
          >
            New Upload
          </button>
        )}
        <a
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noreferrer"
          style={{
            padding: "7px 18px",
            borderRadius: 20,
            border: "none",
            background: C.black,
            fontSize: 13,
            fontWeight: 600,
            color: C.white,
            fontFamily: FONT_SERIF,
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          API Docs
        </a>
      </div>
    </nav>
  );
}