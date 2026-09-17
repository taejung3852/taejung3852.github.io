import {useEffect} from 'react';

// Marks the fw-toc link for the section the reader is on: the last one whose top
// has passed a line just below the viewport top. Measuring beats an observer band
// here — a band tall enough to be reliable is also tall enough to hold a section
// boundary, and then two sections match at once and the earlier one wins wrongly.
export default function useTocSpy() {
  useEffect(() => {
    const links = [...document.querySelectorAll('.fw-toc a[href^="#"]')];
    if (!links.length) return;
    const ids = links.map(a => a.getAttribute('href').slice(1));
    // The rail hides its text at narrow widths and shows it via content:attr(data-label).
    links.forEach(a => { a.dataset.label = a.textContent.trim(); });

    let current = null;
    const update = () => {
      const line = 140;
      let active = ids[0];
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) active = id;
      });
      if (active === current) return;
      current = active;
      links.forEach((a, i) =>
        ids[i] === active ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
    };

    let queued = false;
    const onscroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => { queued = false; update(); });
    };
    addEventListener('scroll', onscroll, {passive: true});
    addEventListener('resize', onscroll);
    update();
    return () => {
      removeEventListener('scroll', onscroll);
      removeEventListener('resize', onscroll);
    };
  }, []);
}
