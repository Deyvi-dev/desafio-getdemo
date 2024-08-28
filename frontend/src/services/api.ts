import { API_BASE_URL } from '@/config';

export const fetcher = async (url: string | URL | Request) => {
  const fullUrl = typeof url === 'string' && !url.startsWith('http')
    ? `${API_BASE_URL}${url}`
    : url;

  const res = await fetch(fullUrl);
    return await res.json();
};
