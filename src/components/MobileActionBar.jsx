import { WandSparkles, RotateCcw, Copy, Check } from "lucide-react";

export default function MobileActionBar({
  loading,
  canGenerate,
  hasVariants,
  onGenerate,
  onRegenerate,
  onCopy,
  copied,
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#0D0806]/95 px-4 py-3 backdrop-blur-xl pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
      <div className="mx-auto flex max-w-lg gap-2">
        {hasVariants ? (
          <>
            <button
              type="button"
              disabled={loading}
              onClick={onRegenerate}
              aria-label="Regenerate"
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 active:scale-[0.98] disabled:opacity-50"
            >
              <RotateCcw size={20} />
            </button>
            <button
              type="button"
              onClick={onCopy}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#6B0F3A] font-semibold active:scale-[0.98]"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied" : "Copy reply"}
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={loading || !canGenerate}
            onClick={onGenerate}
            className="flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-[#6B0F3A] font-semibold active:scale-[0.98] disabled:opacity-50"
          >
            <WandSparkles size={18} />
            {loading ? "Generating…" : "Generate 3 angles"}
          </button>
        )}
      </div>
    </div>
  );
}
