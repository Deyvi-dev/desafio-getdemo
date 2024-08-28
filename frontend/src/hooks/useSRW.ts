import useSWR, { SWRResponse } from 'swr';
import { fetcher } from '@/services/api';

export function useFetch<T>(url: string): SWRResponse<T, any> {
  const { data, error, isValidating, mutate } = useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading: !data && !error, isValidating, mutate };
}
