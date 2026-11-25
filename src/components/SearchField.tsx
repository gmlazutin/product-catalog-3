interface SearchFieldProps {
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function SearchField({ disabled, value, onChange }: SearchFieldProps) {
  return (
    <section
      className="border-line bg-surface rounded-lg border p-5 shadow-sm sm:p-6"
      aria-label="Поиск товаров"
    >
      <label
        className="text-content-soft mb-2 block text-sm font-bold"
        htmlFor="search"
      >
        Поиск по названию
      </label>
      <input
        id="search"
        className="border-line-strong bg-field text-content placeholder:text-muted focus:border-accent focus:ring-focus disabled:bg-disabled w-full rounded-md border px-4 py-3 text-base outline-none transition focus:ring-3 disabled:cursor-wait"
        type="search"
        placeholder="Например, apple"
        autoComplete="off"
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="text-muted mt-2 text-sm">
        Поиск среди загруженных товаров DummyJSON
      </p>
    </section>
  );
}
