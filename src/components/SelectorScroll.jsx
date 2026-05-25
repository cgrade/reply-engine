export default function SelectorScroll({ children, className = "" }) {
  return (
    <div
      className={`-mx-1 flex gap-2 overflow-x-auto pb-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${className}`}
    >
      {children}
    </div>
  );
}
