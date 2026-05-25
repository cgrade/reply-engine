export default function CharacterMeter({ count, max = 250 }) {
  const width = Math.min((count / max) * 100, 100);
  const over = count > max;
  const near = count > max - 20 && !over;

  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-xs text-[#9A8880]">
        <span className={over ? "text-red-300" : near ? "text-amber-300" : ""}>
          {count} / {max}
        </span>
        {over && <span className="text-red-300">Over limit — trim before posting</span>}
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full transition-all ${
            over ? "bg-red-400" : near ? "bg-amber-400" : "bg-[#C9847A]"
          }`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
