/** Response from POST /generate-qr/ — a data URL that is never persisted. */
export type QrPreviewResponse = {
  source_url: string;
  qr_code_url: string;
};

/** A QR code the user explicitly saved to their account. */
export type SavedQrCode = {
  id: string;
  source_url: string;
  s3_key: string;
  user_id: string | null;
  created_at: string;
  download_url: string;
  expires_in: number;
  qr_code_url: string;
};

/** Which API call failed, so we can show a message that fits. */
export type QrAction = 'generate' | 'save' | 'list' | 'delete';
