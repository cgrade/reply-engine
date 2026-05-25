export default function PlatformSelector({ items, value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`min-h-[72px] rounded-2xl border p-3 transition-all active:scale-[0.98] sm:min-h-0 sm:p-4 ${
            value === item.id
              ? "border-[#C9847A] bg-[#6B0F3A]/50 shadow-[0_0_0_1px_rgba(201,132,122,0.3)]"
              : "border-white/10 bg-white/5"
          }`}
        >
          <div className="text-xl sm:text-2xl">{item.icon}</div>
          <div className="mt-1 text-xs font-semibold sm:mt-2 sm:text-sm">
            {item.label}
          </div>
        </button>
      ))}
    </div>
  );
}
