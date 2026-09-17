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
      title: '표현이 달라도 같은 근거를 찾아냅니다.',
      description: 'E-9 HR 문의에 쓰이는 도메인 표현을 **검색 근거**로 연결하고, 서로 다른 LLM을 **하나의 서비스 흐름**에 연동했습니다. 100개 질문 기준 상위 5개 안에서의 검색 성공을 **72건에서 93건**으로 끌어올렸습니다.',
      projects: ['fowoco', 'llm-gateway'],
    },
    {
      title: '도구가 할 수 있는 일을 좁게 고정합니다.',
      description: '문서 분석·편집을 **MCP 도구**로 떼어내, 만든 서비스 밖의 클라이언트에서도 같은 기능을 붙일 수 있게 했습니다. **대표 양식 1건**에 대해 읽기부터 편집까지의 흐름을 실행했습니다.',
      projects: ['fowoco', 'hwpx'],
    },
    {
      title: '고친 자리를 원본과 대조해 확인합니다.',
      description: '**확인받은 자리만** 편집하고 결과를 원본과 **셀 단위로 대조**합니다. **157셀 대조에서 차이 8셀**을 확인했고, 호출 순서는 **Agent Skills**로 고정했습니다. 확보한 근거 범위 안에서만 판단을 남기는 흐름은 OwnHands에서 설계 중입니다.',
      projects: ['hwpx', 'ownhands'],
    },
  ],
};
