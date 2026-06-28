import type { CaseItem } from "../types/knowledge";

interface CaseCardProps {
  item: CaseItem;
}

export function CaseCard({ item }: CaseCardProps) {
  const isExample = item.type.includes("示例案例");

  return (
    <article className="rounded-3xl bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${isExample ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
          {item.type}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        <p><span className="font-semibold text-slate-900">{"考生背景："}</span>{item.background}</p>
        <p><span className="font-semibold text-slate-900">{"填报选择："}</span>{item.choice}</p>
        <p><span className="font-semibold text-slate-900">{"结果或可能结果："}</span>{item.result}</p>
        <p><span className="font-semibold text-slate-900">{"问题分析："}</span>{item.analysis}</p>
        <p><span className="font-semibold text-slate-900">{"可复用经验："}</span>{item.lesson}</p>
      </div>
      <div className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700">
        <p className="font-semibold text-slate-900">{"网页展示建议"}</p>
        <p className="mt-1">{item.displaySuggestion}</p>
      </div>
      <div className="mt-3 rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
        <p className="font-semibold">{"风险提醒"}</p>
        <p className="mt-1">{item.riskWarning}</p>
      </div>
    </article>
  );
}
