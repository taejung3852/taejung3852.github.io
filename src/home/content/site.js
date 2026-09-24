export { profile, projects } from '../../content/portfolio';
export const projectSlugs = ['fowoco', 'hwpx', 'ownhands', 'llm-gateway'];
export const homeProjectStories = [
  {
    problem: '모호한 자연어 질문을 한국산업인력공단 공식 외국어 모음집으로 연결하는 검색 설계',
    period: '2026.06 — 2026.08',
    team: '8인 팀',
    outcome: '단일 Dense 검색 Hit@5 99% 확인 · 복잡한 검색의 지연 증가(60→390ms)를 측정하고 단순화 방향 도출',
    stack: ['Python', 'LangGraph', 'Qdrant', 'Hybrid Search', 'MCP'],
  },
  {
    problem: '공문서 편집 중 확인되지 않은 값이나 잘못된 위치에 입력할 위험',
    period: '2026.07 — 현재',
    team: '2인 팀',
    outcome: '문서 구조와 화면 배치를 함께 분석하고 승인 기반 편집·검증 흐름 구축 · MCP 도구 25종 구현',
    stack: ['Python', 'MCP', 'Agent Skills', 'HWPX(XML)'],
  },
  {
    problem: 'AI가 코드를 만든 뒤 요구사항 충족과 테스트 실행 여부를 확인하기 어려운 문제',
    period: '2026.09 — 현재',
    team: '개인 프로젝트',
    outcome: '핵심 작업 흐름과 설치 CLI 구현 · 첫 실제 프로젝트의 전체 흐름 검증 준비 중',
    stack: ['Codex', 'Git Native', 'Agent Skills', 'Continuous Evals'],
  },
  {
    problem: '비용·속도·성능 조건에 맞는 LLM 선택과 서로 다른 호출 방식의 통합',
    period: '2025.04 — 2025.10',
    team: '2인 팀',
    outcome: '자체 GPU 환경으로 옮겨 외부 API 비용 절감 · 약 3주간 사내 베타 운영',
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
