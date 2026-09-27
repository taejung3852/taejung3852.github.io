import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/fowoco-editorial.css';
import useTocSpy from './useTocSpy';

const repo = 'https://github.com/taejung3852/llm-gateway';
const src = repo + '/blob/b097447c0896589f59d623e68e810354f124d2da/src/main/java/site/gatein/backend';
const commits = [
  ['AWS SageMaker JumpStart 연결 구성', 'b097447c0896589f59d623e68e810354f124d2da'],
  ['AWS SageMaker JumpStart 연동 비활성화', 'cbdec737db45b6132156ac6d9e668aabf47560f8'],
  ['Ollama 스트리밍 연결', 'f26daf703155db4efec78dd8539e81183a918256'],
];

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

export default function GatewayStudy() {
  useTocSpy();
  const dialog = useRef(null);
  const [shot, setShot] = useState(null);
  const zoom = (s) => {
    setShot(s);
    dialog.current.showModal();
  };

  useEffect(() => {
    document.title = 'LLM Gateway Service | 박태정';
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
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {shot && <img src={shot.src} alt={shot.alt} />}
      </dialog>

      <header className="fw-hero">
        <div className="fw-topbar">
          <Link className="fw-back" to="/#projects">
            ← 주요 프로젝트
          </Link>
          <span>LLM Gateway Service</span>
          <a className="fw-repo-link" href={repo} target="_blank" rel="noreferrer" aria-label="LLM Gateway Service GitHub 저장소 보기, 새 탭">GitHub 저장소 <span aria-hidden="true">↗</span></a>
        </div>
        <div className="fw-hero-split">
          <div className="fw-hero-copy">
            <p className="fw-kicker">2인 팀 프로젝트 · 2025.04 — 2025.10</p>
            <h1>
              사용 조건에 맞는 LLM을<br />
              선택하고 연결합니다.
            </h1>
            <p className="fw-lead">
              비용·속도·성능·문맥 길이에 설정한 가중치를 적용해 모델을 선택합니다. 서로 다른 모델의 호출 방식은 하나의 규격으로 묶었습니다.
            </p>
          </div>
          <figure className="fw-cover">
            <button
              type="button"
              className="fw-zoom"
              aria-label="모델 선택 기준 설정 화면 크게 보기"
              onClick={() =>
                zoom({
                  src: '/images/gateway-input.png',
                  alt: 'GateIn의 모델 선택 기준 설정 및 질문 입력 화면',
                })
              }
            >
              <img
                src="/images/gateway-input.png"
                width="1515"
                height="1038"
                alt="GateIn에서 가성비·속도·성능·기억력의 중요도를 조절하고 질문하는 화면"
                loading="eager"
              />
            </button>
            <figcaption>가성비·속도·성능·기억력 4대 기준의 가중치를 설정하는 GateIn 화면. 누르면 확대됩니다.</figcaption>
          </figure>
        </div>
        <dl className="fw-meta">
          <div>
            <dt>구성</dt>
            <dd>모델 선택 기준 4종 · 공통 어댑터 변환 · WebSocket 스트리밍</dd>
          </div>
          <div>
            <dt>담당</dt>
            <dd>모델 메타데이터 정리 · Provider 어댑터·스트리밍 구현 · 인프라 전환(AWS → Ollama)</dd>
          </div>
          <div>
            <dt>스택</dt>
            <dd>Java · Spring Boot · LangChain4j · AWS SageMaker JumpStart · Ollama · WebSocket</dd>
          </div>
        </dl>
      </header>

      <nav className="fw-toc" aria-label="상세 페이지 목차">
        <a href="#p-problem">01 문제</a>
        <a href="#p-solution">02 해결</a>
        <a href="#p-result">03 결과와 회고</a>
      </nav>

      {/* 01 문제 */}
      <Part n="01" title="문제 정의" id="p-problem" />
      <section id="problem" className="fw-section">
        <Heading n="문제" title="여러 LLM 중 상황에 맞는 모델을 고르기 번거로웠습니다">
          모델마다 비용·속도·성능·문맥 길이가 달라, 사용자가 요청에 맞는 모델을 고르려면 여러 기준을 직접 비교해야 했습니다.
        </Heading>
      </section>

      {/* 02 해결 */}
      <Part n="02" title="설계와 구현 과정" id="p-solution" />
      <section id="routing" className="fw-section">
        <Heading n="모델 정보" title="모델별 비용과 성능 지표를 정리했습니다">
          모델 선택에 쓰이는 데이터를 갱신하고 누락된 메타데이터를 추가했습니다.
        </Heading>
      </section>

      <section id="integration" className="fw-section">
        <Heading n="모델 연결성" title="공통 어댑터 계층 직접 구축을 통한 이종 모델 추상화" />
        <Facts
          items={[
            ['프레임워크 한계 보완', '개발 당시 LangChain4j 미지원 모델(Gemma 등)의 요청·응답 규격을 어댑터 패턴으로 직접 개발'],
            ['호출 규격 단일화', '모델별 Payload 직렬화 및 Response 파싱을 변환 계층에서 흡수하여 상위 비즈니스 로직 결합도 차단'],
            ['동적 라우팅 연동', '선택된 모델 식별자에 따라 런타임에 적절한 Provider 어댑터로 요청 자동 바인딩'],
          ]}
        />
        <figure className="fw-boundary">
          <article>
            <span className="fw-kicker">표준 연동</span>
            <h3>LangChain4j 제공 연동</h3>
            <p>프레임워크 기본 지원 상용/오픈소스 모델</p>
          </article>
          <div className="fw-connection">
            <span className="fw-connection-label">단일 공통 호출 규격</span>
            <span className="fw-connection-arrow" aria-hidden="true">↔</span>
            <small>어댑터 계층에서 파편화 흡수</small>
          </div>
          <article>
            <span className="fw-kicker">직접 구현</span>
            <h3>GemmaChatModel 등 전용 어댑터</h3>
            <p>요청 직렬화 및 응답 변환 로직 커스텀 구현</p>
          </article>
        </figure>
        <figure className="fw-cover">
          <button
            type="button"
            className="fw-zoom"
            aria-label="채팅 응답 화면 크게 보기"
            onClick={() =>
              zoom({
                src: '/images/gateway-chat.png',
                alt: 'GateIn의 선택된 모델과 생성된 채팅 응답 화면',
              })
            }
          >
            <img
              src="/images/gateway-chat.png"
              alt="선택된 모델과 실시간 생성된 채팅 응답 화면"
              loading="lazy"
            />
          </button>
          <figcaption>설정한 기준으로 선택된 모델의 응답 화면. 누르면 확대됩니다.</figcaption>
        </figure>
        <div className="fw-proof-links">
          <Source href={src + '/chat/config/sagemaker/GemmaChatModel.java'}>GemmaChatModel.java · 요청 구성 및 응답 변환</Source>
          <Source href={src + '/chat/config/models/opensource/GemmaConfig.java'}>GemmaConfig.java · 커스텀 모델 설정</Source>
          <Source href={src + '/chat/service/AssistanceService.java'}>AssistanceService.java · 모델별 동적 디스패치</Source>
        </div>
      </section>

      <section id="runtime" className="fw-section">
        <Heading n="인프라 전환" title="클라우드 기반 빠른 검증 후 자체 GPU 인프라 전환" />
        <Facts
          items={[
            ['1단계 (검증)', 'AWS SageMaker JumpStart를 활용해 인프라 구축 공수 없이 모델 연결성 및 스트리밍 파이프라인 즉시 검증'],
            ['2단계 (전환)', '지속적인 클라우드 호스팅 비용 절감을 위해 사내 보유 GPU 인프라에 Ollama 서빙 환경 구성 및 마이그레이션'],
            ['스트리밍 구현', '토큰 생성 이벤트를 WebSocket 파이프라인에 바인딩하여 실시간 응답 전달 및 저장 파이프라인 완성'],
          ]}
        />
        <div className="fw-proof-links">
          {commits.map(([label, sha]) => (
            <Source key={sha} href={repo + '/commit/' + sha}>
              {label} ({sha.slice(0, 7)})
            </Source>
          ))}
          <Source href={repo + '/commit/22a9c5eac4eec8678fba7ffefe7a09d3f3688d24'}>
            스트리밍 변경 이력 커밋 (22a9c5e)
          </Source>
        </div>
      </section>

      {/* 03 결과와 회고 */}
      <Part n="03" title="운영 결과와 다음 설계" id="p-result" />
      <section id="result" className="fw-section">
        <Heading n="운영 결과" title="자체 GPU 전환과 약 3주간의 사내 베타 운영" />
        <Facts
          items={[
            ['외부 호스팅 비용', '사내 보유 GPU 서버로 옮겨 외부 클라우드 인스턴스 사용료를 없앰'],
            ['사내 베타', '약 3주간 사내 사용자에게 모델 라우팅과 대화 서비스 제공'],
            ['첫 응답 대기', '생성된 토큰을 바로 전달해 전체 응답이 끝날 때까지 기다리지 않고 내용을 볼 수 있게 함'],
          ]}
        />

        <Heading n="다음 설계" title="필수 조건을 먼저 확인하고 전송 방식을 단순화하려 합니다" />
        <Facts
          items={[
            [
              '라우팅 제약 미분리 (Hard vs Soft)',
              '현재는 문맥 길이·예산 같은 필수 조건과 선호 점수를 함께 계산합니다. 다음 설계에서는 필수 조건을 먼저 검사한 뒤 남은 모델에 가중치를 적용할 예정입니다.',
            ],
            [
              '프로토콜 오버엔지니어링 (WebSocket vs SSE)',
              '토큰을 한쪽으로 전달하는 기능에 WebSocket을 사용했습니다. 다시 설계한다면 REST와 SSE로 전송 구조를 단순화할 계획입니다.',
            ],
          ]}
        />
        <p className="fw-note">
          * SSE 전환 및 Hard/Soft 분리 파이프라인은 사후 기술 검토를 통해 도출한 재설계 방향입니다.
        </p>
      </section>

      <footer className="fw-footer">
        <Link to="/#projects">← 주요 프로젝트</Link>
        <Link to="/projects/ownhands">이전 프로젝트 · OwnHands ←</Link>
      </footer>
    </div>
  );
}
