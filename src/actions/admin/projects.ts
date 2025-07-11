import type { ProjectDeatilsAdminResponseModel } from 'src/types/admin/projects';

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

export function useGetProjectList() {
  const url = endpoints.admin.projects.getAll;

  const { data, isLoading, error, isValidating, mutate } = useSWR<
    ProjectDeatilsAdminResponseModel[]
  >(url, fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      projects: data || [],
      projectsLoading: isLoading,
      projectsError: error,
      projectsValidating: isValidating,
      projectsEmpty: !isLoading && !data,
      projectUpdated: mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
