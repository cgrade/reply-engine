import { useState } from "react";
import { WandSparkles } from "lucide-react";

import PlatformSelector from "../components/PlatformSelector";
import ToneSelector from "../components/ToneSelector";
import ReplyCard from "../components/ReplyCard";
import ReplyHistory from "../components/ReplyHistory";

import { PLATFORMS, TONES } from "../lib/constants";
import { generateReply } from "../lib/api";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { useKeyboard } from "../hooks/useKeyboard";

export default function Home() {
  const [platform, setPlatform] = useLocalStorage("platform", "instagram");
  const [tone, setTone] = useLocalStorage("tone", "warm_educational");
  const [history, setHistory] = useLocalStorage("history", []);

  const [postText, setPostText] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState("");
  const [mock, setMock] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!postText.trim()) return;

    setLoading(true);
    setError("");

    try {
      const data = await generateReply({
        platform,
        tone,
        post: postText,
      });

      setReply(data.reply);
      setMock(data.mock ?? false);

      setHistory([
        {
          id: Date.now(),
          platform,
          tone,
          reply: data.reply,
        },
        ...history,
      ]);
    } catch (err) {
      setError(err.message || "Could not generate reply.");
      setReply("");
    } finally {
      setLoading(false);
    }
  }

  useKeyboard(handleGenerate);

  return (
    <div className="min-h-screen bg-[#0D0806] px-4 py-10 text-[#FAF5F0]">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="text-center">
          <div className="mb-4 inline-flex rounded-full border border-[#C9847A]/20 bg-[#6B0F3A]/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-[#C9847A]">
            Reply Engine
          </div>

          <h1 className="text-5xl font-bold">Intimova</h1>

          <p className="mt-3 text-[#9A8880]">
            AI-powered intimate wellness replies.
          </p>
        </div>

        <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#9A8880]">
              Platform
            </div>

            <PlatformSelector
              items={PLATFORMS}
              value={platform}
              onChange={setPlatform}
            />
          </div>

          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#9A8880]">
              Tone
            </div>

            <ToneSelector items={TONES} value={tone} onChange={setTone} />
          </div>

          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-[#9A8880]">
              Post to reply to
            </div>

            <textarea
              rows={7}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Paste the tweet, caption, or post here..."
              className="w-full rounded-2xl border border-white/10 bg-black/30 p-4 text-[#FAF5F0] outline-none focus:border-[#C9847A]/50"
            />
          </div>

          <button
            disabled={loading}
            onClick={handleGenerate}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#6B0F3A] px-6 py-4 font-semibold transition-all hover:opacity-90 disabled:opacity-50"
          >
            <WandSparkles size={18} />
            {loading ? "Generating..." : "Generate Reply"}
          </button>

          {error && (
            <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}
        </div>
        {reply && (
          <ReplyCard
            reply={reply}
            onCopy={() => navigator.clipboard.writeText(reply)}
            mock={mock}
          />
        )}

        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-[#9A8880]">
            Recent Replies
          </div>

          <ReplyHistory items={history} onSelect={setReply} />
        </div>
      </div>
    </div>
  );
}
