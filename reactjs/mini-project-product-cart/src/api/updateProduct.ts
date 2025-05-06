import axios, { AxiosError } from "axios";
import { Products, ProductInput } from "../types/productTypes";

export const updateProduct = async (
  id: number,
  data: ProductInput
): Promise<Products> => {
  try {
    const response = await axios.put<{ product: Products }>(
      `http://localhost:3000/admin/products/${id}`,
      data
    );
    return response.data.product;
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    const errorMessage =
      err.response?.data?.message || "Failed to update product";
    throw new Error(errorMessage);
  }
};