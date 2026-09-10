export const profile = {
 name: '박태정', github: 'https://github.com/taejung3852',
 headline: ['AI의 작업을 통제하고,', '결과를 검증합니다.'],
 description: ['생성물을 이해하고 설명하며', '책임질 수 있는 결과로 만드는 AI-native 개발자.'],
 role: ['AI Agent /', 'LLM Application Developer'],
};
export const projects = [
 { name:'FOWOCO', summary:'외국인 근로자의 다양한 문의를 다루는 Language Assistant를 설계했습니다.', role:'Language Assistant 서브그래프 설계·구현 / HWPX MCP 구현 / 팀 협업 조율', status:'구현 근거 확인 · 실행·테스트는 과거 PR 보고', href:'/projects/fowoco', linkLabel:'사례 보기', visualTitle:'핵심 정보를 지키는 검색 흐름', steps:[['검색 관점 구성','핵심 정보 누락 검사'],['Hybrid Search','Dense + Sparse'],['RRF → Re-ranking','후보 결합과 선별']] },
 { name:'HWPX Document Plugin', summary:'HWPX 양식을 분석하고, 사용자에게 확인한 값으로 편집하는 도구를 만들었습니다.', role:'MCP 전반 설계·구현 / Agent Skills 설계·개발', status:'2인 팀 프로젝트 · MCP와 Skills 구현', href:'https://github.com/taejung3852/hwpx-document-plugin', linkLabel:'저장소 보기', visualTitle:'추측 없이 문서를 채우는 과정', steps:[['양식 분석','XML 구조와 렌더 위치'],['사용자 확인','입력값과 공란의 의도'],['계획 → 승인 → 편집','변경 후 검증']] },
 { name:'OwnHands', summary:'AI가 수행한 작업을 사람이 이해하고 검증하며 최종 판단하는 Human Review 도구를 개발하고 있습니다.', role:'제품 방향 설계 / 검증 Core 및 Issue 기반 검증 흐름 설계·개발', status:'개인 프로젝트 · 새 Lifecycle과 Claim 검증은 개발 중', href:'https://github.com/taejung3852/OwnHands', linkLabel:'저장소 보기', visualTitle:'근거를 확인하고 사람이 판단합니다', steps:[['Understand','무엇이 바뀌었는가'],['Prove','어떤 근거로 확인했는가'],['Decide','사람이 최종 결정']] },
 { name:'LLM Gateway Service', summary:'서로 다른 LLM을 하나의 서비스에서 연결하고, 사용 조건에 맞춰 선택하는 흐름을 구현했습니다.', role:'LLM Provider 연동 / 모델 실행 환경 구성', status:'2025년 프로젝트 · 팀 구현과 개인 기여를 구분', href:'https://github.com/taejung3852/llm-gateway', linkLabel:'저장소 보기', visualTitle:'단계에 맞춰 실행 환경을 선택', steps:[['SageMaker JumpStart','POC의 연동 가능성 확인'],['Ollama + 보유 GPU','베타 실행 환경'],['REST + SSE','현재 다시 설계한다면']] },
];
