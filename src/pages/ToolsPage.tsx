import { useEffect, useState } from "react";
import { ChecklistCard } from "../components/ChecklistCard";
import { DisclaimerBox } from "../components/DisclaimerBox";
import { EmptyState } from "../components/EmptyState";
import { KnowledgeLayout } from "../components/KnowledgeLayout";
import { LoadingState } from "../components/LoadingState";
import { PageHero } from "../components/PageHero";
import { ToolPlaceholder } from "../components/ToolPlaceholder";
import type { ChecklistItem } from "../types/knowledge";
import { loadChecklists } from "../utils/loadKnowledgeData";

export function ToolsPage() {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    loadChecklists()
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
  if (error) return <EmptyState title="工具页加载失败" description={error} />;

  return (
    <KnowledgeLayout>
      <PageHero
        eyebrow="Tools"
        title="工具页"
        subtitle="第一版先做指导型、清单型工具，而不是预测型工具。"
        notice="本站当前不提供录取概率预测，也不提供所谓精准推荐。"
      />

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{"已上线清单工具"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{"这些工具更适合在正式填表前做逐项核对。"}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((item) => (
            <ChecklistCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{"后续计划工具"}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{"优先补足辅助判断工具，而不是承诺结果的工具。"}</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-3">
          <ToolPlaceholder title="冲稳保梯度表" description="用来梳理志愿排序框架。" status="checklist" />
          <ToolPlaceholder title="院校对比表" description="对比城市、学费、校区等信息。" status="planned" />
          <ToolPlaceholder title="专业偏好测试" description="帮助梳理关注点，不直接输出结论。" status="coming-soon" />
        </div>
      </section>

      <DisclaimerBox text="工具页的作用是帮你把信息核对得更完整，而不是代替正式决策。" />
    </KnowledgeLayout>
  );
}
