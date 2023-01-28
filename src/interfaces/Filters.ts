export type RegistryType = 1 | 2 | 3 | 4 | 5;

export interface RegistryFilter {
  page: number;
  per_page: number;
  type?: RegistryType;
  taxpayer_code?: string;
  date1?: string;
  date2?: string;
  fullname?: string;
}

export interface RegistryHistoryFilter {
  doc_id: number;
  page?: number;
  per_page?: number;
  user_id?: number;
}

export interface UserFilter {
  page: number;
  per_page: number;
}
