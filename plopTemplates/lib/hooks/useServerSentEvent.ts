import { useQueryClient } from "@tanstack/react-query";
import { EventSourcePolyfill } from "event-source-polyfill";
import { useEffect, useRef } from "react";

interface ISSEOptions<T> {
  headers?: Record<string, string>;
  handleEvent: (data: T) => void;
  autoInvalidate?: boolean;
  reconnectDelay?: number; // in ms
}

export const useServerSentEvent = <T = any>(
  url: string,
  options: ISSEOptions<T>,
) => {
  const { headers, handleEvent, autoInvalidate, reconnectDelay = 3000 } = options;

  const queryClient = useQueryClient();
  // esRef sebagai wadah untuk menyimpan proses event source
  const esRef = useRef<EventSourcePolyfill | null>(null);

  useEffect(() => {
    if (!url) return;

    // proses request menggunakan event source
    const es = new EventSourcePolyfill(url, {
      headers: headers ?? undefined,
    });

    // menyimpan hasil event source yang akan berguna untuk reconnect nantinya
    esRef.current = es;

    // proses convert JSON dan mengirim ke function yang dijadikan options
    es.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        handleEvent(parsed);

        if (autoInvalidate && (parsed as any)?.invalidateKey) {
          queryClient.invalidateQueries({
            queryKey: (parsed as any).invalidateKey,
          });
        }
      } catch (error) { }
    };

    // proses reconnect jika terjadi error pada proses event resource
    es.onerror = (err) => {
      es.close();
      setTimeout(() => {
        esRef.current = new EventSourcePolyfill(url, {
          headers: headers ?? undefined,
        });
      }, reconnectDelay);
    };

    return () => {
      es.close();
    };
  }, [url]);
};
