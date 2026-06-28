interface DisclaimerBoxProps {
  title?: string;
  text: string;
  tone?: "warning" | "neutral";
}

export function DisclaimerBox({
  title = "提示",
  text,
  tone = "warning",
}: DisclaimerBoxProps) {
  const toneClass =
    tone === "warning"
      ? "border-amber-200 bg-amber-50 text-amber-900"
      : "border-slate-200 bg-slate-50 text-slate-700";

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${toneClass}`}>
      <p className="font-semibold">{title}</p>
      <p className="mt-2">{text}</p>
    </div>
  );
}
