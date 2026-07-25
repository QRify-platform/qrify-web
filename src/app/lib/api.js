/**
 * Thin API client for qrify-web-api.
 * Base URL from GET /api/config (runtime API_BASE_URL per env).
 */

import axios from 'axios';
import { getApiToken } from './cognito';

let cachedApiBase;

export async function apiBase() {
  if (cachedApiBase) return cachedApiBase;

  if (typeof window === 'undefined') {
    cachedApiBase =
      process.env['API_BASE_URL'] ||
      process.env['NEXT_PUBLIC_API_BASE_URL'] ||
      'http://localhost:8000';
    return cachedApiBase;
  }

  try {
    const res = await fetch('/api/config');
    if (res.ok) {
      const data = await res.json();
      if (data.apiBaseUrl) {
        cachedApiBase = data.apiBaseUrl.replace(/\/$/, '');
        return cachedApiBase;
      }
    }
  } catch {
    // fall through
  }

  cachedApiBase =
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
  return cachedApiBase;
}

function authHeaders() {
  const token = getApiToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/** Preview only — does not persist. */
export async function generateQrPreview(payload) {
  const { data } = await axios.post(`${await apiBase()}/generate-qr/`, {
    url: payload,
  });
  return data;
}

/** Explicit save to the signed-in user's account. */
export async function saveQrCode(payload) {
  const { data } = await axios.post(
    `${await apiBase()}/qr-codes`,
    { url: payload },
    { headers: authHeaders() }
  );
  return data;
}

export async function listMyQrCodes() {
  const { data } = await axios.get(`${await apiBase()}/qr-codes`, {
    headers: authHeaders(),
  });
  return data;
}

export async function deleteQrCode(id) {
  await axios.delete(`${await apiBase()}/qr-codes/${id}`, {
    headers: authHeaders(),
  });
}
