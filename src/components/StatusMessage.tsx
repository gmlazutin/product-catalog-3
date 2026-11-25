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
      className="border-line bg-surface rounded-2xl border px-6 py-12 text-center shadow-sm"
      role="status"
      aria-live="polite"
    >
      <p className="text-content-soft text-base">{message}</p>
      {actionLabel && onAction && (
        <button
          className="bg-action hover:bg-action-hover mt-5 cursor-pointer rounded-lg px-5 py-3 font-bold text-white transition"
          type="button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
