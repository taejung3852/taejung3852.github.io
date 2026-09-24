# 제출용 포트폴리오 PDF

`park-taejung-portfolio.pdf`는 웹 포트폴리오의 4개 프로젝트를 3쪽으로 요약한 제출용 파일입니다. PDF의 프로젝트 제목과 링크에서 상세 페이지를 열 수 있습니다.

내용을 수정하려면 `build.py`를 편집하세요. `npm ci`로 Pretendard 글꼴을 준비하고 Python 환경에 `reportlab`을 설치한 뒤 저장소 루트에서 다시 생성할 수 있습니다.

```bash
python3 portfolio-pdf/build.py
```

PDF의 주장은 `src/content/portfolio.ts`와 `src/home/components/*Study.jsx`의 게시 내용을 바탕으로 작성했습니다. 상세 페이지 내용이 바뀌면 PDF도 다시 생성하세요.
