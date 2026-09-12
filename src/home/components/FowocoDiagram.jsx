import React from 'react';

const Lines = ({x,y,width=90}) => <g className="paper-lines"><path d={`M${x} ${y}h${width}m-${width} 14h${width*.74}m-${width*.74} 14h${width*.9}`}/></g>;
function Document({x,y,rotate=0,active=false}){return <g transform={`translate(${x} ${y}) rotate(${rotate})`}><path className={active?'paper selected':'paper'} d="M0 0H76L100 24V138H0Z"/><path className="detail-line" d="M76 0V24H100"/><rect className="ink-block" x="15" y="25" width="28" height="7" rx="2"/><Lines x={15} y={52} width={68}/><Lines x={15} y={102} width={48}/></g>}
export default function FowocoDiagram(){return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 660" role="img" aria-labelledby="fw-title fw-desc">
<title id="fw-title">서비스에서 Language Assistant 검색 내부로</title><desc id="fw-desc">서비스 화면, 서버와 저장소를 배경에 두고 Agent 검색 영역을 확대합니다. 세 질의가 문서 후보를 검색하고 재정렬한 뒤 최대 다섯 문맥을 선택합니다. 화면과 문서 모양은 설명용 도식입니다.</desc>
<defs><linearGradient id="fw-depth" x1="0" x2="1"><stop stopColor="var(--rule)" stopOpacity=".05"/><stop offset="1" stopColor="var(--rule)" stopOpacity=".5"/></linearGradient><marker id="fw-tip" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L8 4L0 8" fill="var(--muted)"/></marker></defs>
<g className="service-backdrop">
<text x="24" y="35" className="eyebrow">FOWOCO · 서비스 맥락</text>
<g transform="translate(26 74) rotate(-4 120 95)"><rect className="device" width="255" height="164" rx="12"/><path className="detail-line" d="M0 28H255"/><circle className="dot" cx="15" cy="14" r="3"/><circle className="dot" cx="27" cy="14" r="3"/><circle className="dot" cx="39" cy="14" r="3"/><rect className="soft-block" x="14" y="42" width="42" height="105" rx="3"/><rect className="soft-block" x="72" y="48" width="153" height="29" rx="8"/><path className="detail-line" d="M85 59h94M85 67h65"/><rect className="bubble" x="96" y="90" width="142" height="39" rx="8"/><path className="detail-line" d="M109 104h100M109 114h68"/><path className="device" d="M-15 164H270L285 177H-30Z"/></g>
<text x="35" y="290" className="object-label">Client</text>
<path className="context-link" d="M147 308V339"/>
<g transform="translate(35 350)"><rect className="device" width="134" height="39" rx="5"/><rect className="device" y="47" width="134" height="39" rx="5"/><path className="detail-line" d="M16 14h62M16 25h42M16 61h62M16 72h42"/><circle className="dot" cx="113" cy="20" r="4"/><circle className="dot" cx="113" cy="66" r="4"/>
<g transform="translate(172 2)"><path className="device" d="M0 12V68C0 85 78 85 78 68V12Z"/><ellipse className="device" cx="39" cy="12" rx="39" ry="12"/><path className="detail-line" d="M0 39C0 55 78 55 78 39M0 59C0 75 78 75 78 59"/></g></g>
<text x="35" y="475" className="object-label">Backend</text><text x="226" y="475" className="object-label">DB</text>
<path className="context-link" d="M147 491V520"/>
</g>
<path fill="url(#fw-depth)" d="M290 541L435 82V602L290 604Z"/>
<g transform="translate(66 530)"><rect className="agent-chip" width="224" height="76" rx="12"/><path className="detail-line" d="M-8 20h8m-8 18h8m-8 18h8M224 20h8m-8 18h8m-8 18h8"/><text x="26" y="33" className="object-label">Agent</text><text x="26" y="57" className="tiny">Language Assistant</text></g>
<rect className="workspace-depth" x="451" y="95" width="1122" height="526" rx="18"/>
<rect className="workspace" x="435" y="79" width="1122" height="526" rx="18"/>
<text x="471" y="127" className="workspace-title">Language Assistant</text><text x="1519" y="125" textAnchor="end" className="eyebrow">검색 영역 확대</text><path className="separator" d="M471 152H1519"/>
<text x="475" y="199" className="stage-label">01  질의 구성</text><text x="821" y="199" className="stage-label">02  문서 검색 · 결합</text><text x="1190" y="199" className="stage-label">03  재정렬 · 선택</text>
<g transform="translate(484 250) rotate(-7 110 90)"><rect className="paper" width="225" height="62" rx="7"/><text x="18" y="37" className="query-label">목적 · 요청 자료</text></g>
<g transform="translate(489 323) rotate(-2 110 30)"><rect className="paper" width="225" height="62" rx="7"/><text x="18" y="37" className="query-label">기한 · 제출 방법</text></g>
<g transform="translate(484 400) rotate(5 110 30)"><rect className="paper selected" width="225" height="62" rx="7"/><text x="18" y="37" className="query-label">핵심 정보 보존</text></g>
<path className="flow-link" d="M742 351H792"/>
<Document x={842} y={244} rotate={-12}/><Document x={911} y={227} rotate={3}/><Document x={981} y={260} rotate={12}/>
<g transform="translate(840 415)"><rect className="search-pill" width="110" height="35" rx="17"/><text x="55" y="24" textAnchor="middle" className="tiny">Dense</text><rect className="search-pill" x="121" width="110" height="35" rx="17"/><text x="176" y="24" textAnchor="middle" className="tiny">Sparse</text></g>
<path className="flow-link" d="M1102 351H1150"/>
<g transform="translate(1188 234)">{[0,1,2,3,4].map(i=><g key={i} transform={`translate(${i*3} ${i*44})`}><rect className={i===0?'result-sheet selected':'result-sheet'} width="278" height="38" rx="5"/><text x="14" y="26" className="rank-number">0{i+1}</text><path className="detail-line" d="M52 14h170M52 24h118"/><circle className="rank-dot" cx="256" cy="19" r="4"/></g>)}</g>
<text x="475" y="524" className="object-label">고정 질의 3개</text><text x="821" y="524" className="object-label">검색 결과를 하나로</text><text x="1190" y="524" className="object-label">최대 5개 문맥 반환</text>
<text x="475" y="555" className="tiny">입력의 핵심 사실을 유지</text><text x="821" y="555" className="tiny">RRF로 후보 순위 결합</text><text x="1190" y="555" className="tiny">최대 30개 후보를 재정렬</text>
<text x="24" y="647" className="tiny">서비스 연결·화면은 설명용 도식</text><text x="435" y="647" className="tiny">검색 내부: implemented · 재정렬 실패 시 RRF 상위 5개 선택</text>
</svg>}
