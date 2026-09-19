export { profile, projects } from '../../content/portfolio';
export const projectSlugs = ['fowoco', 'hwpx', 'ownhands', 'llm-gateway'];
export const homeProjectStories = [
  {
    problem: '모호한 자연어 질문을 한국산업인력공단 공식 외국어 모음집으로 연결하는 검색 설계',
    period: '2026.06 — 2026.08',
    team: '8인 팀',
    outcome: '단일 Dense 99% 적중 확인 · 파이프라인 과잉 설계(60→390ms)와 단순화 회고',
    stack: ['Python', 'LangGraph', 'Qdrant', 'Hybrid Search', 'MCP'],
  },
  {
    problem: '공문서 서식 자동화에서 AI의 임의 추측 입력 원천 차단',
    period: '2026.07 — 현재',
    team: '2인 팀',
    outcome: 'XML 구조와 시각 배치 분석으로 확인된 값만 서식 반영 · MCP 도구 25종 및 Skills 구축',
    stack: ['Python', 'MCP', 'Agent Skills', 'HWPX(XML)'],
  },
  {
    problem: 'AI의 완료 주장 대신 사람이 근거를 검증하는 AI‑native SDLC',
    period: '2026.09 — 현재',
    team: '개인 프로젝트',
    outcome: '모르는 영역을 명시(unknown)하고 실행 증거와 설명(Explain)을 대조하는 검증 체계 구축',
    stack: ['Agent Skills', 'Codex', 'Verification Core', 'SQLite'],
  },
  {
    problem: '비용·속도·성능 조건에 맞춘 최적 LLM 라우팅 및 단일 규격 중계',
    period: '2025.04 — 2025.10',
    team: '2인 팀',
    outcome: '자체 GPU 환경 전환으로 상용 API 비용 절감 · 약 3주간 안정적 사내 베타 운영',
    stack: ['Java', 'Spring Boot', 'LangChain4j', 'Ollama', 'WebSocket'],
  },
];
// Exact substrings of the existing copy; presentation does not change project facts.
export const projectHighlights = {
  FOWOCO: '공식 모음집과 매칭',
  'HWPX Document Plugin': '확인된 값만 반영',
  OwnHands: '사람이 직접 검증하고',
  'LLM Gateway Service': '최적 모델을 선별',
};
