# 박태정 포트폴리오

Home uses React, Vite and React Router with local Pretendard assets and neutral light/dark themes. Existing copy, contact information and project facts are shared from `src/content/portfolio.ts`.

- `npm ci`: install locked dependencies.
- `npm run build`: preserve the existing Astro FOWOCO detail, build the React home, and prepare static route entries.
- `npm run dev`: preview the React home. Run a build first to preview the preserved FOWOCO detail.
- `npm run preview`: preview the complete static output.

Home components and styles live in `src/home/`. The supplied HTML remains unchanged in `prototypes/taejung-portfolio.html`. Existing Astro components remain available for the preserved detail. No new project case study or company theme is implemented.

The desktop profile is capped at 380px, with a 4:3 image. Below 900px the photo becomes compact. Reduced motion, keyboard focus, skip navigation, local theme persistence, mobile menu and downloadable resume are supported. The three future project URLs have minimal shared placeholders, and unknown URLs have a home link.

Publishing uses the existing project in `.openai/hosting.json`. Saving a version does not update the public site.
