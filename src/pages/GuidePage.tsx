import { useEffect, useState } from "react";
import { ConceptCard } from "../components/ConceptCard";
import { DisclaimerBox } from "../components/DisclaimerBox";
import { EmptyState } from "../components/EmptyState";
import { KnowledgeLayout } from "../components/KnowledgeLayout";
import { LoadingState } from "../components/LoadingState";
import { PageHero } from "../components/PageHero";
import type { ConceptItem } from "../types/knowledge";
import { loadConcepts } from "../utils/loadKnowledgeData";

const processSteps = [
  "先看位次",
  "再看规则",
  "再看院校",
  "再看专业",
  "最后做风险核验",
];

export function GuidePage() {
  const [items, setItems] = useState<ConceptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadConcepts()
      .then((data) => {
        if (!active) return;
        setItems(data);
        setError(null);
      })
      .catch((err: Error) => {
        if (!active) return;
        setItems([]);
        setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <EmptyState title="基础概念加载失败" description={error} />;
  if (!items.length) return <EmptyState title="暂无概念内容" description="当前没有可展示的基础概念数据。" />;

  return (
    <KnowledgeLayout>
      <PageHero
        eyebrow="Guide"
        title="志愿填报入门"
        subtitle="先把基本概念和填报顺序理清楚，再看学校和专业，会更稳。"
        notice="涉及批次、志愿数量、投档细则等信息，仍需以当年官方文件为准。"
      />

      <section className="rounded-3xl bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-900">{"志愿填报基本流程"}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {processSteps.map((step, index) => (
            <div key={step} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-brand-600">Step {index + 1}</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{"基础概念卡片"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{"先把术语看懂，再去做比较和选择。"}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((item) => (
            <ConceptCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <DisclaimerBox title="提醒" text="基础概念可以长期参考，但规则和安排会随省份、年份变化，使用前请再次核验。" />
    </KnowledgeLayout>
  );
}
