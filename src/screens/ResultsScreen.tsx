/**
 * Results Screen
 *
 * Displays extracted invoice data for one or multiple files.
 * File tabs switch between results in batch mode.
 * Shows totals card, line items table, confidence score, and raw JSON viewer.
 * Export buttons call the backend download endpoints directly.
 */

import React, { useState } from "react";
import { C, FONT_SERIF, FONT_SANS } from "../tokens";
import {
  IconDownload,
  IconCopy,
  IconCheck,
  IconWarning,
  IconUpload,
  IconBolt,
} from "../icons";
import ConfidenceBadge from "../components/ConfidenceBadge";
import StatusPill from "../components/StatusPill";
import { exportJsonUrl, exportCsvUrl } from "../api";
import type { InvoiceExtractionResult } from "../types";

interface Props {
  results: InvoiceExtractionResult[];
  onReset: () => void;
}

export default function ResultsScreen({ results, onReset }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [copied, setCopied]       = useState(false);

  const result = results[activeIdx];
  const d      = result?.data;

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fmt = (n?: number | null) =>
    n !== undefined && n !== null
      ? n.toLocaleString("en-US", { minimumFractionDigits: 2 })
      : "—";

  return (
    <div
      style={{
        background: C.warmGray,
        minHeight: "100vh",
        fontFamily: FONT_SANS,
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "80px 24px 60px",
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 28,
            paddingTop: 20,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                letterSpacing: 3,
                color: C.green,
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Extraction Complete
            </p>
            <h2
              style={{
                fontFamily: FONT_SERIF,
                fontSize: 28,
                fontWeight: 700,
                color: C.black,
              }}
            >
              {results.length}{" "}
              {results.length === 1 ? "Invoice" : "Invoices"} Processed
            </h2>
          </div>

          {/* Export buttons */}
          <div style={{ display: "flex", gap: 8 }}>
            <a
              href={exportCsvUrl}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                background: C.white,
                border: `1.5px solid ${C.grayBorder}`,
                fontSize: 13,
                fontWeight: 600,
                color: C.black,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <IconDownload size={15} color={C.black} />
              Export CSV
            </a>
            <a
              href={exportJsonUrl}
              style={{
                padding: "10px 18px",
                borderRadius: 10,
                background: C.black,
                border: "none",
                fontSize: 13,
                fontWeight: 600,
                color: C.white,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <IconDownload size={15} color={C.white} />
              Export JSON
            </a>
          </div>
        </div>

        {/* Batch file tabs */}
        {results.length > 1 && (
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: `1.5px solid ${
                    i === activeIdx ? C.black : C.grayBorder
                  }`,
                  background: i === activeIdx ? C.black : C.white,
                  color: i === activeIdx ? C.white : C.gray,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  maxWidth: 180,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {r.file_name}
              </button>
            ))}
          </div>
        )}

        {/* Two-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: 16,
          }}
        >
          {/* LEFT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Summary card */}
            <div
              style={{
                background: C.white,
                borderRadius: 16,
                border: `1px solid ${C.grayBorder}`,
                padding: 24,
                animation: "fadeUp 0.4s ease both",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 20,
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      color: C.gray,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      marginBottom: 6,
                    }}
                  >
                    Vendor
                  </p>
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      color: C.black,
                      fontFamily: FONT_SERIF,
                    }}
                  >
                    {d?.vendor_name ?? "Unknown"}
                  </p>
                </div>
                <StatusPill status={result?.status ?? "failed"} />
              </div>

              {/* Field grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "14px 20px",
                  marginBottom: 20,
                }}
              >
                {[
                  { label: "Invoice No.", value: d?.invoice_number },
                  { label: "Date",        value: d?.invoice_date   },
                  { label: "Due Date",    value: d?.due_date        },
                  { label: "Bill To",     value: d?.bill_to         },
                  { label: "Currency",    value: d?.currency        },
                  { label: "Terms",       value: d?.payment_terms   },
                ].map((item, i) => (
                  <div key={i}>
                    <p
                      style={{
                        fontSize: 10,
                        color: C.gray,
                        marginBottom: 3,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: item.value ? C.black : C.grayLight,
                      }}
                    >
                      {item.value ?? "—"}
                    </p>
                  </div>
                ))}
              </div>

              {/* Confidence */}
              <div
                style={{
                  paddingTop: 16,
                  borderTop: `1px solid ${C.grayBorder}`,
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    color: C.gray,
                    marginBottom: 8,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                  }}
                >
                  Confidence
                </p>
                <ConfidenceBadge score={result?.confidence_score ?? 0} />
              </div>
            </div>

            {/* Totals card — brown/black split matching aykeni pricing card */}
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${C.grayBorder}`,
                animation: "fadeUp 0.4s ease 0.08s both",
              }}
            >
              <div
                style={{
                  background: `linear-gradient(135deg, ${C.brown} 0%, ${C.black} 100%)`,
                  padding: "22px 24px",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 600,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  Total Amount
                </p>
                <p
                  style={{
                    fontFamily: FONT_SERIF,
                    fontSize: 38,
                    fontWeight: 700,
                    color: C.white,
                    lineHeight: 1,
                  }}
                >
                  {d?.currency ?? "$"} {fmt(d?.total_amount)}
                </p>
              </div>
              <div style={{ background: C.white, padding: "16px 24px" }}>
                {[
                  { label: "Subtotal", value: d?.subtotal    },
                  { label: "Tax",      value: d?.tax_amount  },
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: i === 0 ? 8 : 0,
                    }}
                  >
                    <span style={{ fontSize: 13, color: C.gray }}>
                      {row.label}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: C.black,
                      }}
                    >
                      {d?.currency} {fmt(row.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Meta badges */}
            <div
              style={{
                background: C.white,
                borderRadius: 16,
                border: `1px solid ${C.grayBorder}`,
                padding: "16px 24px",
                display: "flex",
                gap: 28,
                flexWrap: "wrap",
                animation: "fadeUp 0.4s ease 0.14s both",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 10,
                    color: C.gray,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 6,
                  }}
                >
                  OCR Used
                </p>
                <span
                  style={{
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                    background: result?.ocr_used ? C.amberMuted : C.greenMuted,
                    color: result?.ocr_used ? "#D97706" : C.greenDark,
                  }}
                >
                  {result?.ocr_used ? "Yes" : "Native PDF"}
                </span>
              </div>
              <div>
                <p
                  style={{
                    fontSize: 10,
                    color: C.gray,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 6,
                  }}
                >
                  Text Length
                </p>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: C.black,
                  }}
                >
                  {result?.raw_text_length ?? 0} chars
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: 10,
                    color: C.gray,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: 0.5,
                    marginBottom: 6,
                  }}
                >
                  File
                </p>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: C.black,
                    maxWidth: 140,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {result?.file_name}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Line items */}
            <div
              style={{
                background: C.white,
                borderRadius: 16,
                border: `1px solid ${C.grayBorder}`,
                overflow: "hidden",
                animation: "fadeUp 0.4s ease 0.04s both",
              }}
            >
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: `1px solid ${C.grayBorder}`,
                }}
              >
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: C.black,
                  }}
                >
                  Line Items
                </p>
                <p style={{ fontSize: 12, color: C.gray, marginTop: 2 }}>
                  {d?.line_items?.length ?? 0} items extracted
                </p>
              </div>

              {d?.line_items && d.line_items.length > 0 ? (
                d.line_items.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "13px 24px",
                      borderBottom:
                        i < (d.line_items?.length ?? 0) - 1
                          ? `1px solid ${C.grayBorder}`
                          : "none",
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: C.black,
                        }}
                      >
                        {item.item}
                      </p>
                      {item.quantity != null && (
                        <p style={{ fontSize: 11, color: C.gray, marginTop: 2 }}>
                          {item.quantity} × {d.currency}{" "}
                          {item.unit_price?.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: C.black,
                      }}
                    >
                      {d.currency} {item.price.toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <div
                  style={{ padding: 28, textAlign: "center" }}
                >
                  <IconWarning size={20} />
                  <p
                    style={{
                      fontSize: 13,
                      color: C.gray,
                      marginTop: 8,
                    }}
                  >
                    No line items extracted
                  </p>
                </div>
              )}
            </div>

            {/* Raw JSON viewer */}
            <div
              style={{
                background: C.white,
                borderRadius: 16,
                border: `1px solid ${C.grayBorder}`,
                overflow: "hidden",
                animation: "fadeUp 0.4s ease 0.1s both",
              }}
            >
              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: `1px solid ${C.grayBorder}`,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 700, color: C.black }}>
                  Raw JSON
                </p>
                <button
                  onClick={copyJSON}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 12px",
                    borderRadius: 8,
                    border: `1.5px solid ${C.grayBorder}`,
                    background: copied ? C.greenMuted : C.white,
                    color: copied ? C.greenDark : C.gray,
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {copied ? (
                    <IconCheck size={13} color={C.greenDark} />
                  ) : (
                    <IconCopy size={13} />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: 20,
                  fontSize: 11,
                  lineHeight: 1.7,
                  color: C.codeText,
                  background: C.codeBase,
                  overflowX: "auto",
                  overflowY: "auto",
                  maxHeight: 300,
                  whiteSpace: "pre",
                }}
              >
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Reset CTA */}
        <div style={{ marginTop: 28, textAlign: "center" }}>
          <button
            onClick={onReset}
            style={{
              padding: "12px 32px",
              borderRadius: 12,
              background: C.black,
              border: "none",
              color: C.white,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: FONT_SERIF,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <IconUpload size={16} color={C.green} />
            Extract Another Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
