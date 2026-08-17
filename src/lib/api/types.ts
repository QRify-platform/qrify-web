export type QrPreviewResponse = {
  source_url: string;
  qr_code_url: string;
};

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

export type RuntimeConfig = {
  apiBaseUrl: string;
};
