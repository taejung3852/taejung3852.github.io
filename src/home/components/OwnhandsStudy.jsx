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
              AI의 완료 주장과<br />
              사람이 확인한 결과를 구분합니다.
            </h1>
            <p className="fw-lead">
              AI가 작성한 코드의 의도와 실행 근거를 남겨 사람이 검토하고 다음 행동을 결정하도록 돕는 개발 도구입니다. 핵심 작업 흐름과 설치 CLI를 구현했으며, 첫 실제 프로젝트에서 전체 흐름을 확인할 준비를 하고 있습니다.
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
            <figcaption>OwnHands — 실행 근거를 확인하고 사람이 결정하는 개발 도구</figcaption>
          </figure>
        </div>
        <dl className="fw-meta">
          <div>
            <dt>구성</dt>
            <dd>Codex 스킬 · 설치 CLI · 검증·리뷰 흐름</dd>
          </div>
          <div>
            <dt>운용</dt>
            <dd>1인 개발 · 핵심 흐름 구현, 실제 프로젝트 검증 준비 중</dd>
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
      <Part n="01" title="AI가 코드를 만든 뒤에도 남는 확인 작업" id="p-problem" />
      <section id="problem" className="fw-section">
        <Heading n="문제 정의" title="코드 작성 뒤에는 의도와 실행 결과를 확인해야 합니다" />
        <Facts
          items={[
            ['확인 작업 증가', '코드는 빠르게 만들어도 요구사항 충족과 테스트 실행 여부는 별도로 확인해야 함'],
            ['작업 의도 기록', '코드와 대화만으로는 왜 만들었고 무엇을 확인해야 하는지 다음 단계에 전달하기 어려움'],
            ['필요한 도구', '기존 개발 도구 사이에 작업 기준과 검토 근거를 남길 연결이 필요했음'],
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
            Anthropic SDLC Playbook을 참고한 도표. 코드 작성 뒤에도 의도 정의와 검증·승인 작업이 남습니다.
          </figcaption>
        </figure>

        <Source href={repo}>저장소 둘러보기</Source>
      </section>

      {/* 02 해결 */}
      <Part n="02" title="작업 기준과 검증 근거를 연결하는 흐름" id="p-solution" />
      <section id="solution" className="fw-section">
        <Heading n="참고한 자료" title="설계에 참고한 두 자료" />

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
            <p className="oh-influence-thesis">작업 절차를 스킬로 나눠 필요한 때 사용합니다.</p>
            <div className="oh-influence-takeaway">
              참고한 점: 작업별 스킬 구성과 검증 역할 분리
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
            <p className="oh-influence-thesis">코드 작성 전후의 의도와 검증 단계도 중요합니다.</p>
            <div className="oh-influence-takeaway">
              참고한 점: 의도 기록과 사람의 검토 단계
            </div>
          </a>
        </div>

        <Heading n="설계 기준" title="의도, 실행 근거, 사람의 판단을 연결합니다">
          작업마다 필요한 기준과 결과를 사람이 읽을 수 있는 문서로 남깁니다.
        </Heading>

        {/* 3 Core Principles */}
        <div className="oh-principles">
          <div className="oh-principle-card">
            <span className="oh-principle-tag">01 HUMAN-IN-THE-LOOP</span>
            <h3>시작과 끝은 사람이 결정</h3>
            <p>
              <code>intent.md</code>에 작업 의도와 하지 않을 일을 적고, 최종 머지는 사람이 결정합니다.
            </p>
          </div>
          <div className="oh-principle-card">
            <span className="oh-principle-tag">02 FRESH EVIDENCE</span>
            <h3>실행 결과를 기준과 대조</h3>
            <p>
              테스트 결과와 변경 내역을 작업 기준에 비춰 검토합니다. 확인하지 못한 항목은 따로 남깁니다.
            </p>
          </div>
          <div className="oh-principle-card">
            <span className="oh-principle-tag">03 CONTINUOUS FEEDBACK</span>
            <h3>피드백을 다음 작업에 반영</h3>
            <p>
              사용 중 발견한 문제를 기록하고, 검토한 뒤 필요한 규칙이나 평가를 바꿉니다.
            </p>
          </div>
        </div>

        <Heading n="작업 흐름" title="구현과 검토를 나눠 진행하는 흐름">
          아래는 설계한 흐름입니다. 첫 실제 프로젝트에서 모든 단계를 끝까지 검증하는 작업은 준비 중입니다.
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
            <span className="oh-track-desc">실행 근거를 검토하고 사람이 다음 행동 결정</span>
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
      <Part n="03" title="현재 상태와 다음 검증" id="p-result" />
      <section id="result" className="fw-section">
        <Heading n="설계 변경" title="별도 실행 시스템을 줄이고 기존 도구를 연결했습니다" />
        <Facts
          items={[
            ['구조 단순화', '별도 실행 시스템을 늘리던 초기 구성을 줄이고 Codex와 Git의 기존 기능을 연결'],
            ['검증 역할 분리', '완료 주장과 테스트 결과를 같은 것으로 취급하지 않도록 검토 역할과 근거를 분리'],
            ['현재 확인한 범위', '핵심 흐름과 설치 CLI를 구현했고 결정론적 테스트와 정적 평가를 수행'],
          ]}
        />

        <Heading n="현재 상태" title="첫 실제 프로젝트의 전체 흐름 검증을 준비 중입니다" />
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
              Codex 스킬과 설치 CLI를 구현했습니다. 실제 프로젝트에서 작업을 처음부터 끝까지 수행하는 검증은 남아 있습니다.
            </p>
            <div className="oh-agent-env">핵심 흐름 구현 · 전체 흐름 검증 준비 중</div>
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
              대규모 탐색과 설계 검토에 연결하는 방안을 검토 중입니다.
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
              브라우저 검증과 백그라운드 작업에 연결할 수 있을지 검토 중입니다.
            </p>
            <div className="oh-agent-env">지원 예정 · Antigravity IDE &amp; Subagents</div>
          </div>
        </div>

        <div className="oh-takeaway-box" style={{ marginTop: '32px' }}>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
            핵심 흐름의 구현과 로컬 검증 결과를 확인했습니다.<br />
            실제 프로젝트에서 전체 흐름을 마친 결과는 아직 확인하지 못했습니다.
          </p>
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
