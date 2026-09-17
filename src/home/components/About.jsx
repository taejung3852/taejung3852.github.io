import React from 'react';
import { Link } from 'react-router-dom';
import { capabilities } from '../content/capabilities';
import { projects, projectSlugs } from '../content/site';
import '../styles/capabilities.css';

const nameOf = slug => projects[projectSlugs.indexOf(slug)]?.name ?? slug;

const emphasize = text =>
  text.split(/\*\*(.+?)\*\*/).map((part, n) => (n % 2 ? <strong key={n}>{part}</strong> : part));

// Lucide paths, inlined: three icons don't justify pulling in the icon package.
const iconPaths = {
  search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  wrench: <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />,
  check: <><path d="M18 6 7 17l-5-5" /><path d="m22 10-7.5 7.5L13 16" /></>,
};

const Icon = ({ name }) => (
  <svg className="capability-icon" viewBox="0 0 24 24" width="26" height="26" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {iconPaths[name]}
  </svg>
);

export default function About({ sectionNumber = '02' }) {
  return (
    <section className="about capabilities shell" id="about" aria-labelledby="about-title">
      <div className="capabilities-heading">
        <div className="section-heading">
          <span className="section-index" aria-hidden="true">{sectionNumber} /</span>
          <h2 id="about-title">{capabilities.title}</h2>
        </div>
        <p className="section-intro">{capabilities.introduction}</p>
      </div>
      <ol className="capability-list">
        {capabilities.items.map(item => (
          <li className="capability" key={item.title}>
            <Icon name={item.icon} />
            <h3>{item.title}</h3>
            <ul className="capability-points">
              {item.points.map(point => <li key={point}>{emphasize(point)}</li>)}
            </ul>
            <p className="capability-projects">
              <span className="capability-projects-label">관련 프로젝트</span>
              {item.projects.map(slug => (
                <Link key={slug} to={`/projects/${slug}`}>{nameOf(slug)}</Link>
              ))}
            </p>
          </li>
        ))}
      </ol>
      <dl className="capability-stack">
        {capabilities.stack.map(([group, tags]) => (
          <div key={group}>
            <dt>{group}</dt>
            <dd><ul className="project-stack">{tags.map(t => <li key={t}>{t}</li>)}</ul></dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
