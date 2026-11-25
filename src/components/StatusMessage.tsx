interface StatusMessageProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function StatusMessage({
  message,
  actionLabel,
  onAction,
}: StatusMessageProps) {
  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm"
      role="status"
      aria-live="polite"
    >
      <p className="text-base text-slate-700">{message}</p>
      {actionLabel && onAction && (
        <button
          className="mt-5 cursor-pointer rounded-lg bg-emerald-700 px-5 py-3 font-bold text-white transition hover:bg-emerald-800 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-emerald-300"
          type="button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
