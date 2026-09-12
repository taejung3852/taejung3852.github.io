export { profile, projects } from '../../content/portfolio';
export const projectSlugs = ['fowoco', 'hwpx', 'ownhands', 'llm-gateway'];
export const homeProjectStories = [
  { problem: '다양한 표현으로 들어오는 문의를 어떻게 검색할 것인가?', decision: '검색 입력을 재구성하고, 키워드와 의미로 찾은 후보를 결합·선별하는 흐름을 설계했습니다.', context: '팀 프로젝트' },
  { problem: 'AI가 문서의 빈칸을 추측해서 채우지 않게 하려면?', decision: '사용자에게 값과 공란의 의도를 확인하고, 편집 계획을 승인한 뒤 적용하도록 도구와 작업 절차를 나눴습니다.', context: '2인 팀 프로젝트' },
  { problem: 'AI의 완료 보고를 무엇을 근거로 판단할 것인가?', decision: '완료 조건과 검증 근거를 연결하고, 사람이 결과를 검토해 최종 판단하는 흐름을 개발하고 있습니다.', context: '개인 프로젝트 · 개발 중' },
  { problem: '사용 조건에 적합한 LLM을 선택하고 연결하는 서비스', decision: '모델마다 API와 실행 환경이 달라, 선택한 모델이 실제 응답으로 이어지도록 연결하는 데 초점을 맞췄습니다.', context: '팀 프로젝트 · 2025' },
];

// Exact substrings of the existing copy; presentation does not change project facts.
export const projectHighlights = {
  FOWOCO: 'Language Assistant',
  'HWPX Document Plugin': '사용자에게 확인한 값',
  OwnHands: '사람이 이해하고 검증하며 최종 판단',
  'LLM Gateway Service': '사용 조건에 맞춰 선택',
};
