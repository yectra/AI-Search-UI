import type { ServiceResponse } from 'src/types/client/our-services';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetAllService() {
  const url = endpoints.client.services.getAll;

  const { data, isLoading, error } = useSWR<ServiceResponse[]>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      services: data || [],
      servicesLoading: isLoading,
      servicesError: error,
    }),
    [data, error, isLoading]
  );

  return memoizedValue;
}

export function useGetIdService(serviceId: string) {
  const url = `${endpoints.client.services.getById}/${serviceId}`;

  const { data, isLoading, error } = useSWR<ServiceResponse>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      service: data || [],
      serviceLoading: isLoading,
      serviceError: error,
    }),
    [data, error, isLoading]
  );

  return memoizedValue;
}
