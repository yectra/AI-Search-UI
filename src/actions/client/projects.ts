import type { ProjectDeatilsClientResponseModel } from 'src/types/client/projects';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};


export function useGetUserProjects() {
  const url = endpoints.client.projects.getAll;

  const { data, isLoading, error } = useSWR<ProjectDeatilsClientResponseModel[]>(
    url,
    fetcher,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      userProjects: data || [],
      userProjectsLoading: isLoading,
      userProjectsError: error,
    }),
    [data, error, isLoading]
  );

  return memoizedValue;
}
