import { useEffect, useMemo, useState } from "react";
import { DisclaimerBox } from "../components/DisclaimerBox";
import { EmptyState } from "../components/EmptyState";
import { KnowledgeLayout } from "../components/KnowledgeLayout";
import { LoadingState } from "../components/LoadingState";
import { MajorCategoryCard } from "../components/MajorCategoryCard";
import { PageHero } from "../components/PageHero";
import { SearchInput } from "../components/SearchInput";
import type { KnowledgeMajorItem } from "../types/knowledge";
import { loadKnowledgeMajors } from "../utils/loadKnowledgeData";

export function MajorGuidePage() {
  const [items, setItems] = useState<KnowledgeMajorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    let active = true;
    loadKnowledgeMajors()
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

  const filtered = useMemo(() => {
    const normalized = keyword.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) => `${item.name} ${item.summary} ${item.careerDirection} ${item.suggestion}`.toLowerCase().includes(normalized));
  }, [items, keyword]);

  if (loading) return <LoadingState />;
  if (error) return <EmptyState title="专业指南加载失败" description={error} />;

  return (
    <KnowledgeLayout>
      <PageHero
        eyebrow="Majors"
        title="专业选择"
        subtitle="专业不只是名称好不好听，更要看学什么、适不适合和将来能做什么。"
        notice="涉及具体学校的专业方向、学费、转专业政策等信息，需以官方信息为准。"
      />

      <section className="rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">{"按关键词查找专业类别"}</h2>
        <div className="mt-4">
          <SearchInput value={keyword} onChange={setKeyword} placeholder="例如：计算机、法学、护理、人工智能" />
        </div>
      </section>

      {filtered.length === 0 ? <EmptyState title="没有匹配的专业类别" description="可以换个关键词试试。" /> : <div className="grid gap-4 lg:grid-cols-2">{filtered.map((item) => <MajorCategoryCard key={item.id} item={item} />)}</div>}

      <DisclaimerBox title="补充说明" text="部分专业仍标记为“待补充”，代表目前只适合做初步了解。" />
    </KnowledgeLayout>
  );
}
