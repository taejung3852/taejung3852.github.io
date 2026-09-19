import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/fowoco-editorial.css';
import useTocSpy from './useTocSpy';

const repo = 'https://github.com/taejung3852/OwnHands';
const base = repo + '/blob/779b5568c38a154b4dc7b55818e806a5e53639f0';

function Source({ href, children = '구현 근거' }) {
  return <a className="fw-source" href={href} target="_blank" rel="noreferrer">{children} ↗</a>;
}
function Heading({ n, title, children }) {
  return <header className="fw-heading"><span className="fw-kicker">{n}</span><h3>{title}</h3>{children && <p>{children}</p>}</header>;
}
function Part({ n, title, id }) {
  return <div className="fw-part" id={id}><span>{n}</span><h2>{title}</h2></div>;
}
function Facts({ items }) {
  return <ul className="fw-facts">{items.map(([k, v], i) => <li key={i}><b>{k}</b><span>{v}</span></li>)}</ul>;
}

export default function OwnhandsStudy() {
  useTocSpy();
  const dialog = useRef(null), [shot, setShot] = useState(null);
  const zoom = s => { setShot(s); dialog.current.showModal(); };

  useEffect(() => {
    document.title = 'OwnHands | 박태정';
    return () => { document.title = '박태정 | AI Agent / LLM Application Developer'; };
  }, []);

  return (
    <div className="fw-study">
      <dialog ref={dialog} className="fw-dialog" aria-label={shot?.alt || '이미지 크게 보기'} onClick={e => { if (e.target === e.currentTarget) dialog.current.close(); }}>
        <button type="button" className="fw-dialog-close" autoFocus onClick={() => dialog.current.close()} aria-label="닫기">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>
        {shot && <img src={shot.src} alt={shot.alt}/>}
      </dialog>

      <header className="fw-hero">
        <div className="fw-topbar">
          <Link className="fw-back" to="/#projects">← 주요 프로젝트</Link>
          <span>OwnHands</span>
        </div>
        <div className="fw-hero-split">
          <div className="fw-hero-copy">
            <p className="fw-kicker">개인 프로젝트 · 검증 Core 설계 및 개발 중</p>
            <h1>AI의 작업을 사람이 통제하고,<br/>근거로 최종 판단합니다.</h1>
            <p className="fw-lead">AI가 완료했다고 말하는 것과 사람이 승인할 수 있는 상태를 분리합니다. Issue에서 시작해 변경 근거(Evidence)를 대조하고 사람의 결정으로 닫히는 Human Review 검증 도구입니다.</p>
          </div>
          <figure className="fw-cover">
            <button type="button" className="fw-zoom" aria-label="OwnHands 로고 및 개요 크게 보기" onClick={() => zoom({ src: '/images/ownhands-cover.png', alt: 'OwnHands 로고 — 에이전트 작업 검증 프레임워크' })}>
              <img src="/images/ownhands-cover.png" width="648" height="691" alt="OwnHands 로고 및 검증 프레임워크 개요" loading="eager"/>
            </button>
            <figcaption>OwnHands — AI 에이전트 작업의 완료 상태와 사람의 승인을 분리하는 검증 프레임워크</figcaption>
          </figure>
        </div>
        <dl className="fw-meta">
          <div><dt>구성</dt><dd>6단계 검증 라이프사이클 · Verification Core · Review Artifact</dd></div>
          <div><dt>담당</dt><dd>제품 방향 설계 · 검증 Core 설계·개발 · Issue 기반 검증 흐름 설계</dd></div>
          <div><dt>스택</dt><dd>SQLite · MCP · Agent Skills · Pytest</dd></div>
        </dl>
      </header>

      <nav className="fw-toc" aria-label="상세 페이지 목차">
        <a href="#p-scope">배경과 문제의식</a>
        <a href="#p-lifecycle">검증 생명주기</a>
        <a href="#p-evidence">증거와 산출물</a>
        <a href="#p-reflection">회고</a>
      </nav>

      <Part n="00" title="배경과 문제의식" id="p-scope"/>
      <section id="scope" className="fw-section">
        <Heading n="문제 정의" title="완료했다는 말과 승인할 수 있는 상태의 간격">
          AI 코딩 도구가 '수정을 완료했습니다'라고 선언할 때, 사람이 그것을 믿고 바로 배포할 수 있을까요?
        </Heading>
        <Facts items={[
          ['할루시네이션 선언', '단순 문법 검사 통과나 파일 수정만으로 작업 완료를 주장하며, 숨겨진 결함을 놓칩니다.'],
          ['근거 없는 리뷰', '무엇이 왜 바뀌었는지에 대한 검증 근거(Evidence) 없이 코드 diff만 보고 승인 여부를 떠넘깁니다.'],
          ['이름과 패키지', '포트폴리오의 제품명은 OwnHands이며, 초기 마일스톤 저장소 및 패키지명은 DevHarness로 시작해 발전해 왔습니다.']
        ]}/>
        <p className="fw-context-note">
          문제를 해결하려면 <strong>'작업의 변경사항(Change)'</strong>과 <strong>'입증 근거(Evidence)'</strong>를 분리하고, <strong>'최종 승인 권한'</strong>은 반드시 사람이 쥐고 있는 구조가 필요했습니다.
        </p>
        <Source href={base + '/README.md'}>OwnHands 기준 README 보기</Source>
      </section>

      <Part n="01" title="검증 생명주기" id="p-lifecycle"/>
      <section id="lifecycle" className="fw-section">
        <Heading n="6단계 프로세스" title="Issue에서 시작해 사람의 판단으로 끝나는 닫힌 루프">
          작업을 추측으로 끝내지 않도록 사전에 검증 기준을 정의하고 사후에 대조합니다.
        </Heading>
        <figure className="fw-scope" style={{ marginTop: '28px' }}>
          <div className="fw-scope-flow">
            <div className="fw-scope-stage"><span>01</span><h3>Issue</h3><p>해결할 문제와 요구 범위 정의</p></div>
            <div className="fw-scope-stage"><span>02</span><h3>Verification Spec</h3><p>사전 통과 기준과 검증 체크리스트</p></div>
            <div className="fw-scope-owned">
              <span className="fw-scope-label">작업 & 증거 수집</span>
              <article><h3>03 Baseline → 04 Impl</h3><p>변경 전후 상태와 수정 실행</p></article>
              <article><h3>05 Review</h3><p>Evidence ID · Hash · 판정 산출</p></article>
            </div>
            <div className="fw-scope-stage"><span>06</span><h3>Human Decision</h3><p>사람의 최종 승인 및 머지 결정</p></div>
          </div>
          <figcaption>에이전트의 작업은 05 Review에서 끝나며, 마지막 06 결정은 승인권자의 몫으로 남깁니다.</figcaption>
        </figure>
      </section>

      <Part n="02" title="증거와 산출물" id="p-evidence"/>
      <section id="evidence" className="fw-section">
        <Heading n="신뢰의 기반" title="모르는 것을 모른다고 명시하는 unobserved / unknown 1급 상태">
          수행된 모든 작업은 로컬 환경에서 재현 가능하고 검증 가능한 데이터로 남깁니다.
        </Heading>
        <Facts items={[
          ['unobserved / unknown', '확인하지 못한 영역을 암묵적으로 넘어가지 않고, 1급 상태(First-class citizen)로 두어 모르는 것을 명확히 드러냅니다.'],
          ['Raw Evidence', '실제 테스트 실행 로그, 실행 바이너리 해시, 실행 환경 정보. 로컬 경계에 보존되어 변조를 방지합니다.'],
          ['Review Artifact', '사람이 1분 안에 스캔할 수 있도록 Claim(주장)과 확인 범위, 무결성 해시, 최종 판정만을 추출한 정제된 보고서.'],
          ['합성 Fixture 검증', 'M1 단계에서 합성 Fixture를 주입해 Evidence를 수집하고, 모순이나 결함 발생 시 승인 불가를 판정하는 Core 로직 검증 완료.']
        ]}/>
        <div className="fw-check-case">
          <h3>검토 보고서(Review Artifact) 구성 요소</h3>
          <dl>
            <div><dt>Evidence ID</dt><dd>고유 식별자와 작업 추적 키</dd></div>
            <div><dt>Integrity Hash</dt><dd>실행 결과 로그의 sha256 무결성 검증 값</dd></div>
            <div><dt>Scope</dt><dd>검증기가 실제로 실행하고 확인한 코드/테스트 범위 (미확인 영역 unobserved 구분)</dd></div>
            <div><dt>Decision Draft</dt><dd>승인 권고 / 추가 확인 필요 여부 및 잔여 불확실성 명시</dd></div>
          </dl>
          <p>보고서는 '다 끝났다'고 설득하는 문서가 아니라, '무엇을 확인했고 무엇은 확인하지 못했는가'를 솔직하게 밝히는 역할을 합니다.</p>
        </div>
      </section>

      <Part n="03" title="회고" id="p-reflection"/>
      <section id="reflection" className="fw-section">
        <Heading n="V1의 교훈과 V2 전환" title="도구의 비대화를 걷어내고, 요청 시 생성하는 Explain으로">
          직접 만들면서 배운 시스템 운영의 현실적인 한계와 새로운 도약.
        </Heading>
        <div className="fw-two">
          <div className="fw-copy">
            <h3>V1에서 발견한 한계</h3>
            <p>V1에서 Issue → Spec → Review → Evidence → Dashboard를 실제로 구현했습니다. 하지만 상시 대시보드를 유지하려다 보니 접속·폴링·캐시 관리 등 도구 자체의 운영 부담이 본래 목적인 '작업 이해'보다 더 커지는 모순을 마주했습니다.</p>
            <p>'검증은 필요 없다'가 아니라, 검증 원칙을 지키되 시스템의 복잡도를 혁신적으로 줄여야 한다는 결론을 얻었습니다.</p>
          </div>
          <div className="fw-copy">
            <h3>V2: 온디맨드 Explain과 Agent Skills</h3>
            <p>V2는 무거운 별도 대시보드 대신, 개발자가 원할 때 온디맨드로 생성하는 <strong>Explain 산출물</strong>과 에이전트가 직접 읽는 <strong>Agent Skills</strong>(<code>write-issue-pr</code>, <code>explain</code>) 중심의 가벼운 구조로 재설계했습니다.</p>
            <p>검증 원칙(Verification Core)은 그대로 지키면서, 개발자의 일상적인 터미널 및 에디터 환경에 자연스럽게 스며드는 개발 시스템을 지향합니다.</p>
          </div>
        </div>
      </section>

      <footer className="fw-footer">
        <Link className="fw-back" to="/#projects">← 주요 프로젝트로 돌아가기</Link>
        <Link className="fw-inline-link" to="/projects/llm-gateway">다음 프로젝트 · LLM Gateway Service →</Link>
      </footer>
    </div>
  );
}
