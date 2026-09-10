import React from 'react';
import {Link} from 'react-router-dom';
import { projects, projectHighlights } from '../content/site';
function HighlightedSummary({project}) {
 const phrase = projectHighlights[project.name];
 const index = phrase ? project.summary.indexOf(phrase) : -1;
 if(index < 0) return project.summary;
 return <>{project.summary.slice(0,index)}<strong className="project-emphasis">{phrase}</strong>{project.summary.slice(index + phrase.length)}</>;
}
export default function ProjectList({sectionNumber = '02'}){return <section className="projects shell" id="projects" aria-labelledby="projects-title"><div className="projects-heading"><div className="section-heading"><span className="section-index" aria-hidden="true">{sectionNumber} /</span><h2 id="projects-title">주요 프로젝트</h2></div><p className="section-intro">어떤 문제를 만났고, 왜 그렇게 설계했는지.<br/>구현과 검증의 근거를 함께 담았습니다.</p></div><div className="project-list">{projects.map((p,i)=><article className="project-row" key={p.name}><div className="project-title"><span className="project-number" aria-hidden="true">{String(i+1).padStart(2,'0')}</span><div className="project-identity"><h3>{i===0?<Link to="/projects/fowoco">{p.name}</Link>:p.name}</h3><div className="project-image-guide" role="img" aria-label={`${p.name} 대표 이미지 예정 영역`}><span>대표 이미지</span></div></div></div><div className="project-details"><p className="project-summary"><HighlightedSummary project={p}/></p><p className="project-role">{p.role}</p><p className="project-status">{p.status}</p></div><a className="repository-link" href={p.href} target="_blank" rel="noreferrer" aria-label={`${p.name} 저장소 보기, 새 탭`}><span>{p.linkLabel}</span><span className="link-arrow" aria-hidden="true">↗</span></a></article>)}</div></section>}
