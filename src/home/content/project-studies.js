export const projectStudies={
 ownhands:{
  name:'OwnHands',kind:'ownhands',
  purpose:'AI의 완료 선언과 사람이 승인할 수 있는 상태를 구분하고, 작업의 근거를 사람이 판단할 수 있게 연결하는 도구',
  role:{team:'개인 프로젝트',items:['제품 방향 설계','검증 Core 설계·개발','Issue 기반 검증 흐름 설계·개발']},
  judgements:['완료 선언과 승인 가능 상태를 분리','확보한 근거 범위 안에서만 Claim 생성','마지막 판단은 사람이 내리도록 남김'],
  toc:[{label:'이름과 단계',href:'#naming'},{label:'검증 흐름',href:'#lifecycle'},{label:'검토 산출물',href:'#artifact'},{label:'사람의 판단',href:'#decision'},{label:'결과·근거',href:'#evidence'}],
  headline:['AI가 남긴 작업을,','내가 판단할 수 있도록.'],
  intro:'작업의 변화와 근거를 함께 놓고, 사람이 검토할 수 있는 흐름을 구성합니다.',
  source:'https://github.com/taejung3852/OwnHands/blob/779b5568c38a154b4dc7b55818e806a5e53639f0/README.md',
  note:'개발이 진행 중인 프로젝트입니다. 아래는 제품 방향과 현재 실행해 보일 수 있는 범위를 구분해 적은 것이며, 저장소의 중간 상태를 완성된 기능으로 제시하지 않습니다.',
  figureNote:'제품 방향 도식 · 완성된 제품 화면이 아님',
  overviewLabels:['작업 기록','근거 확인','사람의 판단'],
  scenes:[
   {id:'naming',title:['이름은 OwnHands,','패키지는 DevHarness.'],
    text:'포트폴리오에서 쓰는 제품 이름과 저장소·Python 패키지 이름이 다릅니다. 같은 프로젝트이며, 초기 마일스톤에서 쓰던 이름이 코드에 남아 있는 상태입니다.',
    visual:'ownhands-naming',state:'명칭 정리',
    caption:'이름이 다르다는 이유로 다른 프로젝트로 읽히지 않도록 먼저 적습니다'},
   {id:'lifecycle',title:['완료했다는 말과,','승인할 수 있는 상태.'],
    text:'AI가 끝났다고 말하는 것과 사람이 승인할 수 있는 상태는 다릅니다. 그 간격을 메우기 위해 Issue에서 시작해 사람의 결정으로 끝나는 흐름을 설계하고 있습니다.',
    visual:'ownhands-lifecycle',state:'제품 방향',
    caption:'여섯 단계는 설계한 흐름입니다 · 단계별 구현 상태는 아래 결과·근거에 적었습니다'},
   {id:'artifact',title:['근거의 범위를,','보고서에 남깁니다.'],
    text:'합성 fixture를 입력으로 검토 산출물을 만듭니다. Raw Evidence는 로컬 경계에 남고, 보고서에는 Evidence ID·hash·확인 범위·판정만 들어갑니다.',
    visual:'ownhands-evidence',state:'M1 검토 산출물 · 현재 실행 가능',
    caption:'이 산출물은 M1 review artifact이며 Production UI가 아닙니다'},
   {id:'decision',title:['보고서가 끝이','아니라 시작입니다.'],
    text:'보고서는 무엇을 말할 수 있고 무엇은 추가 확인이 필요한지까지만 보여줍니다. 승인할지 말지는 사람이 정합니다.',
    visual:'ownhands-decision',state:'구성안',
    caption:'판단 기록 UI는 구성안입니다 · 현재 저장 기능은 확인되지 않았습니다'}
  ],
  lifecycleSteps:['Issue','Verification Spec','Baseline','Implementation','Review','Human Decision'],
  naming:[['포트폴리오 이름','OwnHands'],['저장소 · Python 패키지','DevHarness'],['진행 단계','M1 이후 계속 진행 중']],
  next:{label:'LLM Gateway Service',href:'/projects/llm-gateway'},
  retrospective:{title:'지금 말할 수 있는 범위',
   text:'오늘 실행해 보여줄 수 있는 것은 합성 fixture로 검토 산출물을 만드는 데까지입니다. 새 Lifecycle과 Claim 검증은 개발 중이고, 그 실행을 근거로 제시할 수 있게 되면 이 구획을 실제 산출물로 교체할 예정입니다.'},
  evidence:[
   ['현재 실행 가능','합성 fixture를 읽어 Evidence를 저장하고 Claim·범위·판정을 담은 검토 산출물을 생성하는 흐름.'],
   ['개발 중','새 Lifecycle과 Claim 검증. 저장소에는 이후 마일스톤 작업이 있으나 완성된 기능으로 제시하지 않습니다.'],
   ['말할 수 없는 것','이 산출물의 생성은 검토 흐름의 실행이지, 대상 문서나 서비스의 품질이 통과했다는 뜻이 아닙니다.']
  ]
 }
};
