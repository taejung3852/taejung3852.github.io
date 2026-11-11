export { profile, projects } from '../../content/portfolio';
export const projectSlugs = ['fowoco', 'hwpx', 'ownhands', 'llm-gateway'];
// The two main projects are cards that read goal → what I did → result without opening the detail page.
// `did` is [keyword, short tail]: the keyword is what a screener's eye lands on.
// Every figure here also appears on the project's detail page; keep the two in step.
// An entry with `more: true` is listed as a link under the cards instead.
export const homeProjectStories = [
  {
    period: '2026.06 — 2026.08',
    team: '8인 팀',
    goal: '외국인 근로자의 비정형 질문을 공식 EPS 외국어 모음집의 표현과 연결',
    did: [
      ['검색 파이프라인 설계·구현', '공식 EPS 모음집 기반'],
      ['검색 구성 4종 벤치마크', '적중률·지연 시간 비교'],
      ['MCP 도구 분리', '서식 기입 기능'],
    ],
    metrics: [
      ['99%', '단일 Dense 검색의 상위 5개 포함 비율'],
      ['60 → 390ms', '검색 단계를 더했을 때의 지연 시간'],
    ],
    outcome: '측정 결과를 근거로 검색 구조를 단순화하는 설계 기준 도출',
    stack: ['Python', 'LangGraph', 'Qdrant', 'Hybrid Search', 'MCP'],
  },
  {
    period: '2026.07 — 현재',
    team: '2인 팀',
    goal: 'AI 에이전트가 공문서(HWPX) 서식의 입력칸을 찾아, 확인한 값만 채우게 하기',
    did: [
      ['MCP 도구 설계·구현', '문서 분석·편집·검증'],
      ['승인 기반 편집 절차', '입력 위치를 확인받은 뒤 반영'],
      ['플러그인 패키징', 'Claude Code·Codex 지원'],
    ],
    metrics: [
      ['25종', 'MCP 도구'],
      ['5종', 'Agent Skills'],
    ],
    outcome: '같은 서식에서 ChatGPT 웹은 기존 문구를 삭제했고 플러그인은 유지 · 요청하지 않은 서명란·공용란 쓰기 계획은 거절',
    stack: ['Python', 'MCP', 'Agent Skills', 'HWPX'],
  },
  { more: true, period: '2026.09 — 현재', team: '개인 프로젝트' },
  { more: true, period: '2025.04 — 2025.10', team: '2인 팀' },
];
// Exact substrings of the existing copy; presentation does not change project facts.
export const projectHighlights = {
  FOWOCO: '공식 모음집과 매칭',
  'HWPX Document Plugin': '확인된 값만 반영',
  OwnHands: '사람이 직접 검증하고',
  'LLM Gateway Service': '조건에 맞는 모델을 선택',
};
