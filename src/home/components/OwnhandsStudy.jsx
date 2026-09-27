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
              AI와 함께하는 개발을<br />
              의도부터 피드백까지 잇습니다.
            </h1>
            <p className="fw-lead">
              OwnHands는 ChatGPT에서 정한 작업 의도와 설계를 Git에 남기고, Codex의 구현·검증과 사용 피드백으로 이어가는 개발 하네스입니다. 현재 구성 요소를 만들고 있으며, 전체 연결 흐름은 실제 작업에서 계속 확인하고 있습니다.
            </p>
          </div>
          <figure className="fw-cover">
            <button
              type="button"
              className="fw-zoom"
              aria-label="OwnHands 개요 크게 보기"
              onClick={() => zoom({ src: '/images/ownhands-cover.png', alt: 'OwnHands 로고 및 검증 프레임워크 개요' })}
            >
              <img src="/images/ownhands-cover.png" width="648" height="691" alt="OwnHands 로고 및 개발 흐름 개요" loading="eager" />
            </button>
            <figcaption>OwnHands — 작업의 기준과 결과를 연결하고 사람이 결정하는 개발 하네스</figcaption>
          </figure>
        </div>
        <dl className="fw-meta">
          <div>
            <dt>구성</dt>
            <dd>Codex 스킬 · 설치 CLI · 검증·리뷰 흐름</dd>
          </div>
          <div>
            <dt>운용</dt>
            <dd>1인 개발 · 핵심 구성 구현, 전체 연결 흐름 검증 중</dd>
          </div>
          <div>
            <dt>스택</dt>
            <dd>Codex · Git Native · Agent Skills</dd>
          </div>
        </dl>
      </header>

      {/* Table of Contents */}
      <nav className="fw-toc" aria-label="상세 페이지 목차">
        <a href="#p-problem">01 출발점</a>
        <a href="#p-solution">02 해결</a>
        <a href="#p-result">03 결과와 회고</a>
      </nav>

      {/* 01 출발점 */}
      <Part n="01" title="AI 네이티브 SDLC를 어떻게 운영할까?" id="p-problem" />
      <section id="problem" className="fw-section">
        <Heading n="출발점" title="기획·설계·구현에서 남길 내용을 나눴습니다" />
        <Facts
          items={[
            ['기획 · 목표', 'ChatGPT에서 문제·목표·제약을 정리하고, 승인한 내용을 intent.md로 남김'],
            ['설계 · 요구사항', '기능과 완료 기준을 구체화하고, 승인한 내용을 spec.md로 남김'],
            ['구현 · 실행 계획', 'Codex가 설계를 읽고, 계획이 필요한 작업은 Plan Mode에서 승인받아 plan.md로 남김'],
            ['다음 작업으로 연결', '구현 결과와 사용 중 얻은 피드백을 기록해 다음 결정에 반영'],
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
            Anthropic SDLC Playbook을 참고한 도표. 코드 작성이 빨라져도 목표를 정하고 결과를 확인하는 일은 남습니다.
          </figcaption>
        </figure>

        <Source href={repo}>저장소 둘러보기</Source>
      </section>

      {/* 02 해결 */}
      <Part n="02" title="의도부터 피드백까지 연결하는 흐름" id="p-solution" />
      <section id="solution" className="fw-section">
        <Heading n="참고한 자료" title="개발 방향에 참고한 자료" />

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
            <p className="oh-influence-thesis">기획부터 유지보수까지 개발 단계를 연결합니다.</p>
            <div className="oh-influence-takeaway">
              참고한 점: 단계별 산출물과 사람의 판단
            </div>
          </a>

          <a
            className="oh-influence-card"
            href="https://www.deeplearning.ai/the-batch/the-ai-engineering-skills-map-in-detail-using-coding-agents/"
            target="_blank"
            rel="noreferrer"
            title="Andrew Ng의 코딩 에이전트 활용 글 보기"
          >
            <div className="oh-influence-header">
              <span className="oh-influence-title">Andrew Ng / Coding Agents ↗</span>
              <span className="oh-influence-badge">추가 참고</span>
            </div>
            <p className="oh-influence-thesis">개발자가 에이전트의 기획과 실행을 이끄는 역량을 다룹니다.</p>
            <div className="oh-influence-takeaway">
              현재 방향과 맞닿은 관점: 에이전트 활용과 개발자의 판단
            </div>
          </a>
        </div>

        <Heading n="역할 분담" title="기획 대화와 코드 실행에 맞는 도구를 나눴습니다" />
        <Facts
          items={[
            ['ChatGPT에서 기획·설계', '긴 대화로 목표와 요구를 정리하는 방식이 제 작업에 잘 맞아, 직접 만든 OwnHands 플러그인의 스킬을 사용'],
            ['Codex 사용량 배분', '기획·설계 대화에 Codex를 쓰지 않고, Codex 사용량은 구현과 검증 작업에 남겨둠'],
            ['Git으로 기준 인계', '저장하기로 한 승인 문서를 작업 브랜치에 기록. Issue는 팀의 방식에 따라 선택'],
            ['Codex에서 구현·검증', '기록된 기준을 읽고 필요한 경우 구현 계획을 승인받아 실행과 결과 확인에 집중'],
          ]}
        />

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

        <Heading n="작업 흐름" title="ChatGPT의 설계와 Codex의 구현을 Git으로 잇습니다">
          아래는 현재 구성한 흐름입니다. 구성 요소의 로컬 검증과 전체 연결 흐름의 실제 사용 결과는 구분해 확인하고 있습니다.
        </Heading>

        <div className="oh-pipeline-container">
          {/* Phase 1: Chat planning, Git handoff, and Codex build */}
          <div className="oh-pipeline-track-header">
            <span className="oh-track-kicker">PHASE 1 · 기획·설계와 구현 인계</span>
            <span className="oh-track-desc">ChatGPT에서 정한 기준을 Git에 남기고 Codex로 연결</span>
          </div>
          <div className="oh-pipeline-row">
            <div className="oh-pipeline-step">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconIntent /></span>
                <span className="oh-step-badge">01 PLAN &amp; DESIGN</span>
              </div>
              <h4 className="oh-step-title">ChatGPT에서 기획·설계</h4>
              <span className="oh-step-artifact">intent.md · spec.md</span>
              <p className="oh-step-desc">목표, 제약, 요구사항과 수용 기준을 함께 정리</p>
            </div>
            <div className="oh-pipeline-connector">→</div>

            <div className="oh-pipeline-step">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconSpec /></span>
                <span className="oh-step-badge">02 GIT HANDOFF</span>
              </div>
              <h4 className="oh-step-title">승인된 내용 기록</h4>
              <span className="oh-step-artifact">작업 브랜치 · Git</span>
              <p className="oh-step-desc">저장하기로 한 승인 문서를 인계. Issue는 필요할 때만 사용</p>
            </div>
            <div className="oh-pipeline-connector">→</div>

            <div className="oh-pipeline-step">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconPlan /></span>
                <span className="oh-step-badge">03 CODEX PLAN</span>
              </div>
              <h4 className="oh-step-title">구현 계획 구체화</h4>
              <span className="oh-step-artifact">Codex Plan Mode · plan.md</span>
              <p className="oh-step-desc">필요한 작업은 계획을 승인받고 실행 순서를 기록</p>
            </div>
            <div className="oh-pipeline-connector">→</div>

            <div className="oh-pipeline-step">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconEvidence /></span>
                <span className="oh-step-badge">04 BUILD</span>
              </div>
              <h4 className="oh-step-title">구현과 결과 기록</h4>
              <span className="oh-step-artifact">변경 코드 · 실행 근거</span>
              <p className="oh-step-desc">Codex가 구현하고 해당 작업의 검사 결과를 남김</p>
            </div>
          </div>

          {/* Transition Divider */}
          <div className="oh-pipeline-divider">
            <div className="oh-divider-line" />
            <span className="oh-divider-pill">승인된 기준 ↔ 구현 결과와 검증 근거 대조</span>
            <div className="oh-divider-line" />
          </div>

          {/* Phase 2: Verification, human decisions, and feedback */}
          <div className="oh-pipeline-track-header">
            <span className="oh-track-kicker">PHASE 2 · 검증, 사람의 판단과 피드백</span>
            <span className="oh-track-desc">결과를 확인하고 다음 작업에 경험을 반영</span>
          </div>
          <div className="oh-pipeline-row">
            <div className="oh-pipeline-step">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconVerify /></span>
                <span className="oh-step-badge">05 VERIFY</span>
              </div>
              <h4 className="oh-step-title">결과 검증</h4>
              <span className="oh-step-artifact">수용 기준 · 실행 근거</span>
              <p className="oh-step-desc">기준 충족과 미확인 항목을 구분해 검토</p>
            </div>
            <div className="oh-pipeline-connector">→</div>

            <div className="oh-pipeline-step is-human-gate">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconHumanGate /></span>
                <span className="oh-step-badge">06 HUMAN GATE</span>
              </div>
              <h4 className="oh-step-title">사람의 단계별 판단</h4>
              <span className="oh-step-artifact">Review · Human Gate</span>
              <p className="oh-step-desc">검토 결과를 보고 다음 변경을 결정</p>
            </div>
            <div className="oh-pipeline-connector">→</div>

            <div className="oh-pipeline-step">
              <div className="oh-step-header">
                <span className="oh-step-icon-wrap"><IconRsi /></span>
                <span className="oh-step-badge">07 FEEDBACK LOOP</span>
              </div>
              <h4 className="oh-step-title">사용 경험을 다음 작업에</h4>
              <span className="oh-step-artifact">Feedback · Evals</span>
              <p className="oh-step-desc">관측한 문제를 기록하고 개선 후보로 검토</p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 결과와 회고 */}
      <Part n="03" title="현재 구현과 남은 검증" id="p-result" />
      <section id="result" className="fw-section">
        <Heading n="설계 변경" title="별도 실행 시스템을 줄이고 기존 도구를 연결했습니다" />
        <Facts
          items={[
            ['구조 단순화', '별도 실행 시스템을 늘리던 초기 구성을 줄이고 ChatGPT·Git·Codex의 기존 기능을 연결'],
            ['검증 기준 유지', '완료 주장과 테스트 결과를 구분하고, 제품 결과와 에이전트 작업 방식을 따로 평가'],
            ['현재 확인한 범위', 'Codex 스킬과 설치 CLI, Chat 기획 스킬을 작성하고 로컬 검사 및 일부 사용 경험을 기록'],
          ]}
        />

        <Heading n="현재 상태" title="구성 요소를 만들고 전체 연결 흐름을 확인하고 있습니다" />
        <div className="oh-agent-grid">
          <div className="oh-agent-card">
            <div className="oh-agent-card-top">
              <div className="oh-agent-icon-wrap" style={{ background: '#EFF6FF', borderColor: 'rgba(59, 130, 246, 0.25)' }}>
                <span>CHAT</span>
              </div>
              <span className="oh-agent-status is-progress">IN PROGRESS</span>
            </div>
            <h4>ChatGPT · 기획과 설계</h4>
            <p>
              직접 만든 플러그인의 기획·설계 스킬을 사용하고 있습니다. 최신 Git 인계 흐름은 더 확인하고 있습니다.
            </p>
            <div className="oh-agent-env">별도 Chat Plugin · 계획·설계</div>
          </div>

          <div className="oh-agent-card">
            <div className="oh-agent-card-top">
              <div className="oh-agent-icon-wrap" style={{ background: '#FFF7ED', borderColor: 'rgba(217, 119, 6, 0.25)' }}>
                <span>GIT</span>
              </div>
              <span className="oh-agent-status is-progress">IN PROGRESS</span>
            </div>
            <h4>Git · 승인 내용의 인계</h4>
            <p>
              저장하기로 한 승인 문서를 작업 브랜치에 남기는 흐름입니다. Issue 사용은 팀의 방식에 따라 선택합니다.
            </p>
            <div className="oh-agent-env">문서 기록 · 선택적 Issue</div>
          </div>

          <div className="oh-agent-card">
            <div className="oh-agent-card-top">
              <div className="oh-agent-icon-wrap" style={{ background: '#F5F3FF', borderColor: 'rgba(79, 70, 229, 0.25)' }}>
                <img src="/images/codex.png" alt="Codex 로고" />
              </div>
              <span className="oh-agent-status is-progress">IN PROGRESS</span>
            </div>
            <h4>Codex · 구현과 검증</h4>
            <p>
              작업 스킬과 설치 CLI를 구현했습니다. 승인 문서부터 결과와 피드백까지의 전체 흐름은 더 검증해야 합니다.
            </p>
            <div className="oh-agent-env">Build · Verify · Feedback</div>
          </div>
        </div>

        <div className="oh-takeaway-box" style={{ marginTop: '32px' }}>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
            각 구성 요소와 로컬 검사 결과를 확인했습니다.<br />
            ChatGPT에서 Codex까지 이어지는 최신 흐름은 실제 작업으로 더 확인할 예정입니다.
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
