import React,{useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/fowoco-editorial.css';
const base='https://github.com/fowoco/ai/blob/209ebddf3878f750c37e5ebe5651b0fe6aa0a354';
// Synthetic demonstration data; not the recorded FOWOCO benchmark.
const rows=[['단일 Dense','72 / 100','0.61','60'],['단일 Hybrid','81 / 100','0.70','80'],['멀티쿼리 Hybrid','89 / 100','0.77','120'],['멀티쿼리 Hybrid + Re-ranking','93 / 100','0.86','390']];
function Source({href,children='구현 근거'}){return <a className="fw-source" href={href} target="_blank" rel="noreferrer">{children} ↗</a>}
function Heading({n,title,children}){return <header className="fw-heading"><span className="fw-kicker">{n}</span><h2>{title}</h2>{children&&<p>{children}</p>}</header>}
function Facts({items}){return <ul className="fw-facts">{items.map(([k,v],i)=><li key={i}><b>{k}</b><span>{v}</span></li>)}</ul>}
export default function FowocoStudy(){
 const dialog=useRef(null),[shot,setShot]=useState(null);
 const zoom=s=>{setShot(s);dialog.current.showModal()};
 useEffect(()=>{document.title='FOWOCO | 박태정';return()=>{document.title='박태정 | AI Agent / LLM Application Developer'}},[]);
 return <div className="fw-study">
 <dialog ref={dialog} className="fw-dialog" aria-label={shot?.alt||'이미지 크게 보기'} onClick={e=>{if(e.target===e.currentTarget)dialog.current.close()}}>
  <button type="button" className="fw-dialog-close" autoFocus onClick={()=>dialog.current.close()} aria-label="닫기"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  {shot&&<img src={shot.src} alt={shot.alt}/>}
 </dialog>

 <header className="fw-hero">
  <div className="fw-topbar"><Link className="fw-back" to="/#projects">← 주요 프로젝트</Link><span>FOWOCO</span></div>
  <div className="fw-hero-split">
   <div className="fw-hero-copy">
    <p className="fw-kicker">8인 팀 프로젝트 · 시연 완료</p>
    <h1>외국인 근로자 행정업무를<br/>문서 준비부터 소통까지.</h1>
    <p className="fw-lead">E-9 외국인 근로자를 고용하는 제조업 HR 담당자를 위한 AI 업무보조 플랫폼. 업무 요청을 분석해 문서와 다국어 안내를 준비하고, 담당자 승인과 근로자 응답으로 연결합니다.</p>
   </div>
   <figure className="fw-demo">
    <video controls playsInline preload="metadata" poster="/images/fowoco-demo-poster.jpg" aria-label="FOWOCO 서비스 시연 2분 35초"><source src="/videos/fowoco-demo.mp4" type="video/mp4"/>브라우저에서 영상을 재생할 수 없습니다. <a href="/videos/fowoco-demo.mp4">시연 영상 다운로드</a></video>
    <figcaption><strong>서비스 시연 · 2분 35초</strong><span>체류기간 연장 준비 — 업무 요청 · 담당자 승인 · 근로자 서류 제출 · 누락 정보 보완</span></figcaption>
   </figure>
  </div>
  <dl className="fw-meta">
   <div><dt>구성</dt><dd>LangGraph 기반 에이전트 워크플로 · EPS Hybrid Search</dd></div>
   <div><dt>담당</dt><dd>Language Assistant 설계·구현 · HWPX 문서 자동화 및 MCP 구현 · 팀 협업 조율</dd></div>
   <div><dt>스택</dt><dd>Python · LangGraph · Hybrid Search · MCP</dd></div>
  </dl>
  <nav className="fw-toc" aria-label="상세 페이지 목차"><a href="#scope">담당 범위</a><a href="#search">문제와 검색 설계</a><a href="#evidence">검색 비교</a><a href="#easy">정보 보존</a><a href="#separation">문서 자동화</a><a href="#collaboration">협업</a></nav>
 </header>

 <section id="scope" className="fw-section">
  <Heading n="00 / 담당 범위" title="언어 처리와 문서 자동화를 맡았습니다."/>
  <figure className="fw-scope">
   <div className="fw-scope-flow">
    <div className="fw-scope-stage"><span>HR 담당자</span><h3>업무 요청</h3><p>자연어 입력 · 기한 확인</p></div>
    <div className="fw-scope-stage"><span>팀 구현</span><h3>요청 분석·업무 조율</h3><p>의도 분석 · 정보 조회 · 실행 순서</p></div>
    <div className="fw-scope-owned"><span className="fw-scope-label">박태정 담당</span>
     <article><h3>언어 처리</h3><p>EPS 검색 · 안내 생성 · 정보 보존 검사</p></article>
     <article><h3>문서 자동화</h3><p>HWPX 필드 매핑 · 문서 도구 분리</p></article>
    </div>
    <div className="fw-scope-stage"><span>팀 구현 · 사용자 확인</span><h3>승인·응답</h3><p>HR 검토 · 근로자 확인 및 서류 제출</p></div>
   </div>
   <figcaption>프론트엔드 · 전체 Supervisor · OCR · 서버 · DB · 인프라는 다른 팀원 담당. 기능 간 연동은 팀과 함께 진행했습니다.</figcaption>
  </figure>
 </section>

 <section id="search" className="fw-section">
  <Heading n="01 / 문제" title="업무 표현을 EPS 대응 자료에서 찾아 쓰기로 했습니다."/>
  <Facts items={[
   ['확인한 경로','프로젝트에 앞선 인터뷰 2회 — 공통으로 언어 장벽이 언급됨'],
   ['판단','동의어·맥락에 기대는 표현은 부담 → 업무 표현을 일정하게 전달하기로'],
   ['쓴 자료',<>한국산업인력공단 <a className="fw-inline-link" href="https://eps.hrdkorea.or.kr/e9/user/about/about.do?method=about" target="_blank" rel="noreferrer">EPS</a>의 한국어·외국어 대응 자료</>],
   ['초기에 겪은 것','적절한 EPS 표현을 못 찾으면 그대로 일반 번역으로 넘어감'],
   ['설계','요청의 여러 정보를 검색 단서로 사용 → 찾은 자료를 번역에 전달'],
  ]}/>

  <Heading n="01-1 / 설계 판단" title="복합 요청의 검색 단서를 나누고, 번역에 쓸 자료를 선별했습니다."/>
  <figure className="fw-pipeline">
   <div className="fw-query"><span className="fw-kicker">업무 안내 → 세 검색 관점</span><div><b>전체 문장</b><b>요청 사유 + 항목</b><b>제출 방법 + 기한</b></div></div>
   <div className="fw-flow">
    <article><span>01</span><h3>Dense + Sparse</h3><p>각 질의의 후보 결합</p><small>각 40개 → RRF → 최대 30개</small></article>
    <article><span>02</span><h3>Cross-query RRF</h3><p>세 질의의 순위 결합</p><small>중복 정리 → 최대 30개</small></article>
    <article><span>03</span><h3>Re-ranking</h3><p>요청과 후보를 다시 비교</p><small>상위 5개 → 번역 참고 자료</small></article>
   </div>
   <figcaption>현재 실행 경로의 개념도. 별도의 LLM Query Rewrite 호출은 없습니다.</figcaption>
  </figure>
  <Facts items={[
   ['멀티쿼리','전체 문장 외에 요청의 부분 정보도 검색 단서로'],
   ['Hybrid Search','정확한 용어 일치 + 의미가 비슷한 표현을 함께'],
   ['Re-ranking','모아진 후보를 요청과 재비교해 참고 자료 선별'],
  ]}/>
  <div className="fw-proof-links"><Source href={base+'/app/agents/language/translation.py'}/></div>
 </section>

 <section id="evidence" className="fw-section">
  <Heading n="02 / 검색 비교" title="검색 품질을 높이는 대신, 응답 시간은 얼마나 늘어나는가?"/>
  <div className="fw-findings">
   <article className="fw-benefit"><span className="fw-kicker">100개 질문 중 필요한 자료를 찾은 질문</span><strong>72 → 93개</strong><h3>검색 성공률 21%p 증가</h3><p>상위 결과 5개 안에 필요한 자료가 하나 이상 포함된 질문 수.</p></article>
   <article className="fw-cost"><span className="fw-kicker">검색 결과를 받기까지</span><strong>60 → 390ms</strong><h3>대기 시간 330ms 증가</h3><p>번역 생성 시간은 제외한 값.</p></article>
  </div>
  <p className="fw-takeaway">EPS 표현을 번역에 쓰겠다는 목적에 맞춰 <strong>21%p를 330ms와 맞바꾸는 쪽</strong>을 택했습니다.</p>
  <div className="fw-table" role="region" aria-label="검색 구성별 비교표" tabIndex="0">
   <table>
    <caption>검색 구성별 비교</caption>
    <thead><tr><th scope="col">검색 구성</th><th scope="col">자료를 찾은 질문 수</th><th scope="col">첫 관련 자료의 순위 점수</th><th scope="col">검색 대기 시간(ms)</th></tr></thead>
    <tbody>{rows.map(r=><tr key={r[0]}>{r.map((v,i)=>i===0?<th scope="row" key={i}>{v}</th>:<td key={i}>{v}</td>)}</tr>)}</tbody>
   </table>
  </div>
 </section>

 <section id="easy" className="fw-section">
  <Heading n="03 / 정보 보존" title="번역이 서류와 기한을 바꾸지 않았는지 검사합니다.">근로자는 안내를 읽고 준비할 서류와 제출 기한을 판단합니다.</Heading>
  <Facts items={[
   ['규칙으로 확인','제출 항목 수 · 날짜 · 숫자·연락처의 누락과 추가를 원본 요청과 비교'],
   ['의미로 확인','요청 사유·제출 항목·제출 방법의 의미 유지 여부를 별도 검사'],
   ['검사 기준','생성된 문장이 아니라 원본 요청 · 검토 필요 여부와 실패 항목을 결과에 포함'],
   ['실패 이후','제한된 횟수·시간 안에서 재작성 → 미해결이면 경고와 담당자 검토 필요 상태 반환'],
   ['쉬운 한국어','용어·규칙·예시를 Context Pack으로 관리해 생성에 전달'],
  ]}/>
  <div className="fw-check-case">
   <span className="fw-kicker">저장소 테스트에 정의한 검사 사례</span>
   <h3>기한이 바뀌거나 서류가 빠진 안내를 구분합니다.</h3>
   <dl>
    <div><dt>원본 요청</dt><dd>체류기간 연장 · 2026년 8월 15일까지<br/>여권 사본 1부 + 근로계약서 사본 1부</dd></div>
    <div><dt>기한 변경 후보</dt><dd>8월 20일로 바뀐 안내 → 날짜 불일치 검사</dd></div>
    <div><dt>서류 누락 후보</dt><dd>여권 사본만 남은 안내 → 제출 항목 수 검사</dd></div>
   </dl>
  </div>
  <div className="fw-proof-links"><Source href={base+'/app/agents/language/validation.py'}>검사·재작성 구현</Source><Source href={base+'/tests/agents/language/test_validation.py'}>날짜·서류 누락 테스트</Source><Source href={base+'/app/agents/language/easy_korean.py'}>쉬운 한국어 Context Pack</Source></div>
 </section>

 <section id="separation" className="fw-section">
  <Heading n="04 / 문서 자동화" title="문서의 각 칸을, 출처가 있는 값으로 채웠습니다."/>
  <Facts items={[
   ['입력값 모으기','회사·근로자 정보 · OCR 추출값 · 담당자 보완값 (OCR·승인 처리는 팀 담당)'],
   ['필드별로 연결','출처별 병합 규칙 적용 후 양식 필드 이름에 매핑 · 값이 없으면 비워 둠'],
   ['문서에 반영','템플릿에 적용 후 생성 상태와 반영된 필드 반환 · 실패는 오류 상태로 구분'],
  ]}/>
  <figure className="fw-document-comparison">
   <div className="fw-document-pair">
    <div><h3>입력 전</h3><button type="button" className="fw-zoom" aria-label="입력 전 문서 크게 보기" onClick={()=>zoom({src:'/images/fowoco-document-before.png',alt:'입력 전 빈 통합신청서'})}><img src="/images/fowoco-document-before.png" alt="입력 전 빈 통합신청서" loading="lazy"/></button></div>
    <div><h3>입력 후</h3><button type="button" className="fw-zoom" aria-label="입력 후 문서 크게 보기" onClick={()=>zoom({src:'/images/fowoco-document-after.png',alt:'근로자 정보와 근무처 등이 채워진 통합신청서'})}><img src="/images/fowoco-document-after.png" alt="근로자 정보와 근무처 등이 채워진 통합신청서" loading="lazy"/></button></div>
   </div>
   <figcaption>통합신청서 입력 전후 · 누르면 크게 볼 수 있습니다.</figcaption>
  </figure>
  <div className="fw-proof-links"><Source href={base+'/app/agents/workflow_graph/document_field_map.py'}>필드 매핑 구현</Source><Source href={base+'/app/agents/workflow_graph/nodes/document_generator.py'}>문서 생성·결과 반환</Source></div>

  <Heading n="04-1 / 문서 도구로 확장" title="문서 기능을 독립적으로 확장하기 위해 MCP로 분리했습니다."/>
  <figure className="fw-boundary">
   <article><span className="fw-kicker">LangGraph 내 문서 담당</span><h3>Agent</h3><p>상태와 작업 순서 판단<br/>문서 작업 요청 · 결과 수용</p></article>
   <div className="fw-connection"><span className="fw-connection-label">문서 작업 요청 / 결과 반환</span><span className="fw-connection-arrow" aria-hidden="true">↔</span></div>
   <article><span className="fw-kicker">독립적으로 확장할 문서 도구</span><h3>HWPX MCP</h3><p>양식 분석 · 편집 계획<br/>승인 · 적용 · 최종화</p></article>
  </figure>
  <Facts items={[
   ['나눈 기준','등록된 양식의 초안 생성은 안에 · 다양한 양식을 다룰 문서 도구는 밖에'],
   ['밖으로 뺀 이유','문서 분석·편집은 이 업무 흐름을 넘어 쓸 수 있는 기능'],
   ['치른 값','연결 관리와 도구 오류 처리'],
  ]}/>
  <div className="fw-proof-links"><Source href="https://github.com/fowoco/ai/tree/fcefe989c2fce4ccea89ec202226ca18a044f280/app/documents/automation">문서 자동화 구현</Source><Link className="fw-source" to="/projects/hwpx">HWPX Document Plugin 프로젝트 보기 →</Link></div>
 </section>

 <section id="collaboration" className="fw-section">
  <Heading n="05 / 팀 협업" title="논점을 정리하며 진행을 돕고, 회의 방식을 바꿨습니다."/>
  <Facts items={[
   ['문제','8인 화상회의에서 발언 기회가 고르지 않음 · 논의를 이끄는 부담이 진행자에게 집중'],
   ['진행 보조','논점이 흐려질 때 나온 의견과 결정할 내용을 다시 정리'],
   ['제안','전체 회의 전 2개 조에서 선논의 → 조장이 정리한 안을 전체 회의로'],
   ['변화','작은 자리에서 의견 수렴 · 전체 회의는 결정에 집중'],
  ]}/>
 </section>

 <footer className="fw-footer"><Link to="/#projects">← 주요 프로젝트</Link><Link to="/projects/hwpx">다음 프로젝트 · HWPX Document Plugin →</Link></footer>
 </div>
}
