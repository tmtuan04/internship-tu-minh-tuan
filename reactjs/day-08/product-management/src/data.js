import axios from "axios";

const API_URL = "https://680efc6867c5abddd1937a89.mockapi.io/api/v1/products";

export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};