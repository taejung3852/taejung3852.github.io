import React from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../content/site';
import ProfileCard from './ProfileCard';

export default function Hero(){
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">
          {profile.headline.map(line => <span key={line}>{line}</span>)}
        </h1>
        <p className="hero-description">{profile.description.join(' ')}</p>

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
    </section>
  );
}

