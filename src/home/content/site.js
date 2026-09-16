export { profile, projects } from '../../content/portfolio';
export const projectSlugs = ['fowoco', 'hwpx', 'ownhands', 'llm-gateway'];
export const homeProjectStories = [
  { problem: '다양한 표현으로 들어오는 문의를 어떻게 검색할 것인가?', period: '2026.06 — 2026.08', team: '8인 팀',
    outcome: '검색 성공 72 → 93개 (100개 질문, 상위 5개 내) · 서비스 시연 완료',
    stack: ['Python', 'LangGraph', 'Qdrant', 'Hybrid Search', 'MCP'] },
  { problem: 'AI가 문서의 빈칸을 추측해서 채우지 않게 하려면?', period: '2026.07 — 현재', team: '2인 팀',
    outcome: '대표 양식 1건 실행 · 157셀 대조에서 차이 8셀',
    stack: ['Python', 'FastMCP', 'Agent Skills', 'HWPX(XML)'] },
  { problem: 'AI의 완료 보고를 무엇을 근거로 판단할 것인가?', period: '2026.09 — 현재', team: '개인 프로젝트',
    outcome: '개발 중 · 검증 Core와 Issue 기반 흐름 설계',
    stack: ['Python', 'SQLite', 'MCP', 'Agent Skills'] },
  { problem: '사용 조건에 맞는 LLM을 어떻게 선택하고 연결할 것인가?', period: '2025.04 — 2025.10', team: '2인 팀',
    outcome: '보유 GPU로 전환해 약 3주 베타 운영',
    stack: ['Java', 'Spring Boot', 'LangChain4j', 'Ollama'] },
];
// Exact substrings of the existing copy; presentation does not change project facts.
export const projectHighlights = {
  FOWOCO: 'Language Assistant',
  'HWPX Document Plugin': '사용자에게 확인한 값',
  OwnHands: '사람이 이해하고 검증하며 최종 판단',
  'LLM Gateway Service': '사용 조건에 맞춰 선택',
};
