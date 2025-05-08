export interface Products {
  id: number;
  name: string;
  price: string; // Chưa ép kiểu
  stock: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductInput {
  name: string;
  price: number;
  stock: number;  
  description: string;
  category: string;
  image: string;
}

export interface PaginationInfo {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export interface ProductResponse {
    data: Products[],
    pagination: PaginationInfo;
}

export type ProductQueryParams = {
  page: number;
  limit: number;
  name?: string;
  category?: string;
};