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

/* Step Icons for Pipeline Track */
function IconIdea() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.5 1.5 4.5 3 5.5v1.5h8V14.5c1.5-1 3-3 3-5.5a7 7 0 0 0-7-7z" />
    </svg>
  );
}

function IconIntent() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function IconSpec() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function IconPlan() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  );
}

function IconBuild() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function IconEvidence() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function IconVerify() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconHumanGate() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function IconRsi() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
    </svg>
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
              AI의 작업 완료와<br />
              사람의 승인을 분리합니다.
            </h1>
            <p className="fw-lead">
              에이전트에게 끌려다니지 않고 내 작업의 통제권을 쥐기 위해, 사람의 의도와 실행 증거를 1:1로 대조하고 실무 피드백을 축적하며 나와 함께 단단해지는 나만의 개발 하네스.
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
            <figcaption>OwnHands — 근거 기반 검증과 인간 승인 하네스</figcaption>
          </figure>
        </div>
        <dl className="fw-meta">
          <div>
            <dt>구성</dt>
            <dd>8단계 라이프사이클 · Human Gate</dd>
          </div>
          <div>
            <dt>담당</dt>
            <dd>Thin Harness 아키텍처 설계 · 검증 체계 구축</dd>
          </div>
          <div>
            <dt>스택</dt>
            <dd>Codex · GitHub Native · Agent Skills · Continuous Evals</dd>
          </div>
        </dl>
      </header>

      {/* Table of Contents */}
      <nav className="fw-toc" aria-label="상세 페이지 목차">
        <a href="#p-problem">01 문제</a>
        <a href="#p-solution">02 해결</a>
        <a href="#p-result">03 결과와 회고</a>
      </nav>

      {/* 01 문제 */}
      <Part n="01" title="마주한 문제: 빨라진 생성 속도, 잃어버린 통제력" id="p-problem" />
      <section id="problem" className="fw-section">
        <Heading n="문제 정의" title="에이전트는 빨라졌지만, 내 작업의 통제력을 잃고 있었다" />
        <Facts
          items={[
            ['생성의 착시', '에이전트가 수많은 코드를 순식간에 수정하지만, 테스트를 모킹하거나 사양을 누락하는 거짓 성공 때문에 결국 사람이 코드를 전수 검사해야 하는 역병목 발생'],
            ['통제력 상실', '남들이 만든 범용 AI 도구로는 내 작업 의도(Why)와 세밀한 검증 기준을 끝까지 관철하기 어려움'],
            ['내 진짜 갈증', '보여주기식 토이 프로젝트가 아니라, 내가 내 매일의 실무 개발에서 진정으로 신뢰하며 쓸 나만의 전용 하네스가 절실했음'],
          ]}
        />

        <div className="oh-takeaway-box" style={{ margin: '24px 0 0' }}>
          <blockquote style={{ fontSize: '17px', lineHeight: '1.6' }}>
            "남의 도구에 내 개발 방식을 억지로 끼워 맞추는 대신,<br />
            내가 내 작업의 통제권을 쥐고 AI와 신뢰 속에서 일할 수 있는 나만의 도구를 직접 만들기로 했다."
          </blockquote>
        </div>

        <Source href={repo}>저장소 둘러보기</Source>
      </section>

      {/* 02 해결 */}
      <Part n="02" title="해결: 나와 함께 성장하는 나만의 전용 도구" id="p-solution" />
      <section id="solution" className="fw-section">
        <Heading n="영감을 준 레퍼런스" title="Superpowers가 보여준 가능성과 Anthropic이 짚은 방향">
          실무에서 쓸 검증 하네스를 고민하면서 큰 힌트와 방향성을 얻었던 두 가지 레퍼런스입니다.
        </Heading>

        <div className="oh-influences-grid">
          <a
            className="oh-influence-card"
            href="https://github.com/obra/superpowers"
            target="_blank"
            rel="noreferrer"
            title="obra/superpowers GitHub 저장소 보기"
          >
            <div className="oh-influence-header">
              <span className="oh-influence-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
                </svg>
                obra / superpowers ↗
              </span>
              <span className="oh-influence-badge">오픈소스 사례</span>
            </div>
            <p className="oh-influence-thesis">"엄격한 엔지니어링 절차로 모델의 한계를 극복하다"</p>
            <p className="oh-influence-desc">
              TDD, 단계별 계획, 검증 전 완료 금지 같은 소프트웨어 공학 규칙을 Skill 형태로 에이전트에 주입해, 실무 개발의 신뢰도를 크게 끌어올릴 수 있음을 직접 보여준 프로젝트.
            </p>
            <div className="oh-influence-takeaway">
              내 도구의 접점: 가벼운 마크다운 Skills 규약과 독립 1:1 증거 대조 프로토콜로 흡수
            </div>
          </a>

          <a
            className="oh-influence-card"
            href="https://claude.com/blog/the-ai-native-sdlc-playbook"
            target="_blank"
            rel="noreferrer"
            title="Anthropic The AI-Native SDLC Playbook 원문 보기"
          >
            <div className="oh-influence-header">
              <span className="oh-influence-title">
                <img src="/images/claude.webp" alt="Anthropic Claude" width="16" height="16" style={{ objectFit: 'contain' }} />
                Anthropic SDLC Playbook ↗
              </span>
              <span className="oh-influence-badge">공식 가이드</span>
            </div>
            <p className="oh-influence-thesis">"개발의 병목이 '코드 작성'에서 '의도와 평가'로 이동한다"</p>
            <p className="oh-influence-desc">
              개발자의 본질은 코드를 직접 타이핑하는 것이 아니라 사양(Intent/Spec)을 정의하고 결과물을 지속해서 평가(Continuous Evals)하는 감독자가 되는 것이라고 짚어준 가이드.
            </p>
            <div className="oh-influence-takeaway">
              내 도구의 접점: 의도 선언(intent.md)과 인간 승인(Human Gate), 실무 피드백 환류의 철학적 기반
            </div>
          </a>
        </div>

        <Heading n="도구의 3대 기둥" title="내가 이 도구를 만들며 얻고자 했던 것">
          거창한 데몬이나 복잡한 프레임워크가 아닌, 사람이 직접 읽고 다룰 수 있는 가장 가벼운 마크다운 규격(Thin Harness)과 피드백 환류 루프로 구축했습니다.
        </Heading>

        {/* 3 Core Principles */}
        <div className="oh-principles">
          <div className="oh-principle-card">
            <span className="oh-principle-tag">01 HUMAN-IN-THE-LOOP</span>
            <h3>시작과 끝은 내가 쥔다</h3>
            <p>
              <code>intent.md</code>로 작업 의도와 비목표(Non-goals)를 선언해 오버엔지니어링을 차단하고, 최종 배포 머지(Human Gate)는 반드시 사람이 결정합니다.
            </p>
          </div>
          <div className="oh-principle-card">
            <span className="oh-principle-tag">02 FRESH EVIDENCE</span>
            <h3>말 대신 실제 증거로 대조한다</h3>
            <p>
              AI의 "수정 완료했습니다"라는 주장을 배제하고, 실제 터미널 실행 로그·Git Diff·단위 테스트 출력을 독립 검증자가 사전 기준과 1:1 교차 대조합니다.
            </p>
          </div>
          <div className="oh-principle-card">
            <span className="oh-principle-tag">03 CONTINUOUS FEEDBACK</span>
            <h3>쓸수록 더 단단해진다 (피드백 환류)</h3>
            <p>
              작업에서 발견한 실패 패턴, 엣지 케이스, 내가 내린 피드백이 휘발되지 않고 다음 작업의 규칙(Rules)과 Continuous Evals로 축적되어 도구와 에이전트가 함께 진화합니다.
            </p>
          </div>
        </div>

        <Heading n="검증 라이프사이클" title="각 단계가 다음 단계의 기준선이 되는 검증 루프" />
        <div className="oh-flow-container">
          <div className="oh-flow-track">
            <div className="oh-flow-step">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">01 INTENT</span>
                <span className="oh-step-icon"><IconIntent /></span>
              </div>
              <h4>의도 선언</h4>
              <p>목적 및 비목표 고정</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-baseline">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">02 SPEC &amp; PLAN</span>
                <span className="oh-step-icon"><IconSpec /></span>
              </div>
              <h4>사양 &amp; 계획</h4>
              <p>사전 인수 기준 명세</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">03 BUILD</span>
                <span className="oh-step-icon"><IconBuild /></span>
              </div>
              <h4>Codex 구현</h4>
              <p>단위 실행 및 코드 작성</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">04 EVIDENCE</span>
                <span className="oh-step-icon"><IconEvidence /></span>
              </div>
              <h4>실행 증거 수집</h4>
              <p>터미널 로그 &amp; Diff 포착</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-gate">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">05 VERIFY</span>
                <span className="oh-step-icon"><IconVerify /></span>
              </div>
              <h4>독립 1:1 대조</h4>
              <p>사양 ↔ 증거 교차 검증</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-gate">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">06 HUMAN GATE</span>
                <span className="oh-step-icon"><IconHumanGate /></span>
              </div>
              <h4>사람의 최종 승인</h4>
              <p>사각지대 확인 후 머지</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-baseline">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">07 FEEDBACK LOOP</span>
                <span className="oh-step-icon"><IconRsi /></span>
              </div>
              <h4>실무 피드백 환류</h4>
              <p>실패 패턴 축적 및 규칙 진화</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 결과와 회고 */}
      <Part n="03" title="결과와 회고: 매일 실무에서 담금질되는 현재진행형" id="p-result" />
      <section id="result" className="fw-section">
        <Heading n="솔직한 시행착오" title="초기 하네스 과잉 설계와 AI 협업의 실패 회고" />
        <Facts
          items={[
            ['하네스 비대화의 실패', '모든 제어를 자체 데몬과 복잡한 오케스트레이터로 감싸려다 복잡도가 폭증하여 실패 → 사람이 직접 읽고 편집할 수 있는 가장 단순한 마크다운 파일(Thin Harness)과 플랫폼 CLI 네이티브로 전면 단순화'],
            ['거짓 완료의 충격', '에이전트가 가짜 테스트를 만들어 100% 통과를 자축하는 현상을 직접 목격한 후, 구현 에이전트와 독립 검증자(Verifier)를 물리적으로 분리하여 1:1 증거 대조를 강제'],
            ['살아있는 도구로의 정착', '완제품으로 박제해둔 프로젝트가 아니라, 지금도 매일 내 실무 개발을 직접 수행하며 실패 패턴과 규칙, 평가 기준을 지속 업데이트하는 피드백 환류 체계로 작동 중'],
          ]}
        />

        <Heading n="현재 상황과 로드맵" title="Codex 실무 적용(진행 중) 및 멀티 에이전트 확장" />
        <div className="oh-agent-grid">
          <div className="oh-agent-card">
            <div className="oh-agent-card-top">
              <div className="oh-agent-icon-wrap" style={{ background: '#EFF6FF', borderColor: 'rgba(59, 130, 246, 0.25)' }}>
                <img src="/images/codex.png" alt="Codex 로고" />
              </div>
              <span className="oh-agent-status is-progress">IN PROGRESS</span>
            </div>
            <h4>Codex (CLI)</h4>
            <p>
              현재 내 실무 업무에 직접 연동되어 매일 사용 중인 메인 엔진. 단위 구현과 터미널 실행 증거 수집, 독립 1:1 대조 루프를 안정적으로 수행하고 있습니다.
            </p>
            <div className="oh-agent-env">실무 적용 중 · Codex CLI &amp; Git Native</div>
          </div>

          <div className="oh-agent-card">
            <div className="oh-agent-card-top">
              <div className="oh-agent-icon-wrap" style={{ background: '#FFF7ED', borderColor: 'rgba(217, 119, 6, 0.25)' }}>
                <img src="/images/claude.webp" alt="Claude Code 로고" />
              </div>
              <span className="oh-agent-status is-roadmap">ROADMAP</span>
            </div>
            <h4>Claude Code</h4>
            <p>
              대규모 레포지토리 컨텍스트 파악과 사양·계획(Spec &amp; Plan) 수립, 심층 아키텍처 리뷰에 특화된 하네스 스킬 프로토콜로 연동을 확장할 계획입니다.
            </p>
            <div className="oh-agent-env">지원 예정 · Claude Code CLI &amp; Agent Skills</div>
          </div>

          <div className="oh-agent-card">
            <div className="oh-agent-card-top">
              <div className="oh-agent-icon-wrap" style={{ background: '#F5F3FF', borderColor: 'rgba(79, 70, 229, 0.25)' }}>
                <img src="/images/antigravity.webp" alt="Antigravity 로고" />
              </div>
              <span className="oh-agent-status is-roadmap">ROADMAP</span>
            </div>
            <h4>Google Antigravity</h4>
            <p>
              백그라운드 태스크 제어, 브라우저 기반 E2E 시각적 검증 및 복수 서브에이전트 오케스트레이션 도구로 하네스 확장을 검토하고 있습니다.
            </p>
            <div className="oh-agent-env">지원 예정 · Antigravity IDE &amp; Subagents</div>
          </div>
        </div>

        <div className="oh-takeaway-box" style={{ marginTop: '32px' }}>
          <blockquote style={{ fontSize: '18px', lineHeight: '1.6' }}>
            "OwnHands는 남에게 보여주기 위한 전시용 데모가 아니라,<br />
            내 실무를 매일 함께 수행하며 나와 함께 성장하는 나만의 개발 하네스다."
          </blockquote>
        </div>
      </section>

      {/* Footer Navigation */}
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
