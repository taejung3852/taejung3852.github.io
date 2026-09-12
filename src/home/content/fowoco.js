const base='https://github.com/fowoco/ai/blob/209ebddf3878f750c37e5ebe5651b0fe6aa0a354';
const retrieval=base+'/app/agents/language/retrieval';
export const fowoco={
 title:'FOWOCO',
 label:'FOWOCO · Language Assistant',
 purpose:'외국인 근로자 HR 업무의 언어·문서 처리를 지원하는 AI 서비스',
 role:{team:'8인 팀',items:['Language Assistant 서브그래프 설계·구현','HWPX MCP 구현','팀 협업 조율']},
 judgements:['요청 정보를 보존하는 검색 구성','문서 처리 책임 분리','팀 의사결정 조율'],
 // Only sections that exist on the page are listed; the remaining scenes are not built yet.
 toc:[{label:'검색 설계',href:'#search'},{label:'문서 처리 분리',href:'#separation'},{label:'협업',href:'#collaboration'},{label:'결과·근거',href:'#evidence'}],
 searchTitle:['표현은 달라도,','요청의 핵심은 남도록.'],
 searchIntro:'검색 관점을 고정하고 핵심 정보 누락을 검사한 뒤, 서로 다른 검색 결과를 결합합니다.',
 decisions:[
  {title:'요청의 핵심을 보존',text:'고정 검색 관점과 Protected Facts 검사',href:base+'/app/agents/language/queries.py'},
  {title:'서로 다른 검색 결과를 결합',text:'Dense · Sparse 검색, 2단계 RRF',href:retrieval+'/fusion.py'},
  {title:'최종 후보를 선별',text:'Re-ranking과 실패 시 fallback',href:retrieval+'/service.py'}
 ],
 separation:{
  label:'문서 처리 책임 분리',
  title:['흐름을 조율하는 쪽과,','문서를 바꾸는 쪽.'],
  statement:'전체 Agent 흐름의 조율과 문서 분석·편집의 책임을 분리하기 위해 HWPX 처리를 MCP 도구 경계로 분리했습니다. Agent는 작업 흐름을 조율하고, 문서 도구는 문서 처리 작업을 담당하도록 구성했습니다.',
  sides:[
   {owner:'Agent 흐름',where:'app/agents/',items:['작업 순서 판단','상태 전이와 분기','도구 호출과 결과 수용'],href:base+'/app/agents/workflow_graph/nodes'},
   {owner:'문서 도구 · MCP',where:'hwp-editor/src/hwp_mcp/',items:['문서 분석과 렌더','편집 계획 수립','승인 후 적용과 전후 비교'],href:base+'/hwp-editor/src/hwp_mcp/server.py'}
  ],
  tools:['analyze_document','render_document','create_edit_plan','approve_edit_plan','apply_edit_plan','compare_document_versions'],
  note:'좌우 배치는 책임 경계를 설명하기 위한 개념도입니다. 실제 경계는 두 패키지 경로와 MCP 도구 목록으로 확인할 수 있습니다. 독립 배포·장애 격리·성능 개선은 이 자료로 말할 수 없습니다.'
 },
 collaboration:{
  label:'협업',
  title:['의견을 모아','하나의 결정으로.'],
  statement:'온라인 8인 협업에서 의견 분산과 소통 누락을 줄이기 위해 \u20182개 조 논의 → 조장 정리 → 전체 합의\u2019 방식을 제안하고 팀의 의사결정 흐름을 조율했습니다.',
  steps:[
   {phase:'상황',text:'온라인 8인 협업에서 의견이 흩어지고 논의 결과가 전달되지 않는 일이 반복됐습니다.'},
   {phase:'행동',text:'전체 논의 대신 2개 조로 나눠 먼저 이야기하고, 조장이 정리한 안을 전체 합의로 올리는 방식을 제안했습니다.'},
   {phase:'구조',text:'2개 조 논의 → 조장 정리 → 전체 합의'}
  ],
  note:'회고와 경험 진술에 근거한 내용입니다. 코드나 지표로 뒷받침되는 항목이 아니며, 의사결정 시간 단축 같은 성과는 측정하지 않았습니다.'
 },
 retrospective:{
  title:'다시 만든다면',
  text:'고정 질의 3종은 표현이 달라져도 요청의 핵심을 지키지만, 질의 다양성은 그만큼 제한됩니다. 검색 폭과 정보 보존 중 어느 쪽이 실제 사용에서 더 문제였는지는 측정하지 않았고, 지금 다시 만든다면 그 측정을 먼저 설계하겠습니다.'
 },
 scope:[
  {title:'구현 구조',state:'코드 근거',text:'고정 질의 3종과 보호 검사, 질의별 Dense·Sparse 결합과 질의간 RRF, 재정렬 실패 경로까지 고정 커밋에서 확인했습니다.',href:retrieval+'/service.py'},
  {title:'실행과 테스트',state:'과거 보고',text:'2026년 8월 PR의 실행·테스트 보고입니다. 현재 재실행 결과는 없습니다.'},
  {title:'실사용 품질',state:'미확인',text:'언어별 사용자 품질과 검색 정확도 개선율은 별도 검증이 필요합니다.'}
 ]
};
