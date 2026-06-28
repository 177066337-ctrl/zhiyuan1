import type { RiskItem } from "../types/knowledge";

interface RiskCardProps {
  item: RiskItem;
}

export function RiskCard({ item }: RiskCardProps) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-soft">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">{item.category}</span>
        {item.needOfficialCheck ? (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">{"需官方核验"}</span>
        ) : null}
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.name}</h3>
      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        <p><span className="font-semibold text-slate-900">{"典型表现："}</span>{item.typicalSituation}</p>
        <p><span className="font-semibold text-slate-900">{"为什么会发生："}</span>{item.reason}</p>
        <p><span className="font-semibold text-slate-900">{"如何提前识别："}</span>{item.howToIdentify}</p>
        <p><span className="font-semibold text-slate-900">{"如何规避："}</span>{item.howToAvoid}</p>
      </div>
      <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
        <p className="font-semibold">{"网页提醒文案"}</p>
        <p className="mt-1">{item.warningText}</p>
      </div>
    </article>
  );
}
