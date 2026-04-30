/**
 * cleanPayload - Recursively remove null, undefined, empty string (""),
 * and empty object ({}) fields from a payload before sending to API.
 *
 * Returns a new clean copy (immutable).
 *
 * @example
 * ```ts
 * const clean = cleanPayload({
 *   name: "John",
 *   email: "",
 *   notes: null,
 *   phone: undefined,
 *   address: {},
 *   meta: { tag: "", count: 0 },
 * });
 * // → { name: "John", meta: { count: 0 } }
 * ```
 */
export function cleanPayload<T extends Record<string, any>>(obj: T): Partial<T> {
  if (!obj || typeof obj !== "object") return obj;

  const result: Record<string, any> = {};

  for (const key of Object.keys(obj)) {
    const value = obj[key];

    if (value === null || value === undefined || value === "") {
      continue;
    }

    if (value instanceof Date) {
      result[key] = value;
      continue;
    }

    if (Array.isArray(value)) {
      result[key] = value;
      continue;
    }

    if (typeof value === "object") {
      const cleaned = cleanPayload(value);
      if (Object.keys(cleaned).length > 0) {
        result[key] = cleaned;
      }
      continue;
    }

    result[key] = value;
  }

  return result as Partial<T>;
}
