import type { RestaurantResponseModel } from 'src/types/roos-admin/homePage';

import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher, endpoints } from 'src/utils/axios';

const swrOptions = {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
};

export function useGetBusiness(localAccountId: string) {
    const url = `${endpoints.restaruntAdmin.home.business}${localAccountId}`;

    const { data, isLoading, error, isValidating, mutate } = useSWR<RestaurantResponseModel>(
        url,
        fetcher,
        swrOptions
    );
    const memoizedValue = useMemo(
        () => ({
            business: data,
            businessLoading: isLoading,
            businessError: error,
            businessValidating: isValidating,
            updateBusiness: mutate,
        }),
        [data, error, isLoading, isValidating, mutate]
    );

    return memoizedValue;
}