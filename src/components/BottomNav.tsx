import { NavLink } from "react-router-dom";

const items = [
  { to: "/", label: "首页" },
  { to: "/guide", label: "入门" },
  { to: "/risks", label: "风险" },
  { to: "/faq", label: "FAQ" },
  { to: "/tools", label: "工具" },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 border-t border-slate-200 bg-white/95 backdrop-blur lg:hidden">
      <div className="mx-auto grid max-w-container grid-cols-5 px-2 py-2">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `rounded-2xl px-2 py-2 text-center text-xs font-medium ${
                isActive ? "bg-brand-50 text-brand-700" : "text-slate-500"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
