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
      <div className="projects-heading">
        <div className="section-heading">
          <span className="section-index">{sectionNumber} /</span>
          <h2 id="projects-title">주요 프로젝트</h2>
        </div>
      </div>
      {main.map(({ p, slug, story }, i) => (
        <article className="project-card" id={`project-${slug}`} key={p.name}>
          <header className="project-card-head">
            <span className="project-number">{String(i + 1).padStart(2, '0')}</span>
            <h3>
              <Link to={`/projects/${slug}`}>{p.name}</Link>
            </h3>
            <p className="project-period">
              {story.period} · {story.team}
            </p>
          </header>
          <div className="project-card-body">
            <div>
              <Link
                className="project-cover"
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
              <p className="project-goal">
                <span className="project-role-label">목표</span>
                {story.goal}
              </p>
            </div>
            <div className="project-card-main">
              <div>
                <span className="project-role-label">한 일</span>
                <ul className="project-did">
                  {story.did.map(([keyword, tail]) => (
                    <li key={keyword}>
                      <b>{keyword}</b>
                      <span>{tail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="project-role-label">결과</span>
                <ul className="project-metrics">
                  {story.metrics.map(([value, label]) => (
                    <li key={label}>
                      <b>{value}</b>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>
                <p className="project-result">{story.outcome}</p>
              </div>
            </div>
          </div>
          <footer className="project-card-foot">
            <ul className="project-stack">
              {story.stack.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="project-card-links">
              <Link className="project-detail-link" to={`/projects/${slug}`}>
                문제와 해결 과정 보기 <span aria-hidden="true">→</span>
              </Link>
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
            </div>
          </footer>
        </article>
      ))}
      <div className="project-others">
        <p className="project-role-label">그 외 프로젝트</p>
        <ul>
          {more.map(({ p, slug, story }) => (
            <li id={`project-${slug}`} key={p.name}>
              <h3>
                <Link to={`/projects/${slug}`}>
                  {p.name} <span aria-hidden="true">→</span>
                </Link>
              </h3>
              <p className="project-period">
                {story.period} · {story.team}
              </p>
              <p className="project-others-summary">{p.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
