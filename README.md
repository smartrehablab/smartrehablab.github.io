# Smart Rehabilitation Lab 홈페이지

삼육대학교 물리치료학과 스마트재활연구실(Prof. Seungwon Lee) 홈페이지입니다.
GitHub Pages로 무료 게시합니다.

- 주소: https://smartrehablab.github.io/
- 저장소: smartrehablab/smartrehablab.github.io (연구실 계정 smartrehablab@gmail.com)

## 1. GitHub에 올리기

1. github.com 로그인 → 오른쪽 위 `+` → `New repository`
2. Repository name: `smartrehablab.github.io` / `Public` 선택 → `Create repository`
3. 생성된 화면에서 `uploading an existing file` 클릭
4. 압축을 푼 폴더 안의 **모든 파일과 assets 폴더**를 끌어다 놓기
   (index.html이 저장소 맨 위에 있어야 합니다. smartrehab 폴더째 올리지 마십시오.)
5. 아래 `Commit changes` 클릭
6. 저장소 `Settings` → 왼쪽 `Pages`
   - Source: `Deploy from a branch`
   - Branch: `main` / `/ (root)` → `Save`
7. 1~2분 뒤 주소: `https://smartrehablab.github.io/`

## 2. 내용 고치기 (assets/js/data.js 한 파일)

GitHub 저장소에서 `assets/js/data.js` → 연필 아이콘(Edit) → 수정 → `Commit changes`.
1~2분 뒤 사이트에 반영됩니다.

| 고칠 내용 | data.js 위치 |
|---|---|
| 연구실 이메일·주소·전화 | `SITE` |
| 연구 분야 4개, 대표 논문 | `RESEARCH` (순서대로 홈 타일과 Research 페이지에 표시) |
| 연구과제·용역 | `PROJECTS` (Research 페이지 Funded projects) |
| 교수님 프로필·국문 성명 | `PI` (`nameKo`에 국문 성명) |
| 연구원·대학원생·수료생·졸업생 | `MEMBERS` (빈 구역은 자동으로 숨김) |
| 소식 | `NEWS` (위에 있을수록 최신) |
| 갤러리 사진 | `GALLERY` (비어 있으면 메뉴에서 자동으로 숨김) |
| 논문 목록 | `PUBLICATIONS` (연도순 자동 정렬, 개수 자동 계산) |

연구원 추가 예시(MEMBERS 안 해당 구역 people 목록에 한 줄 추가, 줄 끝 쉼표 주의):

```
{ name: "Gildong Hong, PT, MS", role: "Ph.D. Student", interests: "Stroke, Gait", email: "hong@example.com", photo: "assets/img/members/hong.jpg" },
```

소식 추가 예시(NEWS 맨 위에 추가):

```
{ date: "2026.12", title: "학회 발표", text: "한 줄 설명", link: "", image: "assets/img/news/2026-12.jpg" },
```

갤러리 추가 예시:

```
const GALLERY = [
  { image: "assets/img/gallery/01.jpg", caption: "2026 Lab Workshop" }
];
```

## 3. 사진 넣기

`assets/img` 폴더에 아래 이름으로 올리면 자동으로 표시됩니다. 사진이 없는 자리는 숨겨집니다.

| 파일 이름 | 위치 |
|---|---|
| `research-1.jpg` ~ `research-4.jpg` | 홈 연구 분야 타일 배경. Research 페이지에서는 3D 장면이 우선이고, 3D가 작동하지 않는 기기에서만 사진이 나옴 |
| `pi.jpg` | 교수님 사진 (4:5 비율) |
| 구성원 사진 | `assets/img/members/`, 4:5 비율 |
| 연구원·소식·갤러리 사진 | data.js에 적은 경로 그대로 |

## 4. 직접 산 도메인 연결(나중에)

저장소 `Settings` → `Pages` → `Custom domain`에 도메인 입력 후,
도메인 회사 DNS에 GitHub Pages 안내대로 레코드를 추가합니다.

## 5. 구성원 정보 등록·수정 양식

- Members 페이지의 "내 정보 등록·수정하기" 버튼 → `update.html`
- 제출 내용은 FormSubmit(formsubmit.co)을 통해 `SITE.email`(smartrehablab@gmail.com)로 전송됩니다. 처음 한 번 인증 메일의 Activate를 눌러야 동작합니다.
- 받은 내용을 `data.js`의 `MEMBERS`에 반영합니다.

## 6. 3D 장면

- `assets/js/gaitlab3d.js`: 홈 3D 보행 장면 (three.js, `assets/vendor/three`, MIT License)
- `assets/js/research3d.js`: Research 페이지 분야별 3D 장면 4종 (웨어러블 보행, 어깨 굴곡, 한발 서기 균형, 통증 신호 경로)
- `assets/models/xbot.glb`: 3D 인체 모델과 걷기 애니메이션. three.js 공식 예제에 포함된 Mixamo "X Bot" 모델입니다.
- 화면의 수치는 모델 애니메이션에서 계산한 값이며 실제 측정 자료가 아닙니다(페이지에도 표기됨).
- 연구실에서 직접 찍은 모션캡처 자료(FBX/GLB)가 있으면 `xbot.glb`를 교체할 수 있습니다. Mixamo 골격 이름을 쓰는 파일이어야 그대로 동작합니다.
