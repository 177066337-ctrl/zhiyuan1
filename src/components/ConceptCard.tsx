import type { ConceptItem } from "../types/knowledge";

interface ConceptCardProps {
  item: ConceptItem;
}

export function ConceptCard({ item }: ConceptCardProps) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{item.category}</span>
        {item.needOfficialCheck ? <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">{"需官方核验"}</span> : null}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.name}</h3>
      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        <p><span className="font-semibold text-slate-900">{"通俗解释："}</span>{item.simpleExplanation}</p>
        <p><span className="font-semibold text-slate-900">{"容易误解的地方："}</span>{item.misunderstanding}</p>
        <p><span className="font-semibold text-slate-900">{"填报时要注意："}</span>{item.tips}</p>
      </div>
    </article>
  );
}
