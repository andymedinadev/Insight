export function sanitizeNumber(value: number | null | undefined): number | null {
  if (value == null || Number.isNaN(value) || value === 0) return null;
  return value;
}

export function sanitizeText(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}
