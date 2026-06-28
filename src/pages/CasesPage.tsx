import { useEffect, useState } from "react";
import { CaseCard } from "../components/CaseCard";
import { DisclaimerBox } from "../components/DisclaimerBox";
import { EmptyState } from "../components/EmptyState";
import { KnowledgeLayout } from "../components/KnowledgeLayout";
import { LoadingState } from "../components/LoadingState";
import { PageHero } from "../components/PageHero";
import type { CaseItem } from "../types/knowledge";
import { loadCases } from "../utils/loadKnowledgeData";

export function CasesPage() {
  const [items, setItems] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadCases()
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
  if (error) return <EmptyState title="案例库加载失败" description={error} />;
  if (!items.length) return <EmptyState title="暂无案例内容" description="当前没有可展示的案例。" />;

  return (
    <KnowledgeLayout>
      <PageHero
        eyebrow="Cases"
        title="案例库"
        subtitle="通过案例看填报思路，往往比只看概念更容易理解。"
        notice="本页同时包含“来源于原资料提炼”和“示例案例，不对应真实考生”两类内容。"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map((item) => (
          <CaseCard key={item.id} item={item} />
        ))}
      </div>

      <DisclaimerBox text="案例只用于帮助理解思路，不代表对所有考生都适用。" />
    </KnowledgeLayout>
  );
}
