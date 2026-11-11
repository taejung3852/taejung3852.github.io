export { profile, projects } from '../../content/portfolio';
export const projectSlugs = ['fowoco', 'hwpx', 'ownhands', 'llm-gateway'];
// Main projects are cards that read goal → what I did → result without opening the detail page.
// `did` is [keyword, what that work actually was]: the keyword is what a screener's eye lands on.
// Every fact here also appears on the project's detail page; keep the two in step.
// `under: slug` nests a project inside that card; `more: true` lists it as a link under the cards.
export const homeProjectStories = [
  {
    period: '2026.06 — 2026.08',
    team: '8인 팀',
    goal: 'E-9 외국인 근로자의 구어체·오타 섞인 질문을 공식 EPS 외국어 모음집의 표현과 연결하고, 확인된 정보만 행정 서식에 기입',
    did: [
      ['EPS 모음집 검색 파이프라인 설계·구현', '질의를 세 관점으로 나눠 Dense + BM25 하이브리드 검색, RRF와 Re-ranking 결합'],
      ['검색 구성 4종 벤치마크', '단일 Dense부터 멀티쿼리 + Re-ranking까지 포함 비율과 지연 시간 측정'],
      ['HWPX 서식 기입 기능을 MCP 도구로 분리', '확인된 정보만 양식 칸에 넣고, 누락된 값은 추측 없이 빈칸 유지'],
    ],
    metrics: [
      ['99%', '단일 Dense 검색의 상위 5개 포함 비율'],
      ['60 → 390ms', '멀티쿼리·Re-ranking을 더했을 때의 지연 시간'],
    ],
    outcome: '검색 단계를 더해도 포함 비율은 1%p 오르고 지연은 6.5배 → 먼저 측정하고 필요한 단계만 추가하는 기준 도출',
    stack: ['Python', 'LangGraph', 'Qdrant', 'Hybrid Search', 'MCP'],
  },
  {
    under: 'fowoco',
    period: '2026.07 — 현재',
    team: '2인 팀',
    goal: 'FOWOCO의 내부 문서 함수를 독립시켜, 범용 에이전트가 공문서(HWPX)를 확인받고 채우는 플러그인으로 확장',
    did: [
      ['MCP 도구 25종 설계·구현', '문서 가져오기 · 분석 · 확인 · 편집 · 검증'],
      ['시각적 확인·승인 절차', '값을 넣을 칸을 박스로 보여주고 승인받은 계획만 적용'],
      ['플러그인 패키징', 'plugin.json 하나로 Claude Code · Codex에 연동'],
    ],
    metrics: [
      ['25종', 'MCP 도구'],
      ['5종', 'Agent Skills'],
    ],
    outcome: '같은 서식에서 ChatGPT 웹은 기존 문구를 삭제했고 플러그인은 유지 · 요청하지 않은 서명란·공용란 쓰기 계획은 거절',
  },
  { more: true, period: '2026.09 — 현재', team: '개인 프로젝트' },
  {
    period: '2025.04 — 2025.10',
    team: '2인 팀',
    goal: '비용·속도·성능·문맥 길이가 다른 여러 LLM 중 요청에 맞는 모델을 골라, 하나의 규격으로 호출',
    did: [
      ['모델 메타데이터 정리', '비용 · 속도 · 성능 · 문맥 길이에 가중치를 적용해 모델 선택'],
      ['Provider 어댑터 구현', 'LangChain4j에서 바로 쓸 수 없던 Gemma 연결, 모델별 요청·응답 형식 통일'],
      ['응답 스트리밍', '생성된 토큰을 WebSocket으로 바로 전달'],
      ['인프라 전환', 'AWS SageMaker JumpStart로 확인한 뒤 보유 GPU · Ollama로 이전'],
    ],
    metrics: [
      ['4종', '모델 선택 기준'],
      ['약 3주', '베타 운영'],
    ],
    outcome: '보유 GPU 서버로 옮겨 외부 클라우드 인스턴스 사용료 제거 · 다시 구현한다면 답변 스트리밍은 SSE로 단순화',
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
