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
 '요청 목적·자료·기한·제출 방법을 보존한 채, 배치만 달리한 세 가지 고정 질의를 만듭니다. 요청값이 어긋나거나 보호 토큰이 빠지면 질의 생성 자체를 거부합니다.',
 '질의 하나마다 Dense와 Sparse를 각각 40개까지 찾아 RRF로 합치고, 그렇게 만든 세 랭킹을 다시 RRF로 결합합니다. 결합은 두 층에서 일어납니다.',
 '결합한 상위 30개를 재정렬해 참조 문맥 5개를 선택합니다. 재정렬이 실패하면 degraded로 표시하고 RRF 순위 상위 5개를 사용합니다.'
];
function DetailVisual({step}){
 if(step===0)return <div className="fact-composition scene-object"><div className="fact-paper"><span className="visual-caption">요청에 담긴 핵심 정보</span>{['요청 목적','요청 자료','기한','제출 방법'].map(t=><div className="fact-field" key={t}><span>{t}</span><i/></div>)}</div><div className="query-stack">{['canonical','reason_items','action_deadline'].map((t,i)=><div className="query-sheet" key={t}><small>질의 0{i+1}</small><strong>{t}</strong><div className="paper-rules"><i/><i/></div></div>)}</div><p className="visual-foot">네 값은 세 질의 모두에 남고 순서만 바뀝니다 · 요청값 불일치 또는 보호 토큰 누락 시 질의 생성 거부</p></div>;
 if(step===1)return <div className="retrieval-composition scene-object"><div className="fusion-layer"><span className="visual-caption">질의 1개 안에서 · Dense + Sparse</span><div className="search-lanes">{['Dense 40','Sparse 40'].map(t=><div className="search-lane" key={t}><span className="lane-label">{t}</span><div className="document-fan">{[0,1,2].map(n=><div className="mini-document" key={n} style={{'--tilt':`${(n-1)*9}deg`}}><div className="paper-rules"><i/><i/><i/><i/></div></div>)}</div></div>)}</div><p className="fusion-note">RRF → 질의별 상위 30</p></div><div className="fusion-layer"><span className="visual-caption">세 질의 사이에서</span><div className="merged-documents">{[0,1,2,3].map(n=><div className="rank-paper" key={n}><span>0{n+1}</span><div className="paper-rules"><i/><i/></div></div>)}</div><p className="fusion-note">RRF k=60 · 가중치 1 : 1 : 1 → 상위 30</p></div><p className="visual-foot">문서 모양과 나열 순서는 처리 과정을 설명하기 위한 도식입니다.</p></div>;
 return <div className="selection-composition scene-object"><div className="candidate-stack"><span className="visual-caption">재정렬 대상</span><strong>최대 <b>30</b>개</strong><div className="candidate-grid">{Array.from({length:30},(_,i)=><i key={i}/>)}</div></div><div className="selected-stack"><span className="visual-caption">반환할 참조 문맥</span>{[0,1,2,3,4].map(n=><div className="rank-paper" key={n}><span>0{n+1}</span><div className="paper-rules"><i/><i/></div></div>)}</div><p className="visual-foot">재정렬 실패 시 RRF 상위 5개 선택 · 개수는 성능 지표가 아닌 코드의 선택 한도</p></div>
}
export default function FowocoStudy(){
 const root=useRef(null);
 useEffect(()=>{document.title='FOWOCO | 박태정';document.documentElement.classList.add('fowoco-reading');const header=document.querySelector('.site-header');const measure=()=>document.documentElement.style.setProperty('--study-header-height',`${header?.getBoundingClientRect().height||98}px`);measure();const observer=new ResizeObserver(measure);if(header)observer.observe(header);const media=gsap.matchMedia();media.add('(prefers-reduced-motion: no-preference) and (min-width: 901px)',()=>{
 const ctx=gsap.context(()=>{gsap.utils.toArray('.detail-scene').forEach(scene=>{gsap.fromTo(scene.querySelector('.scene-object'),{y:90,scale:.94},{y:0,scale:1,ease:'power2.out',scrollTrigger:{trigger:scene,start:'top 85%',end:'top 10%',scrub:.45}});});},root);return()=>ctx.revert();});return()=>{media.revert();observer.disconnect();document.documentElement.style.removeProperty('--study-header-height');document.documentElement.classList.remove('fowoco-reading');document.title='박태정 | AI Agent / LLM Application Developer'}},[]);
 return <div ref={root} className="study">
 <section className="study-scene overview-scene" aria-labelledby="project-title"><div className="scene-inner">
 <div className="study-nav"><Link to="/#projects">← 주요 프로젝트</Link></div>
 <header className="overview-heading">
  <div className="overview-identity">
   <h1 id="project-title">{fowoco.title}</h1>
   <p className="overview-purpose">{fowoco.purpose}</p>
  </div>
  <dl className="overview-facts">
   <div><dt>내 역할</dt><dd><span className="overview-team">{fowoco.role.team}</span><ul>{fowoco.role.items.map(t=><li key={t}>{t}</li>)}</ul></dd></div>
   <div><dt>핵심 판단</dt><dd><ul>{fowoco.judgements.map(t=><li key={t}>{t}</li>)}</ul></dd></div>
  </dl>
 </header>
 <nav className="overview-toc" aria-label="이 페이지의 구획">{fowoco.toc.map(t=><a href={t.href} key={t.href}>{t.label}</a>)}</nav>
 <figure className="study-diagram fowoco-overview"><FowocoDiagram/></figure>
 </div></section>
 <section className="study-scene search-scene" id="search" aria-labelledby="search-title"><div className="scene-inner">
  <header className="search-heading"><p className="study-label">검색 설계</p><h2 id="search-title">{fowoco.searchTitle[0]}<br/><span>{fowoco.searchTitle[1]}</span></h2><p className="study-intro">{fowoco.searchIntro}</p></header>
 </div></section>
 {fowoco.decisions.map((d,i)=><section className="study-scene detail-scene" aria-labelledby={`decision-${i}`} key={d.title}><div className="scene-inner detail-inner"><header><p className="study-label">0{i+1} / 검색 설계 · implemented</p><h2 id={`decision-${i}`}>{d.title}</h2><p className="study-intro">{descriptions[i]}</p><a className="source-link" href={d.href} target="_blank" rel="noreferrer">구현 코드 ↗</a></header><DetailVisual step={i}/></div></section>)}

 <section className="study-scene detail-scene" id="separation" aria-labelledby="separation-title"><div className="scene-inner detail-inner">
  <header><p className="study-label">{fowoco.separation.label}</p><h2 id="separation-title">{fowoco.separation.title[0]}<br/><span>{fowoco.separation.title[1]}</span></h2><p className="study-intro">{fowoco.separation.statement}</p></header>
  <div className="boundary-composition scene-object">
   <p className="visual-caption">개념도 · 책임 경계</p>
   <div className="boundary-sides">{fowoco.separation.sides.map(side=><article className="boundary-side" key={side.owner}>
    <h3>{side.owner}</h3><code className="boundary-path">{side.where}</code>
    <ul>{side.items.map(t=><li key={t}>{t}</li>)}</ul>
    <a className="source-link" href={side.href} target="_blank" rel="noreferrer">코드 확인 ↗</a>
   </article>)}</div>
   <p className="boundary-tools-label">MCP가 노출하는 문서 도구</p>
   <ul className="boundary-tools">{fowoco.separation.tools.map(t=><li key={t}><code>{t}</code></li>)}</ul>
   <p className="visual-foot">{fowoco.separation.note}</p>
  </div>
 </div></section>
 <section className="study-scene detail-scene" id="collaboration" aria-labelledby="collaboration-title"><div className="scene-inner detail-inner">
  <header><p className="study-label">{fowoco.collaboration.label}</p><h2 id="collaboration-title">{fowoco.collaboration.title[0]}<br/><span>{fowoco.collaboration.title[1]}</span></h2><p className="study-intro">{fowoco.collaboration.statement}</p></header>
  <div className="collaboration-composition scene-object">
   <ol className="collaboration-steps">{fowoco.collaboration.steps.map(st=><li key={st.phase}><span className="collaboration-phase">{st.phase}</span><p>{st.text}</p></li>)}</ol>
   <p className="visual-foot">{fowoco.collaboration.note}</p>
  </div>
 </div></section>
 <section className="study-scene evidence-scene" id="evidence" aria-labelledby="evidence-title"><div className="scene-inner detail-inner"><header><p className="study-label">Evidence · 확인 범위</p><h2 id="evidence-title">구현한 구조와<br/><span>검증한 효과를<br/>구분합니다.</span></h2><p className="study-intro">코드가 있다는 사실만으로 검색 품질의 향상을 말할 수는 없습니다.</p><aside className="retrospective"><h3>{fowoco.retrospective.title}</h3><p>{fowoco.retrospective.text}</p></aside></header><div className="evidence-composition"><div className="evidence-boundary"><span>구현</span><b>≠</b><span>효과 검증</span></div><div className="scope-list">{fowoco.scope.map(s=><article className="scope-item" key={s.title}><div><span className="scope-state">{s.state}</span><h3>{s.title}</h3></div><p>{s.text}</p>{s.href&&<a className="source-link" href={s.href} target="_blank" rel="noreferrer">코드 확인 ↗</a>}</article>)}</div><p className="visual-foot">고정 커밋 코드 확인 · 현재 실행·성능 및 개인 기여 범위는 별도 검증 필요</p></div></div><footer className="study-footer"><Link className="study-next-link" to="/projects/hwpx">다음 프로젝트 · HWPX Document Plugin <span aria-hidden="true">→</span></Link><div className="study-footer-utils"><Link to="/#projects">← 주요 프로젝트</Link><a href="/documents/taejung-resume.pdf" download>이력서 다운로드 <span aria-hidden="true">↗</span></a></div></footer></section>
 </div>
}
