import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../styles/fowoco-editorial.css';
import '../styles/hwpx-editorial.css';
const base='https://github.com/taejung3852/hwpx-document-plugin/blob/1a416bca6f35c59856f9b40909337fa443175e42';
const tree='https://github.com/taejung3852/hwpx-document-plugin/tree/1a416bca6f35c59856f9b40909337fa443175e42';
const bands=[['구역 1','신청 종류 선택'],['구역 2','인적사항 · 여권 · 주소 · 근무처'],['구역 3','동의서 · 서명란 · 공용란']];
const dispositions=[['provided','값을 받아 반영할 칸'],['not_applicable','해당 없음으로 확인된 칸'],['intentionally_blank','사용자가 일부러 비워 두기로 한 칸'],['manual_after_export','문서를 내려받은 뒤 손으로 쓸 칸'],['future_e_signature','전자서명으로 채울 칸']];
const metrics=[['34 / 34','계획한 변경이 빠짐없이 적용됐습니다'],['0건','요청하지 않은 칸에서 발생한 변경'],['212 → 212','문단 수가 유지됐습니다'],['1 → 1','표 수와 페이지 수가 유지됐습니다'],['0건','원본에 없던 레이아웃 경고'],['통과','수정본을 다시 열어 분석까지 진행']];
function Source({href,children='구현 근거'}){return <a className="fw-source" href={href} target="_blank" rel="noreferrer">{children} ↗</a>}
function Heading({n,title,children}){return <header className="fw-heading"><span className="fw-kicker">{n}</span><h2>{title}</h2>{children&&<p>{children}</p>}</header>}
export default function HwpxStudy(){
 useEffect(()=>{document.title='HWPX Document Plugin | 박태정';return()=>{document.title='박태정 | AI Agent / LLM Application Developer'}},[]);
 return <div className="fw-study">

 <header className="fw-hero">
  <Link className="fw-back" to="/#projects">← 주요 프로젝트</Link>
  <p className="fw-kicker">HWPX Document Plugin · 2인 팀 프로젝트 · 대표 양식 1건 실행 완료</p>
  <h1>양식의 구조를 읽고,<br/>확인한 값만 반영합니다.</h1>
  <p className="fw-lead">기존 HWPX 양식을 분석해 어느 칸에 무엇을 쓸지 찾고, 사용자에게 확인한 값만 그 칸에 반영하는 Agent Plugin입니다. 분석·계획·승인·적용·검증을 각각 다른 단계로 나눴습니다.</p>
  <dl className="fw-role"><dt>담당 영역</dt><dd>MCP 전반 설계·구현 · Agent Skills 설계·개발</dd></dl>
  <figure className="fw-cover"><img src="/images/hwpx-band-2.png" alt="편집한 통합신청서에서 변경된 칸이 빨간 사각형으로 표시된 비교 이미지" width="794" height="423" loading="eager"/><figcaption>대표 양식을 실제로 편집한 뒤 원본과 비교한 결과입니다. 빨간 표시가 이번 편집에서 바뀐 칸이며, 외국인등록번호처럼 한 값이 여러 칸으로 나뉜 필드도 각 칸 단위로 확인합니다.</figcaption></figure>
  <nav className="fw-toc" aria-label="상세 페이지 목차"><a href="#problem">문제</a><a href="#analyze">분석</a><a href="#values">확인한 값</a><a href="#process">절차</a><a href="#result">결과</a><a href="#boundary">경계</a></nav>
 </header>

 <section id="problem" className="fw-section">
  <div className="fw-two">
   <Heading n="01 / 문제" title="위치는 알 수 있어도, 어느 칸에 쓸지는 알 수 없었습니다."/>
   <div className="fw-copy">
    <h3>구조는 읽히는데, 대응이 없습니다</h3>
    <p>HWPX는 XML을 압축한 형식이라 문단·표·셀의 위치와 이미 들어 있는 값은 정확히 읽을 수 있습니다. 그런데 “이 질문의 답을 어느 칸에 쓰는가”는 파일 안에 적혀 있지 않습니다. 질문과 입력칸의 대응은 사람이 문서를 볼 때의 배치로만 드러납니다.</p>
    <h3>구조만 보고 추론하면 틀립니다</h3>
    <p>대표로 사용한 통합신청서에는 ‘전화번호’ 칸이 다섯 곳 있습니다. 휴대전화, 근무처, 학교, 본국, 예정 근무처가 각각 따로입니다. 성과 명, 생년월일의 년·월·일, 외국인등록번호 열세 자리도 모두 다른 셀로 나뉩니다. 구조 정보만으로 위치를 추론하면 엉뚱한 칸을 고칠 수 있습니다.</p>
    <p className="fw-example-label">같은 이름의 칸이 다섯 곳 · 한 값이 열세 칸으로 나뉨</p>
   </div>
  </div>
 </section>

 <section id="analyze" className="fw-section">
  <Heading n="02 / 분석" title="구조만으로 모호하면, 렌더된 문서와 대조합니다.">파싱한 셀 구조에 렌더 결과의 좌표를 겹쳐, 질문과 입력칸의 대응을 화면에서 확인할 수 있도록 구현했습니다.</Heading>
  <div className="fw-reasons">
   <div><h3>구조 파싱</h3><p>문단·표·셀을 읽어 편집할 수 있는 위치와 이미 들어 있는 값을 확인합니다.</p></div>
   <div><h3>렌더 대조</h3><p>같은 문서를 렌더해 셀의 실제 좌표를 얻고, 구조에서 읽은 값과 연결합니다.</p></div>
   <div><h3>구역 분할</h3><p>한 페이지를 최대 세 구역으로 나눠, 편집 대상이 포함된 구역만 원본과 상세 비교합니다.</p></div>
  </div>
  <div className="hx-bands">
   {bands.map(([label,desc],i)=><figure key={label}><span className="fw-kicker">{label}</span><div><img src={`/images/hwpx-band-${i+1}.png`} alt={`${label} — ${desc} 영역의 원본·수정본 상세 비교`} loading="lazy"/></div></figure>)}
  </div>
  <p className="fw-note">대표 양식 1건을 실제로 편집한 뒤 생성된 상세 비교 이미지입니다. 한 페이지를 세 구역으로 나눠 각각 원본과 대조했으며, 빨간 표시가 이번 편집에서 바뀐 칸입니다.</p>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/vision.py'}>구역 분할·비교 구현</Source><Source href={base+'/src/hwp_mcp/server.py'}>analyze_document · render_document</Source></div>
 </section>

 <section id="values" className="fw-section">
  <Heading n="03 / 확인한 값" title="빈칸마다, 비운 이유가 다릅니다.">값을 받은 칸과 사용자가 일부러 비운 칸, 나중에 손으로 쓸 칸을 같은 공란으로 두지 않습니다. 입력 인터뷰에서 각 칸의 처리를 다섯 가지로 구분해 기록합니다.</Heading>
  <dl className="fw-metric-guide">{dispositions.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
  <p className="fw-note">다섯 값은 <code>fields.py</code>의 Disposition 정의 그대로입니다. 이 구분 덕분에 “아직 못 받은 값”과 “받지 않기로 한 값”이 섞이지 않습니다.</p>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/fields.py'}>Disposition 정의</Source><Source href={base+'/src/hwp_mcp/server.py'}>update_field_interview</Source></div>
 </section>

 <section id="process" className="fw-section">
  <Heading n="04 / 절차" title="바꾸기 전에, 무엇을 어디에 쓸지 확인받습니다.">수정 위치와 값을 하나의 계획으로 모은 뒤, 승인과 적용을 별도 단계로 분리했습니다.</Heading>
  <ol className="fw-collab-flow">
   <li><b>계획</b><span>수정할 칸과 값을 Edit Plan 하나로 모읍니다.</span></li>
   <li><b>승인</b><span>HMAC-SHA256 승인 영수증을 검증해야 다음으로 넘어갑니다.</span></li>
   <li><b>적용</b><span>격리된 작업공간의 사본에만 적용하고, 원본은 덮어쓰지 않습니다.</span></li>
  </ol>
  <p className="fw-note">대표 실행에서도 원본 파일의 해시는 편집 전후로 동일했고, 수정본은 별도 파일로 생성됐습니다.</p>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/server.py'}>create · approve · apply_edit_plan</Source><Source href={base+'/src/hwp_mcp/application/editing.py'}>적용·최종화 구현</Source></div>
 </section>

 <section id="result" className="fw-section">
  <Heading n="05 / 결과" title="대표 양식 한 건을, 실제로 편집하고 검증했습니다.">출입국관리법 시행규칙 별지 제34호 통합신청서에 가상 정보를 입력하고, 원본과 수정본을 자동으로 비교했습니다. 아래는 그 검증 리포트에서 읽은 값입니다.</Heading>
  <div className="hx-metrics">{metrics.map(([v,d])=><div key={d}><strong>{v}</strong><span>{d}</span></div>)}</div>
  <div className="fw-context-note">
   <h3>“값을 넣었다”와 “문서가 멀쩡하다”는 다릅니다.</h3>
   <p>값이 바뀌어도 표가 밀리거나 글자가 칸을 넘칠 수 있습니다. 그래서 적용한 값이 계획과 일치하는지와 별개로, 문단·표·페이지 수와 레이아웃 경고를 원본과 대조합니다. 이번 실행에서 감지된 레이아웃 경고 한 건은 빈 원본에도 동일하게 있던 것이며, 편집으로 새로 생긴 경고는 없었습니다.</p>
  </div>
  <p className="fw-note">양식 한 종류를 한 번 실행한 기록입니다. 다른 양식이나 반복 실행의 성공률로 확대해 말할 수 없습니다. 비교와 재개방 확인은 플러그인이 사용하는 렌더러 기준이며, 한글 프로그램에서의 표시나 PDF 변환의 양식 보존은 이 결과에 포함되지 않습니다. 입력값은 모두 가상 정보입니다.</p>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/server.py'}>compare_document_versions · validate_document</Source><Source href={base+'/src/hwp_mcp/vision.py'}>렌더 비교 구현</Source></div>
 </section>

 <section id="boundary" className="fw-section">
  <Heading n="경계" title="도구와 절차를 나눠 두었습니다.">무엇을 할 수 있는지는 MCP 도구가, 언제 무엇을 어떤 순서로 할지는 Agent Skills가 담당합니다.</Heading>
  <figure className="fw-boundary">
   <article><span className="fw-kicker">src/hwp_mcp · 도구 25종</span><h3>MCP</h3><p>분석 · 계획 · 승인 · 적용 · 검증<br/>결정적인 실행을 담당</p></article>
   <div className="fw-connection"><span className="fw-connection-label">도구 호출 / 결과 반환</span><span className="fw-connection-arrow" aria-hidden="true">↔</span></div>
   <article><span className="fw-kicker">skills · 5종</span><h3>Agent Skills</h3><p>안전한 작업 절차와 판단 기준<br/>언제 무엇을 호출할지 안내</p></article>
   <figcaption>고정 커밋 1a416bc에서 확인한 구성입니다. Plugin 패키징과 WASM 뷰어 실험은 개인 담당 범위 밖입니다.</figcaption>
  </figure>
  <div className="fw-proof-links"><Source href={tree+'/src/hwp_mcp'}>MCP 구현</Source><Source href={tree+'/skills'}>Agent Skills</Source></div>
  <div className="fw-conclusion">
   <Heading n="남은 것" title="한 건의 기록으로 말할 수 있는 범위까지만."/>
   <p className="fw-takeaway">분석·확인·승인·검증 장치를 갖췄고, 대표 양식 한 건에서 실제로 동작하는 것까지 확인했습니다. 다만 양식의 배치는 서식마다 다르므로, 다른 양식에서도 같은 정확도가 나오는지는 같은 방식의 기록을 더 쌓은 뒤에 말하려 합니다.</p>
  </div>
 </section>

 <footer className="fw-footer"><Link to="/#projects">← 주요 프로젝트</Link><Link to="/projects/ownhands">다음 프로젝트 · OwnHands →</Link></footer>
 </div>
}
