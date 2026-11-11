export { profile, projects } from '../../content/portfolio';
export const projectSlugs = ['fowoco', 'hwpx', 'ownhands', 'llm-gateway'];
// Home cards read goal → what I did → result without opening the detail page.
// Every figure here also appears on the project's detail page; keep the two in step.
// An entry with `more: true` is listed as a link under the main cards instead.
export const homeProjectStories = [
  {
    period: '2026.06 — 2026.08',
    team: '8인 팀',
    goal: '외국인 근로자의 비정형 질문을 공식 EPS 외국어 모음집의 표현과 연결하고, 확인된 정보만 행정 서식에 기입',
    did: [
      'EPS 모음집 검색 파이프라인 설계·구현 (Dense + Sparse, RRF, Re-ranking)',
      '검색 구성 4종의 적중률과 지연 시간을 벤치마크',
      '서식 기입 기능을 HWPX MCP 도구로 분리',
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
    goal: 'AI 에이전트가 공문서(HWPX) 서식에서 입력칸을 정확히 찾고, 확인한 값만 채우도록 하기',
    did: [
      '문서를 분석·편집·검증하는 MCP 도구 설계·구현',
      '작업 순서를 안내하는 Agent Skills 작성',
      '입력 위치를 보여주고 승인받은 계획만 적용하는 절차 구현',
      'Claude Code·Codex에서 쓰는 플러그인으로 패키징',
    ],
    metrics: [
      ['25종', 'MCP 도구'],
      ['5종', 'Agent Skills'],
    ],
    outcome: '같은 서식에서 ChatGPT 웹은 기존 문구를 삭제했고 플러그인은 유지 · 요청하지 않은 서명란·공용란 쓰기 계획은 거절',
    stack: ['Python', 'MCP', 'Agent Skills', 'HWPX'],
  },
  {
    more: true,
    period: '2026.09 — 현재',
    team: '개인 프로젝트',
  },
  {
    period: '2025.04 — 2025.10',
    team: '2인 팀',
    goal: '비용·속도·성능·문맥 길이의 가중치에 맞는 LLM을 선택하고, 서로 다른 모델을 같은 방식으로 호출',
    did: [
      'LangChain4j에서 바로 쓸 수 없던 Gemma용 어댑터 구현',
      '생성되는 답변을 WebSocket으로 실시간 전달',
      '실행 환경을 AWS SageMaker JumpStart에서 보유 GPU(Ollama)로 전환',
    ],
    metrics: [
      ['약 3주', '베타 운영'],
      ['4종', '모델 선택 기준'],
    ],
    outcome: '보유 GPU로 전환해 AWS 호스팅 비용 제거',
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
