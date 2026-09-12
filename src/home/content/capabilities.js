// Capability summary shown on the home page. Each entry links to the projects that evidence it.
export const capabilities = {
  title: '구현 경험과 설계 역량',
  introduction: '맡을 수 있는 일을 세 가지로 정리했습니다. 숙련도 점수나 운영 성과가 아니라, 실제로 구현하고 판단한 범위입니다.',
  principle: '기술 자체보다 필요한 이유와 한계, 사람이 확인할 지점을 기준으로 설계합니다.',
  items: [
    {
      title: '업무 맥락에 맞는 AI 기능 구현',
      description: '도메인 표현을 검색 근거로 연결하고, 서로 다른 LLM을 서비스 흐름에 연동한 경험이 있습니다.',
      projects: ['fowoco', 'llm-gateway'],
    },
    {
      title: '문서 처리의 도구화와 책임 분리',
      description: '문서 분석·편집 기능을 MCP로 분리하고, Agent가 따라야 할 작업 절차를 Skills로 구성했습니다.',
      projects: ['hwpx', 'fowoco'],
    },
    {
      title: 'AI 작업의 검토 기준 구조화',
      description: '완료 조건과 검증 근거, 사람의 최종 판단을 연결하는 흐름을 설계하며 OwnHands를 개발하고 있습니다.',
      projects: ['ownhands'],
    },
  ],
};
