/**
 * Upload Screen
 *
 * The entry point for users. Supports single and batch mode.
 * Drag and drop or file browser. Validates file types client-side.
 * Calls the parent handler when the user is ready to extract.
 */

import React, { useCallback, useRef, useState } from "react";
import { C, FONT_SERIF, FONT_SANS } from "../tokens";
import {
  IconUpload,
  IconDocument,
  IconClose,
  IconBolt,
  IconCheck,
} from "../icons";
import type { UploadMode } from "../types";

interface Props {
  onExtract: (files: File[], mode: UploadMode) => void;
}

const ACCEPTED = [".pdf", ".png", ".jpg", ".jpeg"];

export default function UploadScreen({ onExtract }: Props) {
  const [files, setFiles]       = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [mode, setMode]         = useState<UploadMode>("single");
  const inputRef                = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    const valid = Array.from(incoming).filter((f) =>
      ACCEPTED.some((ext) => f.name.toLowerCase().endsWith(ext))
    );
    setFiles((prev) =>
      [...prev, ...valid].slice(0, mode === "batch" ? 20 : 1)
    );
  }, [mode]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const removeFile = (i: number) =>
    setFiles((f) => f.filter((_, idx) => idx !== i));

  const handleModeChange = (m: UploadMode) => {
    setMode(m);
    setFiles([]);
  };

  return (
    <div
      style={{
        background: C.white,
        minHeight: "100vh",
        fontFamily: FONT_SANS,
      }}
    >
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "100px 24px 80px",
        }}
      >
        {/* Hero */}
        <div
          style={{
            marginBottom: 48,
            animation: "fadeUp 0.5s ease both",
          }}
        >
          <p
            style={{
              fontSize: 11,
              letterSpacing: 3,
              color: C.green,
              fontWeight: 700,
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Document Intelligence
          </p>
          <h1
            style={{
              fontFamily: FONT_SERIF,
              fontSize: "clamp(34px, 6vw, 52px)",
              fontWeight: 700,
              lineHeight: 1.1,
              color: C.black,
              marginBottom: 18,
            }}
          >
            Extract invoice data{" "}
            <span
              style={{
                background: C.cyan,
                padding: "2px 10px",
                borderRadius: 4,
              }}
            >
              instantly.
            </span>
          </h1>
          <p
            style={{
              fontSize: 16,
              color: C.gray,
              lineHeight: 1.65,
              maxWidth: 500,
            }}
          >
            Upload any PDF or image invoice. The pipeline extracts vendor,
            amounts, and line items then returns clean structured JSON in
            seconds.
          </p>
        </div>

        {/* Mode toggle */}
        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: 24,
            background: C.warmGray,
            borderRadius: 10,
            padding: 4,
            width: "fit-content",
          }}
        >
          {(["single", "batch"] as UploadMode[]).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              style={{
                padding: "8px 22px",
                borderRadius: 8,
                border: "none",
                background: mode === m ? C.white : "transparent",
                color: mode === m ? C.black : C.gray,
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                boxShadow:
                  mode === m ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
                transition: "all 0.15s",
              }}
            >
              {m === "single" ? "Single Invoice" : "Batch Upload"}
            </button>
          ))}
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? C.green : C.grayBorder}`,
            borderRadius: 16,
            background: dragging ? C.greenMuted : C.warmGray,
            padding: "52px 32px",
            textAlign: "center",
            cursor: "pointer",
            transition: "all 0.2s",
            marginBottom: 20,
            animation: "fadeUp 0.5s ease 0.08s both",
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED.join(",")}
            multiple={mode === "batch"}
            style={{ display: "none" }}
            onChange={(e) => addFiles(e.target.files)}
          />
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: files.length ? C.greenMuted : C.white,
              border: `2px solid ${files.length ? C.green : C.grayBorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 18px",
              transition: "all 0.2s",
            }}
          >
            <IconUpload size={24} color={files.length ? C.green : C.gray} />
          </div>
          <p
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: C.black,
              marginBottom: 6,
            }}
          >
            {dragging
              ? "Drop your invoices here"
              : "Drag invoices here or click to browse"}
          </p>
          <p style={{ fontSize: 13, color: C.gray }}>
            PDF, PNG, JPG, JPEG supported — max 20 MB per file
            {mode === "batch" && " — up to 20 files"}
          </p>
        </div>

        {/* File list */}
        {files.length > 0 && (
          <div
            style={{ marginBottom: 24, animation: "fadeUp 0.3s ease both" }}
          >
            {files.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  borderRadius: 10,
                  border: `1px solid ${C.grayBorder}`,
                  background: C.white,
                  marginBottom: 8,
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: C.greenMuted,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconDocument size={18} color={C.green} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: C.black,
                      }}
                    >
                      {f.name}
                    </p>
                    <p style={{ fontSize: 11, color: C.gray }}>
                      {(f.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 4,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconClose size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Extract button */}
        <button
          onClick={() => files.length && onExtract(files, mode)}
          disabled={!files.length}
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 12,
            border: "none",
            background: files.length ? C.black : C.grayBorder,
            color: files.length ? C.white : C.gray,
            fontSize: 15,
            fontWeight: 700,
            cursor: files.length ? "pointer" : "not-allowed",
            fontFamily: FONT_SERIF,
            letterSpacing: 0.3,
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <IconBolt size={18} color={files.length ? C.green : C.gray} />
          {files.length
            ? `Extract ${files.length > 1 ? `${files.length} Invoices` : "Invoice"}`
            : "Add files to extract"}
        </button>

        {/* Feature row */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 32,
            flexWrap: "wrap",
            animation: "fadeUp 0.5s ease 0.18s both",
          }}
        >
          {[
            { label: "OCR powered",      detail: "Scanned invoices supported" },
            { label: "Gemini 1.5 Flash", detail: "LLM extraction engine"      },
            { label: "JSON + CSV",        detail: "Export in both formats"     },
          ].map((item, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 8 }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: C.greenMuted,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <IconCheck size={12} color={C.green} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: C.black }}>
                {item.label}
              </span>
              <span style={{ fontSize: 12, color: C.gray }}>
                {item.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
