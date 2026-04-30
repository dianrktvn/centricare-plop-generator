import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { errorParser } from "../utils/errorParser";
import { useIntl } from "react-intl";
/**
 * createQuery - Factory function to create a typed useQuery hook with
 * automatic error notification.
 *
 * @param key   - Query key (string or string[])
 * @param fetcher - Async function that fetches data
 * @param options - Optional useQuery options override
 * @returns A hook function that returns useQuery result
 *
 * @example
 * ```ts
 * const useGetPatients = createQuery(
 *   "patient-list",
 *   async () => {
 *     const response = await axios.get("/patients");
 *     return response.data;
 *   }
 * );
 *
 * // In component:
 * const { data, isLoading } = useGetPatients();
 * ```
 */

export const createQuery = <TData, TError = Error>(
  key: string | any[],
  fetcher: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">,
) => {
  return () => {
    const intl = useIntl();
    return useQuery<TData, TError>({
      queryKey: Array.isArray(key) ? key : [key],
      queryFn: fetcher,
      meta: {
        onError: (error: any) => {
          notifications.show({
            title: intl.formatMessage({ id: "errorFetch" }),
            message: errorParser(error),
            color: "red",
          });
        },
      },
      ...options,
    } as any);
  };
};
