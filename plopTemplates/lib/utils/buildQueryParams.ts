export interface IListParams {
  limit?: number;
  offset?: number;
  search?: string;
  filter?: string;
  [key: string]: any;
}
export interface IQueryParams extends IListParams {
  [key: string]: any;
}

/**
 * buildQueryParams - Utility function to construct standard API pagination URLs
 * @param baseUrl - The base route, e.g. 'patients'
 * @param params - The pagination and filter parameters
 * @returns Formatted query string URL
 */
export const buildQueryParams = (baseUrl: string, params: IQueryParams) => {
  if (params.pageNavigationUrl) {
    return params.pageNavigationUrl;
  }

  const searchParams = new URLSearchParams();

  if (params.limit !== undefined && params.limit > 0) {
    searchParams.append("limit", params.limit.toString());
    searchParams.append("offset", (params.offset || 0).toString());
  }

  if (params.search) {
    searchParams.append("q", params.search);
  }

  if (params.filter) {
    searchParams.append("s", params.filter);
  }

  const queryString = searchParams.toString();
  return `${baseUrl}${queryString ? `?${queryString}` : ""}`;
};
