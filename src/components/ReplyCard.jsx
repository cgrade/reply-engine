import { motion } from "framer-motion";
import CharacterMeter from "./CharacterMeter";

export default function ReplyCard({ reply, onCopy, mock }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-[#C9847A]/20 bg-[#6B0F3A]/10 p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-[#C9847A]">
            Generated Reply
          </div>

          {mock && (
            <div className="mt-1 text-xs text-yellow-400">
              Running in mock mode (no API key)
            </div>
          )}
        </div>

        <button
          onClick={onCopy}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2"
        >
          Copy
        </button>
      </div>

      <p className="leading-8 text-[#FAF5F0]">{reply}</p>

      <CharacterMeter count={reply.length} />
    </motion.div>
  );
}
