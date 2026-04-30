import {
  useQuery,
  UseQueryOptions,
  keepPreviousData,
} from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { errorParser } from "../utils/errorParser";
import { useIntl } from "react-intl";
import type { IListParams } from "../utils/buildQueryParams";

/**
 * createListQuery - Factory function to create a typed useQuery hook for paginated lists.

 * Automatically includes limit, offset, search, and filter in the queryKey.
 *
 * @param baseKey - Base query key (string or string[])
 * @param fetcher - Async function that fetches the list data, receiving params
 * @param options - Optional useQuery options override
 */
export const createListQuery = <TData, TError = Error>(
  baseKey: string | any[],
  fetcher: (params: IListParams) => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) => {
  return (params: IListParams = {}) => {
    const intl = useIntl(); 
    
    // Construct query key based on baseKey and all params
    const queryKey = [
      ...(Array.isArray(baseKey) ? baseKey : [baseKey]),
      params,
    ];

    return useQuery<TData, TError>({
      queryKey,
      queryFn: () => fetcher(params),
      placeholderData: keepPreviousData, // Default behavior for lists in v5
      meta: {
        onError: (error: any) => {
          notifications.show({
            title: intl.formatMessage({ id: "errorFetch", defaultMessage: "Error" }),
            message: errorParser(error),
            color: "red",
          });
        },
      },
      ...options,
    } as any);
  };
};

