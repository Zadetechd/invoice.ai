/**
 * Processing Screen
 *
 * Shown while the backend pipeline is running.
 * Animates through each pipeline step as they complete.
 * Accepts a currentStep index and completedSteps array from the parent.
 */

import React from "react";
import { C, FONT_SERIF, FONT_SANS } from "../tokens";
import { IconCheck, IconSpinner, IconBolt } from "../icons";

const STEPS = [
  "Validating file",
  "Extracting text via OCR",
  "Cleaning input",
  "Running LLM extraction",
  "Validating schema",
  "Calculating confidence score",
];

interface Props {
  files: File[];
  currentStep: number;
  completedSteps: number[];
}

export default function ProcessingScreen({
  files,
  currentStep,
  completedSteps,
}: Props) {
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
          maxWidth: 520,
          margin: "0 auto",
          padding: "120px 24px 60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Animated logo */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            background: C.black,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            animation: "pulse 1.8s ease infinite",
          }}
        >
          <IconBolt size={32} color={C.green} />
        </div>

        <h2
          style={{
            fontFamily: FONT_SERIF,
            fontSize: 28,
            fontWeight: 700,
            color: C.black,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          {files.length > 1
            ? `Processing ${files.length} invoices`
            : `Processing ${files[0]?.name ?? "invoice"}`}
        </h2>
        <p
          style={{
            fontSize: 14,
            color: C.gray,
            marginBottom: 48,
            textAlign: "center",
          }}
        >
          Running the full extraction pipeline
        </p>

        {/* Step list */}
        <div style={{ width: "100%" }}>
          {STEPS.map((step, i) => {
            const done   = completedSteps.includes(i);
            const active = currentStep === i && !done;

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 0",
                  borderBottom:
                    i < STEPS.length - 1
                      ? `1px solid ${C.grayBorder}`
                      : "none",
                  opacity: i > currentStep ? 0.3 : 1,
                  transition: "opacity 0.3s",
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    flexShrink: 0,
                    background: done
                      ? C.green
                      : active
                      ? C.greenMuted
                      : C.warmGray,
                    border: `2px solid ${
                      done ? C.green : active ? C.green : C.grayBorder
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s",
                  }}
                >
                  {done ? (
                    <IconCheck size={16} color={C.white} />
                  ) : active ? (
                    <IconSpinner size={16} />
                  ) : (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: C.gray,
                      }}
                    >
                      {i + 1}
                    </span>
                  )}
                </div>

                {/* Label */}
                <p
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontWeight: done || active ? 600 : 400,
                    color: done || active ? C.black : C.gray,
                    transition: "all 0.3s",
                  }}
                >
                  {step}
                </p>

                {/* State label */}
                {done && (
                  <span
                    style={{ fontSize: 11, color: C.green, fontWeight: 600 }}
                  >
                    Done
                  </span>
                )}
                {active && (
                  <span
                    style={{ fontSize: 11, color: C.green, fontWeight: 600 }}
                  >
                    Running
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* File chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 36,
          }}
        >
          {files.map((f, i) => (
            <span
              key={i}
              style={{
                padding: "5px 13px",
                borderRadius: 20,
                background: C.warmGray,
                fontSize: 12,
                color: C.gray,
                fontWeight: 500,
              }}
            >
              {f.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
