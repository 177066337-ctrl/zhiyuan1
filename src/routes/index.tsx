import { createHashRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { AboutPage } from "../pages/AboutPage";
import { CasesPage } from "../pages/CasesPage";
import { DisclaimerPage } from "../pages/DisclaimerPage";
import { FaqPage } from "../pages/FaqPage";
import { GuidePage } from "../pages/GuidePage";
import { HomePage } from "../pages/HomePage";
import { MajorDetailPage } from "../pages/MajorDetailPage";
import { MajorGuidePage } from "../pages/MajorGuidePage";
import { MajorsPage } from "../pages/MajorsPage";
import { RecommendPlaceholderPage } from "../pages/RecommendPlaceholderPage";
import { RisksPage } from "../pages/RisksPage";
import { SchoolDetailPage } from "../pages/SchoolDetailPage";
import { SchoolsPage } from "../pages/SchoolsPage";
import { ScoreLookupPage } from "../pages/ScoreLookupPage";
import { ToolsPage } from "../pages/ToolsPage";
import { WishlistPage } from "../pages/WishlistPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "guide", element: <GuidePage /> },
      { path: "faq", element: <FaqPage /> },
      { path: "risks", element: <RisksPage /> },
      { path: "cases", element: <CasesPage /> },
      { path: "major-guide", element: <MajorGuidePage /> },
      { path: "tools", element: <ToolsPage /> },
      { path: "disclaimer", element: <DisclaimerPage /> },
      { path: "schools", element: <SchoolsPage /> },
      { path: "schools/:schoolId", element: <SchoolDetailPage /> },
      { path: "majors", element: <MajorsPage /> },
      { path: "majors/:majorId", element: <MajorDetailPage /> },
      { path: "score-lookup", element: <ScoreLookupPage /> },
      { path: "wishlist", element: <WishlistPage /> },
      { path: "recommend", element: <RecommendPlaceholderPage /> },
      { path: "about", element: <AboutPage /> },
    ],
  },
]);
