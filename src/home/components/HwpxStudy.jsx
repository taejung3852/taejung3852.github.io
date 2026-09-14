import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../styles/fowoco-editorial.css';
import '../styles/hwpx-editorial.css';
const base='https://github.com/taejung3852/hwpx-document-plugin/blob/1a416bca6f35c59856f9b40909337fa443175e42';
const tree='https://github.com/taejung3852/hwpx-document-plugin/tree/1a416bca6f35c59856f9b40909337fa443175e42';
const bands=[['구역 1','신청 종류 선택'],['구역 2','인적사항 · 여권 · 주소 · 근무처'],['구역 3','동의서 · 서명란 · 공용란']];
const metrics=[['34 / 34','계획한 변경이 빠짐없이 적용됐습니다'],['0건','요청하지 않은 칸에서 발생한 변경'],['212 → 212','문단 수가 유지됐습니다'],['1 → 1','표 수와 페이지 수가 유지됐습니다'],['0건','원본에 없던 레이아웃 경고'],['통과','수정본을 다시 열어 분석까지 진행']];
const mapping=[['체류기간 연장허가','체류기간 연장허가 EXTENSION OF SOJOURN PERIOD','체크 표시'],['NGUYEN','성 Surname','텍스트'],['VAN AN','명 Given names','텍스트'],['1995-04-12','생년월일 Date of Birth','년·월·일 세 칸으로 분할'],['9504125000000','외국인등록번호 Foreign Resident Registration No.','열세 칸에 한 자씩'],['010-0000-0000','휴대전화 Cell phone No.','텍스트'],['031-000-0000','전화번호 Phone No. — 근무처 행','텍스트'],['3000','연 소득금액 Annual Income Amount','금액 칸']];
function Source({href,children='구현 근거'}){return <a className="fw-source" href={href} target="_blank" rel="noreferrer">{children} ↗</a>}
function Heading({n,title,children}){return <header className="fw-heading"><span className="fw-kicker">{n}</span><h2>{title}</h2>{children&&<p>{children}</p>}</header>}
export default function HwpxStudy(){
 useEffect(()=>{document.title='HWPX Document Plugin | 박태정';return()=>{document.title='박태정 | AI Agent / LLM Application Developer'}},[]);
 return <div className="fw-study">

 <header className="fw-hero">
  <Link className="fw-back" to="/#projects">← 주요 프로젝트</Link>
  <div className="fw-hero-split">
   <div className="fw-hero-copy">
  <p className="fw-kicker">HWPX Document Plugin · 2인 팀 프로젝트 · 대표 양식 1건 실행 완료</p>
  <h1>양식의 구조를 읽고,<br/>확인한 값만 반영합니다.</h1>
  <p className="fw-lead">기존 HWPX 양식을 분석해 어느 칸에 무엇을 쓸지 찾고, 사용자에게 확인한 값만 그 칸에 반영하는 Agent Plugin입니다. 분석·계획·승인·적용·검증을 각각 다른 단계로 나눴습니다.</p>
   </div>
  <figure className="fw-cover"><img src="/images/hwpx-cover.png" alt="HWPX Document Plugin 개요 — 문서의 XML 구조와 렌더된 화면을 연결해 입력칸을 파악하고, 값 확인·승인·편집·검증으로 이어지는 흐름" width="1672" height="941" loading="eager"/><figcaption>문서의 XML 구조에서 값과 위치를 읽고, 렌더된 화면으로 어느 칸이 어떤 질문의 답인지 확인한 뒤, 사용자에게 확인받은 값만 편집하고 결과를 다시 검증합니다.</figcaption></figure>
  </div>
  <dl className="fw-role"><dt>담당 영역</dt><dd>MCP 전반 설계·구현 · Agent Skills 설계·개발 · Plugin 패키징</dd></dl>
  <nav className="fw-toc" aria-label="상세 페이지 목차"><a href="#origin">시작</a><a href="#problem">문제</a><a href="#analyze">분석</a><a href="#process">검수</a><a href="#result">결과</a><a href="#compose">구성</a><a href="#future">향후 방향</a></nav>
 </header>

 <section id="origin" className="fw-section">
  <Heading n="00 / 시작" title="한글 문서 수정을 도와주는 도구가 없었습니다.">ChatGPT 같은 서비스는 Word와 PowerPoint, Excel을 열어 고쳐 줍니다. 그런데 한국에서 공문서를 쓸 때 가장 많이 쓰고 손도 가장 많이 가는 HWPX는 빠져 있었습니다. 그 불편을 처음 마주친 건 외국인 근로자 행정업무를 돕는 FOWOCO를 만들 때였습니다.</Heading>
  <div className="fw-collab-narrative">
   <article><span className="fw-kicker">처음</span><div><h3>없으니 직접 만들었습니다.</h3><p>외국인 근로자의 체류 관련 서류는 대부분 HWPX 양식입니다. 그런데 이걸 다뤄 주는 도구가 없어서, 문서 작업을 LangGraph 흐름 안의 서브그래프로 직접 만들었습니다. 정해진 양식에 값을 채워 돌려주면 되는, 흐름의 한 단계였습니다.</p></div></article>
   <article><span className="fw-kicker">커지면서</span><div><h3>책임이 한 덩어리로 섞였습니다.</h3><p>양식마다 구조가 다르다는 걸 알게 되면서 분석과 확인, 검증이 계속 붙었습니다. 업무 흐름을 조율하는 일과 문서를 다루는 일이 같은 자리에서 자라기 시작했습니다.</p></div></article>
   <article><span className="fw-kicker">판단</span><div><h3>내부 함수로 정리하지 않았습니다.</h3><p>함수로 묶어도 FOWOCO 안에서만 쓸 수 있습니다. 문서를 분석하고 고치는 일은 이 서비스 밖에서도 쓸 데가 보였고, 더 키울 여지도 컸습니다. 그래서 에이전트 안에 두지 않고 MCP 도구로 경계를 그었습니다.</p></div></article>
  </div>
  <p className="fw-takeaway">기능이 늘어나면서 책임을 나누려고 떼어낸 것이 이 프로젝트입니다. 에이전트는 작업 흐름을 조율하고, 문서 도구는 문서만 맡습니다.</p>
  <p><Link className="fw-source" to="/projects/fowoco">FOWOCO에서의 분리 과정 보기 →</Link></p>
 </section>

 <section id="problem" className="fw-section">
  <div className="fw-two">
   <Heading n="01 / 문제" title="문항은 읽히는데, 답을 쓸 자리가 읽히지 않습니다."/>
   <div className="fw-copy">
    <h3>문항은 XML에 다 있습니다</h3>
    <p>HWPX는 XML을 압축한 형식이라, 양식에 어떤 문항이 있는지는 그대로 읽힙니다. ‘성 Surname’, ‘생년월일 Date of Birth’ 같은 문구가 어느 셀에 있는지도 정확히 알 수 있습니다.</p>
    <h3>답을 쓸 칸은 적혀 있지 않습니다</h3>
    <p>문제는 그다음입니다. 그 문항의 <strong>답을 어느 칸에 써야 하는지</strong>는 파일 어디에도 없습니다. 문항과 답 칸을 이어 주는 정보가 XML에 존재하지 않습니다. 사람이 문서를 볼 때의 배치로만 드러납니다.</p>
    <h3>같은 문구의 칸이 네 곳입니다</h3>
    <p>대표로 사용한 통합신청서에는 전화·연락처를 적는 칸이 여섯 곳 있습니다. 그중 네 곳은 <strong>‘전화번호 Phone No.’라는 완전히 같은 문구</strong>입니다. 본국 주소, 학교, 원 근무처, 예정 근무처에 각각 하나씩 붙어 있습니다. 문구만으로는 어느 것이 어느 것인지 구분할 수 없고, 표에서 어느 행에 놓였는지로만 갈립니다.</p>
    <h3>한 값이 여러 칸으로 흩어집니다</h3>
    <p>생년월일은 년·월·일 세 칸에, 외국인등록번호는 열세 칸에 한 자씩 들어갑니다. 성과 명도 각각 다른 칸입니다. 값 하나를 어디에 쓸지가 아니라, 어떻게 쪼개 넣을지까지 정해야 합니다.</p>
    <p className="fw-example-label">셀 157개 · 같은 문구의 칸 4곳 · 한 값이 13칸으로 분할</p>
   </div>
  </div>
  <figure className="fw-cover">
   <a href="/images/hwpx-blank-2.png" target="_blank" rel="noreferrer" aria-label="빈 원본 양식 원본 크기로 보기"><img src="/images/hwpx-blank-2.png" alt="빈 통합신청서의 인적사항·주소·근무처 구간. 전화번호 칸이 여러 곳에 반복되고 등록번호가 낱칸으로 나뉘어 있다." width="794" height="423" loading="lazy"/></a>
   <figcaption>편집하기 전의 빈 원본입니다. 오른쪽 열을 따라 ‘전화번호 Phone No.’가 본국 주소·학교·원 근무처·예정 근무처 옆에 같은 문구로 반복되고, 외국인등록번호는 낱칸으로 나뉘어 있습니다. 어느 칸이 어떤 질문의 답인지는 이 배치를 봐야 정해집니다. 이미지를 누르면 원본 크기로 볼 수 있습니다.</figcaption>
  </figure>
 </section>

 <section id="analyze" className="fw-section">
  <Heading n="02 / 분석" title="그래서 XML과 렌더 이미지를 함께 봅니다.">XML만 파싱하면 훨씬 빠릅니다. 그런데 그 방법으로는 ‘전화번호 Phone No.’ 네 곳을 끝내 구분할 수 없었습니다. 속도를 내주고 정확도를 샀습니다.</Heading>
  <div className="fw-two">
   <div className="fw-copy">
    <h3>포기한 것 — 속도</h3>
    <p>렌더가 조건부 보조 수단이 아니라 분석의 기본 경로라, 모든 작업이 그만큼 느려집니다.</p>
    <h3>얻은 것 — 애초에 못 풀던 문제</h3>
    <p>셀의 실제 좌표를 얻으면 문항과 빈 칸의 관계가 배치로 드러납니다. 같은 문구가 네 번 반복돼도 어느 행에 있는지로 갈립니다.</p>
   </div>
   <div className="fw-copy">
    <h3>대가로 생긴 것 — 렌더러 의존</h3>
    <p>뒤에 나오는 검증도 같은 렌더러 기준이라, 한글 프로그램에서의 실제 표시와 일치하는지는 이 안에서 확인할 수 없습니다.</p>
    <h3>한 페이지를 세 구역으로</h3>
    <p>페이지를 한 장으로 보면 글자가 작아 대조가 어렵습니다. 편집 대상이 든 구역만 나눠 원본과 비교합니다.</p>
   </div>
  </div>
  <div className="hx-bands">
   {bands.map(([label,desc],i)=><figure key={label}><span className="fw-kicker">{label}</span><div><a href={`/images/hwpx-band-${i+1}.png`} target="_blank" rel="noreferrer" aria-label={`${label} 비교 이미지 원본 크기로 보기`}><img src={`/images/hwpx-band-${i+1}.png`} alt={`${label} — ${desc} 영역의 원본·수정본 상세 비교`} loading="lazy"/></a></div></figure>)}
  </div>
  <p className="fw-note">대표 양식 1건을 실제로 편집한 뒤 생성된 상세 비교 이미지입니다. 빨간 표시가 이번 편집에서 바뀐 칸입니다. 이미지를 누르면 원본 크기로 볼 수 있습니다.</p>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/vision.py'}>구역 분할·비교 구현</Source><Source href={base+'/src/hwp_mcp/server.py'}>analyze_document · render_document</Source></div>
 </section>

 <section id="process" className="fw-section">
  <Heading n="03 / 검수" title="여기가 맞습니까, 하고 먼저 묻습니다.">확인받으면 안전해지지만, 물을 때마다 사용자가 멈춰야 합니다. 그래서 무엇을 묻고 무엇은 묻지 않을지를 갈랐습니다.</Heading>
  <div className="fw-two">
   <div className="fw-copy">
    <h3>묻기로 한 것 — 값이 들어갈 자리</h3>
    <p>대상 칸을 파란 박스로 표시해 보여주고 확인받습니다. 아니라고 하면 고쳐 다시 묻습니다. 여기가 틀리면 문서가 틀리므로 단일 항목을 고칠 때도 건너뛰지 않습니다.</p>
    <h3>묻지 않기로 한 것 — 매핑 자체의 승인</h3>
    <p>확인된 대응을 템플릿으로 저장할 때 그 저장까지 승인받게 할 수도 있었지만 넣지 않았습니다. 사용자가 판단하기 어려운 것을 묻는 절차는 안전 대신 복잡함만 늘립니다.</p>
   </div>
   <div className="fw-copy">
    <h3>스무 개를 한 번에 묻지 않았습니다</h3>
    <p>스무 개를 한 화면에 늘어놓으면 확인이 형식적인 ‘예’로 바뀝니다. 대표 실행에서는 인적사항·여권·주소·근무처처럼 묶어 <strong>일곱 번에 나눠</strong> 물었습니다. 왕복은 늘지만 어디를 보고 답할지 알 수 있습니다.</p>
    <p className="fw-example-label">확인 7회 · 항목 20개 · 되돌림 0회</p>
   </div>
  </div>
  <figure className="fw-cover">
   <a href="/images/hwpx-confirm.png" target="_blank" rel="noreferrer" aria-label="확인 화면 원본 크기로 보기"><img src="/images/hwpx-confirm.png" alt="통합신청서의 성명·생년월일·성별·국적 칸에 파란 사각형이 표시된 확인용 그림" width="794" height="143" loading="lazy"/></a>
   <figcaption>성명·생년월일·성별·국적을 입력하기 전에 실제로 보여준 확인 그림입니다. 파란 박스가 값을 넣을 자리이고, 이 상태에서 답을 기다립니다. 이미지를 누르면 원본 크기로 볼 수 있습니다.</figcaption>
  </figure>
  <p className="fw-note">원본 파일의 해시는 편집 전후로 같았고, 수정본은 별도 파일로 만들어졌습니다. 확인된 칸에만, 원본이 아닌 사본에 씁니다.</p>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/server.py'}>preview_field_section · confirm_visual_candidates</Source><Source href={base+'/src/hwp_mcp/application/editing.py'}>적용·최종화 구현</Source></div>
 </section>

 <section id="result" className="fw-section">
  <Heading n="04 / 결과" title="스무 개 항목이, 각각 어느 칸에 들어갔는지.">출입국관리법 시행규칙 별지 제34호 통합신청서에 가상 정보를 입력했습니다. 앞에서 문제로 꼽았던 칸들이 실제로 어디에 들어갔는지 항목별로 봅니다.</Heading>
  <div className="fw-table" tabIndex="0" role="region" aria-label="요청한 값과 실제로 입력된 칸">
   <table>
    <caption>양식의 문항과, 그 문항의 답으로 입력된 값</caption>
    <thead><tr><th scope="col">양식에 적힌 문항</th><th scope="col">입력한 값</th><th scope="col">칸의 형태</th></tr></thead>
    <tbody>{mapping.map(([v,cell,kind])=><tr key={v}><th scope="row">{cell}</th><td>{v}</td><td>{kind}</td></tr>)}</tbody>
   </table>
  </div>
  <p className="fw-note">스무 건 모두 사용자가 준 값이고, 에이전트가 지어내 채운 값은 없습니다. 문제로 꼽았던 함정도 갈라졌습니다 — <strong>같은 문구의 ‘전화번호’ 칸이 여럿인데, 휴대전화와 근무처 전화번호가 각기 다른 행에 들어갔습니다.</strong></p>
  <Source href={base+'/src/hwp_mcp/application/editing.py'}>편집 계획·적용 구현</Source>

  <Heading n="구조 보존" title="값을 넣은 뒤에도, 문서가 그대로인지 확인했습니다.">원본과 수정본을 자동으로 비교한 검증 리포트에서 읽은 값입니다.</Heading>
  <div className="hx-metrics">{metrics.map(([v,d])=><div key={d}><strong>{v}</strong><span>{d}</span></div>)}</div>
  <div className="fw-context-note">
   <h3>“값을 넣었다”와 “문서가 멀쩡하다”는 다릅니다.</h3>
   <p>값이 바뀌어도 표가 밀리거나 글자가 칸을 넘칠 수 있습니다. 그래서 적용한 값이 계획과 일치하는지와 별개로, 문단·표·페이지 수와 레이아웃 경고를 원본과 대조합니다. 이번 실행에서 감지된 레이아웃 경고 한 건은 빈 원본에도 동일하게 있던 것이며, 편집으로 새로 생긴 경고는 없었습니다.</p>
  </div>
  <p className="fw-note">양식 한 종류를 한 번 실행한 기록이라, 다른 양식이나 반복 실행의 성공률로 확대할 수 없습니다. 검증은 플러그인의 렌더러 기준이며 한글 프로그램 표시나 PDF 변환은 포함되지 않습니다. 입력값은 모두 가상 정보입니다.</p>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/server.py'}>compare_document_versions · validate_document</Source><Source href={base+'/src/hwp_mcp/vision.py'}>렌더 비교 구현</Source></div>
 </section>

 <section id="compose" className="fw-section">
  <Heading n="구성" title="도구가 할 수 있는 일과, 언제 그걸 쓸지를 나눴습니다.">문서 처리를 에이전트 안의 함수로 둘 수도, 별도 도구로 떼어낼 수도 있었습니다. 두 선택의 값이 달랐습니다.</Heading>
  <div className="fw-two">
   <div className="fw-copy">
    <h3>안에 두었다면</h3>
    <p>구현이 단순합니다. 호출 왕복도 연결 관리도 필요 없습니다. 대신 FOWOCO 안에서만 쓸 수 있고, 기능을 키우려면 서비스 전체를 건드려야 합니다.</p>
    <h3>밖으로 뺀 대가</h3>
    <p>연결 관리와 도구 오류 처리가 새로 생기고, 실행 환경도 사용자마다 설치해야 합니다. 그래도 치른 이유는 문서를 분석하고 고치는 일이 이 서비스 하나에만 쓸 기능이 아니라고 봤기 때문입니다.</p>
   </div>
   <div className="fw-copy">
    <h3>도구만으로는 부족했습니다</h3>
    <p>도구 25종을 열어 두자 에이전트가 순서를 틀렸습니다. 분석 전에 필드를 조회하고, 원시 셀 ID를 그대로 쓰고, 위치 확인을 건너뛰었습니다.</p>
    <p>그래서 절차를 Agent Skills 5종으로 고정했습니다. 진입 스킬 하나가 작업을 받아 양식 작성·그림·서식·검증 스킬로 넘깁니다. MCP도 잘못된 순서는 빈 결과 대신 다음 할 일을 알려주도록 고쳤습니다. 안내 문구를 늘리는 대신 실행 단계에서 막는 쪽입니다.</p>
   </div>
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
  <Heading n="향후 방향" title="지금은 각자의 컴퓨터에서, 다음은 서버에서.">MCP 서버는 STDIO로 동작합니다. 에이전트가 사용자의 컴퓨터에서 서버를 띄우고 표준입출력으로 주고받습니다. 이 선택에도 값이 있었습니다.</Heading>
  <div className="fw-two">
   <div className="fw-copy">
    <h3>얻고 있는 것</h3>
    <p>문서가 사용자의 컴퓨터를 벗어나지 않습니다. 공문서에는 주민등록번호나 여권번호가 들어가므로, 이 전제가 설계의 상당 부분을 떠받치고 있습니다.</p>
    <h3>대신 치르고 있는 것</h3>
    <p>쓰려는 사람마다 실행 환경을 설치해야 하고, 렌더와 비교 속도가 그 컴퓨터 사양에 좌우됩니다. 한 번 확인한 양식 정보를 여러 사람이 나눠 쓸 수도 없습니다.</p>
   </div>
   <div className="fw-copy">
    <h3>다음 — Streamable HTTP</h3>
    <p>전송을 Streamable HTTP로 바꾸고 서버를 AWS EC2에, 원본과 작업공간을 S3에 두는 구성을 검토하고 있습니다.</p>
    <h3>어려운 쪽은 전송이 아닙니다</h3>
    <p>FastMCP 위에 있어 전송 교체 자체는 크지 않습니다. 실제 과제는 <strong>“파일이 로컬을 벗어나지 않는다”는 전제가 떠받치던 것들</strong>입니다. 인증과 권한, 문서가 서버에 머무는 범위, 원본 보존을 전부 다시 설계해야 합니다. 지금 공짜로 얻는 안전을 옮기는 순간 직접 구현해야 합니다.</p>
   </div>
  </div>
  <p className="fw-note">Streamable HTTP 전환과 원격 배포는 아직 구현하지 않은 계획입니다. 현재 저장소의 동작은 <code>mcp.json</code>과 서버 진입점 모두 STDIO 기준입니다.</p>
  <div className="fw-conclusion">
   <Heading n="남은 것" title="한 건의 기록으로 말할 수 있는 범위까지만."/>
   <p className="fw-takeaway">분석·확인·검증 장치를 갖췄고, 대표 양식 한 건에서 실제로 동작하는 것까지 확인했습니다. 다만 양식의 배치는 서식마다 다르므로, 다른 양식에서도 같은 정확도가 나오는지는 같은 방식의 기록을 더 쌓은 뒤에 말하려 합니다.</p>
  </div>
 </section>

 <footer className="fw-footer"><Link to="/#projects">← 주요 프로젝트</Link><Link to="/projects/ownhands">다음 프로젝트 · OwnHands →</Link></footer>
 </div>
}
