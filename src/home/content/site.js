export { profile, projects } from '../../content/portfolio';
export const projectSlugs = ['fowoco', 'hwpx', 'ownhands', 'llm-gateway'];
export const homeProjectStories = [
  {
    period: '2026.06 — 2026.08',
    team: '8인 팀',
    outcome: '단일 Dense 검색의 상위 5개 포함 비율 99% 확인 · 복잡한 검색의 지연 증가(60→390ms)를 측정하고 단순화 방향 도출',
    stack: ['Python', 'LangGraph', 'Qdrant', 'Hybrid Search', 'MCP'],
  },
  {
    period: '2026.07 — 현재',
    team: '2인 팀',
    outcome: '문서 구조와 화면 배치를 함께 분석하고 승인 기반 편집·검증 흐름 구축 · MCP 도구 25종 구현',
    stack: ['Python', 'MCP', 'Agent Skills', 'HWPX(XML)'],
  },
  {
    period: '2026.09 — 현재',
    team: '개인 프로젝트',
    outcome: 'ChatGPT 기획·설계 스킬과 Codex 작업 스킬·설치 도구 구현 · 전체 연결 흐름 검증 중',
    stack: ['ChatGPT', 'Codex', 'Git', 'Agent Skills'],
  },
  {
    period: '2025.04 — 2025.10',
    team: '2인 팀',
    outcome: '보유 GPU로 전환해 AWS 호스팅 비용 제거 · 약 3주간 베타 운영',
    stack: ['Java', 'Spring Boot', 'LangChain4j', 'Ollama', 'WebSocket'],
  },
];
// Exact substrings of the existing copy; presentation does not change project facts.
export const projectHighlights = {
  FOWOCO: '공식 모음집과 매칭',
  'HWPX Document Plugin': '확인된 값만 반영',
  OwnHands: '사람이 직접 검증하고',
  'LLM Gateway Service': '조건에 맞는 모델을 선택',
};
