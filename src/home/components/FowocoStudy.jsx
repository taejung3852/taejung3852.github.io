import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/fowoco-editorial.css';
import useTocSpy from './useTocSpy';

const base = 'https://github.com/fowoco/ai/blob/209ebddf3878f750c37e5ebe5651b0fe6aa0a354';
const rows = [
  ['단일 Dense', '99%', '0.95', '60ms'],
  ['단일 Hybrid', '99%', '0.95', '80ms'],
  ['멀티쿼리 Hybrid', '100%', '0.96', '120ms'],
  ['멀티쿼리 Hybrid + Re-ranking', '100%', '0.96', '390ms'],
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

export default function FowocoStudy() {
  useTocSpy();
  const dialog = useRef(null);
  const [shot, setShot] = useState(null);
  const zoom = (s) => {
    setShot(s);
    dialog.current.showModal();
  };

  useEffect(() => {
    document.title = 'FOWOCO | 박태정';
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

      <header className="fw-hero">
        <div className="fw-topbar">
          <Link className="fw-back" to="/#projects">
            ← 주요 프로젝트
          </Link>
          <span>FOWOCO</span>
        </div>
        <div className="fw-hero-split">
          <div className="fw-hero-copy">
            <p className="fw-kicker">8인 팀 프로젝트 · 시연 완료</p>
            <h1>
              외국인 근로자 행정업무를
              <br />
              문서 준비부터 소통까지.
            </h1>
            <p className="fw-lead">
              E-9 외국인 근로자를 위한 HR 업무보조 플랫폼. 다국어 행정 소통을 위한 모음집 검색 파이프라인과 HWPX 문서 생성 도구(MCP)를 구현했습니다.
            </p>
          </div>
          <figure className="fw-demo">
            <video controls playsInline preload="metadata" poster="/images/fowoco-demo-poster.jpg" aria-label="FOWOCO 서비스 시연 2분 35초">
              <source src="/videos/fowoco-demo.mp4" type="video/mp4" />
              브라우저에서 영상을 재생할 수 없습니다.{' '}
              <a href="/videos/fowoco-demo.mp4">시연 영상 다운로드</a>
            </video>
            <figcaption>
              <strong>서비스 시연 · 2분 35초</strong>
              <span>체류기간 연장 준비 — 업무 요청 · 담당자 승인 · 근로자 서류 제출</span>
            </figcaption>
          </figure>
        </div>
        <dl className="fw-meta">
          <div>
            <dt>구성</dt>
            <dd>LangGraph 에이전트 워크플로 · EPS 외국어 모음집 검색</dd>
          </div>
          <div>
            <dt>담당</dt>
            <dd>Language Assistant 설계·구현 · HWPX 문서 도구(MCP) 분리</dd>
          </div>
          <div>
            <dt>결과</dt>
            <dd>단일 Dense 99% 적중 확인 · 파이프라인 과잉 설계(60→390ms)와 단순화 회고</dd>
          </div>
          <div>
            <dt>스택</dt>
            <dd>Python · LangGraph · Qdrant · Hybrid Search · MCP</dd>
          </div>
        </dl>
      </header>

      <nav className="fw-toc" aria-label="상세 페이지 목차">
        <a href="#p-problem">01 문제</a>
        <a href="#p-solution">02 해결</a>
        <a href="#p-result">03 결과와 회고</a>
      </nav>

      <Part n="01" title="마주한 문제와 담당 범위" id="p-problem" />
      <section id="problem" className="fw-section">
        <Heading n="문제 정의" title="외국인 근로자 소통의 언어 장벽과 수기 서식 작성의 비효율" />
        <Facts
          items={[
            ['소통의 한계', 'E-9 외국인 근로자의 구어체·오타·비정형 질문은 단순 번역 시 행정 용어 왜곡이 심각하게 발생함'],
            ['서식 작성 부담', '체류기간 연장 등 필수 행정 서식(통합신청서) 작성을 위해 HR 담당자가 일일이 수기 대조 및 반복 입력'],
            ['해결 방향', '공식 EPS 외국어 모음집 기반의 정밀 검색과, 확인된 정보만 안전하게 기입하는 HWPX 서식 도구 필요'],
          ]}
        />
        <figure className="fw-scope">
          <div className="fw-scope-flow">
            <div className="fw-scope-stage">
              <span>HR 담당자</span>
              <h3>업무 요청</h3>
              <p>자연어 입력 · 기한 확인</p>
            </div>
            <div className="fw-scope-stage">
              <span>팀 구현</span>
              <h3>요청 분석·업무 조율</h3>
              <p>의도 분석 · 정보 조회 · 실행 순서</p>
            </div>
            <div className="fw-scope-owned">
              <span className="fw-scope-label">박태정 담당</span>
              <article>
                <h3>언어 처리</h3>
                <p>EPS 외국어 모음집 검색 파이프라인</p>
              </article>
              <article>
                <h3>문서 자동화</h3>
                <p>HWPX 필드 매핑 · MCP 도구 분리</p>
              </article>
            </div>
            <div className="fw-scope-stage">
              <span>팀 구현 · 사용자 확인</span>
              <h3>승인·응답</h3>
              <p>HR 검토 · 근로자 확인 및 서류 제출</p>
            </div>
          </div>
          <figcaption>
            전체 오케스트레이션 중 외국인 근로자 소통을 위한 EPS 검색과 HWPX 서식 생성을 전담했습니다.
          </figcaption>
        </figure>
      </section>

      <Part n="02" title="설계와 해결" id="p-solution" />
      <section id="solution-search" className="fw-section">
        <Heading n="언어 처리" title="공식 EPS 외국어 모음집 기반의 다각도 검색 설계" />
        <Facts
          items={[
            ['핵심 접근', '한국산업인력공단 EPS 외국어 모음집(행정 대응 표현집)을 기준 데이터로 삼아 공식 용어 일치 유도'],
            ['3중 질의 분기', '전체 문장 · 사유/항목 · 기한/방법으로 질의를 분해해 다양한 비정형 표현 포섭 시도'],
            ['검색 경로', 'Dense + Sparse(BM25) 하이브리드 검색 후 Cross-query RRF 및 Re-ranking을 결합'],
          ]}
        />
        <figure className="fw-pipeline">
          <div className="fw-query">
            <span className="fw-kicker">업무 안내 → 세 검색 관점</span>
            <div>
              <b>전체 문장</b>
              <b>요청 사유 + 항목</b>
              <b>제출 방법 + 기한</b>
            </div>
          </div>
          <div className="fw-flow">
            <article>
              <span>01</span>
              <h3>Dense + Sparse</h3>
              <p>정확한 용어 일치 + 비슷한 의미의 표현</p>
              <small>각 40개 → RRF → 최대 30개</small>
            </article>
            <article>
              <span>02</span>
              <h3>Cross-query RRF</h3>
              <p>세 질의의 순위 결합</p>
              <small>중복 정리 → 최대 30개</small>
            </article>
            <article>
              <span>03</span>
              <h3>Re-ranking</h3>
              <p>요청과 후보를 다시 비교</p>
              <small>상위 5개 → 번역 참고 자료</small>
            </article>
          </div>
          <figcaption>3중 질의 분기 및 하이브리드 RRF 실행 흐름도</figcaption>
        </figure>
        <div className="fw-proof-links">
          <Source href={base + '/app/agents/language/translation.py'} />
        </div>
      </section>

      <section id="solution-document" className="fw-section">
        <Heading n="문서 자동화" title="엄격한 필드 매핑과 확장성을 고려한 MCP 도구 분리" />
        <Facts
          items={[
            ['엄격한 필드 매핑', '확인된 정보만 HWPX 양식 칸에 대입하고, 누락된 값은 임의 추측 없이 빈칸 유지'],
            [
              '단순 스크립트 대신 MCP',
              'FOWOCO 단일 서식에 묶인 내부 스크립트에 머무르지 않고, 향후 Claude Code 등 다양한 에이전트와 서식으로 확장 가능한 표준 인터페이스(MCP)로 경계를 설계하여 확장성을 확보',
            ],
            [
              '프로젝트의 확장',
              <>
                단일 서식 도구에 머무르지 않고 별도 오픈소스로 독립·고도화하여{' '}
                <Link className="fw-inline-link" to="/projects/hwpx">
                  HWPX Document Plugin
                </Link>{' '}
                프로젝트로 확장
              </>,
            ],
          ]}
        />
        <figure className="fw-document-comparison">
          <div className="fw-document-pair">
            <div>
              <h3>입력 전</h3>
              <button
                type="button"
                className="fw-zoom"
                aria-label="입력 전 문서 크게 보기"
                onClick={() =>
                  zoom({ src: '/images/fowoco-document-before.png', alt: '입력 전 빈 통합신청서' })
                }
              >
                <img src="/images/fowoco-document-before.png" alt="입력 전 빈 통합신청서" loading="lazy" />
              </button>
            </div>
            <div>
              <h3>입력 후</h3>
              <button
                type="button"
                className="fw-zoom"
                aria-label="입력 후 문서 크게 보기"
                onClick={() =>
                  zoom({
                    src: '/images/fowoco-document-after.png',
                    alt: '근로자 정보와 근무처 등이 채워진 통합신청서',
                  })
                }
              >
                <img src="/images/fowoco-document-after.png" alt="근로자 정보와 근무처 등이 채워진 통합신청서" loading="lazy" />
              </button>
            </div>
          </div>
          <figcaption>통합신청서 입력 전후 · 누르면 크게 볼 수 있습니다.</figcaption>
        </figure>
        <figure className="fw-boundary">
          <article>
            <span className="fw-kicker">LangGraph 내 오케스트레이션</span>
            <h3>Agent</h3>
            <p>
              상태와 작업 순서 판단
              <br />
              문서 작업 요청 · 결과 수용
            </p>
          </article>
          <div className="fw-connection">
            <span className="fw-connection-label">문서 작업 요청 및 도구 호출</span>
            <span className="fw-connection-arrow" aria-hidden="true">
              →
            </span>
          </div>
          <article>
            <span className="fw-kicker">독립적으로 확장 가능한 문서 도구</span>
            <h3>HWPX MCP</h3>
            <p>
              양식 분석 · 편집 계획
              <br />
              승인 · 적용 · 최종화
            </p>
          </article>
        </figure>
        <div className="fw-proof-links">
          <Source href={base + '/app/agents/workflow_graph/document_field_map.py'}>필드 매핑 구현</Source>
          <Source href={base + '/app/agents/workflow_graph/nodes/document_generator.py'}>문서 생성·결과 반환</Source>
          <Source href="https://github.com/fowoco/ai/tree/fcefe989c2fce4ccea89ec202226ca18a044f280/app/documents/automation">문서 자동화 구현</Source>
          <Link className="fw-source" to="/projects/hwpx">HWPX Document Plugin 프로젝트 보기 →</Link>
        </div>
      </section>

      <Part n="03" title="결과와 기술적 성찰" id="p-result" />
      <section id="result-evidence" className="fw-section">
        <Heading n="정량 벤치마크" title="가설과 달랐던 측정 결과: 단일 Dense만으로도 충분했다" />
        <div className="fw-findings">
          <article className="fw-benefit">
            <span className="fw-kicker">단일 Dense 검색 적중률</span>
            <strong>99%</strong>
            <h3>단일 Dense만으로 목표 달성</h3>
            <p>정제된 외국어 모음집 특성상, 복잡한 파이프라인 없이도 필요한 표현을 1순위에 검색.</p>
          </article>
          <article className="fw-cost">
            <span className="fw-kicker">복잡도 추가에 따른 지연 시간</span>
            <strong>60 → 390ms</strong>
            <h3>지연 시간 6.5배 폭증</h3>
            <p>적중률 차이는 1%p 미만인 반면, 3중 쿼리와 Re-ranking으로 인한 연산 비용과 대기 시간 급증.</p>
          </article>
        </div>
        <p className="fw-takeaway">
          정제된 데이터셋에 멀티쿼리와 Re-ranking을 얹은 것은 <strong>성능 향상 없는 과잉 설계</strong>로 확인. 당시 데모 일정이 임박해 파이프라인을 즉시 경량화하지 못하고 완주했으나, 벤치마크를 통해 <strong>데이터 규모 측정 없는 복잡도 추가의 대가</strong>를 명확히 확인.
        </p>
        <div className="fw-table" role="region" aria-label="검색 구성별 비교표" tabIndex="0">
          <table>
            <caption>검색 파이프라인 구성별 정량 비교 (평가 데이터셋)</caption>
            <thead>
              <tr>
                <th scope="col">검색 구성</th>
                <th scope="col">검색 성공률(Hit@5)</th>
                <th scope="col">순위 점수(MRR)</th>
                <th scope="col">검색 지연 시간</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]}>
                  {r.map((v, i) =>
                    i === 0 ? (
                      <th scope="row" key={i}>
                        {v}
                      </th>
                    ) : (
                      <td key={i}>{v}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="result-reflection" className="fw-section">
        <Heading n="기술적 성찰" title="과잉 설계를 인지하고도 즉시 고치지 못했던 이유와 교훈" />
        <Facts
          items={[
            ['가설의 오류', '비정형 질의 대응을 위해 최신 RAG 파이프라인을 결합했으나, 실제 정제된 외국어 모음집에서는 단일 Dense만으로도 충분했음을 뒤늦게 확인'],
            ['일정 제약과 기술 부채', '벤치마크로 과잉 설계를 인지했을 때는 서비스 통합 및 시연 일정이 임박해 즉시 구조를 경량화하지 못한 채 완주'],
            ['가장 값진 교훈', '기술의 화려함보다 실제 데이터 규모를 먼저 측정(Measure First)하고, 필요한 만큼만 복잡도를 올려야 한다는 실용적 엔지니어링 원칙 습득'],
          ]}
        />
        <p className="fw-note">
          프로젝트 시연 완료 후 실제 프로덕션 관점에서 아키텍처의 비용 대비 효용을 비판적으로 재평가한 회고입니다.
        </p>
      </section>

      <footer className="fw-footer">
        <Link to="/#projects">← 주요 프로젝트</Link>
        <Link to="/projects/hwpx">다음 프로젝트 · HWPX Document Plugin →</Link>
      </footer>
    </div>
  );
}
