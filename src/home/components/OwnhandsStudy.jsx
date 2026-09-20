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
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
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
              AI-Native SDLC에서 생성 속도 대신 실행 증거와 인간 승인으로 품질을 통제하는 나만의 개발 하네스.
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
            <dd>구현·검증 분리 · Human Gate</dd>
          </div>
          <div>
            <dt>운용</dt>
            <dd>1인 개발 · 실무 적용 및 운영 중</dd>
          </div>
          <div>
            <dt>스택</dt>
            <dd>Codex · Git Native · Agent Skills</dd>
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
        <Heading n="문제 정의" title="에이전트는 빨라졌지만, 통제력을 잃고 있었다" />
        <Facts
          items={[
            ['생성의 착시', '빨라진 코드 생성 뒤의 거짓 성공(모킹·사양 누락)으로 전수 검사 역병목 발생'],
            ['통제력 상실', '범용 AI 도구로는 작업 의도(Why)와 세부 검증 기준 관철 불가'],
            ['진짜 갈증', '전시용 토이가 아닌, 실무에서 믿고 쓸 나만의 개발 하네스 필요'],
          ]}
        />

        <figure className="fw-cover oh-bottleneck-figure">
          <button
            type="button"
            className="fw-zoom"
            aria-label="AI-Native SDLC 병목의 이동 도표 크게 보기"
            onClick={() =>
              zoom({
                src: '/images/sdlc-bottleneck.png',
                alt: 'Before agents vs After agents — 빌드 시간 단축과 요구사항 및 검증 병목으로의 이동을 나타낸 도표',
              })
            }
          >
            <img
              src="/images/sdlc-bottleneck.png"
              alt="Before agents vs After agents — 빌드 시간 단축과 요구사항 및 검증 병목으로의 이동을 나타낸 도표"
              width="1024"
              height="393"
              loading="lazy"
            />
          </button>
          <figcaption>
            Anthropic SDLC Playbook — 코드 작성은 순식간이지만, 의도 정의와 검증·승인이 새로운 병목이 됨
          </figcaption>
        </figure>

        <div className="oh-takeaway-box" style={{ margin: '20px 0 0' }}>
          <blockquote style={{ fontSize: '16.5px', lineHeight: '1.55' }}>
            "남의 도구에 끼워 맞추지 않고, 내 작업의 통제권을 직접 쥐기 위해 나만의 도구를 만들었다."
          </blockquote>
        </div>

        <Source href={repo}>저장소 둘러보기</Source>
      </section>

      {/* 02 해결 */}
      <Part n="02" title="해결: 구현과 검증을 분리한 독립 검증 체계" id="p-solution" />
      <section id="solution" className="fw-section">
        <Heading n="영감을 준 레퍼런스" title="방향성의 힌트를 얻은 두 레퍼런스" />

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
            <p className="oh-influence-thesis">"엄격한 절차로 모델의 한계를 극복한다"</p>
            <div className="oh-influence-takeaway">
              접점: 가벼운 마크다운 Skills 규약과 독립 1:1 증거 대조 프로토콜 차용
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
            <p className="oh-influence-thesis">"개발 병목이 '코드 작성'에서 '의도와 평가'로 이동한다"</p>
            <div className="oh-influence-takeaway">
              접점: 의도 선언(intent.md)과 인간 승인(Human Gate) 설계의 기반
            </div>
          </a>
        </div>

        <Heading n="도구의 3대 기둥" title="도구를 지탱하는 3가지 핵심 원칙">
          사람이 직접 읽고 다룰 수 있는 마크다운 규격(Thin Harness)과 피드백 체계.
        </Heading>

        {/* 3 Core Principles */}
        <div className="oh-principles">
          <div className="oh-principle-card">
            <span className="oh-principle-tag">01 HUMAN-IN-THE-LOOP</span>
            <h3>시작과 끝은 사람이 결정</h3>
            <p>
              <code>intent.md</code>로 의도와 비목표를 고정하고, 최종 머지는 사람이 직접 결정합니다.
            </p>
          </div>
          <div className="oh-principle-card">
            <span className="oh-principle-tag">02 FRESH EVIDENCE</span>
            <h3>말 대신 실제 증거로 대조</h3>
            <p>
              AI 주장 대신 터미널 실행 로그와 Diff를 독립 검증자가 사양과 1:1 대조합니다.
            </p>
          </div>
          <div className="oh-principle-card">
            <span className="oh-principle-tag">03 CONTINUOUS FEEDBACK</span>
            <h3>쓸수록 단단해지는 체계</h3>
            <p>
              실무에서 겪은 실패 패턴과 피드백을 Rules와 Evals에 축적해 지속 진화합니다.
            </p>
          </div>
        </div>

        <Heading n="검증 라이프사이클" title="구현과 검증을 물리적으로 분리한 실행 흐름">
          에이전트의 단위 구현(Phase 1)과 독립 검증·승인(Phase 2)의 분리 루프.
        </Heading>

        <div className="oh-pipeline-container">
          {/* Phase 1: Forward Implementation & Evidence Collection */}
          <div className="oh-pipeline-track-header">
            <span className="oh-track-kicker">PHASE 1 · 순방향 구현 및 증거 포착</span>
            <span className="oh-track-desc">의도 고정부터 에이전트의 코드 작성과 실행 로그 수집까지</span>
          </div>
          <div className="oh-pipeline-row">
            <div className="oh-pipeline-step">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconIntent /></span>
                <span className="oh-step-badge">01 INTENT</span>
              </div>
              <h4 className="oh-step-title">의도 선언</h4>
              <span className="oh-step-artifact">intent.md</span>
              <p className="oh-step-desc">작업의 Why와 비목표(Non-goals) 고정</p>
            </div>
            <div className="oh-pipeline-connector">→</div>

            <div className="oh-pipeline-step">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconSpec /></span>
                <span className="oh-step-badge">02 SPEC &amp; PLAN</span>
              </div>
              <h4 className="oh-step-title">사양 &amp; 계획</h4>
              <span className="oh-step-artifact">spec.md · plan.md</span>
              <p className="oh-step-desc">사전 인수 기준과 실행 커맨드 명세</p>
            </div>
            <div className="oh-pipeline-connector">→</div>

            <div className="oh-pipeline-step">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconBuild /></span>
                <span className="oh-step-badge">03 BUILD</span>
              </div>
              <h4 className="oh-step-title">Codex 구현</h4>
              <span className="oh-step-artifact">CLI Headless Task</span>
              <p className="oh-step-desc">사양에 맞춘 단위 코드 작성 및 테스트</p>
            </div>
            <div className="oh-pipeline-connector">→</div>

            <div className="oh-pipeline-step">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconEvidence /></span>
                <span className="oh-step-badge">04 EVIDENCE</span>
              </div>
              <h4 className="oh-step-title">실행 증거 수집</h4>
              <span className="oh-step-artifact">Logs &amp; Git Diff</span>
              <p className="oh-step-desc">AI 주장 배제, 터미널 로그 및 Diff 포착</p>
            </div>
          </div>

          {/* Transition Divider */}
          <div className="oh-pipeline-divider">
            <div className="oh-divider-line" />
            <span className="oh-divider-pill">사양(02) ↔ 실제 증거(04) 1:1 독립 교차 대조</span>
            <div className="oh-divider-line" />
          </div>

          {/* Phase 2: Independent Verification & Human Gate */}
          <div className="oh-pipeline-track-header">
            <span className="oh-track-kicker">PHASE 2 · 독립 검증, 승인 및 피드백 환류</span>
            <span className="oh-track-desc">거짓 성공을 걸러내고 사람이 최종 배포 결정</span>
          </div>
          <div className="oh-pipeline-row">
            <div className="oh-pipeline-step">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconVerify /></span>
                <span className="oh-step-badge">05 VERIFY</span>
              </div>
              <h4 className="oh-step-title">독립 1:1 대조</h4>
              <span className="oh-step-artifact">Verifier Subagent</span>
              <p className="oh-step-desc">독립 검증자가 사양 ↔ 증거 교차 대조</p>
            </div>
            <div className="oh-pipeline-connector">→</div>

            <div className="oh-pipeline-step is-human-gate">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconHumanGate /></span>
                <span className="oh-step-badge">06 HUMAN GATE</span>
              </div>
              <h4 className="oh-step-title">사람의 최종 승인</h4>
              <span className="oh-step-artifact">Human Approval</span>
              <p className="oh-step-desc">검증 리포트 확인 후 사람이 머지 결정</p>
            </div>
            <div className="oh-pipeline-connector">→</div>

            <div className="oh-pipeline-step">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconRsi /></span>
                <span className="oh-step-badge">07 FEEDBACK LOOP</span>
              </div>
              <h4 className="oh-step-title">실무 피드백 환류</h4>
              <span className="oh-step-artifact">Rules &amp; Evals</span>
              <p className="oh-step-desc">실패 패턴과 피드백을 룰셋으로 축적</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 결과와 회고 */}
      <Part n="03" title="결과와 회고: 실무 적용과 확장 로드맵" id="p-result" />
      <section id="result" className="fw-section">
        <Heading n="솔직한 시행착오" title="초기 하네스 과잉 설계와 AI 협업의 실패 회고" />
        <Facts
          items={[
            ['하네스 비대화 실패', '자체 데몬으로 감싸려다 복잡도 폭증 → 마크다운(Thin Harness)과 CLI 네이티브로 전면 단순화'],
            ['거짓 완료의 충격', '에이전트의 가짜 테스트 통과 목격 → 구현체와 독립 검증자(Verifier)를 분리해 1:1 대조 강제'],
            ['살아있는 도구', '전시용 데모가 아닌, 매일 실무를 수행하며 룰셋과 평가 기준을 업데이트하는 도구로 정착'],
          ]}
        />

        <Heading n="현재 상황과 로드맵" title="실무 적용 현황 및 확장 로드맵" />
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
              실무 메인 엔진. 단위 구현, 실행 증거 수집, 1:1 대조 루프를 매일 안정적으로 수행 중.
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
              대규모 탐색, 사양·계획(Spec &amp; Plan) 수립, 심층 아키텍처 리뷰 특화 연동 확장 예정.
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
              백그라운드 태스크 제어, 브라우저 E2E 검증 및 서브에이전트 오케스트레이션 검토.
            </p>
            <div className="oh-agent-env">지원 예정 · Antigravity IDE &amp; Subagents</div>
          </div>
        </div>

        <div className="oh-takeaway-box" style={{ marginTop: '32px' }}>
          <blockquote style={{ fontSize: '18px', lineHeight: '1.6' }}>
            "OwnHands는 남에게 보여주기 위한 데모가 아니라,<br />
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
