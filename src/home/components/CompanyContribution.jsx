import React, { useEffect, useRef } from 'react';
import { contribution } from '../content/contribution';
import '../styles/contribution.css';
export default function CompanyContribution() {
  const scrollRegion = useRef(null);
  const slides = useRef(null);
  const sync = useRef(() => {});
  useEffect(() => {
    if (!contribution.enabled) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const region = scrollRegion.current;
      if (!region) return;
      const rect = region.getBoundingClientRect();
      const progress = Math.max(0, Math.min(5, -rect.top / Math.max(1, rect.height - window.innerHeight) * 5));
      slides.current?.contentWindow?.postMessage({type:'company-fit-progress',progress}, window.location.origin);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    sync.current = schedule;
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);
    schedule();
    return () => {window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);observer.disconnect();cancelAnimationFrame(frame);};
  }, []);
  if (!contribution.enabled) return null;
  return (
    <section className="contribution shell" id="contribution" aria-labelledby="contribution-title">
      <div className="contribution-meta"><span className="section-index" aria-hidden="true">02 /</span>{contribution.isGuide && <span className="contribution-guide">회사별 작성 가이드</span>}</div>
      <div className="contribution-heading"><h2 id="contribution-title">{contribution.title}</h2><p>{contribution.introduction}</p></div>
      <div className="contribution-scroll" ref={scrollRegion}>
        <iframe ref={slides} onLoad={() => sync.current()} className="contribution-slides" src="/presentations/company-fit.html" title="스크롤로 읽는 회사별 기여 슬라이드" tabIndex="-1" />
      </div>
      <div className="contribution-slide-help"><p>아래로 스크롤하면 다음 장으로, 위로 스크롤하면 이전 장으로 이동합니다.</p><a href="/presentations/company-fit.html" target="_blank" rel="noreferrer">슬라이드 별도 창으로 열기 ↗</a></div>
      {contribution.isGuide && <p className="contribution-note">회사별 작성 가이드입니다. 실제 회사 분석과 성과 수치는 아직 입력하지 않았습니다.</p>}
    </section>
  );
}
