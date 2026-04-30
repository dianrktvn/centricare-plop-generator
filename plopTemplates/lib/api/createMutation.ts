import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { errorParser } from "../utils/errorParser";
import { useIntl } from "react-intl";
import { AxiosError } from "axios";
import { isNetworkError, queueOutboxRequest } from "../../utils/offlineSupport.utils";

/**
 * createMutation - Factory function to create a typed useMutation hook with
 * automatic success/error notifications and query invalidation.
 *
 * @param mutationFn      - Async function that performs the mutation
 * @param invalidateKeys  - Optional query keys to invalidate on success
 * @param offlineConfig   - Optional configuration for offline support (SW queuing)
 * @returns A hook function that returns useMutation result
 */

export const createMutation = <
  TVariables,
  TData = any,
  TError = AxiosError,
  TContext = unknown,
>(
  mutationFn: (vars: TVariables) => Promise<TData>,
  invalidateKeys?: any[][],
  offlineConfig?: {
    method: "POST" | "PUT" | "PATCH" | "DELETE";
    url: string;
  },
) => {
  return (
    options?: UseMutationOptions<TData, TError, TVariables, TContext>,
  ): UseMutationResult<TData, TError, TVariables, TContext> => {
    const intl = useIntl();
    const queryClient = useQueryClient();

    return useMutation({
      ...options,
      mutationFn,
      onSuccess: (...args) => {
        notifications.show({
          title: intl.formatMessage({ id: "success", defaultMessage: "Success" }),
          message: intl.formatMessage({
            id: "dataSaved",
            defaultMessage: "Data saved successfully",
          }),
          color: "green",
        });

        if (invalidateKeys) {
          invalidateKeys.forEach((key) =>
            queryClient.invalidateQueries({ queryKey: key }),
          );
        }

        if (options?.onSuccess) {
          (options.onSuccess as any)(...args);
        }
      },
      onError: async (...args: any[]) => {
        const [error, variables, context] = args;

        // Auto-queue to SW if offlineConfig is provided and it's a network error
        if (
          offlineConfig &&
          typeof window !== "undefined" &&
          "serviceWorker" in navigator &&
          isNetworkError(error)
        ) {
          await queueOutboxRequest({
            method: offlineConfig.method,
            url: offlineConfig.url,
            body: variables,
            headers: { "content-type": "application/json" },
          });
        }

        notifications.show({
          title: intl.formatMessage({ id: "failed", defaultMessage: "Failed" }),
          message: errorParser(error),
          color: "red",
        });

        if (options?.onError) {
          (options.onError as any)(...args);
        }
      },
    });
  };
};




