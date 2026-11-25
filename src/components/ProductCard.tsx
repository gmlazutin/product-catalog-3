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
    <article className="border-line bg-surface overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="bg-surface-muted flex h-56 items-center justify-center p-5">
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
        <p className="text-accent mb-2 text-sm font-semibold tracking-wide uppercase">
          {product.category}
        </p>
        <h3 className="text-content min-h-12 text-lg leading-snug font-semibold">
          {product.title}
        </h3>
        <p className="text-content mt-5 text-2xl font-bold">
          {priceFormatter.format(product.price)}
        </p>
      </div>
    </article>
  );
}
