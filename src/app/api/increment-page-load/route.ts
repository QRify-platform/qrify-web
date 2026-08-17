import { NextResponse } from 'next/server';
import { pageLoadCounter } from '@/lib/metrics';

export async function POST() {
  pageLoadCounter.inc();
  return NextResponse.json({ success: true });
}
