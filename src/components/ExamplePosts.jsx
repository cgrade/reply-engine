import SelectorScroll from "./SelectorScroll";

export default function ExamplePosts({ items, onLoad }) {
  return (
    <SelectorScroll className="max-w-[55vw] sm:max-w-none">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onLoad(item)}
          className="min-h-[36px] shrink-0 snap-start rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#9A8880] transition-colors active:scale-[0.98] hover:border-[#C9847A]/40 hover:text-[#FAF5F0]"
        >
          {item.label}
        </button>
      ))}
    </SelectorScroll>
  );
}
