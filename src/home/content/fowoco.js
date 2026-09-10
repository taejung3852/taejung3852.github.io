const base='https://github.com/fowoco/ai/blob/209ebddf3878f750c37e5ebe5651b0fe6aa0a354';
export const fowoco={
 title:'FOWOCO',
 decisions:[
  {title:'요청의 핵심을 보존',text:'고정 검색 관점과 Protected Facts 검사',href:base+'/app/agents/language/queries.py'},
  {title:'서로 다른 검색 결과를 결합',text:'Dense · Sparse 검색, 2단계 RRF',href:base+'/app/agents/language/retrieval/service.py'},
  {title:'최종 후보를 선별',text:'Re-ranking과 실패 시 fallback',href:base+'/app/agents/language/retrieval/service.py'}
 ],
 scope:[{title:'구현 구조',state:'코드 근거',text:'고정 질의, 핵심 정보 검사, 검색 결합과 fallback',href:base+'/app/agents/language/retrieval/service.py'},
 {title:'실행과 테스트',state:'과거 보고',text:'2026년 8월 PR의 실행·테스트 보고. 현재 재실행 결과는 없음.'},
 {title:'실사용 품질',state:'미확인',text:'언어별 사용자 품질과 검색 정확도 개선율은 별도 검증이 필요.'}]
};
