/* eslint-disable react-hooks/exhaustive-deps */
import type { VendorFormResponse } from 'src/types/admin/vendor-form';

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
type VendorSearch = {
  location: string;
  category: string;
};

export function useGetVendorContacts(search?: VendorSearch) {
  const vendorSerach = `${endpoints.admin.vendor.getAll}?${search?.location ? `location=${search?.location}` : 'location='}&category=${search?.category}`;
  const url = search?.category ? vendorSerach : endpoints.admin.vendor.getAll;

  const { data, isLoading, error, isValidating, mutate } = useSWR<VendorFormResponse[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      contacts: data || [],
      contactsLoading: isLoading,
      contactsError: error,
      contactsValidating: isValidating,
      contactsEmpty: !isLoading && !data,
      contactsUpdate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export function useGetVendor(id: string) {
  const url = `${endpoints.admin.vendor.getById}/${id}`;

  const { data, isLoading, error, mutate } = useSWR<VendorFormResponse>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      vendor: data,
      vendorLoading: isLoading,
      vendorError: error,
      vendorUpdate: mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
}

export function useGetPublicVendor(id: string) {
  const url = `${endpoints.admin.vendor.getByPublicUrl}/${id}`;

  const { data, isLoading, error, isValidating, mutate } = useSWR<VendorFormResponse>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      publicVendor: data,
      publicVendorLoading: isLoading,
      publicVendorError: error,
      publicVendorValidating: isValidating,
      publicVendorEmpty: !isLoading && !data,
      publicVendorUpdate: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
