import { Disclaimer } from "../components/Disclaimer";

export function RecommendPlaceholderPage() {
  const steps = [
    "补齐可核验的历史数据",
    "补齐位次表和招生计划",
    "完善风险检查项和梯度工具",
    "只做辅助判断，不做录取承诺",
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-bold text-slate-900">{"志愿推荐功能建设中"}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">{"当前版本不提供冲稳保推荐，也不提供录取概率预测。"}</p>
      </section>
      <section className="rounded-3xl bg-white p-6 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">{"后续规划"}</h2>
        <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-600">{steps.map((step) => <li key={step} className="rounded-2xl bg-slate-50 px-4 py-3">{step}</li>)}</ol>
      </section>
      <Disclaimer />
    </div>
  );
}
