import axios from 'axios';
import { getApiToken } from '@/lib/auth/session';
import { apiBase } from './client';
import type { QrPreviewResponse, SavedQrCode } from './types';

function authHeaders(): Record<string, string> {
  const token = getApiToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Preview only — does not persist. */
export async function generateQrPreview(
  payload: string
): Promise<QrPreviewResponse> {
  const { data } = await axios.post<QrPreviewResponse>(
    `${await apiBase()}/generate-qr/`,
    { url: payload }
  );
  return data;
}

/** Explicit save to the signed-in user's account. */
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
