import React from 'react';
import { contribution } from '../content/contribution';
import '../styles/contribution.css';

export default function CompanyContribution({ sectionNumber = '03' }) {
  if (!contribution.enabled) return null;
  return (
    <section className="contribution shell" id="contribution" aria-labelledby="contribution-title">
      <div className="contribution-meta">
        <span className="section-index" aria-hidden="true">{sectionNumber} /</span>
        {contribution.isGuide && <span className="contribution-guide">회사별 작성 가이드</span>}
      </div>
      <div className="contribution-heading">
        <h2 id="contribution-title">{contribution.title}</h2>
        <p>{contribution.introduction}</p>
      </div>
      <ol className="contribution-flow">
        {contribution.steps.map((step, index) => (
          <li className="contribution-step" key={step.title}>
            <div className="contribution-step-label">
              <span className="contribution-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
            </div>
            <p className="contribution-statement">
              {step.headline.split('\n').map(line => <span key={line}>{line}</span>)}
            </p>
            <p className="contribution-description">{step.description}</p>
            <p className="contribution-evidence">{step.evidence}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
