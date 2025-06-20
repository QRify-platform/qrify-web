import { NextResponse } from 'next/server';
import client from 'prom-client';

const register = new client.Registry();

client.collectDefaultMetrics({ register });

export const pageLoadCounter = new client.Counter({
  name: 'frontend_page_loads_total',
  help: 'Total number of frontend page loads',
});

register.registerMetric(pageLoadCounter);

export async function GET() {
  const metrics = await register.metrics();
  return new NextResponse(metrics, {
    status: 200,
    headers: {
      'Content-Type': register.contentType,
    },
  });
}
