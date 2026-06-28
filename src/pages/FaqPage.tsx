import { useEffect, useMemo, useState } from "react";
import { DisclaimerBox } from "../components/DisclaimerBox";
import { EmptyState } from "../components/EmptyState";
import { FaqAccordion } from "../components/FaqAccordion";
import { KnowledgeLayout } from "../components/KnowledgeLayout";
import { LoadingState } from "../components/LoadingState";
import { PageHero } from "../components/PageHero";
import { SearchInput } from "../components/SearchInput";
import type { FaqItem } from "../types/knowledge";
import { loadFaq } from "../utils/loadKnowledgeData";

export function FaqPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    let active = true;
    loadFaq()
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
    return items.filter((item) => `${item.question} ${item.answer} ${item.needOfficialCheck}`.toLowerCase().includes(normalized));
  }, [items, keyword]);

  if (loading) return <LoadingState />;
  if (error) return <EmptyState title="FAQ 加载失败" description={error} />;

  return (
    <KnowledgeLayout>
      <PageHero
        eyebrow="FAQ"
        title="常见问题"
        subtitle="把最常被问到的问题放在一处，方便先建立基本判断。"
        notice="FAQ 更适合做入门参考，不替代省份规则和高校要求。"
      />

      <section className="rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">{"关键词筛选"}</h2>
        <div className="mt-4">
          <SearchInput value={keyword} onChange={setKeyword} placeholder="例如：调剂、位次、平行志愿" />
        </div>
      </section>

      {filtered.length === 0 ? <EmptyState title="没有匹配的问题" description="换个关键词试试。" /> : <FaqAccordion items={filtered} />}

      <DisclaimerBox text="FAQ 只能帮你先建立思路，正式填报前仍要看官方规则和招生章程。" />
    </KnowledgeLayout>
  );
}
