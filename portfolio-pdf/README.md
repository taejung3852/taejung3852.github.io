# 제출용 포트폴리오 PDF

`park-taejung-portfolio.pdf`는 웹 포트폴리오 홈 화면을 그대로 인쇄한 3쪽짜리 제출용 파일입니다. 1쪽은 소개·기술 스택·역량, 2쪽은 주요 프로젝트, 3쪽은 그 외 프로젝트와 학력·자격입니다. PDF 안의 링크는 배포된 사이트의 상세 페이지로 연결됩니다.

내용은 홈 화면에서 고칩니다. 홈을 수정한 뒤 저장소 루트에서 다시 생성하세요. Chrome과 Playwright가 필요합니다.

```bash
npm run build && node portfolio-pdf/build.mjs
```

Playwright가 이 저장소에 설치되어 있지 않으면 `PLAYWRIGHT=<playwright 모듈 경로>`로 위치를 알려줍니다.
