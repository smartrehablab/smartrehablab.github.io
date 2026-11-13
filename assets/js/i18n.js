/* Language: English by default. Korean or Japanese only when chosen with the switch (?lang=ko|ja). */
(function () {
  const LANGS = ["en", "ko", "ja"];
  let lang = "en";
  try {
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(q)) lang = q;
  } catch (e) {}
  window.LANG = lang;
  document.documentElement.lang = lang;

  const isLoc = (v) => v && typeof v === "object" && !Array.isArray(v) && "en" in v;
  window.T = (v) => (v == null ? "" : isLoc(v) ? (v[lang] != null ? v[lang] : v.en) : v);
  window.UI = (k, ...a) => {
    const v = STR[k];
    if (!v) return k;
    const s = T(v);
    return typeof s === "function" ? s(...a) : s;
  };
  window.langHref = (href) => {
    if (lang === "en" || !href || /^(https?:|mailto:|tel:|#)/.test(href)) return href;
    const [p, h] = href.split("#");
    return p + (p.includes("?") ? "&" : "?") + "lang=" + lang + (h != null ? "#" + h : "");
  };
  window.setLang = (l) => {
    const u = new URL(location.href);
    u.searchParams.delete("lang");
    if (l !== "en") u.searchParams.set("lang", l);
    location.href = u.toString();
  };
  window.applyI18n = (root = document) => {
    root.querySelectorAll("[data-i18n]").forEach((el) => { if (STR[el.dataset.i18n]) el.innerHTML = UI(el.dataset.i18n); });
    [["alt", "data-i18n-alt"], ["aria-label", "data-i18n-aria"], ["placeholder", "data-i18n-ph"], ["title", "data-i18n-title"]].forEach(([attr, key]) => {
      root.querySelectorAll("[" + key + "]").forEach((el) => { const k = el.getAttribute(key); if (STR[k]) el.setAttribute(attr, UI(k)); });
    });
    root.querySelectorAll("a[href]").forEach((a) => {
      const h = a.getAttribute("href");
      if (/\.html(#|$)/.test(h) && !/[?&]lang=/.test(h)) a.setAttribute("href", langHref(h));
    });
  };

  const STR = window.STR = {
    /* navigation and footer */
    "nav.about": { en: "About", ko: "연구실 소개", ja: "研究室紹介" },
    "nav.research": { en: "Research", ko: "연구", ja: "研究" },
    "nav.people": { en: "People", ko: "구성원", ja: "メンバー" },
    "nav.pi": { en: "Principal Investigator", ko: "지도교수", ja: "指導教授" },
    "nav.members": { en: "Members", ko: "연구원·학생", ja: "研究員・学生" },
    "nav.publications": { en: "Publications", ko: "논문", ja: "論文" },
    "nav.news": { en: "News", ko: "소식", ja: "ニュース" },
    "nav.gallery": { en: "Gallery", ko: "갤러리", ja: "ギャラリー" },
    "nav.contact": { en: "Contact", ko: "문의", ja: "お問い合わせ" },
    "nav.main": { en: "Main menu", ko: "주 메뉴", ja: "メインメニュー" },
    "nav.menu": { en: "Menu", ko: "메뉴", ja: "メニュー" },
    "nav.lang": { en: "Language", ko: "언어", ja: "言語" },
    "foot.lab": { en: "Lab", ko: "연구실", ja: "研究室" },
    "foot.place": { en: "Sahmyook University, Seoul", ko: "삼육대학교, 서울", ja: "三育大学校、ソウル" },
    "crumb.home": { en: "Home", ko: "홈", ja: "ホーム" },

    /* shared */
    "join.h": { en: "Looking for people to research with.", ko: "함께 연구할 사람을 찾습니다.", ja: "共に研究する仲間を募集しています。" },
    "join.p": { en: "We welcome M.S. and Ph.D. students and researchers interested in evidence-based rehabilitation and smart rehabilitation technology.", ko: "근거기반 재활과 스마트 재활기술 연구에 관심 있는 석사·박사과정 학생과 연구원의 지원을 기다립니다.", ja: "エビデンスに基づくリハビリテーションとスマートリハビリテーション技術の研究に関心のある修士・博士課程の学生と研究員を歓迎します。" },
    "join.apply": { en: "How to apply", ko: "지원 방법 보기", ja: "応募方法を見る" },
    "join.members": { en: "Meet the members", ko: "구성원 보기", ja: "メンバーを見る" },
    "allpubs": { en: "All publications", ko: "전체 논문 보기", ja: "すべての論文を見る" },
    "viewpaper": { en: "Read paper", ko: "논문 보기", ja: "論文を見る" },
    "viewproject": { en: "View project", ko: "프로젝트 보기", ja: "プロジェクトを見る" },
    "explore": { en: "Explore research", ko: "연구 자세히 보기", ja: "研究の詳細を見る" },
    "news.empty": { en: "New updates will appear here.", ko: "새 소식이 올라오면 여기에 표시됩니다.", ja: "新しいお知らせはここに表示されます。" },
    "news.prev": { en: "Previous news", ko: "이전 소식", ja: "前のニュース" },
    "news.next": { en: "Next news", ko: "다음 소식", ja: "次のニュース" },

    /* home */
    "home.sub": { en: "The Smart Rehabilitation Lab in the Department of Physical Therapy at Sahmyook University studies how evidence-based physical therapy and rehabilitation technology help people move again.", ko: "삼육대학교 물리치료학과 스마트재활연구실은 근거기반 물리치료와 재활기술로 사람들이 다시 움직일 수 있도록 연구합니다.", ja: "三育大学校理学療法学科スマートリハビリテーション研究室は、エビデンスに基づく理学療法とリハビリテーション技術によって、人々が再び動けるようになるための研究を行っています。" },
    "home.btn1": { en: "Explore research", ko: "연구 분야 보기", ja: "研究分野を見る" },
    "home.btn2": { en: "Join the lab", ko: "연구실 합류 문의", ja: "研究室への参加" },
    "gait.h": { en: "While we walk, this is how our joints move.", ko: "걷는 동안, 관절은 이렇게 움직입니다.", ja: "歩いている間、関節はこう動きます。" },
    "gait.p": { en: "A 3D motion-capture style view of how the hip, knee and ankle move across one gait cycle. We measure and treat how this movement is impaired and restored.", ko: "보행 한 주기 동안 엉덩관절, 무릎, 발목이 어떻게 움직이는지 3D 모션캡처 방식으로 보여 줍니다. 우리는 이 움직임이 손상되고 회복되는 과정을 측정하고 중재합니다.", ja: "1歩行周期の間に股関節・膝関節・足関節がどのように動くかを、3Dモーションキャプチャの形式で示します。私たちはこの動きが損なわれ、回復していく過程を測定し、介入します。" },
    "gait.aria": { en: "Animation of a skeleton walking, seen from the side, with joint angles", ko: "측면에서 본 골격이 걷는 모습과 관절 각도를 보여 주는 애니메이션", ja: "側面から見た骨格の歩行と関節角度を示すアニメーション" },
    "gait.cap": { en: "Right leg, sagittal plane", ko: "오른쪽 다리, 시상면", ja: "右脚、矢状面" },
    "gait.hip": { en: "Hip flexion", ko: "엉덩관절 굴곡", ja: "股関節屈曲" },
    "gait.knee": { en: "Knee flexion", ko: "무릎 굴곡", ja: "膝関節屈曲" },
    "gait.ankle": { en: "Ankle dorsiflexion", ko: "발목 배측굴곡", ja: "足関節背屈" },
    "gait.stance": { en: "Stance", ko: "입각기 Stance", ja: "立脚期 Stance" },
    "gait.swing": { en: "Swing", ko: "유각기 Swing", ja: "遊脚期 Swing" },
    "gait.stanceR": { en: "Stance 0–60%", ko: "입각기 0–60%", ja: "立脚期 0–60%" },
    "gait.swingR": { en: "Swing 60–100%", ko: "유각기 60–100%", ja: "遊脚期 60–100%" },
    "gait.note": { en: "Visualization reproduced from a standard walking animation of a 3D human model. Joint angles are computed from the model, not measured data.", ko: "3D 인체 모델의 표준 보행 애니메이션으로 재현한 시각화입니다. 관절 각도는 모델에서 계산한 값으로, 실제 측정 자료가 아닙니다.", ja: "3D人体モデルの標準歩行アニメーションで再現した可視化です。関節角度はモデルから算出した値であり、実測データではありません。" },
    "home.statement2": { en: "We test that process through clinical trials and systematic reviews, and extend it with virtual reality, wearable sensors and neuroimaging.", ko: "어깨 수술 뒤에도, 뇌졸중 뒤에도, 만성통증과 함께, 그리고 나이가 들어서도 다시 움직일 수 있도록. 우리는 그 과정을 임상시험과 체계적 고찰로 검증하고, 가상현실·웨어러블 센서·뇌영상 기술로 확장합니다.", ja: "肩の手術の後も、脳卒中の後も、慢性的な痛みとともにあっても、そして年を重ねても、再び動けるように。私たちはその過程を臨床試験とシステマティックレビューで検証し、仮想現実・ウェアラブルセンサ・脳イメージング技術へと広げています。" },
    "spot.sum": { en: "A randomized clinical trial testing how wearable sensor-based interactive cognitive-motor training affects cognitive function and physical performance in older adults.", ko: "웨어러블 센서 기반 인터랙티브 인지-운동 훈련이 노인의 인지 기능과 신체 수행에 미치는 효과를 무작위 임상시험으로 검증한 연구입니다.", ja: "ウェアラブルセンサを用いたインタラクティブ認知運動トレーニングが、高齢者の認知機能と身体パフォーマンスに及ぼす効果を無作為化臨床試験で検証した研究です。" },
    "spot.design": { en: "Study design", ko: "연구 설계", ja: "研究デザイン" },
    "spot.pop": { en: "Population", ko: "대상", ja: "対象" },
    "spot.int": { en: "Intervention", ko: "중재", ja: "介入" },
    "home.recent": { en: "Recent publications.", ko: "최근 논문.", ja: "最近の論文。" },
    "home.news": { en: "News.", ko: "소식.", ja: "ニュース。" },

    /* about */
    "about.sub": { en: "We combine evidence-based physical therapy with smart rehabilitation technology to restore function and improve quality of life.", ko: "근거기반 물리치료와 스마트 재활기술을 융합해 기능 회복과 삶의 질 향상에 기여합니다.", ja: "エビデンスに基づく理学療法とスマートリハビリテーション技術を融合し、機能回復と生活の質の向上に貢献します。" },
    "about.img": { en: "An older adult doing cycling rehabilitation with a VR headset while a therapist assists", ko: "VR 헤드셋을 쓰고 실내 자전거로 재활 운동을 하는 노인과 곁에서 돕는 치료사", ja: "VRヘッドセットを着けて室内用自転車でリハビリ運動をする高齢者と、そばで支える療法士" },
    "about.mission": { en: "Our work focuses on people with musculoskeletal and neurological conditions and on older adults.", ko: "스마트재활연구실은 근거기반 물리치료와 스마트 재활기술을 융합하여, 근골격계·신경계 질환자와 노인의 기능 회복 및 삶의 질 향상에 기여하는 것을 목표로 합니다.", ja: "スマートリハビリテーション研究室は、エビデンスに基づく理学療法とスマートリハビリテーション技術を融合し、筋骨格系・神経系の疾患がある方や高齢者の機能回復と生活の質の向上に貢献することを目指しています。" },
    "about.principles": { en: "Our principles.", ko: "연구의 원칙.", ja: "研究の原則。" },
    "about.p1": { en: "We test rehabilitation interventions with randomized controlled trials, systematic reviews and meta-analyses.", ko: "무작위대조시험과 체계적 문헌고찰·메타분석으로 재활 중재의 효과를 검증합니다.", ja: "ランダム化比較試験とシステマティックレビュー・メタアナリシスにより、リハビリテーション介入の効果を検証します。" },
    "about.p2": { en: "We apply virtual reality, wearable sensors, functional near-infrared spectroscopy (fNIRS) and non-invasive brain stimulation to rehabilitation.", ko: "가상현실, 웨어러블 센서, 기능적 근적외선분광법(fNIRS), 비침습적 뇌자극을 재활에 적용합니다.", ja: "仮想現実、ウェアラブルセンサ、機能的近赤外分光法(fNIRS)、非侵襲的脳刺激をリハビリテーションに応用します。" },
    "about.p3": { en: "We train clinical researchers and physical therapists who practice patient-centered rehabilitation.", ko: "환자 중심의 재활을 실천하는 임상 연구자와 전문 물리치료사를 양성합니다.", ja: "患者中心のリハビリテーションを実践する臨床研究者と理学療法士を育成します。" },
    "about.greet": { en: "Welcome to our lab.", ko: "연구실을 찾아 주신 여러분을 환영합니다.", ja: "研究室へようこそ。" },
    "about.g1": { en: "Rehabilitation is more than restoring impaired function. It is the journey of a person returning to their daily life. Our lab aims to support that journey with scientific evidence and technology.", ko: "재활은 단순히 손상된 기능을 회복하는 과정을 넘어, 한 사람이 다시 자신의 일상과 삶으로 돌아가는 여정입니다. 우리 연구실은 이 여정을 과학적 근거와 기술로 뒷받침하고자 합니다.", ja: "リハビリテーションは、損なわれた機能を回復するだけの過程ではありません。一人の人が再び自分の日常と人生へ戻っていく旅です。私たちの研究室は、この旅を科学的根拠と技術で支えることを目指しています。" },
    "about.g2": { en: "From musculoskeletal rehabilitation of the shoulder, ankle and lower back, to neurological rehabilitation after stroke and in cerebral palsy, the neuroscience of chronic pain, and rehabilitation for older adults using virtual reality and wearable sensors, we pursue research that answers questions from clinical practice.", ko: "우리 연구실은 어깨, 발목, 허리 등 근골격계 재활부터 뇌졸중과 뇌성마비의 신경계 재활, 만성통증의 신경과학적 이해, 그리고 가상현실과 웨어러블 센서를 활용한 노인 재활에 이르기까지, 임상 현장의 질문에 답하는 연구를 수행하고 있습니다.", ja: "肩・足関節・腰などの筋骨格系リハビリテーションから、脳卒中や脳性麻痺の神経系リハビリテーション、慢性疼痛の神経科学的理解、そして仮想現実やウェアラブルセンサを活用した高齢者リハビリテーションまで、臨床現場の問いに答える研究を行っています。" },
    "about.g3": { en: "Our members challenge themselves together to grow into researchers who connect clinical practice and research. We look forward to welcoming passionate people who want to shape the future of rehabilitation with us.", ko: "연구실 구성원들은 임상과 연구를 잇는 연구자로 성장하기 위해 함께 고민하고 도전하고 있습니다. 재활의 미래를 함께 만들어 갈 열정 있는 여러분의 참여를 기다립니다.", ja: "研究室のメンバーは、臨床と研究をつなぐ研究者へと成長するため、共に考え、挑戦しています。リハビリテーションの未来を共につくる意欲ある皆さんの参加をお待ちしています。" },
    "about.history": { en: "History.", ko: "연혁.", ja: "沿革。" },

    /* research */
    "research.sub": { en: "Musculoskeletal and neurological rehabilitation, chronic pain, and aging and rehabilitation technology. Across four areas, we answer questions from clinical practice.", ko: "근골격계와 신경계 재활, 만성통증, 그리고 노화와 재활기술. 네 분야에서 임상 현장의 질문에 답하는 연구를 합니다.", ja: "筋骨格系と神経系のリハビリテーション、慢性疼痛、そして加齢とリハビリテーション技術。4つの分野で臨床現場の問いに答える研究を行っています。" },
    "research.key": { en: "Key studies", ko: "대표 연구", ja: "代表的な研究" },
    "research.note": { en: "Each scene is a visualization reproduced with a 3D human model. Values on screen are computed from the model, not measured data.", ko: "각 분야의 장면은 3D 인체 모델로 재현한 시각화입니다. 화면의 수치는 모델에서 계산한 값으로, 실제 측정 자료가 아닙니다.", ja: "各分野のシーンは3D人体モデルで再現した可視化です。画面上の数値はモデルから算出した値であり、実測データではありません。" },
    "research.3d": { en: "3D visualization", ko: "3D 시각화", ja: "3D可視化" },
    "projects.sub": { en: "Through national research grants and industry projects, we carry the lab's questions into real systems and standards.", ko: "국가 연구과제와 산학 협력 용역으로 연구실의 질문을 현장의 시스템과 기준으로 옮깁니다.", ja: "国の研究課題と産学連携プロジェクトを通じて、研究室の問いを現場のシステムと基準へとつなげています。" },
    "p.grants": { en: "Research grants", ko: "연구과제", ja: "研究課題" },
    "p.industry": { en: "Industry projects", ko: "산학 프로젝트", ja: "産学プロジェクト" },
    "p.program": { en: "Program", ko: "사업명", ja: "事業名" },
    "p.funder": { en: "Funder", ko: "지원기관", ja: "支援機関" },
    "p.agency": { en: "Agency", ko: "전문기관", ja: "専門機関" },
    "p.pi": { en: "PI", ko: "연구책임자", ja: "研究責任者" },
    "p.client": { en: "Client", ko: "발주처", ja: "発注者" },
    "p.partners": { en: "Partners", ko: "참여기관", ja: "参加機関" },
    "p.scope": { en: "Scope", ko: "주요 내용", ja: "主な内容" },
    "p.deliv": { en: "Deliverables", ko: "주요 산출물", ja: "主な成果物" },
    "p.years": { en: (n) => n + " years", ko: (n) => n + "개년", ja: (n) => n + "年間" },
    "p.total": { en: "Total funding", ko: "총 연구비", ja: "総研究費" },
    "p.year1": { en: "Year 1 funding", ko: "1차년도 연구비", ja: "1年目研究費" },
    "p.progress": { en: "In progress", ko: "진행 중", ja: "進行中" },
    "p.collab": { en: "Collaborative project", ko: "협력 과제", ja: "共同課題" },
    "p.consult": { en: "Industry consulting", ko: "산학 컨설팅", ja: "産学コンサルティング" },
    "p.byyear": { en: "Funding by year", ko: "연차별 연구비", ja: "年度別研究費" },
    "p.paper": { en: ["Paper", "Papers"], ko: ["논문", "논문"], ja: ["論文", "論文"] },
    "p.patent": { en: ["Patent", "Patents"], ko: ["특허", "특허"], ja: ["特許", "特許"] },
    "p.report": { en: ["Report", "Reports"], ko: ["보고서", "보고서"], ja: ["報告書", "報告書"] },

    /* 3D research scenes */
    "s.tech.cap": { en: "Gait measured with wearable sensors", ko: "웨어러블 센서 기반 보행 측정", ja: "ウェアラブルセンサによる歩行計測" },
    "s.tech.sensors": { en: "Sensors", ko: "착용 센서", ja: "装着センサ" },
    "s.tech.sensorsV": { en: "2 wrists · 2 shins", ko: "손목 2 · 정강이 2", ja: "手首2・下腿2" },
    "s.tech.cad": { en: "Cadence", ko: "케이던스", ja: "ケイデンス" },
    "s.tech.cadU": { en: "steps/min", ko: "걸음/분", ja: "歩/分" },
    "s.tech.cycle": { en: "Gait cycle", ko: "보행 주기", ja: "歩行周期" },
    "s.tech.imu": { en: "Inertial sensor signal", ko: "관성 센서 신호", ja: "慣性センサ信号" },
    "s.tech.fnirs": { en: "Prefrontal fNIRS", ko: "전전두엽 fNIRS", ja: "前頭前野fNIRS" },
    "s.msk.cap": { en: "Shoulder range of motion, sagittal plane", ko: "어깨 관절가동범위, 시상면", ja: "肩関節可動域、矢状面" },
    "s.msk.flex": { en: "Shoulder flexion", ko: "어깨 굴곡", ja: "肩関節屈曲" },
    "s.msk.target": { en: "Target range", ko: "목표 범위", ja: "目標範囲" },
    "s.msk.rep": { en: "Repetition", ko: "반복", ja: "反復" },
    "s.msk.repV": { en: (n) => "No. " + n, ko: (n) => n + "회", ja: (n) => n + "回" },
    "s.neuro.cap": { en: "Single-leg stance, right foot support", ko: "한발 서기 균형, 오른발 지지", ja: "片脚立位バランス、右足支持" },
    "s.neuro.range": { en: "COP sway range", ko: "압력중심 이동 범위", ja: "足圧中心の移動範囲" },
    "s.neuro.vel": { en: "Sway velocity", ko: "흔들림 속도", ja: "動揺速度" },
    "s.neuro.cop": { en: "COP trajectory (magnified)", ko: "압력중심 궤적(확대 표시)", ja: "足圧中心の軌跡(拡大表示)" },
    "s.neuro.stim": { en: "Transcranial stimulation site", ko: "경두개 자극 부위", ja: "経頭蓋刺激部位" },
    "s.pain.cap": { en: "Ascending pain signals and descending modulation", ko: "통증 신호의 상행과 하행 조절", ja: "痛み信号の上行と下行性調節" },
    "s.pain.up": { en: "Ascending pain signal", ko: "상행 통증 신호", ja: "上行性の痛み信号" },
    "s.pain.down": { en: "Descending inhibition", ko: "하행 억제 조절", ja: "下行性抑制" },
    "s.pain.src": { en: "Peripheral source", ko: "말초 자극 부위", ja: "末梢の刺激部位" },
    "s.pain.srcV": { en: "Lower back · Knee", ko: "허리 · 무릎", ja: "腰・膝" },
    "s.pain.central": { en: "Central processing", ko: "중추 처리", ja: "中枢処理" },
    "s.pain.arrived": { en: "Signal arrived", ko: "신호 도달", ja: "信号到達" },
    "s.pain.mod": { en: "Modulating", ko: "조절 중", ja: "調節中" },

    /* people */
    "pi.label": { en: "Principal Investigator", ko: "지도교수", ja: "指導教授" },
    "pi.selected": { en: "Selected publications.", ko: "대표 논문.", ja: "主要論文。" },
    "members.sub": { en: "Researchers, graduate students and alumni of the Smart Rehabilitation Lab.", ko: "스마트재활연구실과 함께하는 연구원, 대학원생, 그리고 졸업생입니다.", ja: "スマートリハビリテーション研究室の研究員、大学院生、修了生です。" },
    "members.update": { en: "Add or update my profile", ko: "내 정보 등록·수정하기", ja: "自分の情報を登録・修正する" },

    /* publications */
    "pubs.sub": { en: "All research works registered in ORCID. Select a title to open the original article via its DOI.", ko: "ORCID에 등록된 전체 연구 실적입니다. 제목을 누르면 DOI 원문으로 이동합니다.", ja: "ORCIDに登録されたすべての研究業績です。タイトルを選択するとDOIの原文へ移動します。" },
    "pubs.search": { en: "Search by title or journal", ko: "제목이나 저널로 검색", ja: "タイトルやジャーナルで検索" },
    "pubs.searchA": { en: "Search publications", ko: "논문 검색", ja: "論文検索" },
    "pubs.year": { en: "Year", ko: "연도", ja: "年" },
    "pubs.all": { en: "All", ko: "전체", ja: "すべて" },
    "pubs.count": { en: (n, t) => `${n} of ${t} works (ORCID)`, ko: (n, t) => `전체 ${t}편 중 ${n}편 (ORCID 기준)`, ja: (n, t) => `全${t}件中${n}件(ORCID基準)` },
    "pubs.n": { en: (n) => n + (n === 1 ? " work" : " works"), ko: (n) => n + "편", ja: (n) => n + "件" },
    "pubs.none": { en: "No publications match your search. Try another word.", ko: "검색어와 일치하는 논문이 없습니다. 다른 단어로 검색해 보십시오.", ja: "検索語に一致する論文がありません。別の語で検索してください。" },

    /* news, gallery, contact */
    "gallery.sub": { en: "Everyday moments and events at the lab.", ko: "연구실의 일상과 행사 사진입니다.", ja: "研究室の日常とイベントの写真です。" },
    "gallery.empty": { en: "Photos will appear here once they are added.", ko: "사진이 올라오면 여기에 표시됩니다.", ja: "写真が追加されるとここに表示されます。" },
    "contact.sub": { en: "We welcome inquiries about joining the lab and research collaboration.", ko: "연구실 합류와 공동연구 문의를 환영합니다.", ja: "研究室への参加や共同研究に関するお問い合わせを歓迎します。" },
    "contact.p": { en: "We welcome motivated M.S. and Ph.D. students and researchers interested in evidence-based rehabilitation and smart rehabilitation technology. Please send a brief CV and your research interests by email.", ko: "스마트재활연구실은 근거기반 재활과 스마트 재활기술 연구에 열정을 가진 석사·박사과정 학생과 연구원을 모집합니다. 관심 있는 분은 간단한 자기소개와 연구 관심 분야를 이메일로 보내 주십시오.", ja: "スマートリハビリテーション研究室では、エビデンスに基づくリハビリテーションとスマートリハビリテーション技術の研究に情熱を持つ修士・博士課程の学生と研究員を募集しています。ご関心のある方は、簡単な自己紹介と研究関心分野をメールでお送りください。" },
    "contact.mail": { en: "Send email", ko: "이메일 보내기", ja: "メールを送る" },
    "contact.lab": { en: "Lab", ko: "연구실", ja: "研究室" },
    "contact.dept": { en: "Dept.", ko: "학과", ja: "学科" },
    "contact.addr": { en: "Address", ko: "주소", ja: "住所" },
    "contact.email": { en: "Email", ko: "이메일", ja: "メール" },
    "contact.tel": { en: "Tel", ko: "전화", ja: "電話" },
    "contact.map": { en: "Map of Sahmyook University", ko: "삼육대학교 위치 지도", ja: "三育大学校の地図" },

    /* member update form */
    "upd.sub": { en: "Send the information to appear on the Members page. The lab will review it before it is published.", ko: "홈페이지 Members에 올라갈 정보를 보내 주십시오. 연구실에서 확인한 뒤 반영합니다.", ja: "メンバーページに掲載する情報を送ってください。研究室で確認した後に反映します。" },
    "upd.done": { en: "Submitted.", ko: "제출되었습니다.", ja: "送信しました。" },
    "upd.doneP": { en: "The lab will review your information and update the website. This may take a few days.", ko: "연구실에서 내용을 확인한 뒤 홈페이지에 반영합니다. 반영까지 며칠이 걸릴 수 있습니다.", ja: "研究室で内容を確認した後、ホームページに反映します。反映まで数日かかる場合があります。" },
    "upd.back": { en: "Back to Members", ko: "Members로 돌아가기", ja: "メンバーページに戻る" },
    "upd.again": { en: "Submit another", ko: "다시 작성하기", ja: "もう一度入力する" },
    "upd.req": { en: "Request", ko: "요청 내용", ja: "依頼内容" },
    "upd.reqType": { en: "Request type", ko: "요청 구분", ja: "依頼の種類" },
    "upd.kind": { en: "Member type", ko: "구분", ja: "区分" },
    "upd.select": { en: "Select", ko: "선택", ja: "選択" },
    "upd.o.new": { en: "New profile", ko: "신규 등록", ja: "新規登録" },
    "upd.o.edit": { en: "Update information", ko: "정보 수정", ja: "情報の修正" },
    "upd.o.photo": { en: "Replace photo only", ko: "사진만 교체", ja: "写真のみ差し替え" },
    "upd.o.del": { en: "Remove profile", ko: "삭제 요청", ja: "削除依頼" },
    "upd.o.phd": { en: "Ph.D. student", ko: "Ph.D. 과정", ja: "博士課程" },
    "upd.o.ms": { en: "M.S. student", ko: "M.S. 과정", ja: "修士課程" },
    "upd.o.cand": { en: "Ph.D. candidate (coursework completed)", ko: "박사 수료", ja: "博士課程単位取得" },
    "upd.o.alum": { en: "Alumni", ko: "졸업생", ja: "修了生" },
    "upd.basic": { en: "Basic information", ko: "기본 정보", ja: "基本情報" },
    "upd.nameKo": { en: "Name in Korean", ko: "국문 이름", ja: "韓国語の氏名" },
    "upd.nameEn": { en: "Name in English", ko: "영문 이름", ja: "英語の氏名" },
    "upd.cred": { en: "Credentials", ko: "면허·학위 표기", ja: "資格・学位の表記" },
    "upd.credH": { en: "Shown after your name, for example: Wonhyung Kang, PT, MS Candidate", ko: "이름 뒤에 붙는 표기입니다. 예: Wonhyung Kang, PT, MS Candidate", ja: "氏名の後ろに付く表記です。例:Wonhyung Kang, PT, MS Candidate" },
    "upd.int": { en: "Research interests (in English)", ko: "연구 관심분야 (영문)", ja: "研究関心分野(英語)" },
    "upd.intH": { en: "Two or three English keywords separated by commas.", ko: "영문 키워드 2~3개를 쉼표로 구분해 적어 주십시오.", ja: "英語のキーワードを2〜3個、カンマで区切って入力してください。" },
    "upd.email": { en: "Email", ko: "이메일", ja: "メールアドレス" },
    "upd.emailPub": { en: "Show email on the website", ko: "이메일 공개", ja: "メールアドレスの公開" },
    "upd.o.pub": { en: "Show", ko: "공개", ja: "公開" },
    "upd.o.priv": { en: "Hide", ko: "비공개", ja: "非公開" },
    "upd.orcid": { en: "ORCID or Google Scholar URL (optional)", ko: "ORCID 또는 Google Scholar 주소 (선택)", ja: "ORCIDまたはGoogle ScholarのURL(任意)" },
    "upd.student": { en: "Current student", ko: "재학 정보", ja: "在学情報" },
    "upd.entry": { en: "Year of entry", ko: "과정 입학연도", ja: "入学年度" },
    "upd.alumni": { en: "Graduation", ko: "졸업 정보", ja: "修了情報" },
    "upd.degree": { en: "Degree", ko: "취득 학위", ja: "取得学位" },
    "upd.gradYear": { en: "Year of graduation", ko: "졸업연도", ja: "修了年度" },
    "upd.position": { en: "Current affiliation and position", ko: "현재 소속과 직위", ja: "現在の所属と職位" },
    "upd.positionPh": { en: "Assistant Professor, Department of Physical Therapy, OO University", ko: "OO대학교 물리치료학과 조교수", ja: "OO大学 理学療法学科 助教" },
    "upd.photoS": { en: "Photo", ko: "사진", ja: "写真" },
    "upd.photo": { en: "Head-and-shoulders photo (optional)", ko: "상반신 증명사진 (선택)", ja: "上半身の証明写真(任意)" },
    "upd.photoH": { en: "JPG or PNG, up to 5 MB. 600 px or wider looks sharpest. The lab will set the background to white.", ko: "JPG 또는 PNG, 5MB 이하. 가로 600px 이상이면 선명하게 나옵니다. 배경은 연구실에서 흰색으로 맞춥니다.", ja: "JPGまたはPNG、5MB以下。横600px以上だと鮮明に表示されます。背景は研究室で白に整えます。" },
    "upd.other": { en: "Other requests (optional)", ko: "기타 요청사항 (선택)", ja: "その他のご要望(任意)" },
    "upd.agree": { en: "I agree that my name, credentials, research interests, affiliation, photo and, if I chose to show it, my email will be published on the lab website.", ko: "위 정보 중 이름, 표기, 관심분야, 소속, 사진, 공개를 선택한 이메일이 연구실 홈페이지에 게시되는 것에 동의합니다.", ja: "上記の情報のうち、氏名、表記、関心分野、所属、写真、公開を選んだメールアドレスが研究室のホームページに掲載されることに同意します。" },
    "upd.submit": { en: "Submit", ko: "제출하기", ja: "送信する" },
    "upd.sending": { en: "Sending", ko: "보내는 중", ja: "送信中" },
    "upd.big": { en: "The photo is larger than 5 MB. Please choose a smaller file.", ko: "사진 파일이 5MB를 넘습니다. 더 작은 파일로 다시 선택해 주십시오.", ja: "写真が5MBを超えています。より小さいファイルを選んでください。" },
    "upd.act": { en: "The lab has not finished verifying this form yet. Please try again after the lab completes verification.", ko: "연구실 메일 인증이 아직 끝나지 않았습니다. 연구실에서 인증을 마친 뒤 다시 제출해 주십시오.", ja: "研究室のメール認証がまだ完了していません。認証完了後に再度送信してください。" },
    "upd.fail": { en: "Could not submit. Please try again shortly.", ko: "제출하지 못했습니다. 잠시 뒤 다시 시도해 주십시오.", ja: "送信できませんでした。しばらくしてから再度お試しください。" },
    "upd.net": { en: "A connection error occurred. Please try again shortly.", ko: "전송 중 연결 오류가 났습니다. 잠시 뒤 다시 시도해 주십시오.", ja: "通信エラーが発生しました。しばらくしてから再度お試しください。" },
    "upd.unknown": { en: "Unknown error", ko: "알 수 없는 오류", ja: "不明なエラー" }
  };
})();
