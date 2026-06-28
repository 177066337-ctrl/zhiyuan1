export interface ConceptItem {
  id: string;
  name: string;
  category: string;
  simpleExplanation: string;
  misunderstanding: string;
  tips: string;
  needOfficialCheck: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  needOfficialCheck: string;
  page: string;
}

export interface RiskItem {
  id: string;
  name: string;
  category: string;
  typicalSituation: string;
  reason: string;
  howToIdentify: string;
  howToAvoid: string;
  warningText: string;
  needOfficialCheck: boolean;
}

export interface KnowledgeMajorItem {
  id: string;
  name: string;
  summary: string;
  suitableFor: string;
  notSuitableFor: string;
  studyContent: string;
  careerDirection: string;
  postgraduateSuggestion: string;
  schoolTierImportance: string;
  misunderstanding: string;
  suggestion: string;
  risk: string;
  status: string;
}

export interface CaseItem {
  id: string;
  title: string;
  type: string;
  background: string;
  choice: string;
  result: string;
  analysis: string;
  lesson: string;
  displaySuggestion: string;
  riskWarning: string;
}

export interface ChecklistItem {
  id: string;
  name: string;
  items: string[];
  warning: string;
}
