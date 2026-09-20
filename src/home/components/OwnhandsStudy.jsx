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
              코드 생성보다 검증과 이해가 병목이 되는 문제를 해결하기 위해, 작업 의도(Intent)와 관측된 실행 근거를 대조해 사람이 최종 승인하는 AI-native 개발 하네스.
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
      <Part n="01" title="마주한 문제와 병목의 이동" id="p-problem" />
      <section id="problem" className="fw-section">
        <Heading n="문제 정의" title="코드 생성 속도의 착시와 검증·이해의 병목" />
        <Facts
          items={[
            ['생성량 폭증', '에이전트가 수많은 파일과 코드를 단시간에 수정하면서 사람이 감당해야 할 리뷰 부담(Review Burden) 급증'],
            ['맥락 추적 단절', '코드가 왜 이렇게 구현되었는지 의도와 이유를 추적하기 어려워 배포 승인 여부 판단 지연'],
            ['테스트의 착시', '단순 문법 검사나 단위 테스트 통과만으로 실제 비즈니스 요구사항의 온전한 충족을 보장할 수 없음'],
          ]}
        />

        <Heading n="반복된 5대 핵심 질문" title="작업이 길어질수록 마주한 본질적인 의문" />
        <ul className="oh-questions">
          <li className="oh-question-item">
            <span className="oh-question-num">Q1</span>
            <span className="oh-question-text">이 구현은 처음 의도했던 요구사항과 여전히 일치하는가?</span>
          </li>
          <li className="oh-question-item">
            <span className="oh-question-num">Q2</span>
            <span className="oh-question-text">에이전트가 "완료됐다"고 판단한 객관적 근거는 무엇인가?</span>
          </li>
          <li className="oh-question-item">
            <span className="oh-question-num">Q3</span>
            <span className="oh-question-text">테스트 통과와 실제 요구사항 충족은 같은 상태인가?</span>
          </li>
          <li className="oh-question-item">
            <span className="oh-question-num">Q4</span>
            <span className="oh-question-text">자동화된 리뷰어의 지적을 맹목적으로 전부 수용해야 하는가?</span>
          </li>
          <li className="oh-question-item">
            <span className="oh-question-num">Q5</span>
            <span className="oh-question-text">최종적으로 어떤 판단과 책임은 사람의 몫으로 남겨야 하는가?</span>
          </li>
        </ul>

        <div className="oh-reframe">
          <div className="oh-reframe-card is-before">
            <span className="oh-reframe-label">Before</span>
            <p>어떻게 하면 에이전트가 더 많은 코드를 더 빨리 작성하게 만들까?</p>
          </div>
          <div className="oh-reframe-card is-after">
            <span className="oh-reframe-label">After</span>
            <p><strong>AI가 빠르게 개발하더라도 사람이 그 과정을 이해하고, 근거를 확인하며 통제할 수 있는 환경은 어떻게 만들까?</strong></p>
          </div>
        </div>

        <Source href={repo}>저장소 둘러보기</Source>
      </section>

      {/* 02 해결 */}
      <Part n="02" title="해결: AI-Native SDLC와 Thin Harness 아키텍처" id="p-solution" />
      <section id="solution" className="fw-section">
        <Heading n="선행 방법론 분석" title="Superpowers의 영감과 실행 하네스로의 분기" />

        {/* Superpowers Repository Card */}
        <a
          className="oh-repo-card"
          href="https://github.com/obra/superpowers"
          target="_blank"
          rel="noreferrer"
          title="obra/superpowers GitHub 저장소 보기"
        >
          <div className="oh-repo-info">
            <span className="oh-repo-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
              </svg>
              obra/superpowers ↗
            </span>
            <span className="oh-repo-desc">
              에이전트에게 TDD, Planning, Code Review 등 검증된 엔지니어링 방법론을 Skill 단위로 주입하는 오픈소스 프레임워크
            </span>
          </div>
          <div className="oh-repo-meta">
            ★ 280k+ Stars
          </div>
        </a>

        <Facts
          items={[
            ['영감과 가능성', '단순 프롬프트 테크닉을 넘어, 에이전트의 작업 절차 자체를 엔지니어링 규격으로 통제하는 가능성 확인'],
            ['문제의 분기', '다중 프로젝트용 범용 방법론을 넘어, 하나의 프로젝트 안에서 의도(Intent)부터 인간 승인(Gate)까지 꿰는 전용 실행 하네스 필요'],
          ]}
        />

        <Heading n="기준선의 확립" title="Anthropic The AI-Native SDLC Playbook과의 공명">
          <Source href="https://claude.com/blog/the-ai-native-sdlc-playbook">
            원문 보기
          </Source>
        </Heading>

        {/* Anthropic Playbook Card */}
        <a
          className="oh-repo-card"
          href="https://claude.com/blog/the-ai-native-sdlc-playbook"
          target="_blank"
          rel="noreferrer"
          title="Anthropic The AI-Native SDLC Playbook 원문 보기"
        >
          <div className="oh-repo-info">
            <span className="oh-repo-title">
              <img src="/images/claude.webp" alt="Anthropic Claude" width="18" height="18" style={{ objectFit: 'contain', verticalAlign: 'middle', marginRight: '6px' }} />
              Anthropic · The AI-Native SDLC Playbook ↗
            </span>
            <span className="oh-repo-desc">
              "Code is no longer the bottleneck" — 코딩 가속 이후 개발의 병목이 기획(Plan)과 검증(Verify)으로 이동했음을 선언한 엔지니어링 가이드
            </span>
          </div>
          <div className="oh-repo-meta">
            Official Playbook
          </div>
        </a>

        <Facts
          items={[
            ['핵심 선언', '"코딩은 더 이상 병목이 아니다" — AI 덕분에 구현은 순식간에 끝나며, 병목은 코드 앞단(Plan)과 뒷단(Verify·Review)의 좌우로 이동'],
            ['수작업 리뷰의 한계', '사람이 짠 코드를 한 줄씩 눈으로 검토하던 기존 방식은 에이전트가 쏟아내는 대량 코드 앞에서 완전히 마비'],
            ['마크다운 아티팩트 통제', '코드를 직접 보며 씨름하지 않고, intent.md → spec.md → plan.md로 이어지는 문서 규격을 단일 진실 공급원(SSOT)으로 삼음'],
            ['Human Gate의 책임', '판단(Judgment)은 AI에 위임하지 않으며, 각 단계 산출물의 합의와 최종 머지 권한은 사람(Human Gate)이 행사'],
          ]}
        />


        <div className="oh-principles">
          <div className="oh-principle-card">
            <span className="oh-principle-tag">01 NATIVE-FIRST</span>
            <h3>Native-first</h3>
            <p>Codex, GitHub CLI 등 플랫폼 내장 기능을 최우선 활용해 바퀴의 재발명을 방지합니다.</p>
          </div>
          <div className="oh-principle-card">
            <span className="oh-principle-tag">02 THIN HARNESS</span>
            <h3>Thin Harness</h3>
            <p>플랫폼이 풀지 못하는 연결부(Handoff)만 마크다운 파일로 최소한 가볍게 구현합니다.</p>
          </div>
          <div className="oh-principle-card">
            <span className="oh-principle-tag">03 HUMAN DECISION</span>
            <h3>Human Decision</h3>
            <p>판단을 AI에 위임하지 않고, 사람이 결정할 수 있는 신선한 관측 근거(Evidence)를 제공합니다.</p>
          </div>
        </div>

        <Heading n="8단계 흐름" title="각 단계가 다음 단계의 기준선이 되는 검증 루프" />
        <div className="oh-flow-container">
          <div className="oh-flow-track">
            <div className="oh-flow-step">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">01 START</span>
                <span className="oh-step-icon"><IconIdea /></span>
              </div>
              <h4>Idea</h4>
              <p>해결할 문제 포착</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-baseline">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">02 BOUNDARY</span>
                <span className="oh-step-icon"><IconIntent /></span>
              </div>
              <h4>Intent</h4>
              <p>의도 및 비목표 선언</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-baseline">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">03 CRITERIA</span>
                <span className="oh-step-icon"><IconSpec /></span>
              </div>
              <h4>Spec</h4>
              <p>구조와 인수 기준</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-baseline">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">04 PLAN</span>
                <span className="oh-step-icon"><IconPlan /></span>
              </div>
              <h4>Plan</h4>
              <p>구현 단위와 검증 계획</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">05 CODE</span>
                <span className="oh-step-icon"><IconBuild /></span>
              </div>
              <h4>Build</h4>
              <p>에이전트 구현 실행</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">06 OBSERVE</span>
                <span className="oh-step-icon"><IconEvidence /></span>
              </div>
              <h4>Fresh Evidence</h4>
              <p>실제 테스트 로그 수집</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-gate">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">07 CHECK</span>
                <span className="oh-step-icon"><IconVerify /></span>
              </div>
              <h4>Verify / Review</h4>
              <p>독립 대조 및 평가</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-gate">
              <div className="oh-flow-step-header">
                <span className="oh-flow-badge">08 GATE</span>
                <span className="oh-step-icon"><IconHumanGate /></span>
              </div>
              <h4>Human Decision</h4>
              <p>사람의 최종 머지 승인</p>
            </div>
          </div>
        </div>

        <Heading n="지시와 검증의 규격" title="GORE 원칙으로 확립한 6대 기준선과 안전장치" />
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '-6px', marginBottom: '16px', lineHeight: '1.6' }}>
          프롬프트 및 에이전트 하네스 설계의 핵심인 <strong>GORE(Goal, Output, Rules, Evidence)</strong> 원칙을 마크다운 아티팩트로 체계화하여 모호성을 원천 차단합니다.
        </p>

        {/* GORE Principle Grid */}
        <div className="oh-gore-banner">
          <div className="oh-gore-item">
            <span className="oh-gore-letter" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#2563eb' }}>G</span>
            <div className="oh-gore-text">
              <strong>Goal (목표 선언)</strong>
              <span>문제 정의 및 작업 의도 고정 (<code>intent.md</code>)</span>
            </div>
          </div>

          <div className="oh-gore-item">
            <span className="oh-gore-letter" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#059669' }}>O</span>
            <div className="oh-gore-text">
              <strong>Output (산출 규격)</strong>
              <span>구조 및 사전 인수 기준 명시 (<code>spec.md</code>)</span>
            </div>
          </div>

          <div className="oh-gore-item">
            <span className="oh-gore-letter" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#dc2626' }}>R</span>
            <div className="oh-gore-text">
              <strong>Rules (제약 조건)</strong>
              <span>비목표(Non-goals) 및 경계 확립 (<code>intent.md</code>)</span>
            </div>
          </div>

          <div className="oh-gore-item">
            <span className="oh-gore-letter" style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#7c3aed' }}>E</span>
            <div className="oh-gore-text">
              <strong>Evidence (실행 증거)</strong>
              <span>주장 배제, 테스트 로그 대조 (<code>Fresh Evidence</code>)</span>
            </div>
          </div>
        </div>

        <div className="oh-artifacts-grid">
          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">intent.md</span>
              <span className="oh-artifact-role">의도와 경계</span>
            </div>
            <p className="oh-artifact-desc">
              작업 목적을 명시하고 <strong>무엇을 하지 않을지(Non-goals)</strong>를 규정해 에이전트의 오버엔지니어링 차단.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">spec.md</span>
              <span className="oh-artifact-role">구조와 기준</span>
            </div>
            <p className="oh-artifact-desc">
              아키텍처 및 인터페이스 규격을 명시하고 사전 인수 기준(Acceptance Criteria) 확정.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">plan.md</span>
              <span className="oh-artifact-role">단위와 계획</span>
            </div>
            <p className="oh-artifact-desc">
              구현 작업을 단계별로 쪼개고 각 마일스톤별 실행·검증 커맨드 정의.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">Fresh Evidence</span>
              <span className="oh-artifact-role">관측된 증거</span>
            </div>
            <p className="oh-artifact-desc">
              에이전트의 주장을 배제하고 실제 실행된 테스트 로그, 정적 분석 출력, 해시 로그 수집.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">Verifier Subagent</span>
              <span className="oh-artifact-role">독립 대조기</span>
            </div>
            <p className="oh-artifact-desc">
              작성자와 분리된 독립 서브에이전트가 인수 기준과 실행 증거를 1:1 교차 검증.
            </p>
          </div>

          <div className="oh-artifact-card">
            <div className="oh-artifact-header">
              <span className="oh-artifact-title">Continuous Evals</span>
              <span className="oh-artifact-role">행동 회귀 감지</span>
            </div>
            <p className="oh-artifact-desc">
              프롬프트나 룰 수정 시 시스템 전체의 행동 양식이 퇴행하지 않는지 벤치마크셋으로 상시 감시.
            </p>
          </div>
        </div>
      </section>

      {/* 03 결과와 회고 */}
      <Part n="03" title="결과와 회고: 책임의 경계와 개발자의 역할" id="p-result" />
      <section id="result" className="fw-section">
        <Heading n="책임의 관문" title="자동 승인이 아닌 사람이 최종 책임을 지는 구조" />
        <Facts
          items={[
            ['검증과 승인의 분리', '에이전트 작업은 검증 보고서 작성(07 Review)에서 종료되며 머지 권한은 사람에 귀속'],
            ['불확실성 명시', '관측된 증거뿐 아니라 미처 확인하지 못한 영역(unobserved)을 투명하게 보고서에 남김'],
          ]}
        />

        <Heading n="향후 로드맵" title="Codex 기준 구축(완성 중) 및 멀티 에이전트 확장" />

        {/* Supported & Roadmap Agent Ecosystem Grid */}
        <div className="oh-agent-grid">
          <div className="oh-agent-card">
            <div className="oh-agent-card-top">
              <div className="oh-agent-icon-wrap" style={{ background: '#EFF6FF', borderColor: 'rgba(59, 130, 246, 0.25)' }}>
                <img src="/images/codex.png" alt="Codex (OpenAI)" width="28" height="28" />
              </div>
              <span className="oh-agent-status is-progress">IN PROGRESS · 완성 중</span>
            </div>
            <h4>Codex (OpenAI)</h4>
            <p>현재 Codex CLI 환경을 기준으로 8단계 검증 라이프사이클 및 Thin Harness 아키텍처를 실증하며 완성해나가는 중입니다.</p>
            <div className="oh-agent-env">codex cli · git native</div>
          </div>

          <div className="oh-agent-card">
            <div className="oh-agent-card-top">
              <div className="oh-agent-icon-wrap" style={{ background: '#FFF7ED', borderColor: 'rgba(217, 119, 6, 0.25)' }}>
                <img src="/images/claude.webp" alt="Claude Code" width="28" height="28" />
              </div>
              <span className="oh-agent-status is-roadmap">ROADMAP · 확장 예정</span>
            </div>
            <h4>Claude Code (Anthropic)</h4>
            <p>터미널 네이티브 인터페이스 환경에서 <code>intent.md</code> 및 <code>spec.md</code> 아티팩트와 연동되는 하네스 스킬 프로토콜 확장.</p>
            <div className="oh-agent-env">claude-code cli · agent skills</div>
          </div>

          <div className="oh-agent-card">
            <div className="oh-agent-card-top">
              <div className="oh-agent-icon-wrap" style={{ background: '#F5F3FF', borderColor: 'rgba(79, 70, 229, 0.25)' }}>
                <img src="/images/antigravity.webp" alt="Antigravity (Google)" width="28" height="28" />
              </div>
              <span className="oh-agent-status is-roadmap">ROADMAP · 확장 예정</span>
            </div>
            <h4>Antigravity (Google)</h4>
            <p>Antigravity IDE 및 agy CLI 환경의 Subagent/Skill 프로토콜과 직접 연동하는 독립 검증 하네스 지원.</p>
            <div className="oh-agent-env">agy cli · antigravity ide</div>
          </div>
        </div>

        <Heading n="배운 점" title="AI-Native 시대, 개발자에게 남는 5대 핵심 역할" />
        <Facts
          items={[
            ['요구사항 정의', '작업 의도(Intent)를 세우고 비목표(Non-goals)의 경계를 엄격히 긋는 능력'],
            ['Context 설계', '불필요한 추측과 환각을 원천 차단하는 정밀한 맥락을 구성하는 능력'],
            ['Evidence 포착', '에이전트의 주장을 배제하고 객관적으로 검증 가능한 실행 증거를 수집하는 능력'],
            ['경계선 설계', '자동화할 영역과 사람이 개입할 Human Gate의 경계를 설계하는 능력'],
            ['시스템 품질 평가', '단일 성공에 안주하지 않고 지속적인 Evals로 행동 퇴행을 감시하는 능력'],
          ]}
        />

        <div className="oh-takeaway-box" style={{ marginTop: '32px' }}>
          <blockquote style={{ fontSize: '19px' }}>
            "OwnHands는 코딩 에이전트의 생산성을 높이는 도구가 아니라,<br />
            AI가 만든 결과를 사람이 이해하고 신뢰할 수 있는 결정으로 연결하는 개발 하네스다."
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
