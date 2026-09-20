import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/fowoco-editorial.css';
import useTocSpy from './useTocSpy';
import '../styles/hwpx-editorial.css';

const base = 'https://github.com/taejung3852/hwpx-document-plugin/blob/c73359a15341977e56d0cfa253f8f4d9fb625ccd';
const tree = 'https://github.com/taejung3852/hwpx-document-plugin/tree/c73359a15341977e56d0cfa253f8f4d9fb625ccd';

const mapping = [
  ['체류기간 연장허가', '체류기간 연장허가 EXTENSION OF SOJOURN PERIOD'],
  ['NGUYEN', '성 Surname'],
  ['VAN AN', '명 Given names'],
  ['1995-04-12', '생년월일 Date of Birth'],
  ['9504125000000', '외국인등록번호 Foreign Resident Registration No.'],
  ['010-0000-0000', '휴대전화 Cell phone No.'],
  ['031-000-0000', '전화번호 Phone No. — 근무처 행'],
  ['3000', '연 소득금액 Annual Income Amount'],
];

function Source({ href, children = '구현 근거' }) {
  return (
    <a className="fw-source" href={href} target="_blank" rel="noreferrer">
      {children} ↗
    </a>
  );
}

function Field({ children }) {
  return <span className="hx-field">{children}</span>;
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

export default function HwpxStudy() {
  useTocSpy();
  const dialog = useRef(null);
  const [shot, setShot] = useState(null);
  const zoom = (s) => {
    setShot(s);
    dialog.current.showModal();
  };

  useEffect(() => {
    document.title = 'HWPX Document Plugin | 박태정';
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
          <span>HWPX Document Plugin</span>
        </div>
        <div className="fw-hero-split">
          <div className="fw-hero-copy">
            <p className="fw-kicker">2인 팀 프로젝트 · 오픈소스 도구</p>
            <h1>
              양식의 구조를 읽고,
              <br />
              확인한 값만 반영합니다.
            </h1>
            <p className="fw-lead">
              공문서(HWPX)의 XML 구조와 시각 배치를 분석해, AI의 임의 추측 입력을 원천 차단하고 확인된 값만 서식에 반영하는 Agent Plugin.
            </p>
          </div>
          <figure className="fw-cover">
            <img
              src="/images/hwpx-cover.png"
              alt="HWPX Document Plugin 개요 — 문서의 XML 구조와 시각 배치를 연결해 입력칸을 파악하고 값 확인·승인·편집으로 이어지는 흐름"
              width="1672"
              height="941"
              loading="eager"
            />
          </figure>
        </div>
        <dl className="fw-meta">
          <div>
            <dt>구성</dt>
            <dd>MCP 도구 25종 · Agent Skills 5종</dd>
          </div>
          <div>
            <dt>담당</dt>
            <dd>MCP 전반 설계·구현 · Agent Skills 프로토콜 개발 · Plugin 패키징</dd>
          </div>
          <div>
            <dt>결과</dt>
            <dd>임의 추측 입력 원천 차단 · 서명란/공용란 무단 작성 거절</dd>
          </div>
          <div>
            <dt>스택</dt>
            <dd>Python · MCP · Agent Skills · STDIO</dd>
          </div>
        </dl>
      </header>

      <nav className="fw-toc" aria-label="상세 페이지 목차">
        <a href="#p-problem">01 문제</a>
        <a href="#p-solution">02 해결</a>
        <a href="#p-result">03 결과와 회고</a>
      </nav>

      <Part n="01" title="마주한 문제와 구조적 한계" id="p-problem" />
      <section id="problem" className="fw-section">
        <Heading n="핵심 문제" title="XML 구조와 시각 배치의 괴리, 그리고 임의 추측 입력(환각)" />
        <Facts
          items={[
            ['도구 부재', 'Word·Excel과 달리 한국 행정 공문서 표준인 HWPX 전용 에이전트 플러그인 부재'],
            ['FOWOCO에서의 출발', <>체류 서류 자동화를 위해 <Link className="fw-inline-link" to="/projects/fowoco">FOWOCO</Link> 내부 함수로 시작했으나 범용 에이전트 확장을 위해 독립 분리</>],
            ['XML과 배치의 괴리', <><Field>전화번호 Phone No.</Field> 등 동일 문구가 서식 내 4곳에 중복 존재해 단순 텍스트 파싱만으로는 입력 위치 특정 불가</>],
            ['직접 편집 시 환각', 'LLM(ChatGPT 웹)에 직접 서식 편집 요청 시 13자리 낱칸 뭉개짐, 성별 미체크, 요청하지 않은 서명란/공용란 무단 기입 발생'],
          ]}
        />
        <div className="hx-shots">
          <figure>
            <span className="fw-kicker">LLM 직접 편집 실패 사례 (서명란 무단 기입)</span>
            <div>
              <button
                type="button"
                className="fw-zoom"
                aria-label="서명란 무단 기입 결과 크게 보기"
                onClick={() =>
                  zoom({
                    src: '/images/hwpx-overfill.png',
                    alt: '플러그인 없이 작성된 통합신청서 첫 번째 결과. 외국인등록번호 낱칸 정렬 실패 및 서명란 무단 기입',
                  })
                }
              >
                <img src="/images/hwpx-overfill.png" alt="플러그인 없이 작성된 통합신청서 첫 번째 결과" width="1132" height="1596" loading="lazy" />
              </button>
            </div>
          </figure>
          <figure>
            <span className="fw-kicker">동일 문구 다수 중복 사례 (전화번호 4곳)</span>
            <div>
              <button
                type="button"
                className="fw-zoom"
                aria-label="동일 문구 중복 양식 크게 보기"
                onClick={() =>
                  zoom({
                    src: '/images/hwpx-blank-2.png',
                    alt: '빈 통합신청서의 전화번호 칸 네 곳이 빨간 사각형으로 표시된 그림',
                  })
                }
              >
                <img
                  src="/images/hwpx-blank-2.png"
                  alt="빈 통합신청서의 전화번호 칸 네 곳이 빨간 사각형으로 표시된 그림"
                  width="794"
                  height="423"
                  loading="lazy"
                />
              </button>
            </div>
          </figure>
        </div>
        <p className="fw-takeaway">
          단순한 텍스트 기입 실패가 아닌, <strong>실행마다 달라지는 비결정적 동작과 서명란/공용란 무단 작성(환각)</strong>이 공문서 자동화의 핵심 장애물이었습니다.
        </p>
      </section>

      <Part n="02" title="설계와 해결" id="p-solution" />
      <section id="solution-hitl" className="fw-section">
        <Heading n="인간 승인(HITL)" title="시각적 확인 루프(HITL)와 금지 구역 방어" />
        <Facts
          items={[
            ['시각적 확인 루프', '값을 넣을 칸을 시각적 박스로 하이라이트하여 사람의 승인 후 입력 진행 (반려 시 위치 재조정)'],
            ['입력 단위 그룹화', '인적사항 · 여권 · 주소 · 근무처 등 의미 단위로 묶어 사용자 확인 피로도 최소화'],
            ['금지 구역 차단', '서명란 · 공용란 등 사용자 권한 밖의 셀에 대한 쓰기 계획은 파이프라인에서 원천 거절'],
          ]}
        />
        <figure className="fw-cover">
          <button
            type="button"
            className="fw-zoom"
            aria-label="확인 화면 크게 보기"
            onClick={() =>
              zoom({
                src: '/images/hwpx-confirm.png',
                alt: '통합신청서의 성명·생년월일·성별·국적 칸에 파란 사각형이 표시된 확인용 그림',
              })
            }
          >
            <img
              src="/images/hwpx-confirm.png"
              alt="통합신청서의 성명·생년월일·성별·국적 칸에 파란 사각형이 표시된 확인용 그림"
              width="794"
              height="143"
              loading="lazy"
            />
          </button>
          <figcaption>에이전트가 입력 직전 사용자에게 보여주는 시각적 확인 화면</figcaption>
        </figure>
        <div className="fw-proof-links">
          <Source href={base + '/src/hwp_mcp/server.py'}>preview_field_section · confirm_visual_candidates</Source>
          <Source href={base + '/src/hwp_mcp/plans.py'}>서명란·공용란 거절 규칙</Source>
        </div>
      </section>

      <section id="solution-arch" className="fw-section">
        <Heading n="플러그인 구조" title="단위 기능 도구(MCP)와 실행 절차(Agent Skills)의 분리" />
        <Facts
          items={[
            ['도구-절차 분리', '문서를 조작하는 단위 기능 도구 25종(MCP)과 작업 순서를 강제하는 워크플로 5종(Agent Skills)으로 분리'],
            ['순서 오류 방어', '분석 전 조회, 위치 확인 생략 등 비정상적 도구 호출을 거절하고 규정된 프로토콜 준수 강제'],
            ['원클릭 배포', 'mcp.json과 skills/를 plugin.json 하나로 패키징해 Claude Code, Codex 등 범용 에이전트에 즉시 연동'],
          ]}
        />
        <figure className="fw-boundary">
          <article>
            <span className="fw-kicker">mcp.json · 도구 25종</span>
            <h3>MCP 서버</h3>
            <p>
              가져오기 · 분석 · 확인 · 편집 · 검증
              <br />
              문서를 실제로 조작하는 단위 기능 실행
            </p>
          </article>
          <div className="fw-connection">
            <span className="fw-connection-label">plugin.json 으로 결합</span>
            <span className="fw-connection-arrow" aria-hidden="true">
              ↔
            </span>
          </div>
          <article>
            <span className="fw-kicker">skills · 5종</span>
            <h3>Agent Skills</h3>
            <p>
              진입 스킬 1 + 작업별 4
              <br />
              언제 무엇을 호출할지 순서 강제
            </p>
          </article>
          <figcaption>2인 팀 프로젝트이며, 저장소 내 WASM 뷰어 실험은 팀원 담당</figcaption>
        </figure>
        <div className="fw-proof-links">
          <Source href={tree + '/src/hwp_mcp'}>MCP 구현</Source>
          <Source href={tree + '/skills'}>Agent Skills</Source>
          <Source href={base + '/plugin.json'}>plugin.json</Source>
        </div>
      </section>

      <Part n="03" title="결과와 기술적 성찰" id="p-result" />
      <section id="result" className="fw-section">
        <Heading n="정밀 대조" title="서식 반영 결과 및 셀 단위 구조 보존 대조" />
        <div className="hx-side">
          <div className="fw-table" tabIndex="0" role="region" aria-label="양식의 문항과 입력된 값">
            <table>
              <thead>
                <tr>
                  <th scope="col">양식 문항</th>
                  <th scope="col">반영 값</th>
                </tr>
              </thead>
              <tbody>
                {mapping.map(([v, cell]) => (
                  <tr key={v}>
                    <th scope="row">{cell}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figure>
            <button
              type="button"
              className="fw-zoom"
              aria-label="작성된 신청서 크게 보기"
              onClick={() =>
                zoom({
                  src: '/images/hwpx-filled.png',
                  alt: '플러그인으로 작성된 통합신청서 완성본',
                })
              }
            >
              <img src="/images/hwpx-filled.png" alt="플러그인으로 작성된 통합신청서 완성본" width="794" height="1123" loading="lazy" />
            </button>
            <figcaption>가상 정보가 지정된 칸에 정확히 반영된 결과</figcaption>
          </figure>
        </div>

        <div className="hx-cells-pair">
          <div className="hx-cells">
            <table>
              <caption>
                신청 종류 체크란 <span>section0.table0.row7</span>
              </caption>
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">셀 내용</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">원본</th>
                  <td>
                    <code>[ ] 체류기간 연장허가 EXTENSION OF SOJOURN PERIOD</code>
                  </td>
                </tr>
                <tr>
                  <th scope="row">ChatGPT 웹</th>
                  <td>
                    <code>
                      [<ins>√</ins>] <del>체류기간 연장허가</del> EXTENSION OF SOJOURN PERIOD
                    </code>
                  </td>
                </tr>
                <tr>
                  <th scope="row">플러그인</th>
                  <td>
                    <code>
                      [<ins>V</ins>] 체류기간 연장허가 EXTENSION OF SOJOURN PERIOD
                    </code>
                  </td>
                </tr>
              </tbody>
            </table>
            <p>웹 직접 실행은 체크 표기 시 기존 문구를 삭제함 vs 플러그인은 원본 문구 완벽 보존</p>
          </div>
          <div className="hx-cells">
            <table>
              <caption>
                연 소득금액 <span>section0.table0.row26</span>
              </caption>
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">단위 라벨 칸</th>
                  <th scope="col">입력 대상 칸</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">원본</th>
                  <td>
                    <code>만원(ten thousand won)</code>
                  </td>
                  <td className="hx-gone">비어 있음</td>
                </tr>
                <tr>
                  <th scope="row">ChatGPT 웹</th>
                  <td>
                    <code>만원(ten thousand won)</code>
                  </td>
                  <td>
                    <code>
                      <ins>3,000</ins>
                    </code>
                  </td>
                </tr>
                <tr>
                  <th scope="row">플러그인</th>
                  <td>
                    <code>
                      <ins>3000</ins> 만원(ten thousand won)
                    </code>
                  </td>
                  <td className="hx-gone">비어 있음</td>
                </tr>
              </tbody>
            </table>
            <p>
              라벨 칸에 값을 붙인 계획 수립 오류 사례. <strong>실행 검사만으로는 잡을 수 없는 계획 자체의 한계로 솔직히 기록.</strong>
            </p>
          </div>
        </div>
        <div className="fw-proof-links">
          <Source href={base + '/src/hwp_mcp/server.py'}>compare_document_versions</Source>
          <Source href={base + '/src/hwp_mcp/vision.py'}>review_document_vision</Source>
        </div>
      </section>

      <section id="result-reflection" className="fw-section">
        <Heading n="기술적 성찰" title="계획대로 실행된 것과, 계획이 옳았던 것의 차이" />
        <Facts
          items={[
            ['현재 검증 범위', '편집 계획대로 정확히 실행되었는지만 검증 (이번 실행은 기대와 전건 일치)'],
            ['놓치고 있던 것', '그 계획 자체가 옳았는지 여부. 소득금액을 라벨 칸에 넣은 계획의 결함은 그대로 통과'],
            ['지금 다시 설계한다면', '값을 파일에 쓰기 전에 계획 자체를 검사하고 필드 정당성을 확인하는 사전 검증 단계 필요'],
          ]}
        />
        <p className="fw-note">
          * 양식 한 종류를 한 번 실행한 대조 기록에서 도출한 관찰입니다. 실제 재설계를 수행한 것은 아닙니다.
        </p>
      </section>

      <footer className="fw-footer">
        <Link to="/#projects">← 주요 프로젝트</Link>
        <Link to="/projects/ownhands">다음 프로젝트 · OwnHands →</Link>
      </footer>
    </div>
  );
}
