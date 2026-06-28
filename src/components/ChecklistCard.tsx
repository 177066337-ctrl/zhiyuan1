import type { ChecklistItem } from "../types/knowledge";

interface ChecklistCardProps {
  item: ChecklistItem;
}

export function ChecklistCard({ item }: ChecklistCardProps) {
  return (
    <article className="rounded-3xl bg-white p-5 shadow-soft">
      <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-slate-700">
        {item.items.map((entry) => (
          <li key={entry}>{entry}</li>
        ))}
      </ul>
      <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">
        <p className="font-semibold">??</p>
        <p className="mt-1">{item.warning}</p>
      </div>
    </article>
  );
}
