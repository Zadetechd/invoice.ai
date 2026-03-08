/**
 * API Client
 *
 * All communication with the FastAPI backend lives here.
 * The base URL is read from the VITE_API_URL env variable.
 * In development the Vite proxy forwards /upload, /export, /status, /health
 * to http://localhost:8000 automatically so no CORS issues arise.
 */

import type { InvoiceExtractionResult, BatchExtractionResult, JobStatus } from "./types";

const BASE = import.meta.env.VITE_API_URL ?? "";

/**
 * Upload a single invoice file for immediate extraction.
 */
export async function uploadSingle(file: File): Promise<InvoiceExtractionResult> {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${BASE}/upload`, { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Server error ${res.status}`);
  }
  return res.json();
}

/**
 * Upload multiple invoice files as a batch job.
 * Returns a job_id to poll with getJobStatus.
 */
export async function uploadBatch(files: File[]): Promise<{ job_id: string; message: string }> {
  const form = new FormData();
  files.forEach((f) => form.append("files", f));

  const res = await fetch(`${BASE}/upload-batch`, { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? `Server error ${res.status}`);
  }
  return res.json();
}

/**
 * Poll the status of a batch job.
 */
export async function getJobStatus(jobId: string): Promise<JobStatus> {
  const res = await fetch(`${BASE}/status/${jobId}`);
  if (!res.ok) throw new Error(`Job ${jobId} not found`);
  return res.json();
}

/**
 * Export URLs (used directly as href targets for download links).
 */
export const exportJsonUrl  = `${BASE}/export/json`;
export const exportCsvUrl   = `${BASE}/export/csv`;

/**
 * Health check.
 */
export async function healthCheck(): Promise<{ status: string; llm_provider: string; llm_reachable: boolean }> {
  const res = await fetch(`${BASE}/health`);
  return res.json();
}
