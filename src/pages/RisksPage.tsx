import { useEffect, useMemo, useState } from "react";
import { DisclaimerBox } from "../components/DisclaimerBox";
import { EmptyState } from "../components/EmptyState";
import { KnowledgeLayout } from "../components/KnowledgeLayout";
import { LoadingState } from "../components/LoadingState";
import { PageHero } from "../components/PageHero";
import { RiskCard } from "../components/RiskCard";
import type { RiskItem } from "../types/knowledge";
import { loadRisks } from "../utils/loadKnowledgeData";

export function RisksPage() {
  const [items, setItems] = useState<RiskItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("全部");

  useEffect(() => {
    let active = true;
    loadRisks()
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

  const categories = useMemo(() => ["全部", ...Array.from(new Set(items.map((item) => item.category)))], [items]);
  const filtered = useMemo(() => (category === "全部" ? items : items.filter((item) => item.category === category)), [category, items]);

  if (loading) return <LoadingState />;
  if (error) return <EmptyState title="风险清单加载失败" description={error} />;

  return (
    <KnowledgeLayout>
      <PageHero
        eyebrow="Risks"
        title="风险避坑"
        subtitle="志愿填报不是只看能不能报，更要看会不会踩坑。"
        notice="滑档、退档、调剂、选科不符、体检受限等风险，都要结合官方文件一起看。"
      />

      <section className="rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">{"按类型查看风险"}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((entry) => (
            <button key={entry} type="button" onClick={() => setCategory(entry)} className={`rounded-full px-4 py-2 text-sm font-medium ${category === entry ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700"}`}>
              {entry}
            </button>
          ))}
        </div>
      </section>

      {filtered.length === 0 ? <EmptyState title="没有匹配的风险" description="可以切换其他分类查看。" /> : <div className="grid gap-4 lg:grid-cols-2">{filtered.map((item) => <RiskCard key={item.id} item={item} />)}</div>}

      <DisclaimerBox title="风险提醒" text="如果同一个志愿同时存在多种风险，即使分数合适，也不建议只看表面分数做决定。" />
    </KnowledgeLayout>
  );
}
