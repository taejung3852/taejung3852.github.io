export { profile, projects } from '../../content/portfolio';
export const projectSlugs = ['fowoco', 'hwpx', 'ownhands', 'llm-gateway'];
// Main projects are cards that read goal → what I did → result without opening the detail page.
// `did` is [keyword, what that work actually was]: the keyword is what a screener's eye lands on.
// Every fact here also appears on the project's detail page; keep the two in step.
// `under: slug` folds a project into that card: a `did` row whose third element is its slug links to it; `more: true` lists it as a link under the cards.
export const homeProjectStories = [
  {
    period: '2026.06 — 2026.08',
    team: '8인 팀',
    goal: 'E-9 외국인 근로자의 구어체·오타 섞인 질문을 공식 EPS 외국어 모음집의 표현과 연결하고, 확인된 정보만 행정 서식에 기입',
    did: [
      ['EPS 모음집 검색 파이프라인 설계·구현', '질의를 세 관점으로 나눠 Dense + BM25 하이브리드 검색, RRF와 Re-ranking 결합'],
      ['검색 구성 4종 벤치마크', '단일 Dense부터 멀티쿼리 + Re-ranking까지 포함 비율과 지연 시간 측정'],
      ['HWPX 서식 기입 기능을 MCP 플러그인으로 분리', 'MCP 도구 25종 · Agent Skills 5종, 입력 위치를 확인·승인받은 값만 반영', 'hwpx'],
    ],
    metrics: [
      ['99%', '단일 Dense 검색의 상위 5개 포함 비율'],
      ['60 → 390ms', '멀티쿼리·Re-ranking을 더했을 때의 지연 시간'],
    ],
    outcome: '검색 단계를 더해도 포함 비율은 1%p 오르고 지연은 6.5배 · 먼저 측정하고 필요한 단계만 추가하는 기준 도출',
    stack: ['Python', 'LangGraph', 'Qdrant', 'Hybrid Search', 'MCP'],
  },
  { under: 'fowoco' },
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
      ['50종', '선택 대상 LLM'],
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
