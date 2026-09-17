// Capability summary shown on the home page. Each entry links to the projects that evidence it.
// **text** marks a keyword; About.jsx renders those in --ink so the line has anchors to land on.
export const capabilities = {
  // The heading is the positioning; the three items below are the evidence for it.
  title: '검증할 수 있고, 통제할 수 있는 에이전트.',
  introduction: '문제에 맞는 AI 기능을 고르고, 도구의 책임과 사람이 확인할 지점을 나눠 설계합니다.',
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
      title: '표현이 달라도 같은 근거를 찾아냅니다.',
      description: '같은 내용을 서로 다른 말로 물어도 **같은 문서**를 찾아오도록 질문과 문서를 연결했습니다. 질문 100개로 확인했을 때, 찾아온 상위 5개 안에 맞는 문서가 들어온 경우가 **72건에서 93건**으로 늘었습니다.',
      projects: ['fowoco', 'llm-gateway'],
    },
    {
      icon: 'wrench',
      title: '도구가 할 수 있는 일을 좁게 고정합니다.',
      description: '문서를 읽고 고치는 기능을 서비스 본체에서 떼어내 **독립된 도구**로 만들었습니다. 도구가 맡는 일을 좁게 정해둔 덕분에, 이 서비스가 아닌 **다른 프로그램에 그대로 붙여** 쓸 수 있습니다.',
      projects: ['fowoco', 'hwpx'],
    },
    {
      icon: 'check',
      title: '고친 자리를 원본과 대조해 확인합니다.',
      description: 'AI가 빈칸을 **추측해서 채우지 않도록**, 사람이 확인해 준 자리만 고칩니다. 고친 문서는 원본과 **칸 단위로 맞춰** 보는데, **157칸을 대조해 8칸**에서 차이를 찾아냈습니다.',
      projects: ['hwpx', 'ownhands'],
    },
  ],
};
