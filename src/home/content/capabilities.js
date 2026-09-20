// Capability summary shown on the home page. Each entry links to the projects that evidence it.
// **text** marks a keyword; About.jsx renders those in --ink so the eye has anchors to land on.
// Points are fragments, not sentences: the column is narrow and they are meant to be scanned.
export const capabilities = {
  // Heading claims the three verbs; each card's title is the keyword for one of them.
  // No intro line: the cards answer it faster than a paragraph can.
  title: '에이전트를 만들고, 붙이고, 검증합니다.',
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
        '모호한 자연어 질문에서도 **공식 표준 표현**을 정확히 매칭',
        '정량 벤치마크로 파이프라인 과잉 설계를 식별하고 **지연 시간 최적화**',
        '기술적 기교보다 데이터 규모에 맞는 **실용적 아키텍처** 선택',
      ],
      projects: ['fowoco'],
    },
    {
      icon: 'wrench',
      title: 'MCP 도구화',
      points: [
        '문서 편집 기능을 본체에서 **독립된 MCP 도구로 분리**',
        '도구의 역할을 좁고 명확히 정의해 어디서 불러도 **동일한 동작**',
        '**Claude Code, Codex** 등 범용 에이전트에 플러그인으로 즉시 연결',
      ],
      projects: ['fowoco', 'hwpx'],
    },
    {
      icon: 'check',
      title: 'AI 작업 검증',
      points: [
        'AI가 임의로 지어내지 않도록 **확인된 값만 서식에 반영**',
        '사양과 **실행 증거(Logs/Diff)**를 1:1 대조하는 독립 검증 체계',
        'AI의 완료 선언 대신 **사람이 근거를 보고 최종 승인**',
      ],
      projects: ['hwpx', 'ownhands'],
    },
  ],
};
