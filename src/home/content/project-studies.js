const evidenceNote='Narrative Skeleton · README 기반 구성안. 구현 사실·개인 기여·실행 결과는 코드와 PR 대조 후 확정합니다.';
export const projectStudies={
 hwpx:{name:'HWPX Document Plugin',kind:'hwpx',headline:['양식의 구조를 읽고,','확인한 값만 반영합니다.'],intro:'문서 분석부터 편집 계획과 검증까지, 사람이 확인할 지점을 나누어 보여줍니다.',source:'https://github.com/taejung3852/hwpx-document-plugin/blob/16e3a3985831fd67fa6290223ab405f7e4261fb3/README.md',note:evidenceNote,overviewLabels:['양식 분석','편집 계획 · 승인','수정본 검증'],
 scenes:[
 {title:['어디에 쓸지,','먼저 찾습니다.'],text:'문단·표·셀의 구조와 화면상의 위치를 함께 살펴보는 장면입니다.',visual:'hwpx-fields',state:'README 기술 · 구현 대조 전',caption:'문서와 셀은 설명용 예시 · 실제 양식과 입력값은 추후 반영'},
 {title:['바로 바꾸기 전에,','계획을 확인합니다.'],text:'입력값과 수정 위치를 편집 계획으로 모으고, 승인과 적용을 구분합니다.',visual:'hwpx-plan',state:'README 기술 · 구현 대조 전',caption:'승인 영수증·원본 보존 흐름은 코드 및 관련 PR 대조 예정'},
 {title:['값을 넣은 뒤에도,','문서를 다시 봅니다.'],text:'원본과 수정본을 비교해 구조 변화와 화면상의 배치를 검토하는 장면입니다.',visual:'hwpx-compare',state:'README 기술 · 구현 대조 전',caption:'실제 검증 이미지·PASS 결과·레이아웃 오류 사례는 아직 미첨부'}
 ],evidence:[['자료 확인','고정 커밋의 README에서 분석·Plan·승인·검증 흐름을 확인했습니다.'],['대조할 근거','구현 코드·PR·개인 기여 범위와 실제 문서 수정 전후를 연결할 예정입니다.'],['미확인','문서별 성공률과 작업 시간 개선은 수치로 주장하지 않습니다.']]},
 ownhands:{name:'OwnHands',kind:'ownhands',headline:['AI가 남긴 작업을,','내가 판단할 수 있도록.'],intro:'작업의 변화와 근거를 함께 놓고, 사람이 검토할 수 있는 흐름을 구성합니다.',source:'https://github.com/taejung3852/OwnHands/blob/779b5568c38a154b4dc7b55818e806a5e53639f0/README.md',note:evidenceNote,overviewLabels:['작업 기록','근거 확인','사람의 판단'],
 scenes:[
 {title:['무엇을 했는지,','기록부터 살핍니다.'],text:'작업에서 발생한 Event와 Evidence를 분리해 보는 구성입니다.',visual:'ownhands-events',state:'in progress · README 기반',caption:'현재 README 명칭은 DevHarness · M1 산출물을 기반으로 한 설명용 도식'},
 {title:['판단의 옆에는,','근거가 있어야 합니다.'],text:'Evidence의 식별자·해시·범위와 판정을 함께 확인하는 검토 화면을 구상합니다.',visual:'ownhands-evidence',state:'in progress · 구현 대조 전',caption:'실제 Evidence 내용과 값은 사용하지 않은 템플릿'},
 {title:['마지막 결정은,','사람이 내립니다.'],text:'변경 사항과 검증 범위를 읽은 뒤 사람이 판단을 남기는 제품 방향입니다.',visual:'ownhands-decision',state:'future concept · UI 구성안',caption:'완성된 Production UI 또는 현재 구현된 승인 기능을 뜻하지 않습니다.'}
 ],evidence:[['현재 자료','README는 DevHarness의 M1 review artifact를 설명합니다. Production UI는 아닙니다.'],['개발 범위','Lifecycle·Claim 검증의 구체적인 구현 범위는 코드·Issue·PR 대조 예정입니다.'],['추후 확인','실행 검증과 사용성 결과, 사람의 판단 기록 사례는 아직 반영하지 않았습니다.']]},
 'llm-gateway':{name:'LLM Gateway Service',kind:'gateway',headline:['서로 다른 모델을,','하나의 서비스 안에서.'],intro:'모델 연결과 실행 환경을 나누어 보고, 당시 선택과 지금의 회고를 구분합니다.',source:'https://github.com/taejung3852/llm-gateway/blob/fc82bbce0e04934be88684fe2fd400271998a346/README.md',note:evidenceNote,overviewLabels:['서비스 요청','모델 연결','실행 환경'],
 scenes:[
 {title:['공급자가 달라도,','서비스에서 연결합니다.'],text:'여러 LLM 공급자와 로컬 모델을 서비스 내부에서 연결하는 구조를 보여줍니다.',visual:'gateway-providers',state:'README 기술 · 구현 대조 전',caption:'Spring Boot·LangChain4j 연결 구조의 세부 구현과 개인 기여는 대조 예정'},
 {title:['실행 환경도,','선택의 일부입니다.'],text:'SageMaker 구성과 Ollama 구성을 분리하고, 전환 당시의 조건을 정리할 자리입니다.',visual:'gateway-runtime',state:'observed at the time · 당시 기록 대조 전',caption:'현재 README: SageMaker 비활성, Ollama 구성 · 전환 시점과 이유는 추후 확인'},
 {title:['다시 설계한다면,','통신의 역할부터.'],text:'REST와 SSE로 요청과 응답 전달을 나누어 보는 회고입니다.',visual:'gateway-retro',state:'retrospective · future concept',caption:'현재 구현 아님 · 현재 README의 실시간 채팅은 WebSocket/STOMP 기반'}
 ],evidence:[['문서 확인','고정 커밋 README에서 공급자 통합과 실행 환경 구성을 확인했습니다.'],['역할 구분','팀 구현과 개인의 Provider 연동·실행 환경 기여는 코드·PR로 대조할 예정입니다.'],['회고 구분','REST/SSE는 재설계 구상입니다. 비용 절감률·응답 속도 개선은 미확인입니다.']]}
};
