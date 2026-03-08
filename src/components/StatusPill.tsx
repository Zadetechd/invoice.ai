import React from "react";
import { C } from "../tokens";

interface Props {
  status: "success" | "partial" | "failed";
}

const MAP = {
  success: { bg: C.greenMuted,  color: C.greenDark,       label: "Success"  },
  partial: { bg: C.amberMuted,  color: "#D97706",          label: "Partial"  },
  failed:  { bg: C.redMuted,    color: "#DC2626",           label: "Failed"   },
};

export default function StatusPill({ status }: Props) {
  const s = MAP[status] ?? MAP.partial;
  return (
    <span
      style={{
        padding: "3px 12px",
        borderRadius: 20,
        background: s.bg,
        color: s.color,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.3,
      }}
    >
      {s.label}
    </span>
  );
}
