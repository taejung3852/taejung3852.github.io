import React from 'react';
import { contribution } from '../content/contribution';
import '../styles/contribution.css';
export default function CompanyContribution() {
  if (!contribution.enabled) return null;
  return (
    <section className="contribution shell" id="contribution" aria-labelledby="contribution-title">
      <div className="contribution-meta">
        <span className="section-index" aria-hidden="true">02 /</span>
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
              {index < contribution.steps.length - 1 && <span className="contribution-arrow" aria-hidden="true">→</span>}
            </div>
            <p className="contribution-statement">{step.headline.split('\n').map(line => <span key={line}>{line}</span>)}</p>
            <p className="contribution-description">{step.description}</p>
            <p className="contribution-evidence">{step.evidence}</p>
          </li>
        ))}
      </ol>
      {contribution.isGuide && <p className="contribution-note">지원 회사에 맞춰 작성할 영역입니다. 실제 회사 분석과 기여 내용은 아직 입력하지 않았습니다.</p>}
    </section>
  );
}
