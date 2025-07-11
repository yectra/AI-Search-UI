import type { QuotesResponseModel } from 'src/types/admin/quotes';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

export function useGetQuotes() {
  const url = endpoints.admin.quotes.getAll;

  const { data, isLoading, error, isValidating, mutate } = useSWR<QuotesResponseModel[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      quotes: data || [],
      quotesLoading: isLoading,
      quotesError: error,
      quotesValidating: isValidating,
      quotesEmpty: !isLoading && !data,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
