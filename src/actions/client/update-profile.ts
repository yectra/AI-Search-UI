import type {
  UpdateProfileResponse,
  UpdateCustomerResponse,
} from 'src/types/client/update-profile';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

type IProps = {
  id: string;
};

export function useGetVendorDetails({ id }: IProps) {
  const url = `${endpoints.client.profile.vendor.getById}/${id}`;

  const { data, isLoading, error, mutate } = useSWR<UpdateProfileResponse | any>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      vendorDetails: data || [],
      vendorDetailsLoading: isLoading,
      vendorDetailsError: error,
      updateMutate: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
}

export function useGetCustomerDetails({ id }: IProps) {
  const url = `${endpoints.client.profile.customer.getById}/${id}`;

  const { data, isLoading, error, mutate } = useSWR<UpdateCustomerResponse | any>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      customerDetails: data || [],
      customerDetailsLoading: isLoading,
      customerDetailsError: error,
      updateMutate: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
}
