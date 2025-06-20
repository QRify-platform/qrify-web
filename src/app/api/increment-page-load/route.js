
import { NextResponse } from 'next/server';
import { pageLoadCounter } from '../metrics/route'; 

export async function POST() {
  pageLoadCounter.inc();
  return NextResponse.json({ success: true });
}
