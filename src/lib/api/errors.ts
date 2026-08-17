import axios from 'axios';
import type { QrAction } from '@/types';

export function getHttpStatus(error: unknown): number | undefined {
  if (axios.isAxiosError(error)) return error.response?.status;
  return undefined;
}

export function isUnauthorized(error: unknown): boolean {
  return getHttpStatus(error) === 401;
}

const RATE_LIMITED: Record<QrAction, string> = {
  generate: 'Too many generates — wait a moment and try again.',
  save: 'Too many saves — wait a moment and try again.',
  list: 'Too many requests — wait a moment and try again.',
  delete: 'Too many requests — wait a moment and try again.',
};

const FAILED: Record<QrAction, string> = {
  generate: 'Could not generate that code. Check your inputs and try again.',
  save: 'Could not save that code. Try again.',
  list: 'Could not load your codes. Try signing in again.',
  delete: 'Could not delete that code. Try again.',
};

/** Turns an API failure into a message a user can act on. */
export function messageForQrError(error: unknown, action: QrAction): string {
  const status = getHttpStatus(error);

  if (status === 429) return RATE_LIMITED[action];

  if (status === 401) {
    return action === 'save'
      ? 'Session expired. Sign in again to save.'
      : 'Session expired. Sign in again.';
  }

  if (status === 403 && action === 'delete') {
    return 'You can only delete your own codes.';
  }

  return FAILED[action];
}
