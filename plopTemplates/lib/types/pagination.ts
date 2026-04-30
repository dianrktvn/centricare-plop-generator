export interface IPaginationMetadataType {
  current_page: number;
  next: string | null;
  previous: string | null;
  total_pages: number;
  total_records: number;
}
