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
    ['AI와 Agent', ['LangGraph', 'LangChain', 'LangChain4j', 'MCP', 'Agent Plugin', 'RAG', 'Tool Calling', 'HITL', 'Structured Output']],
    ['검색과 데이터', ['Qdrant', 'Embedding', 'Hybrid Search', 'Query Rewrite', 'Re-ranking', 'MySQL', 'SQLite']],
    ['LLM 실행', ['Ollama', 'AWS SageMaker JumpStart']],
    ['개발 도구', ['Git', 'GitHub']],
  ],
  items: [
    {
      icon: 'search',
      title: 'RAG 검색 설계',
      points: [
        '같은 내용을 다른 말로 물어도 **같은 문서**를 찾아옵니다',
        '질문 100개 중 상위 5개 안에 맞는 문서가 든 경우 **72건 → 93건**',
        '서로 다른 LLM을 **하나의 흐름**에서 골라 씁니다',
      ],
      projects: ['fowoco', 'llm-gateway'],
    },
    {
      icon: 'wrench',
      title: 'MCP 도구화',
      points: [
        '문서를 읽고 고치는 기능을 서비스 본체에서 **떼어냈습니다**',
        '도구가 맡는 일이 좁게 정해져 있어, 어디서 불러도 **같은 동작**',
        '**Claude Code, Codex** 같은 에이전트에 그대로 붙여 씁니다',
      ],
      projects: ['fowoco', 'hwpx'],
    },
    {
      icon: 'check',
      title: 'AI 작업 검증',
      points: [
        '빈칸을 **추측해서 채우지 않습니다** · 확인받은 자리만 고침',
        '고친 문서를 원본과 **칸 단위**로 대조',
        '**157칸 중 8칸**에서 차이 확인',
      ],
      projects: ['hwpx', 'ownhands'],
    },
  ],
};
