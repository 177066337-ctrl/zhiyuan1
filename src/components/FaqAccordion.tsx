import { useState } from "react";
import type { FaqItem } from "../types/knowledge";

interface FaqAccordionProps {
  items: FaqItem[];
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const expanded = item.id === activeId;
        return (
          <article key={item.id} className="rounded-3xl bg-white p-5 shadow-soft">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 text-left"
              onClick={() => setActiveId(expanded ? null : item.id)}
            >
              <div>
                <h3 className="text-base font-semibold text-slate-900">{item.question}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-brand-600">{item.page}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                {expanded ? "收起" : "展开"}
              </span>
            </button>

            {expanded ? (
              <div className="mt-4 space-y-4 border-t border-slate-100 pt-4 text-sm leading-7 text-slate-700">
                <p>{item.answer}</p>
                {item.needOfficialCheck ? (
                  <div className="rounded-2xl bg-amber-50 px-4 py-3 text-amber-900">
                    <p className="font-medium">{"需要官方核验的信息"}</p>
                    <p className="mt-1">{item.needOfficialCheck}</p>
                  </div>
                ) : null}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
