/** Same-origin relative paths only — blocks open redirects. */
export function safeNextPath(raw: string | null, fallback = '/generate'): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return fallback;
  return raw;
}
