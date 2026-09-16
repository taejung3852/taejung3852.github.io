import React from 'react';
import { Link } from 'react-router-dom';
import { capabilities } from '../content/capabilities';
import { projects, projectSlugs } from '../content/site';
import '../styles/capabilities.css';

const nameOf = slug => projects[projectSlugs.indexOf(slug)]?.name ?? slug;

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
        {capabilities.items.map((item, index) => (
          <li className="capability" key={item.title}>
            <p className="capability-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</p>
            <h3>{item.title}</h3>
            <p className="capability-description">{item.description}</p>
            <p className="capability-projects">
              <span className="capability-projects-label">관련 프로젝트</span>
              {item.projects.map(slug => (
                <Link key={slug} to={`/projects/${slug}`}>{nameOf(slug)}</Link>
              ))}
            </p>
          </li>
        ))}
      </ol>
      <div className="capability-principle"><p>{capabilities.principle}</p></div>
    </section>
  );
}
