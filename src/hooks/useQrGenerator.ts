'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { ROUTES } from '@/constants/routes';
import {
  generateQrPreview,
  isUnauthorized,
  messageForQrError,
  saveQrCode,
} from '@/lib/api';
import { beginLogin, isLoggedIn } from '@/lib/auth';
import {
  buildQrPayload,
  initialFields,
  isPayloadReady,
  isQrTypeId,
} from '@/lib/qr';
import { doneNavProgress, startNavProgress } from '@/lib/utils/navProgress';
import { generatePath } from '@/lib/utils/paths';
import type { QrFields, QrTypeId, UpdateQrField } from '@/types';
import { useSession } from './useSession';

/** Owns every piece of state on the generate page. */
export function useQrGenerator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();

  const requestedType = searchParams.get('type');
  const initialType: QrTypeId = isQrTypeId(requestedType)
    ? requestedType
    : 'link';

  const [type, setType] = useState<QrTypeId>(initialType);
  const [fields, setFields] = useState<QrFields>(() =>
    initialFields(initialType)
  );
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [payload, setPayload] = useState('');
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const resetFor = useCallback((next: QrTypeId) => {
    setType(next);
    setFields(initialFields(next));
    setQrCodeUrl('');
    setPayload('');
    setSaved(false);
    setError('');
  }, []);

  /** Keeps the form in sync when the ?type= query changes (e.g. back button). */
  useEffect(() => {
    if (isQrTypeId(requestedType) && requestedType !== type) {
      resetFor(requestedType);
    }
  }, [requestedType, type, resetFor]);

  const updateField: UpdateQrField = (key, value) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const selectType = (next: QrTypeId) => {
    resetFor(next);
    router.replace(generatePath(next), { scroll: false });
  };

  const generate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSaved(false);

    if (!isPayloadReady(type, fields)) {
      setError('Fill in the required fields, then try again.');
      return;
    }

    const nextPayload = buildQrPayload(type, fields);
    setGenerating(true);
    startNavProgress();
    try {
      const data = await generateQrPreview(nextPayload);
      setQrCodeUrl(data.qr_code_url);
      setPayload(nextPayload);
      session.refresh();
    } catch (err) {
      console.error('QR generation failed:', err);
      setError(messageForQrError(err, 'generate'));
      setQrCodeUrl('');
      setPayload('');
    } finally {
      setGenerating(false);
      doneNavProgress();
    }
  };

  const save = async () => {
    if (!payload || !qrCodeUrl) return;
    if (!isLoggedIn()) {
      beginLogin(ROUTES.generate);
      return;
    }

    setSaving(true);
    setError('');
    startNavProgress();
    try {
      await saveQrCode(payload);
      setSaved(true);
    } catch (err) {
      console.error('Save failed:', err);
      setError(messageForQrError(err, 'save'));
      if (isUnauthorized(err)) session.markSignedOut();
    } finally {
      setSaving(false);
      doneNavProgress();
    }
  };

  return {
    type,
    fields,
    qrCodeUrl,
    generating,
    saving,
    saved,
    error,
    authed: session.authed,
    updateField,
    selectType,
    generate,
    save,
  };
}
