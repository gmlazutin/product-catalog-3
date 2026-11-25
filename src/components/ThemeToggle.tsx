import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const actionLabel = isDark
    ? "Включить светлую тему"
    : "Включить тёмную тему";

  return (
    <button
      className="border-line-strong bg-surface text-content-soft hover:border-accent hover:text-accent shrink-0 cursor-pointer rounded-md border px-3 py-2 text-sm font-semibold shadow-sm transition"
      type="button"
      aria-label={actionLabel}
      aria-pressed={isDark}
      title={actionLabel}
      onClick={toggleTheme}
    >
      {isDark ? "Светлая тема" : "Тёмная тема"}
    </button>
  );
}
