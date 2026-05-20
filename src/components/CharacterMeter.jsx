export default function CharacterMeter({ count, max = 250 }) {
  const width = Math.min((count / max) * 100, 100);

  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-xs text-[#9A8880]">
        <span>
          {count} / {max}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-[#C9847A]"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
