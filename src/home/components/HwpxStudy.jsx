import React,{useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../styles/fowoco-editorial.css';
import '../styles/hwpx-editorial.css';
const base='https://github.com/taejung3852/hwpx-document-plugin/blob/1a416bca6f35c59856f9b40909337fa443175e42';
const tree='https://github.com/taejung3852/hwpx-document-plugin/tree/1a416bca6f35c59856f9b40909337fa443175e42';
const bands=[['구역 1','신청 종류 선택'],['구역 2','인적사항 · 여권 · 주소 · 근무처'],['구역 3','동의서 · 서명란 · 공용란']];
const dispositions=[['provided','값을 받아 반영할 칸'],['not_applicable','해당 없음으로 확인된 칸'],['intentionally_blank','사용자가 일부러 비워 두기로 한 칸'],['manual_after_export','문서를 내려받은 뒤 손으로 쓸 칸'],['future_e_signature','전자서명으로 채울 칸']];
const metrics=[['34 / 34','계획한 변경이 빠짐없이 적용됐습니다'],['0건','요청하지 않은 칸에서 발생한 변경'],['212 → 212','문단 수가 유지됐습니다'],['1 → 1','표 수와 페이지 수가 유지됐습니다'],['0건','원본에 없던 레이아웃 경고'],['통과','수정본을 다시 열어 분석까지 진행']];
const mcpGroups=[['가져오기 · 등록','3','첨부와 로컬 파일을 허용된 작업 루트 안으로만 들여옵니다.'],['분석 · 매핑','8','구조와 렌더를 함께 읽어 입력칸 후보를 세우고, 틀렸을 때 고칠 수 있게 합니다.'],['입력 확인','2','받은 값을 칸의 형식에 맞게 다듬고, 각 칸을 어떻게 처리할지 기록합니다.'],['편집','4','계획·승인·적용·최종화를 각각 다른 도구로 분리했습니다.'],['검증','4','원본과 수정본을 비교하고, 화면으로 한 번 더 확인합니다.'],['작업 상태','4','중단된 작업을 이어가거나 되돌립니다.']];
const mapping=[['체류기간 연장허가','체류기간 연장허가 EXTENSION OF SOJOURN PERIOD','체크 표시'],['NGUYEN','성 Surname','텍스트'],['VAN AN','명 Given names','텍스트'],['1995-04-12','생년월일 Date of Birth','년·월·일 세 칸으로 분할'],['9504125000000','외국인등록번호 Foreign Resident Registration No.','열세 칸에 한 자씩'],['010-0000-0000','휴대전화 Cell phone No.','텍스트'],['031-000-0000','전화번호 Phone No. — 근무처 행','텍스트'],['3000','연 소득금액 Annual Income Amount','금액 칸']];
const skills=[['hwpx-document','진입점. 첨부를 가져오고 작업에 맞는 도구를 고르도록 안내합니다.'],['hwpx-form-fill','양식에서 요청한 항목을 찾아 입력하거나, 부족한 정보를 질문합니다.'],['hwpx-picture','그림 객체 교체와 증명사진·서명 배치를 다룹니다.'],['hwpx-styling','글자 서식을 지정하고 셀 넘침을 막습니다.'],['hwpx-verification','수정본을 확인해 검증 결과를 보고하고 최종본을 만듭니다.']];
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
  <dl className="fw-role"><dt>담당 영역</dt><dd>MCP 전반 설계·구현 · Agent Skills 설계·개발 · Plugin 패키징</dd></dl>
  <figure className="fw-cover"><img src="/images/hwpx-band-2.png" alt="편집한 통합신청서에서 변경된 칸이 빨간 사각형으로 표시된 비교 이미지" width="794" height="423" loading="eager"/><figcaption>대표 양식을 실제로 편집한 뒤 원본과 비교한 결과입니다. 빨간 표시가 이번 편집에서 바뀐 칸이며, 외국인등록번호처럼 한 값이 여러 칸으로 나뉜 필드도 각 칸 단위로 확인합니다.</figcaption></figure>
  <nav className="fw-toc" aria-label="상세 페이지 목차"><a href="#origin">시작</a><a href="#problem">문제</a><a href="#analyze">분석</a><a href="#values">확인한 값</a><a href="#process">절차</a><a href="#result">결과</a><a href="#compose">구성</a><a href="#future">향후 방향</a></nav>
 </header>

 <section id="origin" className="fw-section">
  <Heading n="00 / 시작" title="FOWOCO 안의 서브그래프 하나에서 시작했습니다.">처음부터 별도 프로젝트는 아니었습니다. 외국인 근로자 행정업무를 돕는 FOWOCO에서 HWPX 문서를 다루던 코드가 떨어져 나온 결과입니다.</Heading>
  <div className="fw-collab-narrative">
   <article><span className="fw-kicker">처음</span><div><h3>에이전트 흐름 안의 한 갈래였습니다.</h3><p>문서 작업은 LangGraph 흐름 안의 서브그래프였습니다. 정해진 양식에 값을 채워 돌려주면 되는, 흐름의 한 단계였습니다.</p></div></article>
   <article><span className="fw-kicker">커지면서</span><div><h3>책임이 한 덩어리로 섞였습니다.</h3><p>양식마다 구조가 다르다는 걸 알게 되면서 분석과 확인, 검증이 계속 붙었습니다. 업무 흐름을 조율하는 일과 문서를 다루는 일이 같은 자리에서 자라기 시작했습니다.</p></div></article>
   <article><span className="fw-kicker">판단</span><div><h3>내부 함수로 정리하지 않았습니다.</h3><p>함수로 묶어도 FOWOCO 안에서만 쓸 수 있습니다. 문서를 분석하고 고치는 일은 이 서비스 밖에서도 쓸 데가 보였고, 더 키울 여지도 컸습니다. 그래서 에이전트 안에 두지 않고 MCP 도구로 경계를 그었습니다.</p></div></article>
  </div>
  <p className="fw-takeaway">그 경계 밖으로 떼어낸 것이 이 프로젝트입니다. 에이전트는 작업 흐름을 조율하고, 문서 도구는 문서만 맡습니다.</p>
  <p><Link className="fw-source" to="/projects/fowoco">FOWOCO에서의 분리 과정 보기 →</Link></p>
 </section>

 <section id="problem" className="fw-section">
  <div className="fw-two">
   <Heading n="01 / 문제" title="위치는 알 수 있어도, 어느 칸에 쓸지는 알 수 없었습니다."/>
   <div className="fw-copy">
    <h3>구조는 읽히는데, 대응이 없습니다</h3>
    <p>HWPX는 XML을 압축한 형식이라 문단·표·셀의 위치와 이미 들어 있는 값은 정확히 읽을 수 있습니다. 그런데 “이 질문의 답을 어느 칸에 쓰는가”는 파일 안에 적혀 있지 않습니다. 질문과 입력칸의 대응은 사람이 문서를 볼 때의 배치로만 드러납니다.</p>
    <h3>같은 문구의 칸이 네 곳입니다</h3>
    <p>대표로 사용한 통합신청서에는 전화·연락처를 적는 칸이 여섯 곳 있습니다. 그중 네 곳은 <strong>‘전화번호 Phone No.’라는 완전히 같은 문구</strong>입니다. 본국 주소, 학교, 원 근무처, 예정 근무처에 각각 하나씩 붙어 있습니다. 문구만으로는 어느 것이 어느 것인지 구분할 수 없고, 표에서 어느 행에 놓였는지로만 갈립니다.</p>
    <h3>한 값이 여러 칸으로 흩어집니다</h3>
    <p>생년월일은 년·월·일 세 칸에, 외국인등록번호는 열세 칸에 한 자씩 들어갑니다. 성과 명도 각각 다른 칸입니다. 값 하나를 어디에 쓸지가 아니라, 어떻게 쪼개 넣을지까지 정해야 합니다.</p>
    <p className="fw-example-label">셀 157개 · 같은 문구의 칸 4곳 · 한 값이 13칸으로 분할</p>
   </div>
  </div>
  <figure className="fw-cover">
   <img src="/images/hwpx-blank-2.png" alt="빈 통합신청서의 인적사항·주소·근무처 구간. 전화번호 칸이 여러 곳에 반복되고 등록번호가 낱칸으로 나뉘어 있다." width="794" height="423" loading="lazy"/>
   <figcaption>편집하기 전의 빈 원본입니다. 오른쪽 열을 따라 ‘전화번호 Phone No.’가 본국 주소·학교·원 근무처·예정 근무처 옆에 같은 문구로 반복되고, 외국인등록번호는 낱칸으로 나뉘어 있습니다. 어느 칸이 어떤 질문의 답인지는 이 배치를 봐야 정해집니다.</figcaption>
  </figure>
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
  <Heading n="03 / 확인한 값" title="빈칸마다, 비운 이유가 다릅니다.">사용자가 모든 칸을 채워 주지는 않습니다. 남은 칸을 에이전트가 추측해 채우면 문서가 사실과 달라집니다. 그렇다고 전부 똑같이 비워 두면 아직 받지 못한 값과 일부러 비운 값이 구분되지 않아, 무엇을 더 물어봐야 하는지 알 수 없습니다. 그래서 각 칸의 처리를 다섯 가지로 나눠 기록합니다.</Heading>
  <dl className="fw-metric-guide">{dispositions.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
  <p className="fw-note">다섯 값은 <code>fields.py</code>의 Disposition 정의 그대로입니다. 이 구분 덕분에 “아직 못 받은 값”과 “받지 않기로 한 값”이 섞이지 않습니다.</p>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/fields.py'}>Disposition 정의</Source><Source href={base+'/src/hwp_mcp/server.py'}>update_field_interview</Source></div>
 </section>

 <section id="process" className="fw-section">
  <Heading n="04 / 절차" title="바꾸기 전에, 무엇을 어디에 쓸지 확인받습니다.">앞의 판단이 맞았는지는 문서를 실제로 고쳐 봐야 드러납니다. 그런데 고치고 난 뒤에는 이미 늦습니다. 그래서 수정할 위치와 값을 먼저 한 곳에 모아 확인받고, 승인과 적용을 별도 단계로 분리했습니다.</Heading>
  <ol className="fw-collab-flow">
   <li><b>계획</b><span>수정할 칸과 값을 Edit Plan 하나로 모읍니다.</span></li>
   <li><b>승인</b><span>HMAC-SHA256 승인 영수증을 검증해야 다음으로 넘어갑니다.</span></li>
   <li><b>적용</b><span>격리된 작업공간의 사본에만 적용하고, 원본은 덮어쓰지 않습니다.</span></li>
  </ol>
  <p className="fw-note">대표 실행에서도 원본 파일의 해시는 편집 전후로 동일했고, 수정본은 별도 파일로 생성됐습니다.</p>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/server.py'}>create · approve · apply_edit_plan</Source><Source href={base+'/src/hwp_mcp/application/editing.py'}>적용·최종화 구현</Source></div>
 </section>

 <section id="result" className="fw-section">
  <Heading n="05 / 결과" title="요청한 값이, 요청한 칸에 들어갔습니다.">출입국관리법 시행규칙 별지 제34호 통합신청서에 가상 정보를 입력했습니다. 앞에서 문제로 꼽은 칸들이 실제로 어떻게 처리됐는지부터 봅니다.</Heading>
  <div className="fw-table" tabIndex="0" role="region" aria-label="요청한 값과 실제로 입력된 칸">
   <table>
    <caption>편집 계획에 기록된 값과, 그 값이 들어간 칸의 양식 문구</caption>
    <thead><tr><th scope="col">요청한 값</th><th scope="col">들어간 칸</th><th scope="col">칸의 형태</th></tr></thead>
    <tbody>{mapping.map(([v,cell,kind])=><tr key={v}><th scope="row">{v}</th><td>{cell}</td><td>{kind}</td></tr>)}</tbody>
   </table>
  </div>
  <p className="fw-note">스무 개 항목 전부가 이렇게 기록됐고, 값의 출처는 스무 건 모두 사용자 입력이었습니다. 에이전트가 지어내 채운 값은 없습니다. 문제로 꼽았던 함정도 갈라졌습니다. 성과 명이 각각 다른 칸으로, 생년월일과 등록번호가 여러 칸으로 나뉘었고, <strong>‘전화번호’라는 같은 문구의 칸이 여럿인데 휴대전화와 근무처 전화번호가 각기 다른 행에 들어갔습니다.</strong></p>
  <Source href={base+'/src/hwp_mcp/application/editing.py'}>편집 계획·적용 구현</Source>

  <Heading n="구조 보존" title="값을 넣은 뒤에도, 문서가 그대로인지 확인했습니다.">원본과 수정본을 자동으로 비교한 검증 리포트에서 읽은 값입니다.</Heading>
  <div className="hx-metrics">{metrics.map(([v,d])=><div key={d}><strong>{v}</strong><span>{d}</span></div>)}</div>
  <div className="fw-context-note">
   <h3>“값을 넣었다”와 “문서가 멀쩡하다”는 다릅니다.</h3>
   <p>값이 바뀌어도 표가 밀리거나 글자가 칸을 넘칠 수 있습니다. 그래서 적용한 값이 계획과 일치하는지와 별개로, 문단·표·페이지 수와 레이아웃 경고를 원본과 대조합니다. 이번 실행에서 감지된 레이아웃 경고 한 건은 빈 원본에도 동일하게 있던 것이며, 편집으로 새로 생긴 경고는 없었습니다.</p>
  </div>
  <p className="fw-note">양식 한 종류를 한 번 실행한 기록입니다. 다른 양식이나 반복 실행의 성공률로 확대해 말할 수 없습니다. 비교와 재개방 확인은 플러그인이 사용하는 렌더러 기준이며, 한글 프로그램에서의 표시나 PDF 변환의 양식 보존은 이 결과에 포함되지 않습니다. 입력값은 모두 가상 정보입니다.</p>
  <div className="fw-proof-links"><Source href={base+'/src/hwp_mcp/server.py'}>compare_document_versions · validate_document</Source><Source href={base+'/src/hwp_mcp/vision.py'}>렌더 비교 구현</Source></div>
 </section>

 <section id="compose" className="fw-section">
  <Heading n="구성" title="도구가 할 수 있는 일과, 언제 그걸 쓸지를 나눴습니다.">문서를 다루는 실제 동작은 MCP 서버가, 어떤 순서로 무엇을 물어보고 확인할지는 Agent Skills가 맡습니다. 둘을 하나의 플러그인으로 묶어 설치 한 번으로 붙도록 만들었습니다.</Heading>

  <Heading n="MCP 서버" title="문서 작업을 25개의 도구로 쪼갰습니다."/>
  <ol className="fw-ranking">{mcpGroups.map(([name,n,desc])=><li key={name}><span>{n}종</span><div><strong>{name}</strong><small>{desc}</small></div></li>)}</ol>
  <p className="fw-note">한 번의 호출로 “문서를 고쳐 줘”를 처리하지 않고, 가져오기·분석·확인·편집·검증을 각각 별도 도구로 나눴습니다. 중간에 사람이 끼어들 지점을 만들기 위해서입니다.</p>
  <Source href={tree+'/src/hwp_mcp'}>MCP 구현</Source>

  <Heading n="Agent Skills" title="진입 스킬 하나에, 작업별 스킬 넷."/>
  <dl className="fw-metric-guide">{skills.map(([k,v])=><div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
  <p className="fw-note">도구 25개를 전부 설명하는 대신, 무엇을 하려는 상황인지에 따라 필요한 절차만 읽히도록 나눴습니다. 에이전트는 <code>hwpx-document</code>로 들어와 작업에 맞는 스킬로 옮겨 갑니다.</p>
  <Source href={tree+'/skills'}>Agent Skills</Source>

  <Heading n="플러그인" title="설치 한 번이면 도구와 절차가 함께 붙습니다."/>
  <figure className="fw-boundary">
   <article><span className="fw-kicker">mcp.json</span><h3>MCP 서버</h3><p>도구 25종<br/>문서를 실제로 다루는 동작</p></article>
   <div className="fw-connection"><span className="fw-connection-label">plugin.json 으로 함께 묶임</span><span className="fw-connection-arrow" aria-hidden="true">↔</span></div>
   <article><span className="fw-kicker">skills</span><h3>Agent Skills</h3><p>절차 5종<br/>언제 무엇을 호출할지 판단</p></article>
   <figcaption>사용자가 MCP 설정을 직접 편집하지 않아도 되도록, 서버 실행 방법과 작업 절차를 하나의 플러그인 패키지로 묶었습니다. 2인 팀 프로젝트이며, 저장소에 함께 있는 WASM 뷰어 실험은 다른 팀원의 작업입니다.</figcaption>
  </figure>
  <div className="fw-proof-links"><Source href={base+'/plugin.json'}>plugin.json</Source><Source href={base+'/mcp.json'}>mcp.json</Source></div>
 </section>

 <section id="future" className="fw-section">
  <Heading n="향후 방향" title="지금은 각자의 컴퓨터에서, 다음은 서버에서.">현재 MCP 서버는 STDIO로 동작합니다. 에이전트가 사용자의 컴퓨터에서 서버 프로세스를 띄우고 표준입출력으로 주고받는 방식입니다.</Heading>
  <div className="fw-collab-narrative">
   <article><span className="fw-kicker">현재</span><div><h3>로컬 프로세스로 실행됩니다.</h3><p>문서가 사용자의 컴퓨터에 있고, 서버도 같은 컴퓨터에서 실행됩니다. 파일이 밖으로 나가지 않는다는 점은 장점이지만, 쓰려는 사람마다 실행 환경을 설치해야 합니다.</p></div></article>
   <article><span className="fw-kicker">한계</span><div><h3>기기에 묶입니다.</h3><p>다른 컴퓨터에서는 다시 설치해야 하고, 렌더링과 비교 작업의 속도가 그 컴퓨터의 사양에 좌우됩니다. 한 번 확인한 양식의 입력칸 정보를 여러 사람이 나눠 쓰기도 어렵습니다.</p></div></article>
   <article><span className="fw-kicker">계획</span><div><h3>Streamable HTTP로 바꿔 서버에 올립니다.</h3><p>전송 방식을 STDIO에서 Streamable HTTP로 바꾸고, 서버를 AWS EC2에 두려 합니다. 원본과 렌더 결과·작업공간은 S3에 보관하는 구성을 검토하고 있습니다. 설치 없이 접속만으로 같은 도구를 쓰고, 한 번 확인한 양식의 입력칸 정보를 재사용하는 것이 목표입니다.</p></div></article>
  </div>
  <p className="fw-note">Streamable HTTP 전환과 원격 배포는 아직 구현하지 않은 계획입니다. 현재 저장소의 동작은 <code>mcp.json</code>과 서버 진입점 모두 STDIO 기준입니다.</p>
  <div className="fw-conclusion">
   <Heading n="남은 것" title="한 건의 기록으로 말할 수 있는 범위까지만."/>
   <p className="fw-takeaway">분석·확인·승인·검증 장치를 갖췄고, 대표 양식 한 건에서 실제로 동작하는 것까지 확인했습니다. 다만 양식의 배치는 서식마다 다르므로, 다른 양식에서도 같은 정확도가 나오는지는 같은 방식의 기록을 더 쌓은 뒤에 말하려 합니다.</p>
  </div>
 </section>

 <footer className="fw-footer"><Link to="/#projects">← 주요 프로젝트</Link><Link to="/projects/ownhands">다음 프로젝트 · OwnHands →</Link></footer>
 </div>
}
