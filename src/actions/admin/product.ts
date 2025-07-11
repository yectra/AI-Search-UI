import type { IProductService } from 'src/types/product';

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

export function useGetProducts() {
  const url = endpoints.admin.services.getAll;

  const { data, isLoading, error, isValidating, mutate } = useSWR<IProductService[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      products: data || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !data,
      productsRevalidateProducts: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetProduct(productId: string) {
  const url = productId ? `${endpoints.admin.services.getById}/${productId}` : '';

  const { data, isLoading, error, isValidating, mutate } = useSWR<IProductService>(
    url,
    fetcher,
    swrOptions
  );
  const memoizedValue = useMemo(
    () => ({
      product: data,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
      productRevalidateProducts: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetLocationService(query: string) {
  const url = query ? [`${endpoints.client.services.locationFilter}?location=${query}`] : '';

  const { data, isLoading, error, isValidating, mutate } = useSWR<IProductService[]>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });

  const memoizedValue = useMemo(
    () => ({
      locationSearchResults: data || [],
      locationSearchLoading: isLoading,
      locationSearchError: error,
      locationSearchValidating: isValidating,
      locationSearchRevalidating: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
