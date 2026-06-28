import type { KnowledgeMajorItem } from "../types/knowledge";

interface MajorCategoryCardProps {
  item: KnowledgeMajorItem;
}

export function MajorCategoryCard({ item }: MajorCategoryCardProps) {
  const pending = item.status === "待补充";

  return (
    <article className="rounded-3xl bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{item.status}</span>
        {pending ? <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">{"信息待补充"}</span> : null}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.name}</h3>
      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        <p><span className="font-semibold text-slate-900">{"专业简介："}</span>{item.summary}</p>
        <p><span className="font-semibold text-slate-900">{"适合什么样的学生："}</span>{item.suitableFor}</p>
        <p><span className="font-semibold text-slate-900">{"不太适合什么样的学生："}</span>{item.notSuitableFor}</p>
        <p><span className="font-semibold text-slate-900">{"本科阶段大致学什么："}</span>{item.studyContent}</p>
        <p><span className="font-semibold text-slate-900">{"常见就业方向："}</span>{item.careerDirection}</p>
        <p><span className="font-semibold text-slate-900">{"是否适合考研："}</span>{item.postgraduateSuggestion}</p>
        <p><span className="font-semibold text-slate-900">{"是否看学校层次："}</span>{item.schoolTierImportance}</p>
        <p><span className="font-semibold text-slate-900">{"常见误区："}</span>{item.misunderstanding}</p>
        <p><span className="font-semibold text-slate-900">{"填报建议："}</span>{item.suggestion}</p>
      </div>
      <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
        <p className="font-semibold">{"风险提醒"}</p>
        <p className="mt-1">{item.risk}</p>
      </div>
    </article>
  );
}
