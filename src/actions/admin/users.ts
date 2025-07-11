import type { UserResponseModel } from 'src/types/admin/customers';

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

export function useGetCustomerList() {
  const url = endpoints.admin.customer.getAll;

  const { data, isLoading, error, isValidating, mutate } = useSWR<UserResponseModel[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      users: data || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export function useGetUsersList() {
  const url = '/bnm-business/users';

  const { data, isLoading, error, isValidating, mutate } = useSWR<UserResponseModel[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      users: data || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

export function useGetUser(userId: string) {
  const url = userId ? `${endpoints.admin.customer.getById}/${userId}` : null;

  const { data, isLoading, error, mutate } = useSWR<UserResponseModel>(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      users: data,
      usersLoading: isLoading,
      usersError: error,
      mutate,
    }),
    [data, error, isLoading, mutate]
  );

  return memoizedValue;
}
