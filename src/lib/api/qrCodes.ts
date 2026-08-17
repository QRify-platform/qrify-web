import axios from 'axios';
import type { QrPreviewResponse, SavedQrCode } from '@/types';
import { apiBase, authHeaders } from './client';

/** Renders a preview PNG. Public, and never persisted. */
export async function generateQrPreview(
  payload: string
): Promise<QrPreviewResponse> {
  const { data } = await axios.post<QrPreviewResponse>(
    `${await apiBase()}/generate-qr/`,
    { url: payload }
  );
  return data;
}

/** Saves a code to the signed-in user's account. */
export async function saveQrCode(payload: string): Promise<SavedQrCode> {
  const { data } = await axios.post<SavedQrCode>(
    `${await apiBase()}/qr-codes`,
    { url: payload },
    { headers: authHeaders() }
  );
  return data;
}

export async function listMyQrCodes(): Promise<SavedQrCode[]> {
  const { data } = await axios.get<SavedQrCode[]>(
    `${await apiBase()}/qr-codes`,
    { headers: authHeaders() }
  );
  return data;
}

export async function deleteQrCode(id: string): Promise<void> {
  await axios.delete(`${await apiBase()}/qr-codes/${id}`, {
    headers: authHeaders(),
  });
}
