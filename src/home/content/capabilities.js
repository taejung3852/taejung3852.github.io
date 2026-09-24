// Capability summary shown on the home page. Each entry links to the projects that evidence it.
// **text** marks a keyword; About.jsx renders those in --ink so the eye has anchors to land on.
// Points are fragments, not sentences: the column is narrow and they are meant to be scanned.
export const capabilities = {
  // Heading claims the three verbs; each card's title is the keyword for one of them.
  // No intro line: the cards answer it faster than a paragraph can.
  title: '에이전트를 만들어 연결하고, 결과를 검증합니다.',
  // Same grouping as the resume; keep the two in step.
  stack: [
    ['언어', ['Python', 'Java', 'SQL']],
    ['AI와 Agent', ['LangGraph', 'LangChain4j', 'MCP', 'Agent Skills', 'Claude Code', 'Codex']],
    ['검색과 데이터', ['Qdrant', 'Hybrid Search', 'Embedding', 'MySQL', 'SQLite']],
    ['LLM 실행', ['Ollama', 'AWS SageMaker JumpStart']],
    ['개발 도구', ['Git', 'GitHub']],
  ],
  items: [
    {
      icon: 'search',
      title: 'RAG 검색 설계',
      points: [
        '모호한 질문을 **공식 외국어 모음집의 표현**과 연결',
        '검색 방식을 비교해 **적중률과 지연 시간** 측정',
        '측정 결과를 바탕으로 **검색 구조의 단순화 방향** 도출',
      ],
      projects: ['fowoco'],
    },
    {
      icon: 'wrench',
      title: 'MCP 도구화',
      points: [
        '문서 편집 기능을 본체에서 **독립된 MCP 도구로 분리**',
        '문서 분석·편집 기능을 나눠 **다른 작업에서도 재사용**',
        '**Claude Code, Codex**에서 쓸 수 있도록 플러그인으로 구성',
      ],
      projects: ['fowoco', 'hwpx'],
    },
    {
      icon: 'check',
      title: 'AI 작업 검증',
      points: [
        '입력값과 위치를 확인한 뒤 **승인을 거쳐 문서에 반영**',
        '확인하지 못한 내용은 **미확인으로 남기고** 실행 근거 기록',
        'AI의 완료 선언과 근거를 대조해 **사람의 판단을 지원**',
      ],
      projects: ['hwpx', 'ownhands'],
    },
  ],
};
