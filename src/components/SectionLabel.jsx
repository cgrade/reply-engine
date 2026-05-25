export default function SectionLabel({ children, action }) {
  return (
    <div className="mb-2.5 flex items-center justify-between gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#9A8880]">
        {children}
      </span>
      {action}
    </div>
  );
}
