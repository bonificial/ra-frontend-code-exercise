const DEFAULT_API_URL = 'http://localhost:4002';

function normalizeBaseUrl(url: string): string {
  return url.replace(/\/+$/, '');
}

export const API_URL = normalizeBaseUrl(import.meta.env.VITE_API_URL || DEFAULT_API_URL);

export const PEOPLE_API_BASE = `${API_URL}/people`;
