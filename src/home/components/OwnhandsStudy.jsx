import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/fowoco-editorial.css';
import '../styles/ownhands-editorial.css';
import useTocSpy from './useTocSpy';

const repo = 'https://github.com/taejung3852/OwnHands';

function Source({ href, children = '구현 근거' }) {
  return (
    <a className="fw-source" href={href} target="_blank" rel="noreferrer">
      {children} ↗
    </a>
  );
}

function Heading({ n, title, children }) {
  return (
    <header className="fw-heading">
      <span className="fw-kicker">{n}</span>
      <h3>{title}</h3>
      {children && <p>{children}</p>}
    </header>
  );
}

function Part({ n, title, id }) {
  return (
    <div className="fw-part" id={id}>
      <span>{n}</span>
      <h2>{title}</h2>
    </div>
  );
}

function Facts({ items }) {
  return (
    <ul className="fw-facts">
      {items.map(([k, v], i) => (
        <li key={i}>
          <b>{k}</b>
          <span>{v}</span>
        </li>
      ))}
    </ul>
  );
}

export default function OwnhandsStudy() {
  useTocSpy();
  const dialog = useRef(null);
  const [shot, setShot] = useState(null);
  const zoom = (s) => {
    setShot(s);
    dialog.current.showModal();
  };

  useEffect(() => {
    document.title = 'OwnHands | 박태정';
    return () => {
      document.title = '박태정 | AI Agent / LLM Application Developer';
    };
  }, []);

  return (
    <div className="fw-study">
      <dialog
        ref={dialog}
        className="fw-dialog"
        aria-label={shot?.alt || '이미지 크게 보기'}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current.close();
        }}
      >
        <button
          type="button"
          className="fw-dialog-close"
          autoFocus
          onClick={() => dialog.current.close()}
          aria-label="닫기"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {shot && <img src={shot.src} alt={shot.alt} />}
      </dialog>

      {/* Hero Header */}
      <header className="fw-hero">
        <div className="fw-topbar">
          <Link className="fw-back" to="/#projects">← 주요 프로젝트</Link>
          <span>OwnHands</span>
        </div>
        <div className="fw-hero-split">
          <div className="fw-hero-copy">
            <p className="fw-kicker">개인 프로젝트 · AI-Native SDLC 개발 하네스 · V2 설계</p>
            <h1>AI의 작업을 사람이 통제하고,<br />근거로 최종 판단합니다.</h1>
            <p className="fw-lead">
              코딩 에이전트의 생성 속도가 빨라질수록 병목은 코드 작성이 아닌 이해와 검증으로 이동합니다.
              에이전트가 "완료했다"고 말하는 것과 사람이 승인할 수 있는 상태를 엄격히 분리하고,
              Intent에서 시작해 Fresh Evidence를 대조하여 사람의 책임 있는 결정으로 닫히는 AI-native 개발 하네스입니다.
            </p>
          </div>
          <figure className="fw-cover">
            <button
              type="button"
              className="fw-zoom"
              aria-label="OwnHands 로고 및 개요 크게 보기"
              onClick={() => zoom({ src: '/images/ownhands-cover.png', alt: 'OwnHands 로고 — 에이전트 작업 검증 프레임워크' })}
            >
              <img src="/images/ownhands-cover.png" width="648" height="691" alt="OwnHands 로고 및 검증 프레임워크 개요" loading="eager" />
            </button>
            <figcaption>OwnHands — AI가 생성한 결과를 사람이 이해하고 신뢰할 수 있는 결정으로 연결하는 개발 하네스</figcaption>
          </figure>
        </div>
        <dl className="fw-meta">
          <div><dt>구성</dt><dd>8단계 검증 파이프라인 · Thin Harness · Human Gate</dd></div>
          <div><dt>역할</dt><dd>문제의식 정립 · Clean-slate V2 설계 · Agent Skills 및 검증 체계 구축</dd></div>
          <div><dt>스택</dt><dd>Codex · GitHub Native · Agent Skills · Markdown · Pytest</dd></div>
        </dl>
      </header>

      {/* Table of Contents */}
      <nav className="fw-toc" aria-label="상세 페이지 목차">
        <a href="#p-origin">배경과 문제의식</a>
        <a href="#p-evolution">방법론에서 하네스로</a>
        <a href="#p-principles">V1의 교훈과 V2 원칙</a>
        <a href="#p-pipeline">V2 라이프사이클</a>
        <a href="#p-perspective">새로운 개발자의 역할</a>
      </nav>

      {/* PART 00: 배경과 문제의식 */}
      <Part n="00" title="배경과 문제의식" id="p-origin" />
      <section className="fw-section">
        <Heading n="생성 속도의 착시와 검증의 병목" title="코드를 작성하는 시간보다, 이해하고 검증하는 시간이 더 커지다">
          코딩 에이전트를 실제 프로젝트에 적극적으로 도입하면서 구현 속도는 비약적으로 빨라졌습니다. 하지만 진짜 문제는 그 이후에 나타났습니다.
        </Heading>
        <p>
          에이전트가 짧은 시간 안에 수많은 파일과 수백 줄의 코드를 수정할수록, 사람이 확인하고 감당해야 하는 변경량(Review Burden)도 함께 폭증했습니다.
          코드를 타이핑하는 시간보다 <strong>왜 이렇게 구현되었는지 이유를 추적하고, 최초 요구사항과 어긋나지 않았는지 검증하며, 실제로 신뢰하고 배포해도 되는지 판단하는 시간</strong>이 개발 주기 전체를 압도하기 시작했습니다.
        </p>

        <Heading n="반복된 다섯 가지 질문" title="작업이 길어질수록 마주한 본질적인 의문들" />
        <ul className="oh-questions">
          <li className="oh-question-item">
            <span className="oh-question-num">Q1</span>
            <span className="oh-question-text">이 구현은 처음 의도했던 요구사항과 여전히 일치하는가?</span>
          </li>
          <li className="oh-question-item">
            <span className="oh-question-num">Q2</span>
            <span className="oh-question-text">에이전트가 "완료됐다"고 선언한 근거는 구체적으로 무엇인가?</span>
          </li>
          <li className="oh-question-item">
            <span className="oh-question-num">Q3</span>
            <span className="oh-question-text">단순히 단위 테스트가 통과했다는 사실과, 실제 비즈니스 요구사항이 충족되었다는 것은 같은가?</span>
          </li>
          <li className="oh-question-item">
            <span className="oh-question-num">Q4</span>
            <span className="oh-question-text">자동화된 리뷰어 에이전트의 지적은 맹목적으로 전부 수용해야 하는가?</span>
          </li>
          <li className="oh-question-item">
            <span className="oh-question-num">Q5</span>
            <span className="oh-question-text">최종적으로 어떤 판단과 책임은 반드시 사람의 몫으로 남겨두어야 하는가?</span>
          </li>
        </ul>

        <div className="oh-reframe">
          <div className="oh-reframe-card is-before">
            <span className="oh-reframe-label">Before Problem</span>
            <p>"어떻게 하면 코딩 에이전트가 더 많은 코드를 더 빠르고 잘 작성하게 만들 수 있을까?"</p>
          </div>
          <div className="oh-reframe-card is-after">
            <span className="oh-reframe-label">After Reframe</span>
            <p><strong>"AI가 빠르게 개발하더라도, 사람이 그 과정을 투명하게 이해하고, 관측된 근거를 확인하며, 통제 가능한 결정을 내릴 수 있는 개발 환경은 어떻게 만들 수 있을까?"</strong></p>
          </div>
        </div>

        <p className="fw-context-note">
          이 질문에 답하기 위해 시작된 프로젝트가 바로 <strong>OwnHands</strong>입니다.
        </p>
        <Source href={repo}>OwnHands 저장소 보기</Source>
      </section>

      {/* PART 01: 방법론에서 하네스로 */}
      <Part n="01" title="방법론에서 하네스로" id="p-evolution" />
      <section className="fw-section">
        <Heading n="선행 도구 탐색" title="Superpowers의 가능성과 내 프로젝트와의 분기점">
          처음에는 이 문제를 해결하기 위해 기존의 오픈소스 방법론과 프레임워크를 분석했습니다.
        </Heading>
        <div className="fw-two">
          <div className="fw-copy">
            <h3>Superpowers를 통한 통찰</h3>
            <p>
              Brainstorming, Planning, TDD, Code Review처럼 검증된 개발 프로세스 자체를 <strong>Skill 단위로 구조화</strong>하고, 상황에 맞는 개발 방법론을 에이전트에게 주입한다는 접근은 매우 인상적이었습니다.
            </p>
            <p>
              단순히 프롬프트를 화려하게 작성하는 것을 넘어, <strong>에이전트의 사고방식과 개발 프로세스 자체를 규격화할 수 있다는 가능성</strong>을 확인할 수 있었습니다.
            </p>
          </div>
          <div className="fw-copy">
            <h3>내가 마주한 문제와의 차이</h3>
            <p>
              하지만 실제 프로젝트에 적용하면서 한계가 보였습니다. Superpowers가 여러 프로젝트에서 재사용 가능한 <strong>'범용 개발 방법론'</strong>에 가깝다면, 제가 절실했던 것은 하나의 프로젝트 안에서:
            </p>
            <p style={{ fontWeight: 600, color: 'var(--ink)' }}>
              왜 이 작업을 하는지 → 무엇을 만들기로 했는지 → 어떻게 구현할지 → 무엇으로 검증했는지 → 사람이 어떤 근거로 최종 판단했는지
            </p>
            <p>
              를 끊김 없이 하나의 파이프라인으로 연결하는 <strong>구체적인 개발 하네스(Development Harness)</strong>였습니다.
            </p>
          </div>
        </div>

        <Heading n="Anthropic AI-Native SDLC 접목" title="코드 생성 이후로 이동한 소프트웨어 개발의 병목" />
        <p>
          이후 Anthropic의 <strong>AI-Native SDLC Playbook</strong>을 접하며 문제의식을 더 명확히 다듬을 수 있었습니다.
          AI가 코드 작성 속도를 극대화할수록, 엔지니어링의 병목은 사라지는 것이 아니라 <strong>Planning, Review, Testing, Deployment와 같은 코드 전후 단계로 이동한다</strong>는 관점이었습니다.
        </p>
        <Facts items={[
          ['Intent → Spec → Plan', '코드 작성 이전에 명시적 산출물을 확정하여 작업 의도와 구현 범위, 검증 기준을 사전에 고정합니다.'],
          ['Continuous Evals', '일회성 테스트 통과에 안주하지 않고, 에이전트 시스템 자체의 행동 패턴과 성능 회귀(Regression)를 지속적으로 측정합니다.'],
          ['Human Gate', '에이전트에게 맹목적인 승인 권한을 위임하지 않고, 사람이 관측된 증거를 바탕으로 최종 책임을 지는 명시적 결정 지점을 둡니다.']
        ]} />
      </section>

      {/* PART 02: V1의 교훈과 V2 원칙 */}
      <Part n="02" title="V1의 교훈과 V2 원칙" id="p-principles" />
      <section className="fw-section">
        <Heading n="시행착오의 회고" title="AI를 통제하기 위한 하네스 자체가 복잡성이 되는 역설">
          초기 V1 개발 단계에서는 '검증을 강하게 만들수록 시스템이 안전해질 것'이라고 단순하게 생각했습니다.
        </Heading>
        <p>
          그래서 V1에서는 자체 실행 Runner, 다단계 검증 파이프라인, 실시간 상태 Dashboard 등 온갖 복잡한 통제 장치를 직접 만들었습니다.
          하지만 검증 시스템이 비대해질수록, <strong>접속 관리·상태 폴링·캐시 동기화 등 도구 자체를 유지보수하는 부담이 '작업의 본질을 이해한다'는 목적보다 더 커지는 모순</strong>이 발생했습니다.
          도구를 통제하기 위해 만든 하네스가 또 다른 기술 부채가 된 것입니다.
        </p>

        <Heading n="V2의 3대 설계 원칙" title="도구의 비대화를 걷어낸 Clean-slate V2의 재정의" />
        <div className="oh-principles">
          <div className="oh-principle-card">
            <span className="oh-principle-tag">PRINCIPLE 01</span>
            <h3>Native-first</h3>
            <p>
              Codex, GitHub 등 기반 플랫폼이 이미 제공하는 검증된 기능(CLI, Worktree, Issue/PR)을 우선적으로 활용합니다. 바퀴를 다시 발명하지 않습니다.
            </p>
          </div>
          <div className="oh-principle-card">
            <span className="oh-principle-tag">PRINCIPLE 02</span>
            <h3>Thin Harness</h3>
            <p>
              플랫폼이 스스로 해결하지 못하는 최소한의 연결부(Handoff)만 경량으로 구현합니다. 투명한 마크다운 파일로 상태를 보존하고 복잡한 백엔드를 배제합니다.
            </p>
          </div>
          <div className="oh-principle-card">
            <span className="oh-principle-tag">PRINCIPLE 03</span>
            <h3>Human Decision</h3>
            <p>
              에이전트가 결정을 가로채지 않습니다. 사람은 에이전트의 주장이 아니라, 검증기가 실제로 관측한 신선한 증거(Fresh Evidence)를 보고 최종 결정을 내립니다.
            </p>
          </div>
        </div>
      </section>

      {/* PART 03: V2 라이프사이클 */}
      <Part n="03" title="V2 라이프사이클과 기준선" id="p-pipeline" />
      <section className="fw-section">
        <Heading n="8단계 워크플로우" title="추측이 아닌 근거를 대조해 사람의 결정으로 닫히는 루프">
          작업의 시작부터 완료까지, 모든 단계는 단순한 문서 생성이 아니라 다음 단계의 엄격한 기준선(Baseline)이 됩니다.
        </Heading>

        {/* Pipeline Track Flow */}
        <div className="oh-flow-container">
          <div className="oh-flow-track">
            <div className="oh-flow-step">
              <span className="oh-flow-badge">01 START</span>
              <h4>Idea</h4>
              <p>해결할 문제 포착</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-baseline">
              <span className="oh-flow-badge">02 BOUNDARY</span>
              <h4>Intent</h4>
              <p>왜 만들고 무엇을 안 할지</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-baseline">
              <span className="oh-flow-badge">03 CRITERIA</span>
              <h4>Spec</h4>
              <p>구조와 인수 기준</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-baseline">
              <span className="oh-flow-badge">04 PLAN</span>
              <h4>Plan</h4>
              <p>구현 단위와 검증 계획</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step">
              <span className="oh-flow-badge">05 CODE</span>
              <h4>Build</h4>
              <p>에이전트 구현 실행</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step">
              <span className="oh-flow-badge">06 OBSERVE</span>
              <h4>Fresh Evidence</h4>
              <p>테스트·실행 로그 관측</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-gate">
              <span className="oh-flow-badge">07 CHECK</span>
              <h4>Verify / Review</h4>
              <p>독립 대조 및 평가</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-gate">
              <span className="oh-flow-badge">08 GATE</span>
              <h4>Human Decision</h4>
              <p>사람의 최종 머지 승인</p>
            </div>
          </div>
        </div>

        <Heading n="핵심 아티팩트와 역할" title="각 단계를 지탱하는 기준선과 안전장치" />
        <div className="oh-artifacts-grid">
          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">intent.md</span>
              <span className="oh-artifact-role">의도 및 경계 정의</span>
            </div>
            <p className="oh-artifact-desc">
              왜 이 작업을 수행하는지 목적을 명시함과 동시에, <strong>"무엇을 하지 않을 것인지(Non-goals, 경계선)"</strong>를 엄격히 선언하여 에이전트의 오버엔지니어링과 스코프 확장을 사전에 차단합니다.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">spec.md</span>
              <span className="oh-artifact-role">구조 및 인수 기준</span>
            </div>
            <p className="oh-artifact-desc">
              무엇을 어떤 아키텍처와 인터페이스로 만들 것인지 정의하고, 작업 완료 여부를 가를 구체적인 <strong>인수 기준(Acceptance Criteria)</strong>을 확정합니다.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">plan.md</span>
              <span className="oh-artifact-role">구현 단계 및 검증 계획</span>
            </div>
            <p className="oh-artifact-desc">
              작업을 작은 단위로 쪼개고, 각 단계마다 어떤 테스트 커맨드와 근거로 검증할 것인지 실행 계획을 수립합니다.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">Fresh Evidence</span>
              <span className="oh-artifact-role">신선한 관측 증거</span>
            </div>
            <p className="oh-artifact-desc">
              에이전트의 주장이 아닌, 실제로 로컬 환경에서 실행된 단위 테스트 로그, 정적 분석 결과, 바이너리 해시 등 <strong>조작되지 않은 신선한 실행 증거</strong>만을 수집합니다.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">Verifier Subagent</span>
              <span className="oh-artifact-role">독립 검증기</span>
            </div>
            <p className="oh-artifact-desc">
              코드를 작성한 구현자와 분리된 <strong>독립 서브에이전트</strong>가 사전에 정의된 `spec.md`의 인수 기준과 `Fresh Evidence`를 1:1로 교차 대조하여 모순을 잡아냅니다.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">Continuous Evals</span>
              <span className="oh-artifact-role">지속적 행동 평가</span>
            </div>
            <p className="oh-artifact-desc">
              단일 기능의 동작 여부를 넘어, 프롬프트나 룰 수정 시 에이전트 시스템 전체의 행동 양식에 퇴행(Regression)이 발생하지 않는지 벤치마크 테스트셋으로 감시합니다.
            </p>
          </div>
        </div>

        <div className="oh-takeaway-box">
          <blockquote>
            "Human Gate는 자동화의 부재가 아니라, 사람이 최종 책임을 갖는 명시적인 설계 지점입니다."
          </blockquote>
          <p>
            에이전트는 07단계(Verify / Review)에서 검증 보고서를 완성하는 데까지만 관여합니다.
            '무엇을 확인했고, 무엇은 미처 확인하지 못했는가(unobserved)'를 투명하게 펼쳐놓고, <strong>최종 승인과 배포 버튼을 누르는 책임은 온전히 사람이 쥐는 구조</strong>를 완성했습니다.
          </p>
        </div>
      </section>

      {/* PART 04: 새로운 개발자의 역할 */}
      <Part n="04" title="새로운 개발자의 역할" id="p-perspective" />
      <section className="fw-section">
        <Heading n="프로젝트를 통해 얻은 관점" title="코딩 에이전트 시대, 개발자의 진짜 역할은 어디로 향하는가">
          OwnHands를 설계하고 발전시키면서, AI-Native 개발 환경에서 개발자의 역할은 단순히 'AI에게 프롬프트를 잘 던지는 사람'으로 끝나지 않는다는 확신을 얻었습니다.
        </Heading>
        <p>
          코드를 생성하는 비용이 0에 수렴할수록, 개발자에게 요구되는 핵심 역량은 코드를 타이핑하는 능력이 아니라 <strong>시스템의 경계와 신뢰성을 설계하는 능력</strong>으로 이동합니다.
        </p>

        <Facts items={[
          ['요구사항 정의 역량', '작업의 의도(Intent)를 명확히 하고, 하지 말아야 할 것(Non-goals)의 범위를 날카롭게 잘라내는 능력'],
          ['Context 엔지니어링', '에이전트가 오판하거나 환각을 일으키지 않도록 최소한의 고품질 컨텍스트를 설계하고 주입하는 능력'],
          ['Evidence 포착 역량', '에이전트의 말을 믿는 대신, 객관적으로 검증 가능한 실행 증거(Fresh Evidence)를 수집하고 규격화하는 능력'],
          ['책임의 경계 설계', '어디까지를 에이전트의 자율에 맡기고, 어디서부터 사람의 승인(Human Gate)을 개입시킬지 경계를 짓는 능력'],
          ['시스템 평가 역량', '에이전트의 단편적 성공에 취하지 않고, 지속적인 Evals를 통해 시스템 전체의 행동 회귀를 감지하는 능력']
        ]} />

        <div className="oh-takeaway-box" style={{ marginTop: '36px', borderLeftColor: 'var(--ink)' }}>
          <blockquote style={{ fontSize: '21px' }}>
            "OwnHands는 코딩 에이전트의 생산성을 높이는 도구라기보다,<br />
            AI가 만든 결과를 사람이 이해하고 신뢰할 수 있는 결정으로 연결하기 위한 개발 하네스를 만드는 프로젝트입니다."
          </blockquote>
          <p>
            기술이 고도화될수록 인간 개발자의 본질은 코더에서 <strong>'의도를 세우고 책임을 지는 아키텍트이자 최종 결정권자'</strong>로 거듭난다는 것을 이 프로젝트를 통해 증명하고자 합니다.
          </p>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="fw-footer">
        <Link className="fw-back" to="/#projects">← 주요 프로젝트로 돌아가기</Link>
        <Link className="fw-inline-link" to="/projects/llm-gateway">다음 프로젝트 · LLM Gateway Service →</Link>
      </footer>
    </div>
  );
}
