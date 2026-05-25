import SelectorScroll from "./SelectorScroll";

export default function PostTypeSelector({ items, value, onChange }) {
  return (
    <SelectorScroll>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`min-h-[44px] shrink-0 snap-start rounded-full border px-3.5 py-2.5 text-sm transition-all active:scale-[0.98] ${
            value === item.id
              ? "border-[#C9847A] bg-[#6B0F3A]/50 text-[#FAF5F0]"
              : "border-white/10 bg-white/5 text-[#9A8880]"
          }`}
        >
          {item.emoji} {item.label}
        </button>
      ))}
    </SelectorScroll>
  );
}
