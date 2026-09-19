import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/fowoco-editorial.css';
import '../styles/ownhands-editorial.css';
import useTocSpy from './useTocSpy';

const repo = 'https://github.com/taejung3852/OwnHands';

function Source({ href, children = '저장소 보기' }) {
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
            <p className="fw-kicker">개인 프로젝트 · 2026.09 — 현재</p>
            <h1>
              AI의 작업을 사람이 통제하고,<br />
              근거로 최종 판단합니다.
            </h1>
            <p className="fw-lead">
              코딩 에이전트의 생성 속도가 빨라질수록 병목은 코드 작성이 아닌 이해와 검증으로 이동합니다.
              에이전트의 완료 주장과 사람이 승인할 수 있는 상태를 분리하고, Intent에서 시작해 관측된 근거를 대조해 사람의 결정으로 닫히는 개발 하네스입니다.
            </p>
          </div>
          <figure className="fw-cover">
            <button
              type="button"
              className="fw-zoom"
              aria-label="OwnHands 개요 크게 보기"
              onClick={() => zoom({ src: '/images/ownhands-cover.png', alt: 'OwnHands 로고 및 검증 프레임워크 개요' })}
            >
              <img src="/images/ownhands-cover.png" width="648" height="691" alt="OwnHands 로고 및 검증 프레임워크 개요" loading="eager" />
            </button>
            <figcaption>OwnHands — AI가 만든 결과를 사람이 이해하고 신뢰할 수 있는 결정으로 연결하는 개발 하네스</figcaption>
          </figure>
        </div>
        <dl className="fw-meta">
          <div>
            <dt>구성</dt>
            <dd>8단계 라이프사이클 · Thin Harness · Human Gate</dd>
          </div>
          <div>
            <dt>담당</dt>
            <dd>문제의식 정립 · Clean-slate V2 설계 · 검증 체계 구축</dd>
          </div>
          <div>
            <dt>결과</dt>
            <dd>도구 비대화(V1) 극복 · 근거 기반 Human Decision 루프 확립</dd>
          </div>
          <div>
            <dt>스택</dt>
            <dd>Codex · GitHub Native · Agent Skills · Markdown · Continuous Evals</dd>
          </div>
        </dl>
      </header>

      {/* Table of Contents: 01 문제 - 02 해결 - 03 결과와 회고 */}
      <nav className="fw-toc" aria-label="상세 페이지 목차">
        <a href="#p-problem">01 문제</a>
        <a href="#p-solution">02 해결</a>
        <a href="#p-result">03 결과와 회고</a>
      </nav>

      {/* 01 문제 */}
      <Part n="01" title="마주한 문제와 병목의 이동" id="p-problem" />
      <section id="problem" className="fw-section">
        <Heading n="문제 정의" title="코드 생성 속도의 착시와 검증·이해의 병목">
          코딩 에이전트를 프로젝트에 적극적으로 도입하면서 구현 속도는 확실히 빨라졌습니다. 하지만 진짜 문제는 그 뒤에 나타났습니다.
        </Heading>
        <p>
          에이전트가 짧은 시간에 많은 코드를 수정할수록 사람이 확인해야 하는 변경량도 함께 늘어났습니다.
          코드를 작성하는 시간보다 <strong>왜 이렇게 구현됐는지 이해하고, 요구사항과 맞는지 검증하고, 실제로 신뢰해도 되는 결과인지 판단하는 시간</strong>이 더 크게 느껴지기 시작했습니다.
        </p>

        <Facts
          items={[
            ['생성량 폭증', '에이전트가 수많은 파일과 라인을 한 번에 고칠수록 사람이 감당해야 할 리뷰 부담(Review Burden) 폭증'],
            ['맥락 추적 단절', '코드가 왜 이렇게 작성되었는지 의도와 이유를 찾지 못해 승인 여부를 쉽게 판단하기 어려움'],
            ['신뢰의 공백', '단순 문법 검사나 단위 테스트 통과만으로 실제 요구사항이 온전히 충족되었다고 믿을 수 없음'],
          ]}
        />

        <Heading n="반복된 다섯 가지 의문" title="작업이 길어질수록 마주한 본질적인 질문들" />
        <ul className="oh-questions">
          <li className="oh-question-item">
            <span className="oh-question-num">Q1</span>
            <span className="oh-question-text">이 구현은 처음 의도했던 요구사항과 여전히 일치하는가?</span>
          </li>
          <li className="oh-question-item">
            <span className="oh-question-num">Q2</span>
            <span className="oh-question-text">에이전트가 "완료됐다"고 판단한 근거는 무엇인가?</span>
          </li>
          <li className="oh-question-item">
            <span className="oh-question-num">Q3</span>
            <span className="oh-question-text">테스트가 통과했다는 사실과 실제 요구사항이 충족됐다는 것은 같은가?</span>
          </li>
          <li className="oh-question-item">
            <span className="oh-question-num">Q4</span>
            <span className="oh-question-text">리뷰어의 지적은 항상 받아들여야 하는가?</span>
          </li>
          <li className="oh-question-item">
            <span className="oh-question-num">Q5</span>
            <span className="oh-question-text">최종적으로 어떤 판단은 사람이 내려야 하는가?</span>
          </li>
        </ul>

        <div className="oh-reframe">
          <div className="oh-reframe-card is-before">
            <span className="oh-reframe-label">Before</span>
            <p>"어떻게 하면 코딩 에이전트가 더 많은 코드를 더 잘 작성하게 만들 수 있을까?"</p>
          </div>
          <div className="oh-reframe-card is-after">
            <span className="oh-reframe-label">After</span>
            <p><strong>"AI가 빠르게 개발하더라도 사람이 그 과정을 이해하고, 근거를 확인하고, 통제 가능한 결정을 내릴 수 있는 개발 환경은 어떻게 만들 수 있을까?"</strong></p>
          </div>
        </div>

        <p className="fw-context-note">
          이 질문에 답하기 위해 시작된 프로젝트가 바로 <strong>OwnHands</strong>입니다.
        </p>
        <Source href={repo}>저장소 둘러보기</Source>
      </section>

      {/* 02 해결 */}
      <Part n="02" title="해결: AI-Native SDLC와 Thin Harness V2" id="p-solution" />
      <section id="solution" className="fw-section">
        <Heading n="기존 접근과 한계" title="Superpowers를 통한 통찰과 프로젝트 하네스로의 분기">
          처음에는 이 문제를 해결할 기존 방법을 찾았습니다.
        </Heading>
        <div className="fw-two">
          <div className="fw-copy">
            <h3>Superpowers의 영감</h3>
            <p>
              Brainstorming, Planning, TDD, Code Review처럼 개발 프로세스 자체를 Skill 단위로 구조화하고, 상황에 맞는 개발 방법론을 에이전트에게 주입한다는 접근이 인상적이었습니다.
            </p>
            <p>
              단순히 프롬프트를 잘 작성하는 것을 넘어, <strong>에이전트의 개발 방식 자체를 구조화할 수 있다는 가능성</strong>을 확인했습니다.
            </p>
          </div>
          <div className="fw-copy">
            <h3>내가 풀고자 한 문제</h3>
            <p>
              하지만 Superpowers가 여러 프로젝트에서 재사용할 수 있는 범용 방법론이라면, 제가 필요했던 것은 하나의 프로젝트 안에서:
            </p>
            <p style={{ fontWeight: 600, color: 'var(--ink)' }}>
              왜 하는지 → 무엇을 만들지 → 어떻게 구현할지 → 무엇으로 검증했는지 → 사람이 어떤 근거로 최종 판단했는지
            </p>
            <p>
              를 하나의 흐름으로 연결하는 <strong>구체적인 개발 하네스(Harness)</strong>였습니다.
            </p>
          </div>
        </div>

        <Heading n="문제의 확장" title="Anthropic AI-Native SDLC Playbook과의 만남" />
        <p>
          이후 Anthropic의 <strong>AI-Native SDLC Playbook</strong>을 접하면서 문제를 더 명확하게 바라보게 되었습니다.
          AI가 코드 작성 속도를 크게 높이면 병목은 사라지는 것이 아니라 <strong>Planning, Review, Testing, Deployment와 같은 코드 전후 단계로 이동한다</strong>는 관점이었습니다.
        </p>
        <Facts
          items={[
            ['사전 기준선 (Intent → Spec → Plan)', '구현 전에 명시적 산출물을 고정하여 무엇을 만들고 무엇을 하지 않을지 합의합니다.'],
            ['지속적 평가 (Continuous Evals)', '단편적 성공에 취하지 않고, 에이전트 시스템 자체의 행동 회귀를 벤치마크로 감시합니다.'],
            ['인간 승인 관문 (Human Gate)', '자동화에 결정을 넘기지 않고, 관측된 근거를 바탕으로 사람이 최종 책임을 지는 지점을 둡니다.'],
          ]}
        />

        <Heading n="V1의 시행착오" title="AI를 통제하기 위한 하네스 자체가 복잡성이 되는 모순" />
        <p>
          초기에는 검증을 강하게 만들수록 안전해질 것이라고 생각했습니다.
          그래서 OwnHands V1에서는 실행 Runner, 검증 단계, Dashboard 등 여러 통제 장치를 추가했습니다.
          하지만 검증 시스템이 커질수록 <strong>접속·폴링·캐시 동기화 등 AI를 통제하기 위한 하네스 자체가 새로운 복잡성</strong>이 되기 시작했습니다.
        </p>

        <Heading n="V2 3대 설계 원칙" title="도구의 비대화를 걷어낸 Clean-slate V2" />
        <div className="oh-principles">
          <div className="oh-principle-card">
            <span className="oh-principle-tag">PRINCIPLE 01</span>
            <h3>Native-first</h3>
            <p>
              Codex나 GitHub 등 플랫폼이 이미 제공하는 기능을 먼저 사용합니다. 바퀴를 다시 발명하지 않습니다.
            </p>
          </div>
          <div className="oh-principle-card">
            <span className="oh-principle-tag">PRINCIPLE 02</span>
            <h3>Thin Harness</h3>
            <p>
              플랫폼이 해결하지 못하는 연결부만 최소한으로 구현합니다. 가볍고 투명한 마크다운 산출물로 연결합니다.
            </p>
          </div>
          <div className="oh-principle-card">
            <span className="oh-principle-tag">PRINCIPLE 03</span>
            <h3>Human Decision</h3>
            <p>
              에이전트가 판단을 대신하는 것이 아니라, 사람이 이해하고 결정할 수 있도록 관측된 근거(Evidence)를 제공합니다.
            </p>
          </div>
        </div>

        <Heading n="8단계 라이프사이클" title="각 단계가 다음 단계의 기준선이 되는 닫힌 루프" />
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

        <Heading n="핵심 산출물" title="추측을 배제하는 6대 기준선과 안전장치" />
        <div className="oh-artifacts-grid">
          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">intent.md</span>
              <span className="oh-artifact-role">의도와 경계</span>
            </div>
            <p className="oh-artifact-desc">
              왜 만들고 <strong>무엇을 하지 않을 것인지(Non-goals)</strong>를 엄격히 규정하여 에이전트의 과잉 구현을 차단합니다.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">spec.md</span>
              <span className="oh-artifact-role">구조와 기준</span>
            </div>
            <p className="oh-artifact-desc">
              무엇을 어떤 구조와 기준으로 만들 것인지 명시하고, 구체적인 인수 기준(Acceptance Criteria)을 확정합니다.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">plan.md</span>
              <span className="oh-artifact-role">단위와 검증</span>
            </div>
            <p className="oh-artifact-desc">
              어떤 단위로 구현하고 무엇으로 검증할 것인지 단계별 실행 및 검증 커맨드를 사전에 수립합니다.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">Fresh Evidence</span>
              <span className="oh-artifact-role">관측된 증거</span>
            </div>
            <p className="oh-artifact-desc">
              에이전트의 말이 아니라, 실제로 관측한 테스트 실행 결과, 정적 분석 출력, 해시 로그만을 신선한 증거로 확보합니다.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">Verifier Subagent</span>
              <span className="oh-artifact-role">독립 대조기</span>
            </div>
            <p className="oh-artifact-desc">
              구현자와 분리된 독립 서브에이전트가 `spec.md`의 인수 기준과 `Fresh Evidence`를 교차 검증합니다.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">Continuous Evals</span>
              <span className="oh-artifact-role">행동 회귀 감지</span>
            </div>
            <p className="oh-artifact-desc">
              시스템 프롬프트나 도구 변경 시 에이전트 시스템 자체의 행동 품질이 퇴행하지 않는지 지속 측정합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 03 결과와 회고 */}
      <Part n="03" title="결과와 회고: 책임의 경계와 개발자의 역할" id="p-result" />
      <section id="result" className="fw-section">
        <Heading n="핵심 결과" title="자동화가 아니라 사람이 최종 책임을 갖는 결정 지점">
          에이전트의 작업은 검증 보고서를 도출하는 07단계(Verify / Review)에서 끝나며, 마지막 승인은 온전히 사람의 몫으로 남깁니다.
        </Heading>
        <div className="oh-takeaway-box" style={{ margin: '20px 0 28px' }}>
          <blockquote>
            "Human Gate는 자동화의 부재가 아니라, 사람이 최종 책임을 갖는 명시적인 설계 지점입니다."
          </blockquote>
          <p>
            확인한 영역과 확인하지 못한 영역(unobserved)을 투명하게 보고서에 남기고, 승인할지 말지는 사람이 관측된 증거를 보고 직접 결정합니다.
          </p>
        </div>

        <Heading n="회고와 배운 점" title="AI-Native 시대, 개발자에게 남는 진짜 역할" />
        <p>
          OwnHands를 만들면서 AI-Native 개발에서 개발자의 역할이 단순히 “AI에게 코드를 잘 시키는 사람”으로 끝나지 않는다고 생각하게 되었습니다.
          코드를 생성하는 비용이 낮아질수록 오히려 중요해지는 역량들을 확인했습니다.
        </p>

        <Facts
          items={[
            ['요구사항 정의 역량', '작업의 의도(Intent)를 명확히 하고, 하지 말아야 할 것(Non-goals)의 경계를 엄격히 긋는 능력'],
            ['Context 설계 역량', '에이전트가 불필요한 추측이나 환각 없이 작업할 수 있도록 최소한의 정밀한 컨텍스트를 구성하는 능력'],
            ['Evidence 포착 역량', '에이전트의 주장을 믿는 대신, 객관적으로 검증 가능한 실행 증거(Fresh Evidence)를 수집하고 규격화하는 능력'],
            ['경계 설계 역량', '자동화할 영역과 사람이 직접 책임지고 결정해야 할 영역(Human Gate)의 경계를 설계하는 능력'],
            ['시스템 평가 역량', '단일 테스트 통과를 넘어, 지속적인 Evals를 통해 에이전트 시스템 자체의 품질을 감시하고 개선하는 능력'],
          ]}
        />

        <div className="oh-takeaway-box" style={{ marginTop: '36px' }}>
          <blockquote style={{ fontSize: '20px' }}>
            "OwnHands는 코딩 에이전트의 생산성을 높이는 도구라기보다,<br />
            AI가 만든 결과를 사람이 이해하고 신뢰할 수 있는 결정으로 연결하기 위한 개발 Harness를 만드는 프로젝트다."
          </blockquote>
          <p>
            생성의 속도에 매몰되지 않고, 의도를 세우고 책임을 지는 인간 개발자의 본질을 지키는 아키텍처를 지향합니다.
          </p>
        </div>
      </section>

      {/* Footer Navigation: HWPX ← OwnHands → LLM Gateway */}
      <footer className="fw-footer">
        <Link className="fw-back" to="/projects/hwpx">
          ← 이전 프로젝트 · HWPX Document Plugin
        </Link>
        <Link className="fw-inline-link" to="/projects/llm-gateway">
          다음 프로젝트 · LLM Gateway Service →
        </Link>
      </footer>
    </div>
  );
}
