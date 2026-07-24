/**
 * Thin API client for qrify-web-api.
 * Base URL comes from NEXT_PUBLIC_API_BASE_URL (ingress /backend in cluster).
 */

import axios from 'axios';
import { getApiToken } from './cognito';

export function apiBase() {
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
}

function authHeaders() {
  const token = getApiToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Preview only — does not persist. */
export async function generateQrPreview(payload) {
  const { data } = await axios.post(`${apiBase()}/generate-qr/`, {
    url: payload,
  });
  return data;
}

/** Explicit save to the signed-in user's account. */
export async function saveQrCode(payload) {
  const { data } = await axios.post(
    `${apiBase()}/qr-codes`,
    { url: payload },
    { headers: authHeaders() }
  );
  return data;
}

export async function listMyQrCodes() {
  const { data } = await axios.get(`${apiBase()}/qr-codes`, {
    headers: authHeaders(),
  });
  return data;
}

export async function deleteQrCode(id) {
  await axios.delete(`${apiBase()}/qr-codes/${id}`, {
    headers: authHeaders(),
  });
}
