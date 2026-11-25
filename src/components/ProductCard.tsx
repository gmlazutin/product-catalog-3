import type { Product } from "../types/product";

const priceFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "USD",
});

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-56 items-center justify-center bg-slate-100 p-5">
        <img
          className="h-full w-full object-contain"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          width="280"
          height="220"
        />
      </div>
      <div className="p-5">
        <p className="mb-2 text-sm font-semibold tracking-wide text-emerald-700 uppercase">
          {product.category}
        </p>
        <h3 className="min-h-12 text-lg leading-snug font-semibold text-slate-900">
          {product.title}
        </h3>
        <p className="mt-5 text-2xl font-bold text-slate-900">
          {priceFormatter.format(product.price)}
        </p>
      </div>
    </article>
  );
}
