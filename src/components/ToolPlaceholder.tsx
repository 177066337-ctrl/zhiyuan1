interface ToolPlaceholderProps {
  title: string;
  description: string;
  status?: "coming-soon" | "checklist" | "planned";
}

const statusTextMap: Record<NonNullable<ToolPlaceholderProps["status"]>, string> = {
  "coming-soon": "规划中",
  checklist: "清单工具优先",
  planned: "待开发",
};

export function ToolPlaceholder({ title, description, status = "planned" }: ToolPlaceholderProps) {
  return (
    <article className="rounded-3xl border border-dashed border-slate-200 bg-white p-5 shadow-soft">
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{statusTextMap[status]}</span>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
