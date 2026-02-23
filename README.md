**D.ONE Seminar 이름표 생성기**

- 목적: Excel의 “이름” 컬럼을 업로드하면 A4 용지(3×3)에 자동 배치된 이름표를 생성하고, 바로 인쇄하거나 PDF로 저장합니다.
- 배경/디자인: `src/img/`의 색상 별 SVG 사용(빨강, 노랑, 초록, 흰색, 블루그린). 중앙 흰 박스에 참가자 이름을 자동 크기 조절하여 중앙 정렬합니다.

**주요 기능**
- 업로드: `.xlsx/.xls`의 “이름” 컬럼 파싱(SheetJS)
- A4 그리드: 3×3, 실제 인쇄 크기 유지(CSS print 스타일)
- 자동 폰트 스케일: 글자 수에 따라 가변 크기
- 색상 분배: 색상 개수(1–5) 선택 시 참가자별 테마를 순환 배정
- 인쇄/내보내기: 브라우저 인쇄, PDF 다운로드(html2canvas + jsPDF)

**빠른 시작**
- 의존성 설치: `npm i`
- 로컬 실행: `npm run dev` 후 `http://localhost:5173`
- 프로덕션 빌드: `npm run build` → 산출물 `dist/`
- 로컬 미리보기: `npm run preview`

**사용 방법**
- “참가자 리스트 xlsx 파일을…” 영역에 파일을 드롭하거나 클릭하여 선택합니다.
- 상단에서 색상 개수(최대 3)를 선택합니다. 예: 2 선택 시 분홍/파랑이 교대로 배정됩니다.
- 미리보기에서 페이지/명 수를 확인하고, 상단 툴바로 인쇄 또는 PDF를 선택합니다.
- 인쇄 시 시스템 다이얼로그에서 배율 100%로 출력하면 실제 크기로 인쇄됩니다.

**엑셀 포맷 가이드**
- 필수 컬럼명: `이름`
- 다중 헤더/병합 셀이어도 내부적으로 “이름” 텍스트를 탐색하여 열을 자동 식별합니다.

**배포(Vercel)**
- 포함 파일: `vercel.json` (정적 빌드, `dist` 사용)
- CLI 배포 예시:
  - `npm i -g vercel`
  - `vercel login` (또는 토큰 사용)
  - `vercel --prod`
- 대시보드 배포: GitHub 리포지토리 Import → Framework: Vite → Build Command: `npm run build` → Output: `dist`

**구조**
- `src/components/NameTag.tsx`: 이름표 컴포넌트
- `src/components/NameTag.module.css`: 배경 테마 매핑(0: red, 1: yellow, 2: green, 3: white, 4: bluegreen) 및 이름 박스 스타일
- `src/components/A4Page.tsx`: 3×3 그리드 페이지
- `src/utils/parseExcel.ts`: Excel 파서 + 페이지 분할/테마 배정
- `src/utils/exportPdf.ts`: PDF 내보내기
- `src/img/`: `red.svg`, `yellow.svg`, `green.svg`, `white.svg`, `bluegreen.svg`

**커스터마이징 팁**
- 이름 박스 위치: `src/components/NameTag.module.css`의 `.nameBox { top: 73%; }` 값을 1–2% 단위로 미세 조정
- 폰트 크기 규칙: `src/components/NameTag.tsx`의 `getFontSize`에서 글자 수 기준 조정
- A4 아이템 크기: `src/components/A4Page.module.css`의 `grid-template-columns/rows`와 각 태그 크기(264×349) 동기화 필요
- 배경 교체: `src/img/` 내 SVG를 교체/추가하고, CSS에 `.themeN`을 추가하여 사용할 수 있습니다.

**문제 해결**
- “이름” 컬럼을 찾지 못함: 컬럼명이 정확히 `이름`인지 확인. 여러 헤더 행이 있으면 가장 아래 실제 데이터 행을 포함하도록 저장해 주세요.
- 글자 겹침: 아주 긴 이름은 `getFontSize` 단계값을 낮추거나 `.name`의 `line-height` 조정
- PDF 품질/속도: 긴 페이지는 캔버스 생성 시간이 걸릴 수 있습니다.
