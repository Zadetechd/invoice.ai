/**
 * TypeScript types mirroring the backend Pydantic schemas exactly.
 * Keep these in sync with app/schemas/invoice_schema.py.
 */

export interface LineItem {
  item: string;
  quantity?: number | null;
  unit_price?: number | null;
  price: number;
}

export interface InvoiceData {
  vendor_name?: string | null;
  invoice_number?: string | null;
  invoice_date?: string | null;
  due_date?: string | null;
  currency?: string | null;
  subtotal?: number | null;
  tax_amount?: number | null;
  total_amount?: number | null;
  line_items?: LineItem[];
  bill_to?: string | null;
  payment_terms?: string | null;
  notes?: string | null;
}

export interface InvoiceExtractionResult {
  file_name: string;
  status: "success" | "partial" | "failed";
  confidence_score: number;
  data?: InvoiceData | null;
  error?: string | null;
  ocr_used: boolean;
  raw_text_length?: number | null;
}

export interface BatchExtractionResult {
  total_files: number;
  successful: number;
  failed: number;
  results: InvoiceExtractionResult[];
}

export interface JobStatus {
  job_id: string;
  status: "pending" | "processing" | "completed" | "failed";
  total_files: number;
  processed_files: number;
  result?: BatchExtractionResult | null;
}

export type AppScreen = "upload" | "processing" | "results";
export type UploadMode = "single" | "batch";
