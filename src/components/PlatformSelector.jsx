export default function PlatformSelector({ items, value, onChange }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onChange(item.id)}
          className={`rounded-2xl border p-4 transition-all ${
            value === item.id
              ? "border-[#C9847A] bg-[#6B0F3A]/50"
              : "border-white/10 bg-white/5"
          }`}
        >
          <div className="text-2xl">{item.icon}</div>
          <div className="mt-2 text-sm font-semibold">{item.label}</div>
        </button>
      ))}
    </div>
  );
}
