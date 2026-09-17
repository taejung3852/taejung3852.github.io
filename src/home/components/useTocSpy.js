import {useEffect} from 'react';

// Marks the fw-toc link for whatever section the reader is on. The observer watches
// a thin band near the top of the viewport so at most one section is inside it; when
// none are — between two sections — the last mark stays put rather than flickering.
export default function useTocSpy() {
  useEffect(() => {
    const links = [...document.querySelectorAll('.fw-toc a[href^="#"]')];
    if (!links.length) return;
    const ids = links.map(a => a.getAttribute('href').slice(1));
    const mark = id => links.forEach((a, i) =>
      ids[i] === id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));

    const onscreen = new Set();
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting ? onscreen.add(e.target.id) : onscreen.delete(e.target.id));
      const active = ids.find(id => onscreen.has(id));
      if (active) mark(active);
    }, {rootMargin: '-12% 0px -76% 0px'});

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    mark(ids[0]);
    return () => io.disconnect();
  }, []);
}
