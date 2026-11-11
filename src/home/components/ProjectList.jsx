import React from 'react';
import { Link } from 'react-router-dom';
import {
  projects,
  projectSlugs,
  homeProjectStories,
} from '../content/site';

const covers = {
  fowoco: {
    src: '/images/fowoco-cover.png',
    alt: 'FOWOCO — AI 기반 제조업 E-9 외국인력 HR 업무보조 플랫폼',
    width: 2380,
    height: 1334,
  },
  hwpx: {
    src: '/images/hwpx-cover.png',
    alt: 'HWPX Document Plugin — XML 구조와 렌더된 문서를 연결해 입력칸을 파악하고, 값 확인·승인·편집·검증으로 이어지는 작업 흐름 개요',
    width: 1672,
    height: 941,
  },
  'llm-gateway': {
    src: '/images/gateway-input.png',
    alt: '가성비·속도·성능·기억력의 중요도를 설정하는 GateIn 화면',
    width: 1515,
    height: 1038,
    className: ' gateway-input-cover',
  },
};

const entries = projects.map((p, i) => ({
  p,
  slug: projectSlugs[i],
  story: homeProjectStories[i],
}));
const main = entries.filter((e) => !e.story.more);
const more = entries.filter((e) => e.story.more);

export default function ProjectList({ sectionNumber = '01' }) {
  return (
    <section className="projects shell" id="projects" aria-labelledby="projects-title">
      {main.map(({ p, slug, story }, i) => (
        <div className="home-project-scene" id={`project-${slug}`} key={p.name}>
          {i === 0 && (
            <div className="projects-heading">
              <div className="section-heading">
                <span className="section-index">{sectionNumber} /</span>
                <h2 id="projects-title">주요 프로젝트</h2>
              </div>
              <p className="section-intro">프로젝트마다 목표와 제가 한 일, 결과를 정리했습니다.</p>
            </div>
          )}
          <article className="project-row">
            <div className="project-title">
              <span className="project-number">{String(i + 1).padStart(2, '0')}</span>
              <div className="project-identity">
                <h3>
                  <Link to={`/projects/${slug}`}>{p.name}</Link>
                </h3>
                <p className="project-period">
                  {story.period} · {story.team}
                </p>
                <Link
                  className={'project-cover' + (covers[slug].className ?? '')}
                  to={`/projects/${slug}`}
                  aria-label={`${p.name} 프로젝트 페이지 보기`}
                >
                  <img
                    src={covers[slug].src}
                    alt={covers[slug].alt}
                    width={covers[slug].width}
                    height={covers[slug].height}
                    loading="lazy"
                    decoding="async"
                  />
                </Link>
              </div>
            </div>
            <div className="project-details">
              <p className="project-block">
                <span className="project-role-label">목표</span>
                {story.goal}
              </p>
              <div className="project-block">
                <span className="project-role-label">한 일</span>
                <ul className="project-did">
                  {story.did.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
              <div className="project-block">
                <span className="project-role-label">결과</span>
                <div>
                  <ul className="project-metrics">
                    {story.metrics.map(([value, label]) => (
                      <li key={label}>
                        <b>{value}</b>
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                  <p>{story.outcome}</p>
                </div>
              </div>
              <ul className="project-stack">
                {story.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <Link className="project-detail-link" to={`/projects/${slug}`}>
                문제와 해결 과정 보기 <span aria-hidden="true">→</span>
              </Link>
            </div>
            <a
              className="repository-link"
              href={p.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.name} 저장소 보기, 새 탭`}
            >
              <span>{p.linkLabel}</span>
              <span className="link-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </article>
        </div>
      ))}
      {more.map(({ p, slug, story }) => (
        <div className="home-project-scene project-more" id={`project-${slug}`} key={p.name}>
          <p className="project-role-label">진행 중인 프로젝트</p>
          <h3>
            <Link to={`/projects/${slug}`}>
              {p.name} <span aria-hidden="true">→</span>
            </Link>
          </h3>
          <p className="project-period">
            {story.period} · {story.team}
          </p>
          <p className="project-more-summary">{p.summary}</p>
        </div>
      ))}
    </section>
  );
}
