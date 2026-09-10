import React,{useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {fowoco} from '../content/fowoco';
import FowocoDiagram from './FowocoDiagram';
import '../styles/study.css';
import '../styles/diagram.css';
gsap.registerPlugin(ScrollTrigger);
const descriptions=[
 '요청 목적·자료·기한·제출 방법을 유지하며, 세 가지 고정 질의를 구성합니다.',
 'Dense와 Sparse의 검색 결과를 결합하고, 질의별 후보를 다시 모읍니다.',
 '결합한 후보를 재정렬해 참조 문맥을 선택합니다. 재정렬 실패 시에는 RRF 순위를 사용합니다.'
];
function DetailVisual({step}){
 if(step===0)return <div className="fact-composition scene-object"><div className="fact-paper"><span className="visual-caption">요청에 담긴 핵심 정보</span>{['요청 목적','요청 자료','기한','제출 방법'].map(t=><div className="fact-field" key={t}><span>{t}</span><i/></div>)}</div><div className="query-stack">{['canonical','reason_items','action_deadline'].map((t,i)=><div className="query-sheet" key={t}><small>질의 0{i+1}</small><strong>{t}</strong><div className="paper-rules"><i/><i/></div></div>)}</div><p className="visual-foot">요청값 불일치 또는 보호 토큰 누락 시 질의 생성 거부</p></div>;
 if(step===1)return <div className="retrieval-composition scene-object"><div className="search-lanes">{['Dense','Sparse'].map((t,i)=><div className="search-lane" key={t}><span className="visual-caption">{t}</span><div className="document-fan">{[0,1,2].map(n=><div className="mini-document" key={n} style={{'--tilt':`${(n-1)*9}deg`}}><div className="paper-rules"><i/><i/><i/><i/></div></div>)}</div></div>)}</div><div className="merged-documents"><span className="visual-caption">RRF · 후보 순위 결합</span>{[0,1,2,3].map(n=><div className="rank-paper" key={n}><span>0{n+1}</span><div className="paper-rules"><i/><i/></div></div>)}</div><p className="visual-foot">문서 모양과 나열 순서는 처리 과정을 설명하기 위한 도식입니다.</p></div>;
 return <div className="selection-composition scene-object"><div className="candidate-stack"><span className="visual-caption">재정렬 대상</span><strong>최대 <b>30</b>개</strong><div className="candidate-grid">{Array.from({length:30},(_,i)=><i key={i}/>)}</div></div><div className="selected-stack"><span className="visual-caption">반환할 참조 문맥</span>{[0,1,2,3,4].map(n=><div className="rank-paper" key={n}><span>0{n+1}</span><div className="paper-rules"><i/><i/></div></div>)}</div><p className="visual-foot">실패 시 RRF 상위 5개 선택 · 개수는 성능 지표가 아닌 코드의 선택 한도</p></div>
}
export default function FowocoStudy(){
 const root=useRef(null);
 useEffect(()=>{document.title='FOWOCO | 박태정';document.documentElement.classList.add('fowoco-reading');const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference) and (min-width: 901px)',()=>{
 const ctx=gsap.context(()=>{gsap.utils.toArray('.detail-scene').forEach(scene=>{gsap.fromTo(scene.querySelector('.scene-object'),{y:90,scale:.94},{y:0,scale:1,ease:'power2.out',scrollTrigger:{trigger:scene,start:'top 85%',end:'top 10%',scrub:.45}});});},root);return()=>ctx.revert();});return()=>{media.revert();document.documentElement.classList.remove('fowoco-reading');document.title='박태정 | AI Agent / LLM Application Developer'}},[]);
 return <div ref={root} className="study">
 <section className="study-scene overview-scene" aria-labelledby="search-title"><div className="scene-inner">
 <div className="study-nav"><Link to="/#projects">← 주요 프로젝트</Link></div>
 <header className="overview-heading"><div><p className="study-label">FOWOCO · Language Assistant</p><h1 id="search-title">표현은 달라도,<br/><span>요청의 핵심은 남도록.</span></h1></div><p className="study-intro">검색 관점을 고정하고 핵심 정보 누락을 검사한 뒤,<br/>서로 다른 검색 결과를 결합합니다.</p></header>
 <figure className="study-diagram fowoco-overview"><FowocoDiagram/></figure>
 </div></section>
 {fowoco.decisions.map((d,i)=><section className="study-scene detail-scene" aria-labelledby={`decision-${i}`} key={d.title}><div className="scene-inner detail-inner"><header><p className="study-label">0{i+1} / 검색 설계 · implemented</p><h2 id={`decision-${i}`}>{d.title}</h2><p className="study-intro">{descriptions[i]}</p><a className="source-link" href={d.href} target="_blank" rel="noreferrer">구현 코드 ↗</a></header><DetailVisual step={i}/></div></section>)}
 <section className="study-scene detail-scene" id="evidence" aria-labelledby="evidence-title"><div className="scene-inner detail-inner"><header><p className="study-label">04 / Evidence · 확인 범위</p><h2 id="evidence-title">구현한 구조와<br/><span>검증한 효과를<br/>구분합니다.</span></h2><p className="study-intro">코드가 있다는 사실만으로 검색 품질의 향상을 말할 수는 없습니다.</p></header><div className="evidence-composition scene-object"><div className="evidence-boundary"><span>구현</span><b>≠</b><span>효과 검증</span></div><div className="scope-list">{fowoco.scope.map((s,i)=><article className="scope-item" key={s.title}><div><span className="scope-state">{i===0?'implemented':i===1?'observed at the time · 원문 재확인 필요':'미확인'}</span><h3>{s.title}</h3></div><p>{s.text}</p>{s.href&&<a className="source-link" href={s.href} target="_blank" rel="noreferrer">코드 확인 ↗</a>}</article>)}</div><p className="visual-foot">고정 커밋 코드 확인 · 현재 실행·성능 및 개인 기여 범위는 별도 검증 필요</p></div></div></section>
 </div>
}
