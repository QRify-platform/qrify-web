import axios from 'axios';

export function getHttpStatus(error: unknown): number | undefined {
  if (axios.isAxiosError(error)) {
    return error.response?.status;
  }
  return undefined;
}

export type QrAction = 'generate' | 'save' | 'list' | 'delete';

export function messageForQrError(error: unknown, action: QrAction): string {
  const status = getHttpStatus(error);

  if (status === 429) {
    if (action === 'generate') {
      return 'Too many generates — wait a moment and try again.';
    }
    if (action === 'save') {
      return 'Too many saves — wait a moment and try again.';
    }
    return 'Too many requests — wait a moment and try again.';
  }

  if (status === 401) {
    return action === 'save'
      ? 'Session expired. Sign in again to save.'
      : 'Session expired. Sign in again.';
  }

  if (status === 403 && action === 'delete') {
    return 'You can only delete your own codes.';
  }

  if (action === 'generate') {
    return 'Could not generate that code. Check your inputs and try again.';
  }
  if (action === 'save') {
    return 'Could not save that code. Try again.';
  }
  if (action === 'list') {
    return 'Could not load your codes. Try signing in again.';
  }
  return 'Could not delete that code. Try again.';
}
