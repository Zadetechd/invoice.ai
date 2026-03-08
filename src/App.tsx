/**
 * App.tsx
 *
 * Top-level controller. Manages screen state, API calls,
 * and pipeline simulation timing.
 * Renders Nav on every screen and delegates to the correct screen component.
 */

import React, { useState, useRef, useCallback } from "react";
import Nav from "./components/Nav";
import UploadScreen from "./screens/UploadScreen";
import ProcessingScreen from "./screens/ProcessingScreen";
import ResultsScreen from "./screens/ResultsScreen";
import { uploadSingle, uploadBatch, getJobStatus } from "./api";
import type {
  AppScreen,
  UploadMode,
  InvoiceExtractionResult,
} from "./types";

const STEP_COUNT = 6;
const STEP_DELAY_MS = 700;

export default function App() {
  const [screen, setScreen]            = useState<AppScreen>("upload");
  const [files, setFiles]              = useState<File[]>([]);
  const [currentStep, setCurrentStep]  = useState(0);
  const [completedSteps, setCompleted] = useState<number[]>([]);
  const [results, setResults]          = useState<InvoiceExtractionResult[]>([]);
  const timerRef                       = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  /** Animate pipeline steps then transition to results screen. */
  const animateSteps = useCallback(
    (finalResults: InvoiceExtractionResult[]): Promise<void> => {
      return new Promise((resolve) => {
        let step = 0;
        const tick = () => {
          setCurrentStep(step);
          setCompleted((prev) => [...prev, step]);
          step++;
          if (step < STEP_COUNT) {
            timerRef.current = setTimeout(tick, STEP_DELAY_MS + Math.random() * 300);
          } else {
            setResults(finalResults);
            timerRef.current = setTimeout(() => {
              setScreen("results");
              resolve();
            }, 400);
          }
        };
        timerRef.current = setTimeout(tick, 300);
      });
    },
    []
  );

  const runExtraction = useCallback(
    async (selectedFiles: File[], mode: UploadMode) => {
      setFiles(selectedFiles);
      setCurrentStep(0);
      setCompleted([]);
      setScreen("processing");

      try {
        let extracted: InvoiceExtractionResult[] = [];

        if (mode === "single") {
          const res = await uploadSingle(selectedFiles[0]);
          extracted = [res];
        } else {
          const { job_id } = await uploadBatch(selectedFiles);
          let job = await getJobStatus(job_id);
          while (job.status !== "completed" && job.status !== "failed") {
            await new Promise((r) => setTimeout(r, 1500));
            job = await getJobStatus(job_id);
          }
          extracted = job.result?.results ?? [];
        }

        await animateSteps(extracted);

      } catch (err) {
        console.error("Extraction error:", err);
        const errorResults = selectedFiles.map((f) => ({
          file_name: f.name,
          status: "failed" as const,
          confidence_score: 0,
          ocr_used: false,
          error: err instanceof Error ? err.message : "Unknown error",
        }));
        await animateSteps(errorResults);
      }
    },
    [animateSteps]
  );

  const reset = useCallback(() => {
    clearTimer();
    setFiles([]);
    setResults([]);
    setCurrentStep(0);
    setCompleted([]);
    setScreen("upload");
  }, []);

  return (
    <>
      <Nav showReset={screen !== "upload"} onReset={reset} />

      {screen === "upload" && (
        <UploadScreen onExtract={runExtraction} />
      )}

      {screen === "processing" && (
        <ProcessingScreen
          files={files}
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      )}

      {screen === "results" && (
        <ResultsScreen results={results} onReset={reset} />
      )}
    </>
  );
}