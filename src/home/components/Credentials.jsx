import React from 'react';
import '../styles/credentials.css';

// Source: taejung-resume. Keep this in step with the PDF when the resume changes.
const groups = [
  {
    title: '학력',
    rows: [['2020.03 — 2026.02', '상명대학교 소프트웨어학과', '학점 3.95 / 4.5']],
  },
  {
    title: '교육',
    rows: [
      ['2026.04 — 2026.09', 'KT AIVLE School 9기', 'AI Developer 과정'],
      ['2026.09 — 현재', 'KT그룹 AX전략 기획 및 멀티에이전트 서비스 개발 과정', '10주'],
    ],
  },
  {
    title: '자격증',
    rows: [
      ['', 'AICE Associate', ''],
      ['', 'ISTQB CTFL', ''],
      ['', '정보처리기사', ''],
      ['', 'SQLD', ''],
      ['', 'ADsP', ''],
    ],
  },
];

export default function Credentials({ sectionNumber = '03' }) {
  return (
    <section className="credentials shell" id="credentials" aria-labelledby="credentials-title">
      <div className="section-heading">
        <span className="section-index" aria-hidden="true">{sectionNumber} /</span>
        <h2 id="credentials-title">학력과 자격</h2>
      </div>
      <div className="credentials-groups">
        {groups.map(group => (
          <div className="credentials-group" key={group.title}>
            <h3>{group.title}</h3>
            <dl>
              {group.rows.map(([period, name, note]) => (
                <div key={name}>
                  <dt>{name}</dt>
                  <dd>{period && <span className="credentials-period">{period}</span>}{note && <span>{note}</span>}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}
