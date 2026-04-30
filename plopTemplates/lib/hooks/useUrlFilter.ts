import { useSearchParams } from "react-router-dom";

/**
 * useUrlFilter - Store filter state inside the URL search params.
 * Prevents filter reset when the browser refreshes.
 *
 * Built-in pagination support via `page` and `size` params.
 * - page: 1-indexed current page number
 * - size: number of records per page
 */
export const useUrlFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * setFilters - Update multiple filters at once.
   * Prevents race conditions when multiple filters change in the same cycle.
   */
  const setFilters = (filters: Record<string, string>) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });
      return params;
    }, { replace: true });
  };

  /**
   * setFilter - Update a single filter.
   * Uses setFilters internally to ensure functional update consistency.
   */
  const setFilter = (key: string, value: string) => {
    setFilters({ [key]: value });
  };

  /**
   * getFilter - Get the raw value of a single filter from URL.
   */
  const getFilter = (key: string) => searchParams.get(key) || "";

  /**
   * getPage - Get the current page number (1-indexed).
   * Defaults to 1 if not set.
   */
  const getPage = (): number => {
    const p = searchParams.get("page");
    return p ? Math.max(1, parseInt(p, 10) || 1) : 1;
  };

  /**
   * getSize - Get the current page size (records per page).
   * Defaults to the given fallback (default: 50).
   */
  const getSize = (fallback = 50): number => {
    const s = searchParams.get("size");
    return s ? Math.max(1, parseInt(s, 10) || fallback) : fallback;
  };

  /**
   * setPage - Set the current page number in the URL.
   */
  const setPage = (page: number) => {
    setFilter("page", String(page));
  };

  /**
   * setSize - Set the page size in the URL.
   * Also resets page to 1 to avoid out-of-bounds.
   */
  const setSize = (size: number) => {
    setFilters({ size: String(size), page: "1" });
  };

  /**
   * getOffset - Derive offset from page & size for API calls.
   */
  const getOffset = (fallbackSize = 50): number => {
    return (getPage() - 1) * getSize(fallbackSize);
  };

  return {
    searchParams,
    setFilter,
    setFilters,
    getFilter,
    // Pagination helpers
    getPage,
    getSize,
    getOffset,
    setPage,
    setSize,
  };
};