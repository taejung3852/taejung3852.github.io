import React,{useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/fowoco-editorial.css';
import '../styles/hwpx-editorial.css';
const base='https://github.com/taejung3852/hwpx-document-plugin/blob/1a416bca6f35c59856f9b40909337fa443175e42';
const tree='https://github.com/taejung3852/hwpx-document-plugin/tree/1a416bca6f35c59856f9b40909337fa443175e42';
const bands=[['구역 1','신청 종류 선택'],['구역 2','인적사항 · 여권 · 주소 · 근무처'],['구역 3','동의서 · 서명란 · 공용란']];
const mapping=[['체류기간 연장허가','체류기간 연장허가 EXTENSION OF SOJOURN PERIOD'],['NGUYEN','성 Surname'],['VAN AN','명 Given names'],['1995-04-12','생년월일 Date of Birth'],['9504125000000','외국인등록번호 Foreign Resident Registration No.'],['010-0000-0000','휴대전화 Cell phone No.'],['031-000-0000','전화번호 Phone No. — 근무처 행'],['3000','연 소득금액 Annual Income Amount']];
const compare=[['외국인등록번호 — 낱칸 13개','첫 칸에 뭉치고 나머지는 빈 채로','한 칸에 한 자씩'],['성별 체크','어느 쪽도 체크되지 않음','체크됨'],['서명란','신청인·배우자·부모 칸까지 채움','비워 둠'],['요청하지 않은 예정 근무처','원 근무처 값을 그대로 복사','비워 둠']];
function Source({href,children='구현 근거'}){return <a className="fw-source" href={href} target="_blank" rel="noreferrer">{children} ↗</a>}
function Field({children}){return <span className="hx-field">{children}</span>}
function Heading({n,title,children}){return <header className="fw-heading"><span className="fw-kicker">{n}</span><h2>{title}</h2>{children&&<p>{children}</p>}</header>}
export default function HwpxStudy(){
 const dialog=useRef(null),[shot,setShot]=useState(null);
 const zoom=s=>{setShot(s);dialog.current.showModal()};
 useEffect(()=>{document.title='HWPX Document Plugin | 박태정';return()=>{document.title='박태정 | AI Agent / LLM Application Developer'}},[]);
 return <div className="fw-study">
 <dialog ref={dialog} className="hx-dialog" aria-label={shot?.alt||'이미지 크게 보기'} onClick={e=>{if(e.target===e.currentTarget)dialog.current.close()}}>
  <button type="button" className="hx-dialog-close" autoFocus onClick={()=>dialog.current.close()} aria-label="닫기"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
  {shot&&<img src={shot.src} alt={shot.alt}/>}
 </dialog>

 <header className="fw-hero">
  <div className="hx-topbar"><Link className="fw-back" to="/#projects">← 주요 프로젝트</Link><span>HWPX Document Plugin</span></div>
  <div className="fw-hero-split">
   <div className="fw-hero-copy">
  <p className="fw-kicker">2인 팀 프로젝트</p>
  <h1>양식의 구조를 읽고,<br/>확인한 값만 반영합니다.</h1>
  <p className="fw-lead">기존 HWPX 양식을 분석해 어느 칸에 무엇을 쓸지 찾고, 사용자에게 확인한 값만 그 칸에 반영하는 Agent Plugin입니다. 분석·계획·승인·적용·검증을 각각 다른 단계로 나눴습니다.</p>
   </div>
  <figure className="fw-cover"><img src="/images/hwpx-cover.png" alt="HWPX Document Plugin 개요 — 문서의 XML 구조와 그려낸 화면을 연결해 입력칸을 파악하고, 값 확인·승인·편집·검증으로 이어지는 흐름" width="1672" height="941" loading="eager"/><figcaption>문서의 XML 구조에서 값과 위치를 읽고, 그려낸 화면으로 어느 칸이 어떤 질문의 답인지 확인한 뒤, 사용자에게 확인받은 값만 편집하고 결과를 다시 검증합니다.</figcaption></figure>
  </div>
  <dl className="fw-role"><dt>담당 영역</dt><dd>MCP 전반 설계·구현 · Agent Skills 설계·개발 · Plugin 패키징</dd></dl>
  <nav className="fw-toc" aria-label="상세 페이지 목차"><a href="#origin">시작</a><a href="#analyze">분석</a><a href="#problem">문제</a><a href="#process">검수</a><a href="#result">결과</a><a href="#compose">구성</a><a href="#future">향후 방향</a></nav>
 </header>

 <section id="origin" className="fw-section">
  <Heading n="00 / 시작" title="한글 문서 수정을 도와주는 도구가 없었습니다.">ChatGPT 같은 서비스는 Word와 PowerPoint, Excel을 열어 고쳐 줍니다. 그런데 한국에서 공문서를 쓸 때 가장 많이 쓰고 손도 가장 많이 가는 HWPX는 빠져 있었습니다. 그 불편을 처음 마주친 건 외국인 근로자 행정업무를 돕는 <Link className="hx-link" to="/projects/fowoco">FOWOCO</Link>를 만들 때였습니다.</Heading>
  <div className="fw-collab-narrative">
   <article><span className="fw-kicker">처음</span><div><h3>그래서 FOWOCO 안에서 직접 채웠습니다.</h3><p>외국인 근로자의 체류 관련 서류는 대부분 HWPX 양식입니다. 다뤄 주는 도구가 없으니 LangGraph 흐름 안의 서브그래프로 직접 만들었습니다. 정해진 양식에 값을 채워 돌려주면 되는, 흐름의 한 단계였습니다.</p></div></article>
   <article><span className="fw-kicker">커지면서</span><div><h3>문서를 다루는 일이 계속 커졌습니다.</h3><p>양식마다 구조가 다르다는 걸 알게 되면서 분석과 확인, 검증이 차례로 붙었습니다. 상담 흐름을 조율하는 코드와 문서를 뜯어보는 코드가 같은 자리에서 뒤섞였습니다.</p></div></article>
   <article><span className="fw-kicker">판단</span><div><h3>문서 쪽만 밖으로 떼어냈습니다.</h3><p>내부 함수로 묶어도 <Link className="hx-link" to="/projects/fowoco">FOWOCO</Link> 안에서만 쓸 수 있습니다. 문서를 분석하고 고치는 일은 이 서비스 밖에서도 쓸 데가 보였고, 더 키울 여지도 컸습니다. 그래서 MCP 도구로 경계를 긋고 따로 뒀습니다. 대신 연결 관리와 도구 오류 처리를 떠안았습니다.</p></div></article>
  </div>
  <p className="fw-takeaway">기능이 늘어나면서 책임을 나누려고 떼어낸 것이 이 프로젝트입니다. 에이전트는 작업 흐름을 조율하고, 문서 도구는 문서만 맡습니다.</p>
  <p><Link className="fw-source" to="/projects/fowoco">FOWOCO에서의 분리 과정 보기 →</Link></p>
 </section>

 <section id="analyze" className="fw-section">
  <div className="hx-side">
   <div className="hx-stack">
    <Heading n="01 / 분석" title="ChatGPT 웹에서, 플러그인 없이 해봤습니다.">플러그인 없이 같은 양식을 첨부하고 같은 값을 채우게 했습니다. 대부분은 제자리에 들어갔지만, 몇 칸이 어긋났습니다.</Heading>
    <div><h3>정확하게 인식한 칸은 많았지만</h3><p>이름, 주소, 전화번호처럼 문항 옆에 빈칸이 하나뿐인 자리는 대체로 제자리에 들어갔습니다.</p></div>
    <div><h3>어긋난 칸이 있었습니다</h3><p>이 출력물을 보면 <strong>외국인등록번호</strong>가 한 자씩 들어가는 칸에 맞춰지지 못하고 앞쪽에 뭉쳐 있습니다. 성별은 체크되지 않았고, 요청하지 않은 예정 근무처와 서명란까지 채워졌습니다.</p></div>
   </div>
   <figure>
    <button type="button" className="hx-zoom" aria-label="플러그인 없이 작성된 신청서 크게 보기" onClick={()=>zoom({src:'/images/hwpx-overfill.png',alt:'플러그인 없이 작성된 통합신청서. 외국인등록번호가 작성 칸에 맞지 않게 뭉개져 있고, 성별이 체크되지 않았으며, 서명란에 글자가 들어가 있다.'})}><img src="/images/hwpx-overfill.png" alt="플러그인 없이 작성된 통합신청서. 외국인등록번호가 작성 칸에 맞지 않게 뭉개져 있고, 성별이 체크되지 않았으며, 서명란에 글자가 들어가 있다." width="1132" height="1596" loading="lazy"/></button>
    <figcaption>누르면 크게 볼 수 있습니다.</figcaption>
   </figure>
  </div>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/vision.py'}>구역 분할·비교 구현</Source><Source href={base+'/src/hwp_mcp/server.py'}>analyze_document · render_document</Source></div>
 </section>

 <section id="problem" className="fw-section">
  <Heading n="02 / 문제" title="문항은 읽히는데, 답을 쓸 자리가 읽히지 않습니다."/>
  <div className="hx-pairs">
   <div><h3>문항은 XML에 다 있습니다</h3><p>HWPX는 XML을 압축한 형식이라, <Field>성 Surname</Field> <Field>생년월일 Date of Birth</Field> 같은 문구가 어느 셀에 있는지는 그대로 읽힙니다.</p></div>
   <div><h3>답을 쓸 칸은 적혀 있지 않습니다</h3><p>그 문항의 <strong>답을 어느 칸에 써야 하는지</strong>는 파일 어디에도 없습니다. 사람이 문서를 볼 때의 배치로만 드러납니다.</p></div>
   <div><h3>같은 문구의 칸이 네 곳입니다</h3><p>통합신청서에는 <Field>전화번호 Phone No.</Field>가 네 곳에 똑같이 적혀 있습니다. 본국 주소·학교·원 근무처·예정 근무처에 하나씩이라, 문구만으로는 구분되지 않습니다.</p></div>
   <div><h3>한 값이 여러 칸으로 흩어집니다</h3><p>생년월일은 세 칸에, 외국인등록번호는 열세 칸에 한 자씩 들어갑니다. 어디에 쓸지뿐 아니라 어떻게 쪼갤지도 정해야 합니다.</p></div>
  </div>
  <p className="fw-example-label">셀 157개 · 같은 문구의 칸 4곳 · 한 값이 13칸으로 분할</p>

  <figure className="fw-cover">
   <button type="button" className="hx-zoom" aria-label="빈 원본 양식 크게 보기" onClick={()=>zoom({src:'/images/hwpx-blank-2.png',alt:'빈 통합신청서의 인적사항·주소·근무처 구간. 전화번호 칸이 여러 곳에 반복되고 등록번호가 낱칸으로 나뉘어 있다.'})}><img src="/images/hwpx-blank-2.png" alt="빈 통합신청서의 인적사항·주소·근무처 구간. 전화번호 칸이 여러 곳에 반복되고 등록번호가 낱칸으로 나뉘어 있다." width="794" height="423" loading="lazy"/></button>
   <figcaption>편집하기 전의 빈 원본입니다. 오른쪽 열을 따라 같은 문구의 전화번호 칸이 반복되고, 외국인등록번호는 낱칸으로 나뉘어 있습니다. 어느 칸이 어떤 질문의 답인지는 이 배치를 봐야 정해집니다. 누르면 크게 볼 수 있습니다.</figcaption>
  </figure>
  <div className="fw-findings">
   <article className="fw-cost"><span className="fw-kicker">한 번에 맡기면</span><strong>빠릅니다</strong><h3>대신 완성되기 전까지 볼 수 없습니다</h3><p>중간에 멈추지 않으니 결과가 곧바로 나옵니다. 그런데 사용자는 문서가 다 만들어진 뒤에야 내용을 보게 되고, 잘못 들어간 칸도 그때 드러납니다.</p></article>
   <article className="fw-benefit"><span className="fw-kicker">확인을 거치면</span><strong>정확합니다</strong><h3>대신 시간이 더 걸립니다</h3><p>값을 넣기 전에 자리를 그림으로 보여주고 답을 기다립니다. 넣은 뒤에는 원본과 대조해 문서가 틀어지지 않았는지 봅니다. 한 번에 끝낼 때보다 오래 걸립니다.</p></article>
  </div>
  <p className="fw-note">이 프로젝트는 두 번째를 택했습니다. 빨리 끝나는 것보다, 잘못 들어간 칸을 완성 전에 잡는 쪽이 이 작업에서는 더 중요하다고 봤습니다.</p>
 </section>

 <section id="process" className="fw-section">
  <Heading n="03 / 검수" title="값을 쓰기 전에, 에이전트가 사람에게 묻습니다.">값을 넣기 전에 에이전트가 멈춥니다. 어느 칸에 무엇을 넣을지 그림으로 보여주고, 사용자가 답할 때까지 기다립니다.</Heading>
  <div className="hx-three">
   <div>
    <h3>자리를 그림으로 보여줍니다</h3>
    <p>값을 넣을 칸을 파란 박스로 표시한 그림을 보여주고, 아니라고 하면 위치를 고쳐 다시 묻습니다.</p>
   </div>
   <div>
    <h3>보기 편하게 묶어서 보여줍니다</h3>
    <p>인적사항·여권·주소·근무처처럼 성격이 같은 항목끼리 묶어, 한 화면에서 확인하게 했습니다.</p>
   </div>
   <div>
    <h3>물어서도 안 되는 칸이 있습니다</h3>
    <p>서명란은 사람이 직접 서명할 자리로, 공용란은 담당 공무원이 쓸 자리로 정해 뒀습니다. 여기에 값을 넣는 계획은 편집 단계에서 거절됩니다.</p>
   </div>
  </div>
  <figure className="fw-cover">
   <button type="button" className="hx-zoom" aria-label="확인 화면 크게 보기" onClick={()=>zoom({src:'/images/hwpx-confirm.png',alt:'통합신청서의 성명·생년월일·성별·국적 칸에 파란 사각형이 표시된 확인용 그림'})}><img src="/images/hwpx-confirm.png" alt="통합신청서의 성명·생년월일·성별·국적 칸에 파란 사각형이 표시된 확인용 그림" width="794" height="143" loading="lazy"/></button>
   <figcaption>성명·생년월일·성별·국적을 입력하기 전에 실제로 보여준 확인 그림입니다. 파란 박스가 값을 넣을 자리이고, 이 상태에서 답을 기다립니다. 누르면 크게 볼 수 있습니다.</figcaption>
  </figure>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/server.py'}>preview_field_section · confirm_visual_candidates</Source><Source href={base+'/src/hwp_mcp/plans.py'}>서명란·공용란 거절 규칙</Source></div>
 </section>

 <section id="result" className="fw-section">
  <Heading n="04 / 결과" title="요청한 값이 각각 어느 칸에 들어갔는지.">예로 쓴 문서는 <strong>통합신청서</strong>입니다. 출입국관리법 시행규칙 별지 제34호 서식으로, 외국인 체류 관련 신청에 쓰입니다.</Heading>
  <div className="hx-side">
   <div className="fw-table" tabIndex="0" role="region" aria-label="양식의 문항과 입력된 값">
    <table>
     <thead><tr><th scope="col">양식에 적힌 문항</th><th scope="col">입력한 값</th></tr></thead>
     <tbody>{mapping.map(([v,cell])=><tr key={v}><th scope="row">{cell}</th><td>{v}</td></tr>)}</tbody>
    </table>
   </div>
   <figure>
    <button type="button" className="hx-zoom" aria-label="작성된 신청서 크게 보기" onClick={()=>zoom({src:'/images/hwpx-filled.png',alt:'플러그인으로 작성된 통합신청서 한 페이지'})}><img src="/images/hwpx-filled.png" alt="플러그인으로 작성된 통합신청서 한 페이지" width="794" height="1123" loading="lazy"/></button>
    <figcaption>왼쪽 표대로 채워진 결과입니다. 누르면 크게 볼 수 있습니다.</figcaption>
   </figure>
  </div>
  <p className="fw-note">모두 사용자가 준 값이고, 에이전트가 지어내 채운 값은 없습니다. 문제로 꼽았던 함정도 갈라졌습니다 — 같은 문구의 전화번호 칸이 여럿인데, <strong>휴대전화와 근무처 전화번호가 각기 다른 행에 들어갔습니다.</strong></p>
  <div className="fw-table hx-compare" tabIndex="0" role="region" aria-label="플러그인 없이 채웠을 때와의 대조">
   <table>
    <caption>01에서 어긋났던 자리를, 같은 양식에서 다시 보면</caption>
    <thead><tr><th scope="col">확인한 자리</th><th scope="col">플러그인 없이</th><th scope="col">플러그인</th></tr></thead>
    <tbody>{compare.map(([where,before,after])=><tr key={where}><th scope="row">{where}</th><td>{before}</td><td><strong>{after}</strong></td></tr>)}</tbody>
   </table>
  </div>
  <p className="fw-note">두 실행은 넣은 예시 값이 서로 달라 점수로 비교하지 않았습니다. 같은 양식에서 <strong>같은 자리가 어떻게 처리됐는지</strong>를 두 출력물을 놓고 대조한 것입니다.</p>

  <Heading n="04-1 / 구조 보존" title="값을 넣은 뒤에, 문서를 다시 그려서 봅니다.">값이 들어갔다고 문서가 멀쩡한 건 아닙니다. 표가 밀리거나 글자가 칸을 넘칠 수 있어서, 수정본을 이미지로 그려 원본과 대조합니다.</Heading>
  <div className="hx-pairs">
   <div><h3>룰 기반으로 먼저 거릅니다</h3><p>확인받은 자리에만 값이 들어갔는지, 손대지 않기로 한 칸이 그대로인지, 표와 페이지가 틀어지지 않았는지, 파일이 다시 열리는지를 대조합니다.</p></div>
   <div><h3>그다음 에이전트가 봅니다</h3><p>원본과 수정본을 구역별로 그려 비교한 이미지를 에이전트가 직접 읽고 최종 검토합니다. 수치로 안 걸러지는 어긋남을 눈으로 확인하는 단계입니다.</p></div>
  </div>
  <div className="hx-bands">
   {bands.map(([label,desc],i)=><figure key={label}><span className="fw-kicker">{label}</span><div><button type="button" className="hx-zoom" aria-label={`${label} 비교 이미지 크게 보기`} onClick={()=>zoom({src:`/images/hwpx-band-${i+1}.png`,alt:`${label} — ${desc} 영역의 원본·수정본 상세 비교`})}><img src={`/images/hwpx-band-${i+1}.png`} alt={`${label} — ${desc} 영역의 원본·수정본 상세 비교`} loading="lazy"/></button></div></figure>)}
  </div>
  <p className="fw-note">에이전트가 읽는 구역별 대조 이미지입니다. 빨간 표시가 이번 편집에서 바뀐 칸이며, 누르면 크게 볼 수 있습니다. 양식 한 종류를 한 번 실행한 기록이고, 검증은 플러그인이 쓰는 렌더러 기준이라 한글 프로그램에서의 표시나 PDF 변환은 포함되지 않습니다. 입력값은 모두 가상 정보입니다.</p>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/server.py'}>compare_document_versions · review_document_vision</Source><Source href={base+'/src/hwp_mcp/application/editing.py'}>적용·최종화 구현</Source></div>
 </section>

 <section id="compose" className="fw-section">
  <Heading n="05 / 구성" title="편집 도구는 MCP로, 쓰는 순서는 Skill로 나눴습니다.">MCP 도구만 열어 두자 에이전트가 순서를 틀렸습니다. 분석 전에 필드를 조회하고, 위치 확인을 건너뛰었습니다.</Heading>
  <div className="fw-copy hx-single">
   <h3>MCP는 도구를 줄 뿐, 쓰는 법은 알려주지 않습니다</h3>
   <p>어떤 도구를 언제 어떤 순서로 부를지는 MCP에 담기지 않습니다. 그 순서를 Agent Skills에 적어 두고, 어긋난 호출은 MCP가 거절하도록 했습니다. 도구와 사용법을 함께 배포해야 해서 둘을 하나의 플러그인으로 묶었습니다.</p>
  </div>
  <figure className="fw-boundary">
   <article><span className="fw-kicker">mcp.json · 도구 25종</span><h3>MCP 서버</h3><p>가져오기 · 분석 · 확인 · 편집 · 검증<br/>문서를 실제로 다루는 동작</p></article>
   <div className="fw-connection"><span className="fw-connection-label">plugin.json 으로 함께 묶임</span><span className="fw-connection-arrow" aria-hidden="true">↔</span></div>
   <article><span className="fw-kicker">skills · 5종</span><h3>Agent Skills</h3><p>진입 스킬 1 + 작업별 4<br/>언제 무엇을 호출할지 강제</p></article>
   <figcaption>사용자가 MCP 설정을 직접 편집하지 않아도 되도록 하나의 플러그인 패키지로 묶었습니다. 2인 팀 프로젝트이며, 저장소에 함께 있는 WASM 뷰어 실험은 다른 팀원의 작업입니다.</figcaption>
  </figure>
  <div className="fw-proof-links"><Source href={tree+'/src/hwp_mcp'}>MCP 구현</Source><Source href={tree+'/skills'}>Agent Skills</Source><Source href={base+'/plugin.json'}>plugin.json</Source></div>
 </section>

 <section id="future" className="fw-section">
  <Heading n="06 / 향후 방향" title="ChatGPT 웹에서 바로 쓸 수 있게 하는 것.">지금은 각자 컴퓨터에 설치해야 씁니다. 목표는 마켓플레이스 승인을 받아, 설치 없이 ChatGPT 웹에서 문서를 첨부하면 바로 동작하게 하는 것입니다.</Heading>
  <div className="fw-copy hx-single">
   <h3>설치 없이 쓰려면 원격에서 돌아야 합니다</h3>
   <p>전송을 STDIO에서 Streamable HTTP로 바꾸고, 서버를 AWS EC2에 두려 합니다. 원본과 작업공간은 S3에 보관하는 구성을 검토하고 있습니다.</p>
  </div>
  <p className="fw-note">아직 구현하지 않은 계획입니다. 현재 저장소의 동작은 STDIO 기준입니다.</p>
 </section>

 <footer className="fw-footer"><Link to="/#projects">← 주요 프로젝트</Link><Link to="/projects/ownhands">다음 프로젝트 · OwnHands →</Link></footer>
 </div>
}
