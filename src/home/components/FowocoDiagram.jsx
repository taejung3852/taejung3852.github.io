import React from 'react';
export default function FowocoDiagram(){return (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1320 600" role="img" aria-labelledby="fowoco-overview-title fowoco-overview-desc">
<title id="fowoco-overview-title">FOWOCO 서비스 개념 구조와 Language Assistant 확대</title>
<desc id="fowoco-overview-desc">왼쪽에 검증 전인 Client, Backend와 DB, Agent의 개념 관계를 표시하고 오른쪽에 Language Assistant의 고정 검색 관점, 핵심 정보 검사, 검색 결합, 재정렬을 확대합니다. 확대 연결선은 데이터 흐름이 아닙니다.</desc>
<defs><marker id="fowoco-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto"><path d="M0 0L8 4L0 8" fill="var(--muted)"/></marker></defs>


<g opacity=".64">
<text x="24" y="48" fontSize="24" fontWeight="600">서비스 전체</text><text x="24" y="80" className="sub">개념 구조 · 연결 검증 전</text>
<path d="M144 204V244" className="edge"/><path d="M144 348V388" className="edge"/>
<rect className="box" x="24" y="112" width="240" height="92" rx="8"/><text x="48" y="168" className="name">Client</text>
<rect className="box" x="24" y="252" width="240" height="96" rx="8"/><text x="48" y="308" fontSize="28" fontWeight="600">Backend · DB</text>
</g>
<rect x="24" y="396" width="240" height="108" rx="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2"/><text x="48" y="440" className="name">Agent</text><text x="48" y="476" className="sub">이번 화면의 초점</text>

<path d="M264 448H300Q308 448 308 440V192Q308 184 316 184H352" fill="none" stroke="var(--muted)" strokeWidth="2" strokeDasharray="6 6"/>
<rect x="352" y="24" width="944" height="540" rx="8" fill="var(--surface)" stroke="var(--rule)" strokeWidth="2"/>
<text x="392" y="76" className="sub">AGENT 확대 · 검색 부분</text>
<text x="392" y="128" fontSize="40" fontWeight="650">Language Assistant</text>
<text x="392" y="168" className="sub">기존 조사 초안 기준 · 구현 사실 재대조 전</text>
<path d="M784 276H816" className="edge"/><path d="M1040 340V384" className="edge"/><path d="M824 460H792" className="edge"/>
<rect x="392" y="212" width="392" height="128" rx="8" fill="var(--bg)" stroke="var(--ink)" strokeWidth="2"/>
<text x="420" y="260" className="name">검색 관점 구성</text><text x="420" y="300" className="sub">고정 관점 · 핵심 정보 누락 검사</text>
<rect x="824" y="212" width="432" height="128" rx="8" className="box"/>
<text x="852" y="260" className="name">Hybrid Search</text><text x="852" y="300" className="sub">Dense + Sparse 검색</text>
<rect x="824" y="392" width="432" height="128" rx="8" className="box"/>
<text x="852" y="440" className="name">검색 순위 결합</text><text x="852" y="480" className="sub">2단계 RRF</text>
<rect x="392" y="392" width="392" height="128" rx="8" className="box"/>
<text x="420" y="440" className="name">최종 후보 선별</text><text x="420" y="480" className="sub">Re-ranking · 실패 시 fallback</text>
<text x="24" y="588" fontSize="16" fill="var(--muted)">점선: 확대 관계   ·   실선: 검색 처리 순서   ·   서비스 전체는 개념 표현</text>
</svg>);}
