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
            <dd>단일 Dense Hit@5 99% 확인 · 복잡한 검색의 지연 증가(60→390ms)를 측정하고 단순화 방향 도출</dd>
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
              '문서 기능 분리',
              '문서 기능을 MCP 도구로 분리해 다른 에이전트와 서식에도 연결할 수 있도록 설계',
            ],
            [
              '프로젝트의 확장',
              <>
                FOWOCO의 문서 기능은 이후 별도 오픈소스인{' '}
                <Link className="fw-inline-link" to="/projects/hwpx">
                  HWPX Document Plugin
                </Link>{' '}
                프로젝트로 이어졌습니다.
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

      <Part n="03" title="측정 결과와 설계 판단" id="p-result" />
      <section id="result-evidence" className="fw-section">
        <Heading n="정량 벤치마크" title="가설과 달랐던 측정 결과: 단일 Dense만으로도 충분했다" />
        <div className="fw-findings">
          <article className="fw-benefit">
            <span className="fw-kicker">단일 Dense 검색 Hit@5</span>
            <strong>99%</strong>
            <h3>단일 Dense 검색 Hit@5 99%</h3>
            <p>평가 질의의 99%에서 필요한 표현이 검색 결과 상위 5개 안에 들었습니다.</p>
          </article>
          <article className="fw-cost">
            <span className="fw-kicker">복잡도 추가에 따른 지연 시간</span>
            <strong>60 → 390ms</strong>
            <h3>검색 지연 시간 6.5배</h3>
            <p>멀티쿼리와 Re-ranking을 더하자 Hit@5는 1%p 높아졌고, 지연 시간은 60ms에서 390ms로 늘었습니다.</p>
          </article>
        </div>
        <p className="fw-takeaway">
          멀티쿼리와 Re-ranking으로 검색 성능은 소폭 높아졌지만 지연 시간이 크게 늘었습니다. 시연 일정 때문에 당시 구성은 유지했고, 측정 결과를 바탕으로 <strong>파이프라인을 단순화할 필요</strong>를 확인했습니다.
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
        <Heading n="다음 설계 기준" title="측정 결과를 확인한 뒤 내린 판단" />
        <Facts
          items={[
            ['검색 가설', '비정형 질문에 대응하려고 검색 단계를 늘렸지만, 정제된 모음집에서는 단일 Dense 검색도 Hit@5 99%를 기록'],
            ['일정 제약', '벤치마크 결과를 확인했을 때는 통합과 시연 일정이 가까워 구성을 바꾸지 못함'],
            ['이후 설계 기준', '데이터와 지연 시간을 먼저 측정한 뒤 필요한 검색 단계만 추가'],
          ]}
        />
        <p className="fw-note">
          단순화는 시연 당시 적용한 변경이 아니라, 이후 벤치마크를 검토하며 정한 개선 방향입니다.
        </p>
      </section>

      <footer className="fw-footer">
        <Link to="/#projects">← 주요 프로젝트</Link>
        <Link to="/projects/hwpx">다음 프로젝트 · HWPX Document Plugin →</Link>
      </footer>
    </div>
  );
}
