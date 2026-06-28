import type { ReactNode } from "react";

interface KnowledgeLayoutProps {
  children: ReactNode;
  aside?: ReactNode;
  maxWidth?: "default" | "wide";
}

export function KnowledgeLayout({
  children,
  aside,
  maxWidth = "default",
}: KnowledgeLayoutProps) {
  const widthClass = maxWidth === "wide" ? "max-w-container" : "max-w-5xl";

  return (
    <div className={`mx-auto ${widthClass} space-y-6`}>
      {aside ? (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-6">{children}</div>
          <aside className="space-y-4">{aside}</aside>
        </div>
      ) : (
        <div className="space-y-6">{children}</div>
      )}
    </div>
  );
}
