import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchProducts } from "./api/products";
import { ProductCard } from "./components/ProductCard";
import { SearchField } from "./components/SearchField";
import { StatusMessage } from "./components/StatusMessage";
import { ThemeToggle } from "./components/ThemeToggle";
import type { Product } from "./types/product";

type LoadState = "loading" | "success" | "error";

export function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [reloadKey, setReloadKey] = useState(0);

  const retry = useCallback(() => {
    setReloadKey((key) => key + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoadState("loading");
      setProducts([]);

      try {
        const loadedProducts = await fetchProducts(controller.signal);
        setProducts(loadedProducts);
        setLoadState("success");
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        console.error("Failed to load products:", error);
        setLoadState("error");
      }
    }

    void loadProducts();

    return () => controller.abort();
  }, [reloadKey]);

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ru");

    return products.filter((product) =>
      product.title.toLocaleLowerCase("ru").includes(normalizedQuery),
    );
  }, [products, query]);

  const showEmptyState =
    loadState === "success" && filteredProducts.length === 0;

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-8 sm:px-8 sm:py-12">
      <header className="mb-8 flex items-start justify-between gap-5">
        <div className="max-w-2xl">
          <h1 className="text-content text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
            Каталог товаров
          </h1>
          <p className="text-content-soft mt-3 text-lg">
            Небольшая подборка на каждый день. Найдите то, что вам нужно.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <SearchField
        disabled={loadState === "loading"}
        value={query}
        onChange={setQuery}
      />

      <div className="mt-8 mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-content text-2xl font-bold">
          Все товары
        </h2>
        {loadState === "success" && (
          <p
            className="text-muted text-sm"
            aria-live="polite"
          >
            Показано: {filteredProducts.length} из {products.length}
          </p>
        )}
      </div>

      {loadState === "loading" && <StatusMessage message="Загрузка…" />}

      {loadState === "error" && (
        <StatusMessage
          message="Не удалось загрузить товары. Проверьте подключение к интернету и попробуйте снова."
          actionLabel="Попробовать снова"
          onAction={retry}
        />
      )}

      {showEmptyState && <StatusMessage message="Ничего не найдено" />}

      {loadState === "success" && filteredProducts.length > 0 && (
        <section
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Товары"
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}
