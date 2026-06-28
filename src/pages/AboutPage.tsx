import { Disclaimer } from "../components/Disclaimer";

export function AboutPage() {
  const supported = [
    "全国院校查询",
    "全国专业查询",
    "985 / 211 / 双一流筛选",
    "收藏院校和专业",
    "分数试查数据说明",
    "知识型页面与风险提示",
  ];

  const unsupported = [
    "这不是正式志愿推荐系统。",
    "不提供录取概率预测。",
    "不保证所有省份、年份、批次信息完整。",
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-bold text-slate-900">{"项目说明"}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{"当前版本定位为“高考志愿填报指导站 + 院校专业查询工具”，优先提供公开可发布的内容和辅助功能。"}</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <h2 className="text-lg font-semibold text-slate-900">{"当前支持"}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">{supported.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <h2 className="text-lg font-semibold text-slate-900">{"当前限制"}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">{unsupported.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>
      <Disclaimer />
    </div>
  );
}
