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
            <dd>V2 아키텍처 설계 · 검증 체계 구축</dd>
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
      <Part n="02" title="해결: AI-Native SDLC와 Thin Harness V2" id="p-solution" />
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
            <span className="oh-repo-title">obra/superpowers ↗</span>
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
            Anthropic The AI-Native SDLC Playbook 원문 보기
          </Source>
        </Heading>
        <Facts
          items={[
            ['병목의 이동', 'AI가 코드 작성을 가속화할수록 엔지니어링의 병목은 사전 기획(Planning)과 사후 검토(Review·Testing)로 이동'],
            ['산출물 중심 통제', 'intent.md, spec.md, plan.md 등 버전 관리되는 마크다운 아티팩트로 단계별 엄격한 기준선(Baseline) 수립'],
            ['Human Gate', 'AI의 자율 완료를 맹신하지 않고, 사람이 관측된 실행 근거를 확인해 최종 승인 책임을 지는 안전장치 배치'],
          ]}
        />

        <Heading n="V1의 교훈" title="도구 과잉의 역설과 V2 3대 설계 원칙" />
        <Facts
          items={[
            ['V1의 역설', '통제 강화 목적의 Runner·Dashboard가 오히려 접속·폴링·동기화 등 도구 자체의 운영 복잡성을 가중시킴'],
            ['V2 방향 전환', '무거운 도구를 걷어내고 플랫폼 네이티브 역량을 활용하는 Clean-slate V2 재설계'],
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
              <span className="oh-flow-badge">01 START</span>
              <h4>Idea</h4>
              <p>해결할 문제 포착</p>
            </div>
            <div className="oh-flow-arrow">→</div>
            <div className="oh-flow-step is-baseline">
              <span className="oh-flow-badge">02 BOUNDARY</span>
              <h4>Intent</h4>
              <p>의도 및 비목표 선언</p>
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
              <p>실제 테스트 로그 수집</p>
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

        <Heading n="향후 로드맵" title="Claude Code 및 Google Antigravity로의 환경 확장" />
        <Facts
          items={[
            ['현재 기반', 'Codex 및 GitHub CLI 네이티브 역량을 바탕으로 V2 Thin Harness 구조 구축 완료'],
            ['차세대 에이전트 확장', '향후 터미널 네이티브 에이전트인 Claude Code 및 Google Antigravity 개발 환경으로 하네스 프로토콜 확장 예정'],
            ['플랫폼 독립 지향', '특정 AI 툴체인에 종속되지 않고, 모든 코딩 에이전트의 완료 상태와 사람의 승인을 분리하는 범용 규격 지향'],
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
