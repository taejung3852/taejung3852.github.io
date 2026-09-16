// Capability summary shown on the home page. Each entry links to the projects that evidence it.
// **text** marks a keyword; About.jsx renders those in --ink so the line has anchors to land on.
export const capabilities = {
  title: '할 수 있는 일',
  introduction: '문제에 맞는 AI 기능을 고르고, 도구의 책임과 사람이 확인할 지점을 나눠 설계합니다.',
  principle: '기술 자체보다 필요한 이유와 한계를 기준으로 설계합니다.',
  // Same grouping as the resume; keep the two in step.
  stack: [
    ['언어', ['Python', 'Java', 'SQL']],
    ['AI와 Agent', ['LangGraph', 'LangChain', 'LangChain4j', 'MCP', 'Agent Plugin', 'RAG', 'Tool Calling', 'Human-in-the-loop', 'Structured Output']],
    ['검색과 데이터', ['Qdrant', 'Embedding', 'Hybrid Search', 'Query Rewrite', 'Re-ranking', 'MySQL', 'SQLite']],
    ['LLM 실행', ['Ollama', 'AWS SageMaker JumpStart']],
    ['개발 도구', ['Git', 'GitHub']],
  ],
  items: [
    {
      title: '업무 맥락에 맞는 AI 기능 구현',
      description: '도메인 표현을 **검색 근거**로 연결하고, 서로 다른 LLM을 **하나의 서비스 흐름**에 연동합니다.',
      projects: ['fowoco', 'llm-gateway'],
    },
    {
      title: '문서 처리의 도구화와 책임 분리',
      description: '문서 분석·편집을 **MCP 도구**로 떼어내, 만든 서비스 밖에서도 붙일 수 있게 했습니다.',
      projects: ['fowoco', 'hwpx'],
    },
    {
      title: 'AI 작업의 검토 기준 구조화',
      description: '**확인받은 자리만** 편집하고 결과를 원본과 **셀 단위로 대조**합니다. 호출 순서는 **Agent Skills**로 고정합니다.',
      projects: ['hwpx', 'ownhands'],
    },
  ],
};
