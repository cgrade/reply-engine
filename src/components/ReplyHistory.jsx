export default function ReplyHistory({ items, onSelect }) {
  if (!items.length) return null;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.reply)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-4 text-left"
        >
          <div className="mb-2 text-xs uppercase tracking-[0.2em] text-[#C9847A]">
            {item.platform}
          </div>

          <div className="text-sm text-[#FAF5F0]">{item.reply}</div>
        </button>
      ))}
    </div>
  );
}
