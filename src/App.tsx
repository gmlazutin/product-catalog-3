import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchProducts } from "./api/products";
import { ProductCard } from "./components/ProductCard";
import { SearchField } from "./components/SearchField";
import { StatusMessage } from "./components/StatusMessage";
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

        console.error("Не удалось загрузить товары:", error);
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
      <header className="mb-8 max-w-2xl">
        <p className="text-sm font-bold tracking-wider text-emerald-700 uppercase">
          ДЗ №2 · Веб-разработка
        </p>
        <h1 className="mt-3 text-4xl leading-tight font-bold tracking-tight text-slate-900 sm:text-5xl">
          Каталог товаров
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Небольшая подборка на каждый день. Найдите то, что вам нужно.
        </p>
      </header>

      <SearchField
        disabled={loadState === "loading"}
        value={query}
        onChange={setQuery}
      />

      <div className="mt-8 mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-2xl font-bold text-slate-900">Все товары</h2>
        {loadState === "success" && (
          <p className="text-sm text-slate-600" aria-live="polite">
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

      <footer className="mt-9 border-t border-slate-200 pt-8 text-sm text-slate-600">
        Данные и фотографии —{" "}
        <a
          className="font-semibold text-emerald-700 underline-offset-4 hover:underline"
          href="https://dummyjson.com/docs/products"
          target="_blank"
          rel="noreferrer"
        >
          DummyJSON
        </a>
        . Цены указаны в долларах США.
      </footer>
    </main>
  );
}
