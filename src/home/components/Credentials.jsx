import React from 'react';
import '../styles/credentials.css';

// Source: taejung-resume. Keep this in step with the PDF when the resume changes.
const education = [
  {
    title: '학력',
    rows: [['2020.03 — 2026.02', '상명대학교 소프트웨어학과', '학점 3.95 / 4.5 · 4학년 1학기 학과 수석']],
  },
  {
    title: '교육',
    rows: [
      ['2026.04 — 2026.09', 'KT AIVLE School 9기', 'AI Developer 과정'],
      ['2026.09 — 현재', 'KT그룹 AX전략 기획 및 멀티에이전트 서비스 개발 과정', '10주'],
    ],
  },
];

const certificates = [
  {
    title: '자격증',
    rows: [
      ['2026.04', 'AICE Associate (AI 능력시험)', 'KT · 한국경제신문'],
      ['2026.02', 'ISTQB CTFL (소프트웨어 테스팅)', 'KSTQB'],
      ['2025.09', '정보처리기사', '한국산업인력공단'],
      ['2025.06', 'SQLD (SQL 개발자)', '한국데이터산업진흥원'],
      ['2025.06', 'ADsP (데이터분석 준전문가)', '한국데이터산업진흥원'],
    ],
  },
];

function Group({ title, rows }) {
  return (
    <div className="credentials-group">
      <h3>{title}</h3>
      <dl>
        {rows.map(([period, name, note]) => (
          <div key={name}>
            <dt>{name}</dt>
            <dd>{period && <span className="credentials-period">{period}</span>}{note && <span>{note}</span>}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Credentials({ sectionNumber = '03' }) {
  return (
    <section className="credentials shell" id="credentials" aria-labelledby="credentials-title">
      <div className="section-heading">
        <span className="section-index" aria-hidden="true">{sectionNumber} /</span>
        <h2 id="credentials-title">학력과 자격</h2>
      </div>
      <div className="credentials-groups">
        <div className="credentials-column">
          {education.map(group => <Group key={group.title} {...group}/>)}
        </div>
        <div className="credentials-column">
          {certificates.map(group => <Group key={group.title} {...group}/>)}
        </div>
      </div>
    </section>
  );
}
