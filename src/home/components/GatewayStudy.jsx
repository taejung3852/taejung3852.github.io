import React,{useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/fowoco-editorial.css';
const repo='https://github.com/taejung3852/llm-gateway';
const src=repo+'/blob/b097447c0896589f59d623e68e810354f124d2da/src/main/java/site/gatein/backend';
const commits=[['AWS SageMaker JumpStart 연결 구성','b097447c0896589f59d623e68e810354f124d2da'],['AWS SageMaker JumpStart 연동 비활성화','cbdec737db45b6132156ac6d9e668aabf47560f8'],['Ollama 스트리밍 연결','f26daf703155db4efec78dd8539e81183a918256']];
function Source({href,children='구현 근거'}){return <a className="fw-source" href={href} target="_blank" rel="noreferrer">{children} ↗</a>}
function Heading({n,title,children}){return <header className="fw-heading"><span className="fw-kicker">{n}</span><h2>{title}</h2>{children&&<p>{children}</p>}</header>}
function Facts({items}){return <ul className="fw-facts">{items.map(([k,v],i)=><li key={i}><b>{k}</b><span>{v}</span></li>)}</ul>}
export default function GatewayStudy(){
 const dialog=useRef(null),[shot,setShot]=useState(null);
 const zoom=s=>{setShot(s);dialog.current.showModal()};
 useEffect(()=>{document.title='LLM Gateway Service | 박태정';return()=>{document.title='박태정 | AI Agent / LLM Application Developer'}},[]);
 return <div className="fw-study">
 <dialog ref={dialog} className="fw-dialog" aria-label={shot?.alt||'이미지 크게 보기'} onClick={e=>{if(e.target===e.currentTarget)dialog.current.close()}}>
  <button type="button" className="fw-dialog-close" autoFocus onClick={()=>dialog.current.close()} aria-label="닫기"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  {shot&&<img src={shot.src} alt={shot.alt}/>}
 </dialog>

 <header className="fw-hero">
  <div className="fw-topbar"><Link className="fw-back" to="/#projects">← 주요 프로젝트</Link><span>LLM Gateway Service</span></div>
  <div className="fw-hero-split">
   <div className="fw-hero-copy">
    <p className="fw-kicker">2인 팀 프로젝트</p>
    <h1>사용 조건에 맞는 LLM을<br/>선택하고 연결합니다.</h1>
    <p className="fw-lead">비용·속도·성능·문맥 길이의 중요도를 설정하면, 그 기준에 맞는 모델을 골라 대화하는 서비스.</p>
   </div>
   <figure className="fw-cover">
    <button type="button" className="fw-zoom" aria-label="모델 선택 기준 설정 화면 크게 보기" onClick={()=>zoom({src:'/images/gateway-input.png',alt:'GateIn의 모델 선택 기준 설정 및 질문 입력 화면'})}><img src="/images/gateway-input.png" width="1515" height="1038" alt="GateIn에서 가성비·속도·성능·기억력의 중요도를 조절하고 질문하는 화면" loading="eager"/></button>
    <figcaption>네 가지 중요도를 조절하고 질문을 입력합니다. 누르면 크게 볼 수 있습니다.</figcaption>
   </figure>
  </div>
  <dl className="fw-meta">
   <div><dt>구성</dt><dd>모델 선택 기준 4종 · WebSocket 스트리밍</dd></div>
   <div><dt>담당</dt><dd>모델 호출·스트리밍 연동 · 모델 메타데이터 확장 · 실행 환경 구성</dd></div>
   <div><dt>스택</dt><dd>Java · LangChain4j · AWS SageMaker JumpStart · Ollama · WebSocket</dd></div>
  </dl>
  <nav className="fw-toc" aria-label="상세 페이지 목차"><a href="#integration">모델 연결</a><a href="#runtime">실행 환경</a><a href="#reflection">회고</a></nav>
 </header>

 <section id="integration" className="fw-section">
  <Heading n="01 / 모델 연결" title="서로 다른 모델을, 하나의 호출로 부릅니다."/>
  <Facts items={[
   ['문제','당시 LangChain4j 베타가 일부 오픈소스 모델 연동을 미지원 · 요청·응답 형식이 다른 모델을 붙일 방법이 필요'],
   ['해결','지원하는 연동은 그대로 사용 · 없는 모델은 요청·응답 변환을 직접 구현'],
   ['설계 기준','모델별 차이를 연결 계층에서 흡수 → 서비스는 항상 같은 방식으로 호출'],
   ['확인한 것','개발 당시 인터페이스에서 선택한 모델로 요청이 연결되는 것을 확인'],
  ]}/>
  <figure className="fw-boundary">
   <article><span className="fw-kicker">기존 기능 활용</span><h3>LangChain4j 제공 연동</h3><p>기본 연동을 지원하는 모델</p></article>
   <div className="fw-connection"><span className="fw-connection-label">서비스는 하나의 공통 호출</span><span className="fw-connection-arrow" aria-hidden="true">↔</span></div>
   <article><span className="fw-kicker">직접 구현</span><h3>모델별 요청·응답 변환</h3><p>기본 연동이 없는 모델</p></article>
  </figure>
  <figure className="fw-cover">
   <button type="button" className="fw-zoom" aria-label="채팅 화면 크게 보기" onClick={()=>zoom({src:'/images/gateway-chat.png',alt:'GateIn의 선택된 모델과 생성된 채팅 응답 화면'})}><img src="/images/gateway-chat.png" alt="선택된 모델과 생성된 채팅 응답 화면" loading="lazy"/></button>
   <figcaption>선택된 모델로 응답이 돌아온 화면입니다. 누르면 크게 볼 수 있습니다.</figcaption>
  </figure>
  <div className="fw-proof-links"><Source href={src+'/chat/config/sagemaker/GemmaChatModel.java'}>요청 구성·응답 변환</Source><Source href={src+'/chat/config/models/opensource/GemmaConfig.java'}>모델 등록</Source><Source href={src+'/chat/service/AssistanceService.java'}>모델 이름별 호출</Source></div>
 </section>

 <section id="runtime" className="fw-section">
  <Heading n="02 / 실행 환경" title="검증은 클라우드에서, 운영은 보유 GPU에서."/>
  <Facts items={[
   ['문제','GPU 환경 구축 전에 서비스와 오픈소스 모델의 연결 가능 여부부터 확인 필요'],
   ['먼저 택한 것','AWS SageMaker JumpStart — 비용이 들더라도 바로 띄울 수 있음. 목적은 연동 검증'],
   ['확인 후 전환','클라우드 지출 절감을 위해 보유 GPU에 Ollama 환경 구성'],
   ['결과','베타 서비스 약 3주 운영 · 부분 응답과 완료·오류 이벤트를 WebSocket 전달·저장 흐름에 연결'],
  ]}/>
  <div className="fw-proof-links">
   {commits.map(([label,sha])=><Source key={sha} href={repo+'/commit/'+sha}>{label}</Source>)}
   <Source href={repo+'/commit/22a9c5eac4eec8678fba7ffefe7a09d3f3688d24'}>스트리밍 변경 이력</Source>
  </div>
 </section>

 <section id="reflection" className="fw-section">
  <Heading n="회고" title="응답 스트리밍에, 양방향 연결이 꼭 필요했을까?"/>
  <Facts items={[
   ['당시 선택','실시간 채팅을 구현하려고 WebSocket 채택'],
   ['실제 요구','요청을 한 번 받고, 생성된 응답을 순차적으로 내려보내는 것'],
   ['지금이라면','요청 REST + 응답 SSE 구성을 먼저 검토'],
   ['남는 질문','양방향 연결과 구독 관리가 실제 요구에 비해 과했던 것은 아닌지'],
  ]}/>
  <p className="fw-note">SSE 전환이나 비교 실험을 수행한 것은 아닙니다. 당시 구현을 돌아본 재설계 방향입니다.</p>
 </section>

 <footer className="fw-footer"><Link to="/#projects">← 주요 프로젝트</Link><Link to="/projects/fowoco">다음 프로젝트 · FOWOCO →</Link></footer>
 </div>
}
