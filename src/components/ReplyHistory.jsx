import { PLATFORMS, TONES, POST_TYPES } from "../lib/constants";

function labelFor(items, id) {
  return items.find((i) => i.id === id)?.label ?? id;
}

export default function ReplyHistory({ items, onRestore }) {
  if (!items.length) return null;

  return (
    <div className="space-y-2 sm:space-y-3">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onRestore(item)}
          className="w-full rounded-2xl border border-white/10 bg-white/5 p-3.5 text-left transition-colors active:scale-[0.99] hover:border-[#C9847A]/30 sm:p-4"
        >
          <div className="mb-2 flex flex-wrap gap-x-2 gap-y-1 text-[10px] uppercase tracking-[0.12em] text-[#C9847A] sm:text-xs">
            <span>{labelFor(PLATFORMS, item.platform)}</span>
            <span className="text-[#6B5248]">·</span>
            <span>{labelFor(TONES, item.tone)}</span>
            <span className="text-[#6B5248]">·</span>
            <span>{labelFor(POST_TYPES, item.postType)}</span>
          </div>

          {item.post && (
            <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-[#9A8880]">
              {item.post}
            </p>
          )}

          <p className="text-sm leading-relaxed text-[#FAF5F0]">
            {item.selectedReply ?? item.replies?.[0]}
          </p>
        </button>
      ))}
    </div>
  );
}
