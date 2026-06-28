import { Link, NavLink } from "react-router-dom";

const guideLinks = [
  { to: "/", label: "首页" },
  { to: "/guide", label: "填报入门" },
  { to: "/risks", label: "风险避坑" },
  { to: "/major-guide", label: "专业选择" },
  { to: "/cases", label: "案例库" },
  { to: "/faq", label: "FAQ" },
  { to: "/tools", label: "工具" },
];

const toolLinks = [
  { to: "/schools", label: "院校查询" },
  { to: "/majors", label: "专业查询" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-slate-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-container flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <Link to="/" className="min-w-0">
          <p className="truncate text-lg font-bold text-brand-700">{"高考志愿填报指南"}</p>
          <p className="hidden text-xs text-slate-500 sm:block">{"学习参考、风险提示、查询辅助"}</p>
        </Link>
        <div className="hidden items-center gap-4 lg:flex">
          <nav className="flex max-w-[760px] flex-wrap items-center justify-end gap-2">
            {guideLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium ${
                    isActive ? "bg-brand-600 text-white" : "text-slate-600 hover:bg-white"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="hidden h-8 w-px bg-slate-200 xl:block" />
          <nav className="flex items-center gap-2">
            {toolLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium ${
                    isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-700"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
