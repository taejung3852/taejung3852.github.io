import React from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../content/site';
import { capabilities } from '../content/capabilities';
import ProfileCard from './ProfileCard';

// The first screen has to introduce the person on its own: role, strengths, background, stack.
export default function Hero(){
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          {profile.headline.map(line => <span key={line}>{line}</span>)}
        </h1>
        <ul className="hero-strengths" aria-label="핵심 역량">
          {capabilities.items.map(item => (
            <li key={item.title}>
              <b>{item.title}</b>
              <span>{item.summary}</span>
            </li>
          ))}
        </ul>

        <div className="hero-cta-group">
          <Link className="button" to="/#projects">
            주요 프로젝트 보기 <span aria-hidden="true">↓</span>
          </Link>
          <a className="button button-secondary" href="/documents/taejung-resume.pdf" download>
            이력서 다운로드 <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <ProfileCard/>
      <dl className="hero-stack">
        {capabilities.stack.map(([group, tags]) => (
          <div key={group}>
            <dt>{group}</dt>
            <dd><ul className="project-stack">{tags.map(t => (
              <li key={t}>
                {capabilities.stackLogos[t] && (
                  <img className="stack-logo" src={'/images/stack/' + capabilities.stackLogos[t]} alt="" width="18" height="18" decoding="async"/>
                )}
                {t}
              </li>
            ))}</ul></dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
