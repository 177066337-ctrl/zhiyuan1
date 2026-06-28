import { DisclaimerBox } from "../components/DisclaimerBox";
import { KnowledgeLayout } from "../components/KnowledgeLayout";
import { PageHero } from "../components/PageHero";

const items = [
  "本站内容仅供学习和参考，不构成正式填报意见。",
  "本站不承诺录取结果。",
  "涉及省份规则、招生计划、选科要求、学费、校区、体检限制、分数位次、专业录取数据等内容，必须以当年官方信息为准。",
  "本站不提供包录取、精准预测、内部资料等服务。",
];

export function DisclaimerPage() {
  return (
    <KnowledgeLayout>
      <PageHero eyebrow="Notice" title="免责声明" subtitle="公开站点更适合做学习参考和风险提示。" notice="准备正式填报时，请一定再回到官方来源核验。" />
      <section className="rounded-3xl bg-white p-6 shadow-soft">
        <h2 className="text-xl font-semibold text-slate-900">{"使用说明"}</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7 text-slate-700">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
      <DisclaimerBox title="再次提醒" text="任何涉及录取可能性、当年分数线、计划变化的判断，都不能只依赖本站内容。" />
    </KnowledgeLayout>
  );
}
