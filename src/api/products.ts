import type { Product, ProductsResponse } from "../types/product";

const PRODUCTS_URL = "https://dummyjson.com/products?limit=0";

function isProductsResponse(value: unknown): value is ProductsResponse {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return Array.isArray((value as ProductsResponse).products);
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  const data: unknown = await response.json();

  if (!isProductsResponse(data)) {
    throw new Error("В ответе API отсутствует список товаров");
  }

  return data.products;
}
