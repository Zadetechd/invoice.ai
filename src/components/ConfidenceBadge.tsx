import React from "react";
import { C } from "../tokens";

interface Props {
  score: number;
}

export default function ConfidenceBadge({ score }: Props) {
  const pct = Math.round(score * 100);
  const color =
    pct >= 75 ? C.green : pct >= 40 ? C.amber : C.red;
  const label =
    pct >= 75 ? "High confidence" : pct >= 40 ? "Partial" : "Low confidence";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div
        style={{
          width: 88,
          height: 6,
          borderRadius: 3,
          background: C.grayBorder,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            background: color,
            borderRadius: 3,
            transition: "width 1.2s ease",
          }}
        />
      </div>
      <span style={{ fontSize: 13, fontWeight: 700, color }}>{pct}%</span>
      <span style={{ fontSize: 12, color: C.gray }}>{label}</span>
    </div>
  );
}
