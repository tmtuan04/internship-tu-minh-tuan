import type { LoaderFunctionArgs } from "@remix-run/node";
import { fetchProducts } from "../routes/components/ShopifyClient.server";

export async function productsLoader({ request }: LoaderFunctionArgs) {
  console.log("SHOP ENV:", process.env.shop);
  console.log("ACCESS TOKEN ENV:", process.env.accessToken);

  const products = await fetchProducts(
    process.env.shop as string,
    process.env.accessToken as string,
  );

  return { products };
}