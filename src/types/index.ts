export interface SubmitRequest {
  message: string;
}

export interface SubmitResponse {
  success: boolean;
  error?: string;
}

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";
