import React,{useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/fowoco-editorial.css';
import useTocSpy from './useTocSpy';
import '../styles/hwpx-editorial.css';
const base='https://github.com/taejung3852/hwpx-document-plugin/blob/1a416bca6f35c59856f9b40909337fa443175e42';
const tree='https://github.com/taejung3852/hwpx-document-plugin/tree/1a416bca6f35c59856f9b40909337fa443175e42';
const bands=[['구역 1','신청 종류 선택'],['구역 2','인적사항 · 여권 · 주소 · 근무처'],['구역 3','동의서 · 서명란 · 공용란']];
const mapping=[['체류기간 연장허가','체류기간 연장허가 EXTENSION OF SOJOURN PERIOD'],['NGUYEN','성 Surname'],['VAN AN','명 Given names'],['1995-04-12','생년월일 Date of Birth'],['9504125000000','외국인등록번호 Foreign Resident Registration No.'],['010-0000-0000','휴대전화 Cell phone No.'],['031-000-0000','전화번호 Phone No. — 근무처 행'],['3000','연 소득금액 Annual Income Amount']];
function Source({href,children='구현 근거'}){return <a className="fw-source" href={href} target="_blank" rel="noreferrer">{children} ↗</a>}
function Field({children}){return <span className="hx-field">{children}</span>}
function Heading({n,title,children}){return <header className="fw-heading"><span className="fw-kicker">{n}</span><h2>{title}</h2>{children&&<p>{children}</p>}</header>}
function Facts({items}){return <ul className="fw-facts">{items.map(([k,v],i)=><li key={i}><b>{k}</b><span>{v}</span></li>)}</ul>}
export default function HwpxStudy(){
 useTocSpy();
 const dialog=useRef(null),[shot,setShot]=useState(null);
 const zoom=s=>{setShot(s);dialog.current.showModal()};
 useEffect(()=>{document.title='HWPX Document Plugin | 박태정';return()=>{document.title='박태정 | AI Agent / LLM Application Developer'}},[]);
 return <div className="fw-study">
 <dialog ref={dialog} className="fw-dialog" aria-label={shot?.alt||'이미지 크게 보기'} onClick={e=>{if(e.target===e.currentTarget)dialog.current.close()}}>
  <button type="button" className="fw-dialog-close" autoFocus onClick={()=>dialog.current.close()} aria-label="닫기"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  {shot&&<img src={shot.src} alt={shot.alt}/>}
 </dialog>

 <header className="fw-hero">
  <div className="fw-topbar"><Link className="fw-back" to="/#projects">← 주요 프로젝트</Link><span>HWPX Document Plugin</span></div>
  <div className="fw-hero-split">
   <div className="fw-hero-copy">
    <p className="fw-kicker">2인 팀 프로젝트</p>
    <h1>양식의 구조를 읽고,<br/>확인한 값만 반영합니다.</h1>
    <p className="fw-lead">HWPX 양식을 분석해 어느 칸에 무엇을 쓸지 찾고, 확인받은 값만 그 칸에 반영하는 Agent Plugin.</p>
   </div>
   <figure className="fw-cover"><img src="/images/hwpx-cover.png" alt="HWPX Document Plugin 개요 — 문서의 XML 구조와 그려낸 화면을 연결해 입력칸을 파악하고, 값 확인·승인·편집·검증으로 이어지는 흐름" width="1672" height="941" loading="eager"/></figure>
  </div>
  <dl className="fw-meta">
   <div><dt>구성</dt><dd>MCP 도구 25종 · Agent Skills 5종</dd></div>
   <div><dt>담당</dt><dd>MCP 전반 설계·구현 · Agent Skills 설계·개발 · Plugin 패키징</dd></div>
   <div><dt>스택</dt><dd>Python · FastMCP · Agent Skills · STDIO</dd></div>
  </dl>
 </header>
  <nav className="fw-toc" aria-label="상세 페이지 목차"><a href="#origin">시작</a><a href="#analyze">분석</a><a href="#problem">문제</a><a href="#process">검수</a><a href="#result">결과</a><a href="#compose">구성</a></nav>

 <section id="origin" className="fw-section">
  <Heading n="00 / 시작" title="에이전트가 한글 문서를 다뤄 줄 방법이 없었습니다."/>
  <Facts items={[
   ['빠져 있던 것','Word·PowerPoint·Excel은 에이전트가 열어 고칩니다. 한국 공문서에 가장 많이 쓰는 HWPX만 없었습니다.'],
   ['처음 만든 곳',<>체류 서류가 대부분 HWPX인 <Link className="fw-inline-link" to="/projects/fowoco">FOWOCO</Link>. 처음에는 그 서비스 안의 함수였습니다.</>],
   ['떼어낸 이유','내부 함수로 두면 그 서비스 전용 → MCP 도구로 경계를 긋고 분리'],
  ]}/>
  <p><Link className="fw-source" to="/projects/fowoco">FOWOCO에서의 분리 과정 보기 →</Link></p>
 </section>

 <section id="analyze" className="fw-section">
  <Heading n="01 / 분석" title="한글 파일을 주고, 그대로 고쳐 달라고 했습니다.">빈 통합신청서를 ChatGPT 웹에 올리고, 같은 요청을 두 번 했습니다.</Heading>
  <Facts items={[
   ['첫 번째','외국인등록번호 낱칸 정렬 실패 · 성별 미체크 · 요청하지 않은 예정 근무처와 서명란까지 기입'],
   ['두 번째','낱칸까지 정확 · 성별 체크 · 요청하지 않은 칸 유지'],
  ]}/>
  <div className="hx-shots">
   <figure><span className="fw-kicker">첫 번째 실행</span><div><button type="button" className="fw-zoom" aria-label="첫 번째 실행 결과 크게 보기" onClick={()=>zoom({src:'/images/hwpx-overfill.png',alt:'플러그인 없이 작성된 통합신청서 첫 번째 결과. 외국인등록번호가 작성 칸에 맞지 않게 뭉개져 있고, 성별이 체크되지 않았으며, 서명란에 글자가 들어가 있다.'})}><img src="/images/hwpx-overfill.png" alt="플러그인 없이 작성된 통합신청서 첫 번째 결과" width="1132" height="1596" loading="lazy"/></button></div></figure>
   <figure><span className="fw-kicker">두 번째 실행</span><div><button type="button" className="fw-zoom" aria-label="두 번째 실행 결과 크게 보기" onClick={()=>zoom({src:'/images/hwpx-web-2nd.png',alt:'플러그인 없이 작성된 통합신청서 두 번째 결과. 외국인등록번호가 낱칸에 한 자씩 들어갔고 성별도 체크되어 있다.'})}><img src="/images/hwpx-web-2nd.png" alt="플러그인 없이 작성된 통합신청서 두 번째 결과" width="794" height="1123" loading="lazy"/></button></div></figure>
  </div>
  <p className="fw-note">첫 번째는 다른 값, 두 번째는 04와 같은 값입니다. 누르면 크게 볼 수 있습니다.</p>
  <p className="fw-takeaway">못 한다는 게 아니라, <strong>같은 양식인데 실행마다 결과가 달라진다</strong>는 게 문제였습니다.</p>
  <div className="fw-findings">
   <article className="fw-cost"><span className="fw-kicker">한 번에 맡기면</span><strong>약 1분</strong><h3>대신 매번 같은 결과가 아닙니다</h3><p>잘못 들어간 칸은 다 만들어진 뒤에야 드러납니다.</p></article>
   <article className="fw-benefit"><span className="fw-kicker">확인을 거치면</span><strong>3분 25초</strong><h3>대신 매번 같은 절차를 밟습니다</h3><p>자리 확인 7회 · 편집 계획 20건 · 셀 단위 대조. 사용자 응답 시간을 포함한 실측값.</p></article>
  </div>
 </section>

 <section id="problem" className="fw-section">
  <Heading n="02 / 문제" title="문항은 읽히는데, 답을 쓸 자리가 읽히지 않습니다.">왜 실행마다 달라지는지 보려고 파일을 열었습니다.</Heading>
  <Facts items={[
   ['읽히는 것',<>HWPX = 압축된 XML. <Field>성 Surname</Field> 문구가 놓인 셀은 그대로 조회됩니다.</>],
   ['읽히지 않는 것','그 문항의 답을 쓸 칸. 파일에 없고 사람이 보는 배치로만 드러납니다.'],
   ['같은 문구가 네 곳',<><Field>전화번호 Phone No.</Field>— 주소·학교·원 근무처·예정 근무처에 각 1개. 문구로는 구분 불가.</>],
   ['한 값이 여러 칸','생년월일 3칸 · 외국인등록번호 13칸에 한 자씩 · 한 장에 셀 157개'],
  ]}/>
  <figure className="fw-cover">
   <button type="button" className="fw-zoom" aria-label="빈 원본 양식 크게 보기" onClick={()=>zoom({src:'/images/hwpx-blank-2.png',alt:'빈 통합신청서의 인적사항·주소·근무처 구간. 같은 문구의 전화번호 칸 네 곳이 빨간 사각형으로 표시되어 있다.'})}><img src="/images/hwpx-blank-2.png" alt="빈 통합신청서의 인적사항·주소·근무처 구간. 같은 문구의 전화번호 칸 네 곳이 빨간 사각형으로 표시되어 있다." width="794" height="423" loading="lazy"/></button>
   <figcaption>빨간 사각형 안이 모두 <Field>전화번호 Phone No.</Field>입니다. 누르면 크게 볼 수 있습니다.</figcaption>
  </figure>
 </section>

 <section id="process" className="fw-section">
  <Heading n="03 / 검수" title="값을 쓰기 전에, 에이전트가 사람에게 묻습니다.">자리를 파일에서 정할 수 없다면, 추측하지 말고 확인을 받기로 했습니다.</Heading>
  <Facts items={[
   ['자리를 그림으로','값을 넣을 칸을 파란 박스로 표시 → 아니라고 하면 위치를 고쳐 재확인'],
   ['묶어서 묻기','인적사항·여권·주소·근무처 단위로 묶어 확인 화면 수 축소'],
   ['금지 구역','서명란·공용란에 값을 넣는 계획은 편집 단계에서 거절'],
  ]}/>
  <figure className="fw-cover">
   <button type="button" className="fw-zoom" aria-label="확인 화면 크게 보기" onClick={()=>zoom({src:'/images/hwpx-confirm.png',alt:'통합신청서의 성명·생년월일·성별·국적 칸에 파란 사각형이 표시된 확인용 그림'})}><img src="/images/hwpx-confirm.png" alt="통합신청서의 성명·생년월일·성별·국적 칸에 파란 사각형이 표시된 확인용 그림" width="794" height="143" loading="lazy"/></button>
   <figcaption>입력 전에 실제로 보여준 확인 그림입니다.</figcaption>
  </figure>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/server.py'}>preview_field_section · confirm_visual_candidates</Source><Source href={base+'/src/hwp_mcp/plans.py'}>서명란·공용란 거절 규칙</Source></div>
 </section>

 <section id="result" className="fw-section">
  <Heading n="04 / 결과" title="요청한 값을 각각 지정된 칸에 넣었습니다."><strong>통합신청서</strong> — 출입국관리법 시행규칙 별지 제34호 서식. 입력값은 모두 가상 정보입니다.</Heading>
  <div className="hx-side">
   <div className="fw-table" tabIndex="0" role="region" aria-label="양식의 문항과 입력된 값">
    <table>
     <thead><tr><th scope="col">양식에 적힌 문항</th><th scope="col">입력한 값</th></tr></thead>
     <tbody>{mapping.map(([v,cell])=><tr key={v}><th scope="row">{cell}</th><td>{v}</td></tr>)}</tbody>
    </table>
   </div>
   <figure>
    <button type="button" className="fw-zoom" aria-label="작성된 신청서 크게 보기" onClick={()=>zoom({src:'/images/hwpx-filled.png',alt:'플러그인으로 작성된 통합신청서 한 페이지'})}><img src="/images/hwpx-filled.png" alt="플러그인으로 작성된 통합신청서 한 페이지" width="794" height="1123" loading="lazy"/></button>
    <figcaption>왼쪽 표대로 채워진 결과입니다.</figcaption>
   </figure>
  </div>
  <p className="fw-note">02에서 꼽은 자리도 나뉘었습니다 — <strong>휴대전화와 근무처 전화번호가 각기 다른 행에 들어갔습니다.</strong></p>

  <Heading n="04-1 / 대조" title="웹이 만든 문서와, 셀 단위로 맞춰 봤습니다.">같은 원본에 같은 값을 넣은 두 결과. <strong>157개 중 8개가 다르고 그중 5개는 표기 형식 차이</strong>, 남은 2개가 실제 차이입니다.</Heading>
  <div className="hx-cells-pair">
  <div className="hx-cells">
   <table>
    <caption>신청 종류 체크란 <span>section0.table0.row7.cell0</span></caption>
    <tbody>
     <tr><th scope="row">원본</th><td><code>[  ] 체류기간 연장허가     EXTENSION OF SOJOURN PERIOD</code></td></tr>
     <tr><th scope="row">ChatGPT 웹</th><td><code>[<ins>√</ins>] <del>체류기간 연장허가</del>     EXTENSION OF SOJOURN PERIOD</code></td></tr>
     <tr><th scope="row">플러그인</th><td><code>[<ins>V</ins>] 체류기간 연장허가     EXTENSION OF SOJOURN PERIOD</code></td></tr>
    </tbody>
   </table>
   <p>웹은 체크 표시를 넣으면서 칸에 인쇄돼 있던 문구를 함께 지웠습니다.</p>
  </div>
  <div className="hx-cells">
   <table>
    <caption>연 소득금액 <span>section0.table0.row26</span></caption>
    <thead><tr><th scope="col"></th><th scope="col">단위 라벨 칸 · cell1</th><th scope="col">값을 넣어야 할 칸 · cell2</th></tr></thead>
    <tbody>
     <tr><th scope="row">원본</th><td><code>만원(ten thousand won)</code></td><td className="hx-gone">비어 있음</td></tr>
     <tr><th scope="row">ChatGPT 웹</th><td><code>만원(ten thousand won)</code></td><td><code><ins>3,000</ins></code></td></tr>
     <tr><th scope="row">플러그인</th><td><code><ins>3000</ins> 만원(ten thousand won)</code></td><td className="hx-gone">비어 있음</td></tr>
    </tbody>
   </table>
   <p>플러그인은 값을 입력 칸이 아니라 라벨 칸에 붙였습니다. <strong>이건 이 플러그인의 오류이고, 고쳐야 할 것으로 남아 있습니다.</strong></p>
  </div>
  </div>
  <p className="fw-takeaway">두 오류 모두 눈으로는 찾기 어렵습니다. 셀 단위로 맞춰 봐야 드러납니다.</p>

  <Heading n="04-2 / 구조 보존" title="값을 넣은 뒤에, 문서를 다시 그려서 봅니다."/>
  <Facts items={[
   ['룰 기반 검사','확인된 자리만 변경 · 보호 칸 유지 · 표와 페이지 정렬 · 파일 재개봉'],
   ['이번 실행','편집 계획 20건 → 변경 셀 34개, 기대와 전건 일치'],
   ['이 검사의 한계','기대 일치 = 계획대로 실행됨. 계획이 옳았다는 뜻은 아닙니다 — 위 소득금액이 그 경우'],
  ]}/>
  <div className="hx-bands">
   {bands.map(([label,desc],i)=><figure key={label}><span className="fw-kicker">{label}</span><div><button type="button" className="fw-zoom" aria-label={`${label} 비교 이미지 크게 보기`} onClick={()=>zoom({src:`/images/hwpx-band-${i+1}.png`,alt:`${label} — ${desc} 영역의 원본·수정본 상세 비교`})}><img src={`/images/hwpx-band-${i+1}.png`} alt={`${label} — ${desc} 영역의 원본·수정본 상세 비교`} loading="lazy"/></button></div></figure>)}
  </div>
  <p className="fw-note">에이전트가 직접 읽는 구역별 대조 이미지. 빨간 표시가 바뀐 칸입니다. 양식 한 종류를 한 번 실행한 기록이며, 검증은 플러그인이 쓰는 렌더러 기준입니다.</p>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/server.py'}>compare_document_versions · review_document_vision</Source><Source href={base+'/src/hwp_mcp/vision.py'}>구역 분할·비교 구현</Source></div>
 </section>

 <section id="compose" className="fw-section">
  <Heading n="05 / 구성" title="편집 도구는 MCP로, 쓰는 순서는 Skill로 나눴습니다."/>
  <Facts items={[
   ['드러난 문제','도구만 열어 두자 순서 오류 — 분석 전 필드 조회, 위치 확인 생략'],
   ['원인','MCP는 도구만 제공. 언제 어떤 순서로 쓸지는 담기지 않습니다.'],
   ['해결','순서를 Agent Skills에 정의 · 어긋난 호출은 MCP가 거절 · 둘을 플러그인 하나로 묶어 배포'],
  ]}/>
  <figure className="fw-boundary">
   <article><span className="fw-kicker">mcp.json · 도구 25종</span><h3>MCP 서버</h3><p>가져오기 · 분석 · 확인 · 편집 · 검증<br/>문서를 실제로 다루는 동작</p></article>
   <div className="fw-connection"><span className="fw-connection-label">plugin.json 으로 함께 묶임</span><span className="fw-connection-arrow" aria-hidden="true">↔</span></div>
   <article><span className="fw-kicker">skills · 5종</span><h3>Agent Skills</h3><p>진입 스킬 1 + 작업별 4<br/>언제 무엇을 호출할지 강제</p></article>
   <figcaption>2인 팀 프로젝트이며, 저장소에 함께 있는 WASM 뷰어 실험은 다른 팀원의 작업입니다.</figcaption>
  </figure>
  <div className="fw-proof-links"><Source href={tree+'/src/hwp_mcp'}>MCP 구현</Source><Source href={tree+'/skills'}>Agent Skills</Source><Source href={base+'/plugin.json'}>plugin.json</Source></div>
 </section>


 <footer className="fw-footer"><Link to="/#projects">← 주요 프로젝트</Link><Link to="/projects/ownhands">다음 프로젝트 · OwnHands →</Link></footer>
 </div>
}
