export const profile = {
  name: '박태정',
  phone: '010-8373-3852',
  email: 'taejung3852@gmail.com',
  github: 'https://github.com/taejung3852',
  headline: ['AI의 작업을 통제하고,', '결과를 검증합니다.'],
  description: ['AI가 만든 결과를 직접 이해하고 설명할 수 있도록 검증하며,', '최종 결과에 책임지는 개발자입니다.'],
  role: ['AI Agent /', 'LLM Application Developer'],
};

export const projects = [
  {
    name: 'FOWOCO',
    summary: '외국인 근로자의 모호한 질문을 공식 모음집과 매칭하고, 확인된 정보만 서식 도구로 전달하는 Language Assistant.',
    role: 'Language Assistant 설계·구현 · EPS 모음집 검색 파이프라인 · HWPX MCP 도구 분리',
    status: '구현 근거 확인 · 8인 팀 프로젝트',
    href: 'https://github.com/fowoco/ai',
    linkLabel: '저장소 보기',
    visualTitle: '핵심 정보를 지키는 검색 흐름',
    steps: [
      ['검색 관점 구성', '핵심 정보 누락 검사'],
      ['Dense 검색 검증', '단일 Dense 99% 적중'],
      ['아키텍처 회고', '파이프라인 과잉 설계 단순화'],
    ],
  },
  {
    name: 'HWPX Document Plugin',
    summary: '공문서(HWPX)의 구조와 화면 속 입력칸을 함께 살피고, 입력값 확인과 승인 절차를 거쳐 문서를 편집하는 Agent Plugin.',
    role: 'MCP 도구 25종 및 Agent Skills 설계·구현 · 양식 분석 및 확인·편집 체계 구축',
    status: '2인 팀 프로젝트 · MCP와 Skills 구현',
    href: 'https://github.com/taejung3852/hwpx-document-plugin',
    linkLabel: '저장소 보기',
    visualTitle: '입력값과 위치를 확인하며 문서를 채우는 과정',
    steps: [
      ['양식 분석', 'XML 구조와 렌더 위치'],
      ['사용자 확인', '입력값과 공란의 의도'],
      ['계획 → 승인 → 편집', '변경 후 검증'],
    ],
  },
  {
    name: 'OwnHands',
    summary: 'AI가 만든 코드의 의도와 실행 근거를 남겨 사람이 검토하고 다음 행동을 결정하도록 돕는 개발 도구.',
    role: '',
    status: '개인 프로젝트 · 핵심 흐름 구현, 실제 프로젝트 검증 준비 중',
    href: 'https://github.com/taejung3852/OwnHands',
    linkLabel: '저장소 보기',
    visualTitle: '실행 근거를 확인하고 사람이 다음 행동을 결정합니다',
    steps: [
      ['Intent → Spec → Plan', '작업 의도와 기준선 선언'],
      ['Fresh Evidence & Verifier', '실행 근거와 기준 대조'],
      ['Human Gate & Feedback', '사람의 검토와 피드백 기록'],
    ],
  },
  {
    name: 'LLM Gateway Service',
    summary: '비용·속도·성능·문맥 길이에 설정한 가중치를 적용해 모델을 선택하고, 서로 다른 모델의 호출 방식을 하나로 묶은 서비스.',
    role: '모델 메타데이터·성능 가중치 연동 · Provider 어댑터·스트리밍 구현 · 인프라 전환(AWS → 자체 GPU)',
    status: '2인 팀 프로젝트 · 약 3주간 사내 베타 운영',
    href: 'https://github.com/taejung3852/llm-gateway',
    linkLabel: '저장소 보기',
    visualTitle: '단계에 맞춰 실행 환경을 선택',
    steps: [
      ['SageMaker JumpStart', 'POC의 연동 가능성 확인'],
      ['Ollama + 보유 GPU', '베타 실행 환경'],
      ['REST + SSE', '현재 다시 설계한다면'],
    ],
  },
];
