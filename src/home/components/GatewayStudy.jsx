import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/gateway-study.css';

const commits = [
  ['AWS SageMaker JumpStart 연결 구성', 'b097447c0896589f59d623e68e810354f124d2da'],
  ['AWS SageMaker JumpStart 연동 비활성화', 'cbdec737db45b6132156ac6d9e668aabf47560f8'],
  ['Ollama 스트리밍 연결', 'f26daf703155db4efec78dd8539e81183a918256'],
];

export default function GatewayStudy() {
  const preview = useRef(null);
  const [screen, setScreen] = useState("input");
  const openScreen = (name) => { setScreen(name); preview.current.showModal(); };
  useEffect(() => {
    const previous = document.title;
    document.title = 'LLM Gateway Service | 박태정';
    return () => { document.title = previous; };
  }, []);
  return <article className="gateway-study">
    <header className="gw-opening">
      <Link className="gw-back" to="/#projects">← 주요 프로젝트</Link>
      <div className="gw-hero"><div className="gw-hero-copy">
      <p className="gw-kicker">LLM Gateway Service · 2인 팀 프로젝트</p>
      <h1>사용 조건에 맞는 LLM을<br />선택하고 연결하는 서비스</h1>
      <p className="gw-lead">사용자가 비용·속도·성능·문맥 길이의 중요도를 설정하면, 그 기준에 맞는 모델을 선택해 대화하는 서비스입니다.</p>
      </div><figure className="gw-screen"><button type="button" className="gw-thumbnail" aria-label="모델 선택 기준 설정 화면 확대" onClick={()=>openScreen("input")}><div className="gw-input-crop"><img src="/images/gateway-input.png" width="1515" height="1038" alt="GateIn에서 가성비·속도·성능·기억력의 중요도를 조절하고 질문하는 화면"/></div><span>화면 크게 보기 ↗</span></button><figcaption>모델 선택 기준 설정 · 네 가지 중요도를 조절하고 질문을 입력합니다.</figcaption></figure></div>
      <div className="gw-profile-summary"><div><dl className="gw-role"><dt>역할</dt><dd><span>모델 호출·스트리밍 연동</span><span>모델 메타데이터 확장</span><span>AWS SageMaker JumpStart·Ollama 환경 구성</span></dd></dl><p className="gw-team">모델 선택 점수식의 핵심 구현은 팀원이 담당했습니다.</p></div></div>
      <nav className="gw-nav" aria-label="Gateway 페이지 목차"><a href="#gw-integration">모델 연결</a><a href="#gw-runtime">실행 환경 선택</a><a href="#gw-reflection">회고</a></nav>
    </header>

    <dialog ref={preview} className="gw-image-dialog" aria-label={screen === "input" ? "모델 선택 기준 설정 화면 확대" : "서비스 채팅 화면 확대"} onClick={e=>{if(e.target===e.currentTarget)preview.current.close()}}><div className="gw-dialog-top"><button type="button" autoFocus onClick={()=>preview.current.close()} aria-label="확대 화면 닫기"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button></div><img src={screen === "input" ? "/images/gateway-input.png" : "/images/gateway-chat.png"} alt={screen === "input" ? "GateIn의 모델 선택 기준 설정 및 질문 입력 화면" : "GateIn의 선택된 모델과 생성된 채팅 응답 화면"}/></dialog>

    <section className="gw-section" id="gw-integration">
      <p className="gw-kicker">01 · 서로 다른 모델 연결</p>
      <h2>서로 다른 모델들을,<br />하나의 서비스에서 사용할 수 있도록.</h2>
      <div className="gw-decision-intro"><span className="gw-kicker">문제</span><h3>라이브러리의 기본 연동만으로는 호출할 수 없는 모델이 있었습니다.</h3><p>당시 LangChain4j 베타 버전은 일부 오픈소스 모델의 연동을 지원하지 않았습니다. 요청·응답 형식이 다른 이 모델들을 서비스에 연결할 방법이 필요했습니다.</p></div>
      <div className="gw-solution-title"><span className="gw-kicker">해결</span><h3>지원하는 연동은 활용하고, 부족한 연결은 직접 구현했습니다.</h3></div>
      <p className="gw-section-lead">LangChain4j가 기본 연동을 제공하지 않는 모델은 요청·응답 변환을 직접 구현했습니다. 모델별 차이를 연결 부분에서 처리해 서비스는 같은 호출 방식을 유지하도록 했습니다.</p>
      <figure className="gw-connection-map" aria-label="하나의 공통 호출에 연결된 두 가지 모델 연동 방식">
        <div className="gw-map-root"><span className="gw-kicker">서비스</span><strong>하나의 공통 호출</strong></div>
        <div className="gw-map-branches">
          <div><span className="gw-kicker">기존 기능 활용</span><h3>LangChain4j 제공 연동</h3><p>LangChain4j에서 기본 연동을 지원하는 모델</p></div>
          <div><span className="gw-kicker">직접 구현</span><h3>모델별 요청·응답 변환</h3><p>LangChain4j에서 기본 연동을 지원하지 않는 모델</p></div>
        </div>
        <figcaption>선택된 모델에 따라 연결 방식이 달라져도, 서비스는 공통 방식으로 요청하고 응답을 받습니다.</figcaption>
      </figure>
      <div className="gw-outcome"><span className="gw-kicker">결과</span><p>개발 당시 우리 인터페이스에서 선택된 모델로 요청이 연결되는 것을 확인했습니다.</p><button type="button" className="gw-source gw-screen-link" onClick={()=>openScreen("chat")}>실제 채팅 화면 보기 ↗</button></div>
      <aside className="gw-evidence" aria-label="모델 연결 구현 근거"><h3>당시 구현 근거</h3><ul><li><a href="https://github.com/taejung3852/llm-gateway/blob/b097447c0896589f59d623e68e810354f124d2da/src/main/java/site/gatein/backend/chat/config/sagemaker/GemmaChatModel.java" target="_blank" rel="noreferrer">요청 구성·응답 변환 ↗</a></li><li><a href="https://github.com/taejung3852/llm-gateway/blob/b097447c0896589f59d623e68e810354f124d2da/src/main/java/site/gatein/backend/chat/config/models/opensource/GemmaConfig.java" target="_blank" rel="noreferrer">모델 등록 ↗</a></li><li><a href="https://github.com/taejung3852/llm-gateway/blob/b097447c0896589f59d623e68e810354f124d2da/src/main/java/site/gatein/backend/chat/service/AssistanceService.java" target="_blank" rel="noreferrer">모델 이름별 호출 ↗</a></li></ul><p>링크는 당시 연결 구현의 근거이며, 라우팅 확인은 개발 당시의 경험입니다.</p></aside>
    </section>

    <section className="gw-section" id="gw-runtime">
      <p className="gw-kicker">02 · 실행 환경 선택</p>
      <h2>AWS SageMaker JumpStart로 연동을 검증하고,<br />보유 GPU에 실행 환경을 구축했습니다.</h2>
      <div className="gw-decision-intro"><span className="gw-kicker">문제</span><h3>서비스에 오픈소스 모델을 연결할 수 있는지 먼저 확인해야 했습니다.</h3><p>직접 GPU 환경을 구축하기에 앞서, 서비스와 모델이 연결되는지 빠르게 검증할 필요가 있었습니다.</p></div>
      <div className="gw-solution-title"><span className="gw-kicker">해결</span><h3>검증 단계와 이후 운영에 맞춰 환경을 나눴습니다.</h3></div><p className="gw-section-lead">초기에는 비용이 들더라도 빠르게 연동을 검증할 수 있는 AWS SageMaker JumpStart를 선택했습니다. 연결 가능성을 확인한 뒤에는 클라우드 지출을 줄이기 위해 보유 GPU에 Ollama 환경을 구성했습니다.</p>
      <div className="gw-outcome"><span className="gw-kicker">결과</span><h3>보유 GPU에 Ollama 환경을 구성하고, 약 3주간 베타 서비스를 운영했습니다.</h3><p>이후 모델의 부분 응답과 완료·오류 이벤트를 WebSocket 기반 메시지 전달·저장 흐름에 연결했습니다.</p><a className="gw-source" href="https://github.com/taejung3852/llm-gateway/commit/22a9c5eac4eec8678fba7ffefe7a09d3f3688d24" target="_blank" rel="noreferrer">스트리밍 변경 이력 ↗</a></div>
      <aside className="gw-evidence" aria-label="실행 환경 변경 근거"><h3>관련 변경 이력</h3><ul>{commits.map(([label,sha])=><li key={sha}><a href={`https://github.com/taejung3852/llm-gateway/commit/${sha}`} target="_blank" rel="noreferrer">{label} <span aria-hidden="true">↗</span></a></li>)}</ul><p>실행 환경의 연결·변경 기록입니다.</p></aside>
    </section>

    <section className="gw-section" id="gw-reflection"><p className="gw-kicker">돌아보며 · 통신 방식의 선택</p><h2>응답 스트리밍에<br />양방향 연결이 꼭 필요했을까?</h2><div className="gw-copy"><p>당시에는 실시간 채팅을 구현하기 위해 WebSocket을 선택했습니다. 돌아보면 핵심 요구는 사용자의 요청을 받은 뒤, 서버가 생성한 응답을 순차적으로 전달하는 것이었습니다.</p><p>지금 다시 설계한다면 요청은 REST로 받고, 응답은 SSE로 전달하는 구성을 먼저 검토하겠습니다. 양방향 연결과 구독 관리가 실제 요구에 비해 복잡했던 것은 아닌지 돌아보게 됐습니다.</p><p className="gw-reflection-note">SSE 전환이나 비교 실험을 수행한 것은 아닙니다. 당시 구현을 돌아본 재설계 방향입니다.</p></div></section>
    <footer className="gw-footer"><Link to="/#projects">← 주요 프로젝트</Link><Link to="/projects/fowoco">다음 프로젝트 · FOWOCO →</Link></footer>
  </article>;
}
