'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { getHttpStatus, messageForQrError } from '@/lib/api/errors';
import { generateQrPreview, saveQrCode } from '@/lib/api/qr';
import { beginLogin, isLoggedIn } from '@/lib/auth';
import { doneNavProgress, startNavProgress } from '@/lib/nav-progress';
import {
  buildQrPayload,
  initialFields,
  isPayloadReady,
  isQrTypeId,
  type QrFields,
  type QrTypeId,
} from '@/lib/qr';
import { ROUTES } from '@/lib/routes';

export function useGenerateQr() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestedType = searchParams.get('type');

  const [type, setType] = useState<QrTypeId>(() =>
    isQrTypeId(requestedType) ? requestedType : 'link'
  );
  const [fields, setFields] = useState<QrFields>(() =>
    initialFields(isQrTypeId(requestedType) ? requestedType : 'link')
  );
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [payload, setPayload] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    setAuthed(isLoggedIn());
  }, []);

  useEffect(() => {
    if (isQrTypeId(requestedType) && requestedType !== type) {
      setType(requestedType);
      setQrCodeUrl('');
      setPayload('');
      setSaved(false);
      setError('');
      setFields(initialFields(requestedType));
    }
  }, [requestedType, type]);

  const updateField = <K extends keyof QrFields>(key: K, value: QrFields[K]) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const selectType = (next: QrTypeId) => {
    setType(next);
    setQrCodeUrl('');
    setPayload('');
    setSaved(false);
    setError('');
    setFields(initialFields(next));
    router.replace(`${ROUTES.generate}?type=${next}`, { scroll: false });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSaved(false);

    if (!isPayloadReady(type, fields)) {
      setError('Fill in the required fields, then try again.');
      return;
    }

    const nextPayload = buildQrPayload(type, fields);
    setLoading(true);
    startNavProgress();
    try {
      const data = await generateQrPreview(nextPayload);
      setQrCodeUrl(data.qr_code_url);
      setPayload(nextPayload);
      setAuthed(isLoggedIn());
    } catch (err) {
      console.error('QR code generation error:', err);
      setError(messageForQrError(err, 'generate'));
      setQrCodeUrl('');
      setPayload('');
    } finally {
      setLoading(false);
      doneNavProgress();
    }
  };

  const handleSave = async () => {
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
      setAuthed(true);
    } catch (err) {
      console.error('Save error:', err);
      setError(messageForQrError(err, 'save'));
      if (getHttpStatus(err) === 401) setAuthed(false);
    } finally {
      setSaving(false);
      doneNavProgress();
    }
  };

  return {
    type,
    fields,
    qrCodeUrl,
    loading,
    saving,
    saved,
    error,
    authed,
    updateField,
    selectType,
    handleSubmit,
    handleSave,
  };
}
