import type {
  CaseItem,
  ChecklistItem,
  ConceptItem,
  FaqItem,
  KnowledgeMajorItem,
  RiskItem,
} from "../types/knowledge";

function knowledgeUrl(fileName: string) {
  return `${import.meta.env.BASE_URL}data/knowledge/${fileName}`;
}

async function loadKnowledgeJson<T>(fileName: string): Promise<T[]> {
  const response = await fetch(knowledgeUrl(fileName), { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`知识库数据加载失败：${fileName}`);
  }

  const data = (await response.json()) as unknown;
  if (!Array.isArray(data)) {
    throw new Error(`知识库数据格式异常：${fileName}`);
  }

  return data as T[];
}

export function loadConcepts() {
  return loadKnowledgeJson<ConceptItem>("concepts.json");
}

export function loadFaq() {
  return loadKnowledgeJson<FaqItem>("faq.json");
}

export function loadRisks() {
  return loadKnowledgeJson<RiskItem>("risks.json");
}

export function loadKnowledgeMajors() {
  return loadKnowledgeJson<KnowledgeMajorItem>("majors.json");
}

export function loadCases() {
  return loadKnowledgeJson<CaseItem>("cases.json");
}

export function loadChecklists() {
  return loadKnowledgeJson<ChecklistItem>("checklists.json");
}
