export default function ToneSelector({ items, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`rounded-full border px-4 py-2 text-sm ${
            value === item.id
              ? "border-[#C9847A] bg-[#6B0F3A]/50 text-[#FAF5F0]"
              : "border-white/10 bg-white/5 text-[#9A8880]"
          }`}
        >
          {item.emoji} {item.label}
        </button>
      ))}
    </div>
  );
}
