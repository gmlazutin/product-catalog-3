interface SearchFieldProps {
  disabled: boolean;
  value: string;
  onChange: (value: string) => void;
}

export function SearchField({ disabled, value, onChange }: SearchFieldProps) {
  return (
    <section
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      aria-label="Поиск товаров"
    >
      <label
        className="mb-2 block text-sm font-bold text-slate-800"
        htmlFor="search"
      >
        Поиск по названию
      </label>
      <input
        id="search"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-3 focus:ring-emerald-100 disabled:cursor-wait disabled:bg-slate-100"
        type="search"
        placeholder="Например, apple"
        autoComplete="off"
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="mt-2 text-sm text-slate-600">
        Поиск среди загруженных товаров DummyJSON
      </p>
    </section>
  );
}
