import React,{useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {fowoco} from '../content/fowoco';
import '../styles/study.css';
import FowocoDiagram from './FowocoDiagram';
import '../styles/diagram.css';
gsap.registerPlugin(ScrollTrigger);
export default function FowocoStudy(){
 const root=useRef(null);
 useEffect(()=>{document.title='FOWOCO · 본문 시안 | 박태정';const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference)',()=>{
  const ctx=gsap.context(()=>{gsap.utils.toArray('.study-block').forEach(block=>gsap.fromTo(block,{y:48,opacity:.7},{y:0,opacity:1,ease:'none',scrollTrigger:{trigger:block,start:'top 92%',end:'top 55%',scrub:.5}}))},root);
  return()=>ctx.revert();
 });return()=>{media.revert();document.title='박태정 | AI Agent / LLM Application Developer'}},[]);
 return <div ref={root} className="study shell">
 <div className="study-nav"><Link to="/#projects">← 주요 프로젝트</Link><span>FOWOCO · 본문 시안 2장</span><a href="#evidence">근거로 이동</a></div>
 <section className="study-scene" aria-labelledby="search-title">
  <header><p className="study-label">Language Assistant · 검색 설계</p><h1 id="search-title">표현은 달라도,<br/><span>요청의 핵심은 남도록.</span></h1><p className="study-intro">검색 관점을 고정하고 핵심 정보 누락을 검사한 뒤,<br/>서로 다른 검색 결과를 결합합니다.</p></header>
  <div className="study-layout"><figure className="study-diagram fowoco-overview study-block"><FowocoDiagram/><figcaption>서비스 전체는 개념 표현이며, Agent 내부는 기존 조사 초안을 바탕으로 단순화했습니다. 구현 사실·연결·기여 범위는 재대조 전입니다.</figcaption></figure>
  <div className="study-decisions">{fowoco.decisions.map((d,i)=><article className="study-block" key={d.title}><span className="study-step">{String(i+1).padStart(2,'0')}</span><h2>{d.title}</h2><p>{d.text}</p><a href={d.href} target="_blank" rel="noreferrer">관련 코드 ↗</a></article>)}</div></div>
 </section>
 <section className="study-scene study-evidence" id="evidence" aria-labelledby="evidence-title"><header><p className="study-label">Evidence · 확인 범위</p><h2 id="evidence-title">구현한 구조와<br/><span>검증한 효과를 구분합니다.</span></h2></header>
 <div className="evidence-visual"><div className="evidence-boundary study-block"><span>구현</span><div className="boundary-gap" aria-hidden="true">≠</div><span>효과 검증</span><p>코드가 있다는 사실만으로<br/>검색 품질의 향상을 말할 수는 없습니다.</p></div><div className="scope-list">{fowoco.scope.map(s=><article className="scope-item study-block" key={s.title}><div><span className="scope-state">{s.state}</span><h3>{s.title}</h3></div><p>{s.text}</p>{s.href&&<a href={s.href} target="_blank" rel="noreferrer">코드 확인 ↗</a>}</article>)}</div></div>
 <p className="study-source">기존 조사 초안 기준 · 코드 링크는 고정된 커밋을 가리킵니다. 이번 디자인 작업에서 실행·성능을 재검증하지 않았습니다.</p>
 </section></div>
}
