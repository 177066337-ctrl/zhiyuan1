import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Disclaimer } from "../components/Disclaimer";
import { EmptyState } from "../components/EmptyState";
import { LoadingState } from "../components/LoadingState";
import { useMajors } from "../hooks/useMajors";
import { useSchools } from "../hooks/useSchools";
import type { ScoreLookupIndex } from "../types/scoreLookup";

function scoreLookupUrl(path: string) {
  return `${import.meta.env.BASE_URL}${path}`;
}

export function HomePage() {
  const schoolsState = useSchools();
  const majorsState = useMajors();
  const [scoreLookupIndex, setScoreLookupIndex] = useState<ScoreLookupIndex | null>(null);

  const schools = schoolsState.data;
  const majors = majorsState.data;
  const scoreLookupDatasets = scoreLookupIndex?.datasets ?? [];

  useEffect(() => {
    let active = true;
    fetch(scoreLookupUrl("data/score-lookup/index.json"), { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("分数试查索引加载失败");
        return (await response.json()) as ScoreLookupIndex;
      })
      .then((payload) => {
        if (active) setScoreLookupIndex(payload);
      })
      .catch(() => {
        if (active) setScoreLookupIndex(null);
      });
    return () => {
      active = false;
    };
  }, []);

  const qualityCounts = useMemo(() => {
    const counts = { verified: 0, warning: 0, candidate: 0, scoreOnly: 0 };
    for (const item of scoreLookupDatasets) {
      if (!item.is_public) continue;
      if (item.quality_status === "verified") counts.verified += 1;
      else if (item.quality_status === "warning") counts.warning += 1;
      else if (item.quality_status === "candidate") counts.candidate += 1;
      else if (item.quality_status === "score_only") counts.scoreOnly += 1;
    }
    return counts;
  }, [scoreLookupDatasets]);

  const stats = [
    { label: "院校总数", value: schools.length },
    { label: "专业总数", value: majors.length },
    { label: "985 院校", value: schools.filter((item) => item.is_985).length },
    { label: "211 院校", value: schools.filter((item) => item.is_211).length },
    { label: "双一流院校", value: schools.filter((item) => item.is_double_first_class).length },
    { label: "本科专业", value: majors.filter((item) => item.degree_level === "本科").length },
    { label: "专科专业", value: majors.filter((item) => item.degree_level === "专科").length },
    { label: "候选数据集", value: scoreLookupDatasets.filter((item) => item.is_public).length },
  ];

  const guideLinks = [
    { title: "志愿填报入门", description: "先理解基本概念和填报顺序。", to: "/guide" },
    { title: "风险避坑", description: "重点看滑档、退档、调剂等问题。", to: "/risks" },
    { title: "专业选择", description: "看专业学什么、适不适合、风险在哪里。", to: "/major-guide" },
    { title: "FAQ", description: "集中回答常见问题。", to: "/faq" },
    { title: "院校查询", description: "继续使用现有院校检索功能。", to: "/schools" },
    { title: "专业查询", description: "继续使用现有专业检索和详情页。", to: "/majors" },
    { title: "工具清单", description: "用清单工具做填报前核对。", to: "/tools" },
  ];

  const toolLinks = [
    { title: "院校查询", description: "按层次、城市、标签继续查看学校。", to: "/schools" },
    { title: "专业查询", description: "按专业名称和层次继续查看。", to: "/majors" },
    { title: "分数试查", description: "只作历史参考，使用前请核验当年官方信息。", to: "/score-lookup", badge: "需官方核验" },
    { title: "我的收藏", description: "方便后续对比学校和专业。", to: "/wishlist" },
    { title: "志愿推荐占位", description: "当前只保留入口，不提供预测或精准推荐。", to: "/recommend", badge: "建设中" },
  ];

  const methodology = ["先看位次", "再看规则", "再看院校", "再看专业", "最后做风险核验"];
  const riskTips = [
    "平行志愿不是没有风险。",
    "服从调剂要结合专业组和可接受专业一起判断。",
    "招生章程必须看。",
    "具体数据和要求必须官方核验。",
  ];

  if (schoolsState.loading || majorsState.loading) return <LoadingState />;
  if (schoolsState.error || majorsState.error) {
    return <EmptyState title="首页数据加载失败" description={schoolsState.error ?? majorsState.error ?? "请稍后重试。"} />;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-gradient-to-br from-brand-700 via-brand-600 to-emerald-600 px-6 py-8 text-white shadow-soft">
        <p className="text-sm uppercase tracking-[0.25em] text-white/70">Guide</p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{"高考志愿填报指南"}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/85 sm:text-base">{"用方法做选择，用清单控风险，用官方信息做最后确认。"}</p>
        <div className="mt-5 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm leading-6 text-white/90">{"涉及年份、省份、分数、位次、招生计划、选科要求、学费、校区、体检限制等信息，请务必以官方信息为准。"}</div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {guideLinks.map((item) => (
          <Link key={item.title} to={item.to} className="rounded-3xl bg-white p-5 shadow-soft transition hover:-translate-y-0.5">
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
          </Link>
        ))}
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">{"核心方法论"}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{"先把决策顺序理顺，再去看具体学校和专业。"}</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {methodology.map((item, index) => (
            <div key={item} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-600">Step {index + 1}</p>
              <p className="mt-2 text-sm font-semibold text-slate-900">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">{"风险提示"}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {riskTips.map((tip) => <div key={tip} className="rounded-2xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">{tip}</div>)}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{"查询工具入口"}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{"原有检索功能继续保留。"}</p>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">{"原有功能保留"}</div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {toolLinks.map((item) => (
            <Link key={item.title} to={item.to} className="rounded-3xl border border-slate-100 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-white">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                {item.badge ? <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">{item.badge}</span> : null}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">{"当前数据概览"}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 shadow-soft">
        <h2 className="text-lg font-semibold text-slate-900">{"分数试查数据提示"}</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{`当前公开 ${scoreLookupDatasets.filter((item) => item.is_public).length} 个候选数据集。`}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl bg-emerald-50 p-4"><p className="text-sm text-emerald-700">{"已抽检通过"}</p><p className="mt-2 text-2xl font-bold text-emerald-900">{qualityCounts.verified}</p></div>
          <div className="rounded-2xl bg-sky-50 p-4"><p className="text-sm text-sky-700">{"未人工复核"}</p><p className="mt-2 text-2xl font-bold text-sky-900">{qualityCounts.candidate}</p></div>
          <div className="rounded-2xl bg-amber-50 p-4"><p className="text-sm text-amber-700">{"警示数据"}</p><p className="mt-2 text-2xl font-bold text-amber-900">{qualityCounts.warning}</p></div>
          <div className="rounded-2xl bg-slate-100 p-4"><p className="text-sm text-slate-700">{"仅分数参考"}</p><p className="mt-2 text-2xl font-bold text-slate-900">{qualityCounts.scoreOnly}</p></div>
        </div>
      </section>

      <Disclaimer />
    </div>
  );
}
