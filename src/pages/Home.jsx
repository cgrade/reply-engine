import { useState } from "react";
import { WandSparkles, RotateCcw } from "lucide-react";

import PlatformSelector from "../components/PlatformSelector";
import ToneSelector from "../components/ToneSelector";
import PostTypeSelector from "../components/PostTypeSelector";
import ExamplePosts from "../components/ExamplePosts";
import VariantReplies from "../components/VariantReplies";
import ReplyHistory from "../components/ReplyHistory";
import SectionLabel from "../components/SectionLabel";
import MobileActionBar from "../components/MobileActionBar";

import {
  PLATFORMS,
  TONES,
  POST_TYPES,
  EXAMPLE_POSTS,
  VARIANT_LABELS,
} from "../lib/constants";
import { generateReply } from "../lib/api";

import { useLocalStorage } from "../hooks/useLocalStorage";
import { useKeyboard } from "../hooks/useKeyboard";

export default function Home() {
  const [platform, setPlatform] = useLocalStorage("platform", "instagram");
  const [tone, setTone] = useLocalStorage("tone", "warm_educational");
  const [postType, setPostType] = useLocalStorage("postType", "general");
  const [history, setHistory] = useLocalStorage("history", []);

  const [postText, setPostText] = useState("");
  const [extraContext, setExtraContext] = useState("");
  const [variants, setVariants] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [editedReply, setEditedReply] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  function selectVariant(index, list = variants) {
    setSelectedIndex(index);
    setEditedReply(list[index] ?? "");
    setCopied(false);
  }

  async function handleGenerate() {
    if (!postText.trim()) return;

    setLoading(true);
    setError("");
    setVariants([]);
    setCopied(false);

    try {
      const data = await generateReply({
        platform,
        tone,
        post: postText,
        extraContext: extraContext.trim() || undefined,
        postType,
      });

      const replies = data.replies ?? [];
      setVariants(replies);
      selectVariant(0, replies);

      setHistory([
        {
          id: Date.now(),
          platform,
          tone,
          postType,
          post: postText,
          extraContext,
          replies,
          selectedReply: replies[0],
        },
        ...history.slice(0, 19),
      ]);

      if (replies.length > 0) {
        requestAnimationFrame(() => {
          document.getElementById("replies-section")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
      }
    } catch (err) {
      setError(err.message || "Could not generate reply.");
      setVariants([]);
      setEditedReply("");
    } finally {
      setLoading(false);
    }
  }

  function loadExample(example) {
    setPostText(example.post);
    setPostType(example.postType);
    setExtraContext(example.extraContext ?? "");
    setVariants([]);
    setEditedReply("");
    setError("");
    setCopied(false);
  }

  function restoreFromHistory(item) {
    setPlatform(item.platform);
    setTone(item.tone);
    setPostType(item.postType ?? "general");
    setPostText(item.post ?? "");
    setExtraContext(item.extraContext ?? "");
    const list = item.replies ?? (item.selectedReply ? [item.selectedReply] : []);
    setVariants(list);
    const idx = Math.max(0, list.findIndex((r) => r === item.selectedReply));
    selectVariant(idx === -1 ? 0 : idx, list);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCopy(text) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  useKeyboard(handleGenerate);

  const hasVariants = variants.length > 0;

  return (
    <div className="min-h-screen bg-[#0D0806] text-[#FAF5F0]">
      <div className="mx-auto max-w-4xl px-3 pb-32 pt-6 sm:px-4 sm:pb-10 sm:pt-10">
        <header className="mb-6 text-center sm:mb-8">
          <div className="mb-3 inline-flex rounded-full border border-[#C9847A]/20 bg-[#6B0F3A]/20 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#C9847A] sm:mb-4 sm:px-4 sm:py-2 sm:text-xs">
            Reply Engine
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Intimova</h1>
          <p className="mt-2 text-sm text-[#9A8880] sm:mt-3 sm:text-base">
            Paste post context · get 3 on-brand angles
          </p>
        </header>

        <section className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl sm:space-y-6 sm:rounded-3xl sm:p-6">
          <div>
            <SectionLabel>Platform</SectionLabel>
            <PlatformSelector
              items={PLATFORMS}
              value={platform}
              onChange={setPlatform}
            />
          </div>

          <div>
            <SectionLabel>Tone</SectionLabel>
            <ToneSelector items={TONES} value={tone} onChange={setTone} />
          </div>

          <div>
            <SectionLabel>Post type</SectionLabel>
            <PostTypeSelector
              items={POST_TYPES}
              value={postType}
              onChange={setPostType}
            />
          </div>

          <div>
            <SectionLabel action={<ExamplePosts items={EXAMPLE_POSTS} onLoad={loadExample} />}>
              Post context
            </SectionLabel>
            <textarea
              rows={5}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What did they post or say? Caption, comment, carousel slide, video hook…"
              className="w-full rounded-2xl border border-white/10 bg-black/30 p-3.5 text-base leading-relaxed text-[#FAF5F0] outline-none focus:border-[#C9847A]/50 sm:p-4"
            />
            <p className="mt-2 text-xs text-[#9A8880]">
              Tip: include their exact claim or feeling — specificity beats generic replies.
            </p>
          </div>

          <div>
            <SectionLabel>Extra context (optional)</SectionLabel>
            <textarea
              rows={2}
              value={extraContext}
              onChange={(e) => setExtraContext(e.target.value)}
              placeholder="Slide 2 of 5, angry replies in thread, faith framing…"
              className="w-full rounded-2xl border border-white/10 bg-black/30 p-3.5 text-sm text-[#FAF5F0] outline-none focus:border-[#C9847A]/50 sm:p-4"
            />
          </div>

          <div className="hidden gap-3 md:flex">
            <button
              type="button"
              disabled={loading || !postText.trim()}
              onClick={handleGenerate}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#6B0F3A] px-6 py-4 font-semibold transition-all hover:opacity-90 disabled:opacity-50"
            >
              <WandSparkles size={18} />
              {loading ? "Generating 3 angles…" : "Generate 3 angles"}
            </button>
            {hasVariants && (
              <button
                type="button"
                disabled={loading}
                onClick={handleGenerate}
                title="Regenerate"
                className="flex min-h-[52px] min-w-[52px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-[#C9847A]/40 disabled:opacity-50"
              >
                <RotateCcw size={18} />
              </button>
            )}
          </div>

          {loading && (
            <div className="flex items-center gap-3 rounded-2xl border border-[#C9847A]/20 bg-[#6B0F3A]/10 px-4 py-3">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#C9847A] border-t-transparent" />
              <p className="text-sm text-[#C9847A]">Writing 3 angles…</p>
            </div>
          )}

          {error && (
            <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}

          <p className="hidden text-center text-xs text-[#9A8880] md:block">
            ⌘/Ctrl + Enter to generate
          </p>
        </section>

        {hasVariants && (
          <section id="replies-section" className="mt-6 scroll-mt-4 sm:mt-8">
            <VariantReplies
              variants={variants}
              labels={VARIANT_LABELS}
              selectedIndex={selectedIndex}
              onSelect={selectVariant}
              editedReply={editedReply}
              onEdit={setEditedReply}
              onCopy={handleCopy}
              copied={copied}
            />
          </section>
        )}

        {history.length > 0 && (
          <section className="mt-8 sm:mt-10">
            <SectionLabel>Recent sessions</SectionLabel>
            <ReplyHistory items={history} onRestore={restoreFromHistory} />
          </section>
        )}
      </div>

      <MobileActionBar
        loading={loading}
        canGenerate={Boolean(postText.trim())}
        hasVariants={hasVariants}
        onGenerate={handleGenerate}
        onRegenerate={handleGenerate}
        onCopy={() => handleCopy(editedReply)}
        copied={copied}
      />
    </div>
  );
}
