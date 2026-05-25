import { useState } from "react";
import { Copy, Check, Pencil } from "lucide-react";
import CharacterMeter from "./CharacterMeter";

export default function VariantReplies({
  variants,
  labels,
  selectedIndex,
  onSelect,
  editedReply,
  onEdit,
  onCopy,
  copied,
}) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="space-y-4">
      <p className="text-xs text-[#9A8880] md:hidden">
        Swipe angles · tap to select
      </p>

      <div className="flex gap-3 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden">
        {variants.map((text, index) => (
          <button
            key={index}
            type="button"
            onClick={() => {
              onSelect(index);
              setEditing(false);
            }}
            className={`w-[min(85vw,280px)] shrink-0 snap-center rounded-2xl border p-4 text-left transition-all active:scale-[0.98] md:w-auto ${
              selectedIndex === index
                ? "border-[#C9847A] bg-[#6B0F3A]/20 shadow-[0_0_0_1px_rgba(201,132,122,0.25)]"
                : "border-white/10 bg-white/5"
            }`}
          >
            <div className="mb-2 text-xs uppercase tracking-[0.15em] text-[#C9847A]">
              {labels[index] ?? `Angle ${index + 1}`}
            </div>
            <p className="text-sm leading-relaxed text-[#FAF5F0]">{text}</p>
            <div className="mt-2 text-xs text-[#9A8880]">{text.length} chars</div>
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-[#C9847A]/20 bg-[#6B0F3A]/10 p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="text-xs uppercase tracking-[0.2em] text-[#C9847A]">
            {editing ? "Edit before copy" : "Selected reply"}
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => setEditing((v) => !v)}
              className="flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm"
            >
              <Pencil size={14} />
              {editing ? "Done" : "Edit"}
            </button>
            <button
              type="button"
              onClick={() => onCopy(editedReply)}
              className="flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm md:hidden"
          >
            <Pencil size={14} />
            {editing ? "Done" : "Edit"}
          </button>
        </div>

        {editing ? (
          <textarea
            rows={5}
            value={editedReply}
            onChange={(e) => onEdit(e.target.value)}
            className="w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-base leading-relaxed text-[#FAF5F0] outline-none focus:border-[#C9847A]/50"
          />
        ) : (
          <p className="text-base leading-relaxed text-[#FAF5F0] sm:text-lg sm:leading-8">
            {editedReply}
          </p>
        )}

        <CharacterMeter count={editedReply.length} />
      </div>
    </div>
  );
}
