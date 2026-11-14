const SITE = {
  name: "Smart Rehabilitation Lab",
  department: { en: "Department of Physical Therapy, Sahmyook University", ko: "삼육대학교 물리치료학과", ja: "三育大学校 理学療法学科" },
  address: { en: "815 Hwarang-ro, Nowon-gu, Seoul, Republic of Korea", ko: "서울특별시 노원구 화랑로 815", ja: "大韓民国 ソウル特別市 蘆原区 花郎路815" },
  email: "smartrehablab@gmail.com",
  formKey: "afcba5311a3bb775c56e2d8b42038b71",
  phone: "",
  orcid: "0000-0002-0413-0510",
  scopus: "35088310300",
  since: 2008,
  map: "https://www.google.com/maps?q=37.6435,127.107621&z=16&output=embed"
};

const RESEARCH = [
  {
    id: "tech",
    title: "Smart Rehab Technology & Aging",
    image: "assets/img/research-4.jpg",
    text: { en: "We develop rehabilitation technology for older adults and people with mild cognitive impairment using virtual reality cycling, wearable sensor-based cognitive-motor training and fNIRS measurement of prefrontal hemodynamics.", ko: "가상현실 사이클링, 웨어러블 센서 기반 인지-운동 훈련, fNIRS 전전두엽 혈역학 측정을 활용해 노인과 경도인지장애 대상 재활기술을 개발합니다.", ja: "仮想現実サイクリング、ウェアラブルセンサを用いた認知運動トレーニング、fNIRSによる前頭前野血行動態の測定を活用し、高齢者と軽度認知障害のある方のためのリハビリテーション技術を開発しています。" },
    studies: [
      { title: "Enhancing cognitive and physical performance in older adults through wearable sensor-based interactive cognitive-motor training: a randomized clinical trial", journal: "Scientific Reports", year: 2025, doi: "https://doi.org/10.1038/s41598-025-03725-x" },
      { title: "Comparison of the Influence of Dual-Task Activities on Prefrontal Activation and Gait Variables in Older Adults with Mild Cognitive Impairment during Straight and Curved Walking", journal: "Medicina", year: 2024, doi: "https://doi.org/10.3390/medicina60020235" }
    ]
  },
  {
    id: "msk",
    title: "Musculoskeletal Rehabilitation",
    image: "assets/img/research-1.jpg",
    text: { en: "We test exercise therapy and manual therapy in clinical trials for rehabilitation after rotator cuff repair, chronic ankle instability, low back pain, patellofemoral pain and forward head posture.", ko: "어깨 회전근개 수술 후 재활, 만성 발목 불안정성, 요통, 슬개대퇴통증, 전방머리자세에 대한 운동치료와 도수치료 효과를 임상시험으로 검증합니다.", ja: "腱板修復術後のリハビリテーション、慢性足関節不安定症、腰痛、膝蓋大腿部痛、前方頭位姿勢に対する運動療法と徒手療法の効果を臨床試験で検証しています。" },
    studies: [
      { title: "Postoperative Rehabilitation Protocol Following Arthroscopic Rotator Cuff Repair: A Prospective Single-Arm Pragmatic Interventional Study", journal: "Medicina", year: 2022, doi: "https://doi.org/10.3390/medicina58060729" },
      { title: "Improving muscle function and quality of life in women with chronic low back pain through combined self-myofascial release and Pilates: A randomized clinical trial (CONSORT)", journal: "Medicine", year: 2026, doi: "https://doi.org/10.1097/MD.0000000000046971" }
    ]
  },
  {
    id: "neuro",
    title: "Neurological Rehabilitation",
    image: "assets/img/research-2.jpg",
    text: { en: "We study balance and gait recovery after stroke and in cerebral palsy, and rehabilitation combined with repetitive transcranial magnetic stimulation (rTMS) and transcranial direct current stimulation (tDCS).", ko: "뇌졸중과 뇌성마비의 균형·보행 회복, 반복경두개자기자극(rTMS)과 경두개직류자극(tDCS)을 결합한 재활 중재를 연구합니다.", ja: "脳卒中と脳性麻痺におけるバランス・歩行の回復、反復経頭蓋磁気刺激(rTMS)と経頭蓋直流電気刺激(tDCS)を組み合わせたリハビリテーション介入を研究しています。" },
    studies: [
      { title: "Effects of High-Frequency Repetitive Transcranial Magnetic Stimulation Combined with Motor Learning on Motor Function and Grip Force of the Upper Limbs and Activities of Daily Living in Patients with a Subacute Stroke", journal: "International Journal of Environmental Research and Public Health", year: 2023, doi: "https://doi.org/10.3390/ijerph20126093" },
      { title: "Synergistic Effects of Joint-Biased Rehabilitation and Combined Transcranial Direct Current Stimulation (tDCS) in Chronic Ankle Instability: A Single-Blind, Three-Armed Randomized Controlled Trial", journal: "Brain Sciences", year: 2025, doi: "https://doi.org/10.3390/brainsci15050458" }
    ]
  },
  {
    id: "pain",
    title: "Pain Neuroscience",
    image: "assets/img/research-3.jpg",
    text: { en: "We study the neuroscience and treatment of chronic pain, including pain neuroscience education, central sensitization, fibromyalgia and pain catastrophizing.", ko: "통증신경과학교육, 중추감작, 섬유근통, 통증 파국화 등 만성통증의 신경과학적 기전과 중재를 연구합니다.", ja: "疼痛神経科学教育、中枢感作、線維筋痛症、痛みの破局化など、慢性疼痛の神経科学的メカニズムと介入を研究しています。" },
    studies: [
      { title: "The Efficacy of Pain Neuroscience Education on Active Rehabilitation Following Arthroscopic Rotator Cuff Repair: A CONSORT-Compliant Prospective Randomized Single-Blind Controlled Trial", journal: "Brain Sciences", year: 2022, doi: "https://doi.org/10.3390/brainsci12060764" },
      { title: "Effects of Repetitive Transcranial Magnetic Stimulation on the Primary Motor Cortex of Individuals with Fibromyalgia: A Systematic Review and Meta-Analysis", journal: "Brain Sciences", year: 2022, doi: "https://doi.org/10.3390/brainsci12050570" }
    ]
  }
];

const PROJECTS = {
  grants: [
    {
      title: {
        en: "Development of an Immersive 360-Degree VR-Based Aerobic Training System Tailored for Older Adults",
        ko: "노인 맞춤형 몰입 360도 VR 기반 유산소 훈련 시스템 개발",
        ja: "高齢者向け没入型360度VRベース有酸素トレーニングシステムの開発"
      },
      program: { en: "Individual Basic Research Program", ko: "개인기초연구(교육부)", ja: "個人基礎研究事業(教育部)" },
      funder: { en: "Ministry of Education", ko: "교육부", ja: "教育部" },
      pi: { en: "Seungwon Lee (Sahmyook University)", ko: "이승원 (삼육대학교)", ja: "Seungwon Lee(三育大学校)" },
      period: "2018 – 2020",
      years: [
        { year: 2018, no: "1345276587", amount: 50000000, out: { papers: 3 } },
        { year: 2019, no: "1345296904", amount: 50000000, out: { papers: 3 } },
        { year: 2020, no: "1345315145", amount: 12500000, out: { papers: 1, patents: 2, reports: 1 } }
      ]
    },
    {
      title: {
        en: "Development of a Wearable Sensor-Based Interactive Training System for Cognitive Improvement in Older Adults",
        ko: "노인 인지 개선을 위한 웨어러블 센서 기반 인터랙티브 훈련 시스템 개발",
        ja: "高齢者の認知改善のためのウェアラブルセンサベース・インタラクティブトレーニングシステムの開発"
      },
      program: { en: "Individual Basic Research Program", ko: "개인기초연구(과기정통부)", ja: "個人基礎研究事業(科学技術情報通信部)" },
      funder: { en: "Ministry of Science and ICT", ko: "과학기술정보통신부", ja: "科学技術情報通信部" },
      pi: { en: "Seungwon Lee (Sahmyook University)", ko: "이승원 (삼육대학교)", ja: "Seungwon Lee(三育大学校)" },
      period: "2022 – 2023",
      years: [
        { year: 2022, no: "1711169838", amount: 53119000, out: { patents: 1, reports: 1 } },
        { year: 2023, no: "1711182715", amount: 58080000, out: { papers: 1, patents: 1 } }
      ]
    },
    {
      collab: true,
      title: {
        en: "Development of Core AI Algorithms for a Bio-Psycho-Social Pain Phenotyping & Precision Intervention System (BPS-PPIS): Multimodal Biosignal Fusion, Generative Data Synthesis, and Reinforcement-Learning-based Intervention Matching",
        ko: "AI기반 멀티모달 생체신호 융합-합성 및 강화학습 매칭을 활용한 만성통증 표현형 정밀 중재 시스템(BPS-PPIS) 알고리즘 개발",
        ja: "AIベースのマルチモーダル生体信号の融合・合成と強化学習マッチングを活用した慢性疼痛表現型精密介入システム(BPS-PPIS)アルゴリズムの開発"
      },
      program: { en: "Individual Basic Research Program, Core Research (Basic Research A)", ko: "개인기초연구(과기정통부), 우수연구-핵심연구(기본연구A)", ja: "個人基礎研究事業(科学技術情報通信部)、中核研究(基本研究A)" },
      funder: { en: "Ministry of Science and ICT", ko: "과학기술정보통신부", ja: "科学技術情報通信部" },
      agency: { en: "National Research Foundation of Korea", ko: "한국연구재단", ja: "韓国研究財団" },
      pi: { en: "Hyunjoong Kim (Gwangju Health University)", ko: "김현중 (광주보건대학교)", ja: "Hyunjoong Kim(光州保健大学校)" },
      period: "2026 – 2031",
      spanYears: 5,
      ongoing: true,
      firstYearOnly: true,
      years: [
        { year: 2026, no: "2710115077", amount: 41000000, out: {} }
      ]
    }
  ],
  services: [
    {
      title: {
        en: "Musculoskeletal Workload Assessment Criteria for the AI 3D Motion Assessment Solution OmniVis Safety",
        ko: "AI 3D 모션평가 솔루션(OmniVis Safety) 근골격계 부담작업 평가기준 개발 컨설팅",
        ja: "AI 3Dモーション評価ソリューション(OmniVis Safety)筋骨格系負担作業評価基準の開発コンサルティング"
      },
      client: "(주)비솔",
      partners: [
        { en: "Sahmyook University", ko: "삼육대학교", ja: "三育大学校" },
        { en: "Gwangju Health University", ko: "광주보건대학교", ja: "光州保健大学校" },
        { en: "Kyungnam University", ko: "경남대학교", ja: "慶南大学校" },
        "(주)비솔"
      ],
      period: "2026.10 –",
      ongoing: true,
      scope: [
        { en: "Lifting task assessment criteria integrating the Revised NIOSH Lifting Equation, WAC, REBA and OWAS", ko: "중량물 들기 동작 평가기준 개발 (NIOSH 개정 들기 공식, WAC, REBA, OWAS 통합 산출)", ja: "重量物持ち上げ動作の評価基準の開発(改訂NIOSH持ち上げ式、WAC、REBA、OWASの統合算出)" },
        { en: "Assessment criteria for range of motion and joint angles during lifting", ko: "관절가동범위 및 들기 동작 관절 각도 평가기준 개발", ja: "関節可動域および持ち上げ動作の関節角度評価基準の開発" },
        { en: "Movement assessment criteria for 21 musculoskeletal disorder prevention exercises", ko: "근골격계 예방체조 21종 동작평가 기준 개발", ja: "筋骨格系予防体操21種の動作評価基準の開発" },
        { en: "Feedback message system and matching rules for preventive stretching recommendations", ko: "결과 피드백 문구 체계 및 예방 스트레칭 추천 매칭 규칙 개발", ja: "結果フィードバック文言の体系と予防ストレッチ推奨のマッチングルールの開発" },
        { en: "Worker and manager reports and a manager dashboard", ko: "근로자·관리자 리포트 및 관리자 대시보드 구성 설계", ja: "作業者・管理者レポートおよび管理者ダッシュボードの構成設計" }
      ],
      deliverables: [
        { en: "Kick-off meeting materials", ko: "착수회의 자료", ja: "キックオフ会議資料" },
        { en: "Evidence compendium for each assessment variable", ko: "평가변수별 근거자료집", ja: "評価変数別エビデンス資料集" },
        { en: "Range of motion criteria and joint angle criteria for lifting", ko: "관절가동범위 평가기준, 들기 동작 관절각도 평가기준", ja: "関節可動域評価基準、持ち上げ動作の関節角度評価基準" },
        { en: "Integrated scoring criteria for lifting tasks", ko: "중량물 들기 통합 평가 산출기준", ja: "重量物持ち上げの統合評価算出基準" },
        { en: "Assessment, feedback and stretching recommendation linkage with screen design specification", ko: "평가·피드백·스트레칭 추천 연결체계 및 화면설계서", ja: "評価・フィードバック・ストレッチ推奨の連携体系および画面設計書" },
        { en: "Instructions for 24 preventive stretches", ko: "예방 스트레칭 24종 실시방법", ja: "予防ストレッチ24種の実施方法" },
        { en: "Revised template for musculoskeletal workload management reports", ko: "근골격계 부담작업 관리보고서 개선 양식", ja: "筋骨格系負担作業管理報告書の改善様式" }
      ]
    }
  ]
};

const PI = {
  name: "Seungwon Lee, PhD",
  nameKo: "",
  title: { en: "Professor, Department of Physical Therapy, Sahmyook University", ko: "삼육대학교 물리치료학과 교수", ja: "三育大学校 理学療法学科 教授" },
  photo: "assets/img/pi.jpg",
  email: "swlee@syu.ac.kr",
  keywords: ["Physical Therapy", "Therapeutic Exercise"],
  employment: [
    { period: "2008.09 – Present", text: "Professor, Department of Physical Therapy, Sahmyook University, Seoul, Korea" }
  ],
  education: [
    { period: "2005.02 – 2008.02", text: "Ph.D. in Physical Therapy, Graduate School of Sahmyook University" },
    { period: "2002.03 – 2004.02", text: "M.S. in Physical Therapy, Graduate School of Sahmyook University" },
    { period: "1995.03 – 2002.02", text: "Bachelor of Public Health in Physical Therapy, Sahmyook University" }
  ],
  selected: [
    "https://doi.org/10.1038/s41598-025-03725-x",
    "https://doi.org/10.3390/brainsci15050458",
    "https://doi.org/10.1097/MD.0000000000046971",
    "https://doi.org/10.3390/brainsci12060764",
    "https://doi.org/10.1186/s12877-021-02263-1"
  ]
};

const MEMBERS = [
  {
    group: { en: "Researchers", ko: "연구원", ja: "研究員" },
    people: [
      { name: "Jihye Jung, PT, PhD", role: "Senior Researcher", interests: "Neuroscience, Geriatrics", email: "jihye3752@gmail.com", photo: "assets/img/members/jung-jihye.jpg" },
      { name: "Wonhyung Kang, PT, MS Candidate", role: "Master's Student Researcher", interests: "MSK disorders, Exercise", email: "dannykangwh@naver.com", photo: "assets/img/members/kang-wonhyung.jpg" }
    ]
  },
  { group: { en: "Graduate Students (Ph.D.)", ko: "박사과정", ja: "博士課程" }, people: [] },
  { group: { en: "Graduate Students (M.S.)", ko: "석사과정", ja: "修士課程" }, people: [] },
  { group: { en: "Ph.D. Candidates (Coursework Completed)", ko: "박사 수료", ja: "博士課程単位取得" }, people: [] },
  {
    group: { en: "Alumni", ko: "졸업생", ja: "修了生" },
    people: [
      { name: "Wonjae Choi, PT, PhD", role: "Ph.D., 2015", position: { en: "Department of Physical Therapy, Joongbu University", ko: "중부대학교 물리치료학과", ja: "中部大学校 理学療法学科" }, photo: "assets/img/members/choi-wonjae.jpg" },
      { name: "Eunsang Lee, PT, PhD", role: "Ph.D., 2018", position: { en: "Department of Physical Therapy, Gwangju Health University", ko: "광주보건대학교 물리치료학과", ja: "光州保健大学校 理学療法学科" }, photo: "assets/img/members/lee-eunsang.jpg" },
      { name: "Hyunjoong Kim, PT, PhD", role: "Ph.D., 2022", position: { en: "Department of Senior Exercise Prescription, Gwangju Health University", ko: "광주보건대학교 시니어운동처방학과", ja: "光州保健大学校 シニア運動処方学科" }, photo: "assets/img/members/kim-hyunjoong.jpg" },
      { name: "Jeongu Sim, PT, PhD", role: "Ph.D., 2024", position: { en: "Department of Physical Therapy, Kyungnam University", ko: "경남대학교 물리치료학과", ja: "慶南大学校 理学療法学科" }, photo: "assets/img/members/sim-jeongu.jpg" }
    ]
  }
];

const NEWS = [
  {
    date: "2026.11",
    title: { en: "From clinical insight to innovation at PTRS 2026", ko: "PTRS 2026, 임상의 통찰에서 혁신으로", ja: "PTRS 2026、臨床の洞察からイノベーションへ" },
    text: {
      en: "The lab attends the Korean Academy of Physical Therapy Rehabilitation Science (PTRS) conference together at Konyang University Medical Campus on November 14–15, 2026, under the theme \u201cFrom Clinical Insight to Innovation\u201d, where physical therapists' ideas become innovation through science.",
      ko: "연구실 구성원들이 2026년 11월 14~15일 건양대학교 메디컬캠퍼스에서 열리는 물리치료재활과학회(PTRS) 학술대회에 함께 참석합니다. 주제는 \u201cFrom Clinical Insight to Innovation\u201d, 물리치료사의 아이디어가 과학을 거쳐 혁신이 되는 과정입니다.",
      ja: "研究室のメンバーは、2026年11月14〜15日に建陽大学校メディカルキャンパスで開催される物理治療リハビリテーション科学会(PTRS)学術大会にそろって参加します。テーマは\u201cFrom Clinical Insight to Innovation\u201d、理学療法士のアイデアが科学を経てイノベーションになる過程です。"
    },
    link: "", image: ""
  },
  {
    date: "2026.10",
    title: { en: "AI motion assessment meets workplace health", ko: "AI 모션평가, 산업 현장의 건강을 만나다", ja: "AIモーション評価が職場の健康と出会う" },
    text: {
      en: "The lab launched an industry consulting project with (주)비솔, Gwangju Health University and Kyungnam University to build musculoskeletal workload assessment criteria for OmniVis Safety, an AI 3D motion assessment solution, covering lifting tasks, joint range of motion, 21 prevention exercises and stretching feedback.",
      ko: "연구실은 (주)비솔, 광주보건대학교, 경남대학교와 함께 AI 3D 모션평가 솔루션 OmniVis Safety의 근골격계 부담작업 평가기준을 개발하는 산학 컨설팅을 시작했습니다. 중량물 들기, 관절가동범위, 예방체조 21종, 스트레칭 피드백까지 다룹니다.",
      ja: "研究室は(주)비솔、光州保健大学校、慶南大学校とともに、AI 3Dモーション評価ソリューションOmniVis Safetyの筋骨格系負担作業評価基準を開発する産学コンサルティングを開始しました。重量物の持ち上げ、関節可動域、予防体操21種、ストレッチのフィードバックまでを扱います。"
    },
    link: "research.html#projects", linkLabel: "viewproject", image: ""
  },
  {
    date: "2026",
    title: { en: "Toward digital healthcare with KOPTI", ko: "한국광기술원과 디지털헬스케어로", ja: "KOPTIとデジタルヘルスケアへ" },
    text: {
      en: "Sahmyook University and Gwangju Health University met with the AI Bio-Health Research Center of the Korea Photonics Technology Institute (KOPTI) to discuss joint research in AI-driven digital healthcare and rehabilitation.",
      ko: "삼육대학교와 광주보건대학교가 한국광기술원 AI바이오헬스연구센터와 만나 AI 기반 디지털헬스케어·재활 공동연구를 논의했습니다.",
      ja: "三育大学校と光州保健大学校は、韓国光技術院(KOPTI)AIバイオヘルス研究センターと、AIを活用したデジタルヘルスケア・リハビリテーションの共同研究について協議しました。"
    },
    link: "", image: ""
  },
  {
    date: "2026.01",
    title: { en: "Paper published in Medicine", ko: "Medicine 논문 게재", ja: "Medicineに論文掲載" },
    text: {
      en: "Combined self-myofascial release and Pilates improved muscle function and quality of life in women with chronic low back pain: a randomized clinical trial.",
      ko: "셀프 근막이완과 필라테스 병행이 만성 요통 여성의 근기능과 삶의 질을 개선했습니다(무작위 임상시험).",
      ja: "セルフ筋膜リリースとピラティスの併用が、慢性腰痛のある女性の筋機能と生活の質を改善しました(無作為化臨床試験)。"
    },
    link: "https://doi.org/10.1097/MD.0000000000046971", image: ""
  },
  {
    date: "2025.05",
    title: { en: "Paper published in Scientific Reports", ko: "Scientific Reports 논문 게재", ja: "Scientific Reportsに論文掲載" },
    text: {
      en: "Wearable sensor-based interactive cognitive-motor training enhanced cognitive and physical performance in older adults: a randomized clinical trial.",
      ko: "웨어러블 센서 기반 인터랙티브 인지-운동 훈련이 노인의 인지 기능과 신체 수행을 향상시켰습니다(무작위 임상시험).",
      ja: "ウェアラブルセンサを用いたインタラクティブ認知運動トレーニングが、高齢者の認知機能と身体パフォーマンスを向上させました(無作為化臨床試験)。"
    },
    link: "https://doi.org/10.1038/s41598-025-03725-x", image: ""
  }
];

const GALLERY = [];

const PUBLICATIONS = [
    {"title": "Effects of Radial Extracorporeal Shock Wave Therapy Combined with Blood Flow Restriction Exercise on Q-Angle and Plantar Pressure in Adults with Genu Varum", "journal": "Physical Therapy Rehabilitation Science", "date": "2026-09-30", "doi": "https://doi.org/10.14474/ptrs.2026.15.3.445"},
    {"title": "Comparison of Prefrontal Hemodynamic Responses and Balance Control Differences Based on Head Posture and Task Difficulty in Cognitive-Balance Tasks", "journal": "Physical Therapy Rehabilitation Science", "date": "2026-06-30", "doi": "https://doi.org/10.14474/ptrs.2026.15.2.244"},
    {"title": "Comparison of the Effects of Aquatic and Land-Based Breathing Exercises on Pulmonary Function, Trunk Control, and Balance in Children with Spastic Cerebral Palsy", "journal": "Physical Therapy Rehabilitation Science", "date": "2026-06-30", "doi": "https://doi.org/10.14474/ptrs.2026.15.2.236"},
    {"title": "Effects of virtual reality-based treadmill training with a TheraSuit on gross motor function, balance and gait in children with cerebral palsy", "journal": "Physical Therapy Rehabilitation Science", "date": "2026-03-30", "doi": "https://doi.org/10.14474/ptrs.2026.15.1.107"},
    {"title": "Improving muscle function and quality of life in women with chronic low back pain through combined self-myofascial release and Pilates: A randomized clinical trial (CONSORT)", "journal": "Medicine", "date": "2026-01-09", "doi": "https://doi.org/10.1097/MD.0000000000046971"},
    {"title": "Effects of plyometrics and conventional resistance exercise in a rotator cuff strengthening program for women with shoulder impingement syndrome", "journal": "Physical Therapy Rehabilitation Science", "date": "2025-12-30", "doi": "https://doi.org/10.14474/ptrs.2025.14.4.602"},
    {"title": "Effect of maximum expiration with hip adductor contraction during bridge exercise on trunk muscle activity in healthy individual", "journal": "Physical Therapy Rehabilitation Science", "date": "2025-09-30", "doi": "https://doi.org/10.14474/ptrs.2025.14.3.380"},
    {"title": "The effect of shoulder muscle exercise therapy on functional level, grip strength and pain in patients with lateral elbow tendinopathy", "journal": "Physical Therapy Rehabilitation Science", "date": "2025-06-30", "doi": "https://doi.org/10.14474/ptrs.2025.14.2.182"},
    {"title": "Enhancing cognitive and physical performance in older adults through wearable sensor-based interactive cognitive-motor training: a randomized clinical trial", "journal": "Scientific Reports", "date": "2025-05-28", "doi": "https://doi.org/10.1038/s41598-025-03725-x"},
    {"title": "Synergistic Effects of Joint-Biased Rehabilitation and Combined Transcranial Direct Current Stimulation (tDCS) in Chronic Ankle Instability: A Single-Blind, Three-Armed Randomized Controlled Trial", "journal": "Brain Sciences", "date": "2025-04-27", "doi": "https://doi.org/10.3390/brainsci15050458"},
    {"title": "The Effects of Functional Stabilization Training Based on Trunk Control on Pain, Dynamic Balance, and Physical Function in Women with Patellofemoral Pain", "journal": "Physical Therapy Rehabilitation Science", "date": "2025-03-30", "doi": "https://doi.org/10.14474/ptrs.2025.14.1.73"},
    {"title": "The Effects of Body Awareness Therapy on Physical Function, Balance, and Gait Performance in Stroke Patients: A Systematic Review and Meta-Analysis", "journal": "Physical Therapy Rehabilitation Science", "date": "2024-12-30", "doi": "https://doi.org/10.14474/ptrs.2024.13.4.571"},
    {"title": "The Effects of Sitting Trunk Exercises Contingent upon Foot Contact on Trunk Stability, Balance, and Gait in Chronic Stroke Patients on an Unstable Surface", "journal": "Physical Therapy Rehabilitation Science", "date": "2024-12-30", "doi": "https://doi.org/10.14474/ptrs.2024.13.4.581"},
    {"title": "Effects of Sacroiliac Joint Manipulation on Autonomic Nervous System and Lower Abdominal Pain in Women with Primary Dysmenorrhoea: A Randomized Controlled Trial", "journal": "Medicina", "date": "2024-12-16", "doi": "https://doi.org/10.3390/medicina60122068"},
    {"title": "Effects of Postural Corrective Exercise Combined with Extracorporeal Shockwave Therapy on Muscle Activity, Neck Function and Pain in Adults with Forward Head Posture", "journal": "Physical Therapy Rehabilitation Science", "date": "2024-09-30", "doi": "https://doi.org/10.14474/ptrs.2024.13.3.343"},
    {"title": "2D Single-legged Dynamic Knee Valgus assessments Methods: Evaluating Risk Factor for Internal Derangement of the Knee; Literature Review", "journal": "Physical Therapy Rehabilitation Science", "date": "2024-06-30", "doi": "https://doi.org/10.14474/ptrs.2024.13.2.240"},
    {"title": "A Comparative Study of Immersive 360-degree Virtual Cycling System and Head-mounted Virtual Cycling System for Young adults", "journal": "Physical Therapy Rehabilitation Science", "date": "2024-06-30", "doi": "https://doi.org/10.14474/ptrs.2024.13.2.187"},
    {"title": "Does Radial Extracorporeal Shockwave Therapy Applied to the Achilles Tendon Influence Ankle Functionality?", "journal": "Journal of Functional Morphology and Kinesiology", "date": "2024-04-08", "doi": "https://doi.org/10.3390/jfmk9020067"},
    {"title": "Comparison of Trunk Muscles between 3 Different Squats in Normal Adults", "journal": "Physical Therapy Rehabilitation Science", "date": "2024-03-30", "doi": "https://doi.org/10.14474/ptrs.2024.13.1.78"},
    {"title": "Comparison of the Influence of Dual-Task Activities on Prefrontal Activation and Gait Variables in Older Adults with Mild Cognitive Impairment during Straight and Curved Walking", "journal": "Medicina", "date": "2024-01-29", "doi": "https://doi.org/10.3390/medicina60020235"},
    {"title": "Contributory Effect of Additional Blood Flow Restriction in Active Joint Mobilization for Young Adults with Chronic Ankle Instability: A Pilot Randomized Controlled Trial", "journal": "Physical Therapy Rehabilitation Science", "date": "2023-12-30", "doi": "https://doi.org/10.14474/ptrs.2023.12.4.486"},
    {"title": "Immediate Effects of Sprinter-Pattern Exercise on the Lordotic Curve and Abdominal Muscle Activity in Individuals with Hyperlordosis", "journal": "Medicina", "date": "2023-12-15", "doi": "https://doi.org/10.3390/medicina59122177"},
    {"title": "Utilization of Mirror Visual Feedback for Upper Limb Function in Poststroke Patients: A Systematic Review and Meta-Analysis", "journal": "Vision", "date": "2023-11-15", "doi": "https://doi.org/10.3390/vision7040075"},
    {"title": "Comparison of Immediate Feedback in The Sitting Position of A Normal Adult and The Spine Angle in Two Other Sitting Conditions", "journal": "Physical Therapy Rehabilitation Science", "date": "2023-09-30", "doi": "https://doi.org/10.14474/ptrs.2023.12.3.327"},
    {"title": "Prefrontal Cortex Activation during Diaphragmatic Breathing in Women with Fibromyalgia: An fNIRS Case Report", "journal": "Physical Therapy Rehabilitation Science", "date": "2023-09-30", "doi": "https://doi.org/10.14474/ptrs.2023.12.3.334"},
    {"title": "The Effects of Ankle Joint Position on Hip Extensor Muscle Activity for Bridging Exercise in Sagittal Plane", "journal": "Physical Therapy Rehabilitation Science", "date": "2023-06-30", "doi": "https://doi.org/10.14474/ptrs.2023.12.2.149"},
    {"title": "The Impact of Manual Therapy on Pain Catastrophizing in Chronic Pain Conditions: A Systematic Review and Meta-analysis", "journal": "Physical Therapy Rehabilitation Science", "date": "2023-06-30", "doi": "https://doi.org/10.14474/ptrs.2023.12.2.177"},
    {"title": "Effects of High-Frequency Repetitive Transcranial Magnetic Stimulation Combined with Motor Learning on Motor Function and Grip Force of the Upper Limbs and Activities of Daily Living in Patients with a Subacute Stroke", "journal": "International Journal of Environmental Research and Public Health", "date": "2023-06-09", "doi": "https://doi.org/10.3390/ijerph20126093"},
    {"title": "Soft-Tissue Mobilization and Pain Neuroscience Education for Chronic Nonspecific Low Back Pain with Central Sensitization: A Prospective Randomized Single-Blind Controlled Trial", "journal": "Biomedicines", "date": "2023-04-23", "doi": "https://doi.org/10.3390/biomedicines11051249"},
    {"title": "Exercise-Induced Fibroblast Growth Factor-21: A Systematic Review and Meta-Analysis", "journal": "International Journal of Molecular Sciences", "date": "2023-04-14", "doi": "https://doi.org/10.3390/ijms24087284"},
    {"title": "Comparison of Lower Extremity Muscle Activity According to Ankle Angle during Sling Bridge Exercise in Patients with Patellofemoral Pain Syndrome", "journal": "Physical Therapy Rehabilitation Science", "date": "2023-03-30", "doi": "https://doi.org/10.14474/ptrs.2023.12.1.26"},
    {"title": "The Effects of Unstable Surface Training on Balance and Gait in Stroke Patients: A Systematic Review and Meta-Analysis", "journal": "Physical Therapy Rehabilitation Science", "date": "2023-03-30", "doi": "https://doi.org/10.14474/ptrs.2023.12.1.62"},
    {"title": "Comparison of Usability and Prefrontal Cortex Activity of Cognitive-Motor Training Programs using Sensor-Based Interactive Systems", "journal": "Physical Therapy Rehabilitation Science", "date": "2022-12-30", "doi": "https://doi.org/10.14474/ptrs.2022.11.4.571"},
    {"title": "Effect of Cytoskeletal Manual Therapy, a Novel Soft Tissue Mobilization Technique, on Axillary Web Syndrome after Axillary Lymph Node Dissection: A Case Report", "journal": "Physical Therapy Rehabilitation Science", "date": "2022-12-30", "doi": "https://doi.org/10.14474/ptrs.2022.11.4.464"},
    {"title": "Effects of High-Frequency Treatment using Radiofrequency on Autonomic Nervous System and Pain in Women with Dysmenorrhea", "journal": "Physical Therapy Rehabilitation Science", "date": "2022-12-30", "doi": "https://doi.org/10.14474/ptrs.2022.11.4.493"},
    {"title": "Therapeutic Application of Virtual Reality in the Rehabilitation of Mild Cognitive Impairment: A Systematic Review and Meta-Analysis", "journal": "Vision", "date": "2022-11-18", "doi": "https://doi.org/10.3390/vision6040068"},
    {"title": "Treatment of Myofascial Trigger Points of the Infraspinatus is Effective in Relieving Shoulder Pain and Improving Shoulder Functions", "journal": "Physical Therapy Rehabilitation Science", "date": "2022-09-30", "doi": "https://doi.org/10.14474/ptrs.2022.11.3.335"},
    {"title": "Efficacy of radial extracorporeal shockwave therapy in rehabilitation following arthroscopic rotator cuff repair: A STROBE compliant study", "journal": "Medicine", "date": "2022-09-02", "doi": "https://doi.org/10.1097/MD.0000000000030053"},
    {"title": "The Effects of Myofascial Trigger Point Release and Mobility Exercise on Pain and Functions in Patient with Rotator Cuff Tendinopathy", "journal": "Physical Therapy Rehabilitation Science", "date": "2022-06-30", "doi": "https://doi.org/10.14474/ptrs.2022.11.2.269"},
    {"title": "The Efficacy of Pain Neuroscience Education on Active Rehabilitation Following Arthroscopic Rotator Cuff Repair: A CONSORT-Compliant Prospective Randomized Single-Blind Controlled Trial", "journal": "Brain Sciences", "date": "2022-06-10", "doi": "https://doi.org/10.3390/brainsci12060764"},
    {"title": "Postoperative Rehabilitation Protocol Following Arthroscopic Rotator Cuff Repair: A Prospective Single-Arm Pragmatic Interventional Study", "journal": "Medicina", "date": "2022-05-28", "doi": "https://doi.org/10.3390/medicina58060729"},
    {"title": "Effects of Repetitive Transcranial Magnetic Stimulation on the Primary Motor Cortex of Individuals with Fibromyalgia: A Systematic Review and Meta-Analysis", "journal": "Brain Sciences", "date": "2022-04-28", "doi": "https://doi.org/10.3390/brainsci12050570"},
    {"title": "The Effect of Visual Feedback Bicycle Training on Maximal Oxygen Uptake, Quadriceps Muscle Strength, and Running Performance in Healthy Young Adults", "journal": "Physical Therapy Rehabilitation Science", "date": "2022-03-30", "doi": "https://doi.org/10.14474/ptrs.2022.11.1.58"},
    {"title": "The Effect of the Cervical Stabilization Exercise on Balance and Neck Functional Capacities in Community-dwelling Older Adults", "journal": "Physical Therapy Rehabilitation Science", "date": "2022-03-30", "doi": "https://doi.org/10.14474/ptrs.2022.11.1.97"},
    {"title": "Comparison of Core Muscle Asymmetry Using Spine Balance 3D in Patients with Arthroscopic Shoulder Surgery: A STROBE-Compliant Cross-Sectional Study", "journal": "Medicina", "date": "2022-02-16", "doi": "https://doi.org/10.3390/medicina58020302"},
    {"title": "Physical Therapy Following Arthroscopic Rotator Cuff Repair with Graft Augmentation: A Case Report with Magnetic Resonance Imaging", "journal": "Physical Therapy Rehabilitation Science", "date": "2021-12-30", "doi": "https://doi.org/10.14474/ptrs.2021.10.4.463"},
    {"title": "The Motor-cognitive Training on Cognition and Physical Performance in the Older Adults with Mild Cognition Impairment : A Literature Review", "journal": "Physical Therapy Rehabilitation Science", "date": "2021-12-30", "doi": "https://doi.org/10.14474/ptrs.2021.10.4.493"},
    {"title": "Development of an 360-degree virtual reality video-based immersive cycle training system for physical enhancement in older adults: a feasibility study", "journal": "BMC Geriatrics", "date": "2021-12", "doi": "https://doi.org/10.1186/s12877-021-02263-1"},
    {"title": "A Systematic Review of Case Reports on the Neck-Tongue Syndrome", "journal": "Medicina", "date": "2021-10-13", "doi": "https://doi.org/10.3390/medicina57101097"},
    {"title": "Effect on Squatting with Short Foot Exercise on Muscle Activation and Onset of Contraction in the Quadriceps Femoris", "journal": "Physical Therapy Rehabilitation Science", "date": "2021-09-30", "doi": "https://doi.org/10.14474/ptrs.2021.10.3.367"},
    {"title": "The Comparative Study on the Satisfaction of the Physical Therapy facilities in the front Military hospitals and Divisions", "journal": "Physical Therapy Rehabilitation Science", "date": "2021-06-30", "doi": "https://doi.org/10.14474/ptrs.2021.10.2.217"},
    {"title": "Short-term effects of joint mobilization with versus without voluntary movement in patients with chronic ankle instability: A single-blind randomized controlled trial", "journal": "Physical Therapy Rehabilitation Science", "date": "2021-03-30", "doi": "https://doi.org/10.14474/ptrs.2021.10.1.1"},
    {"title": "The Effects of Stair Climbing Training with Functional Electrical Stimulation on Muscle Strength, Balance, and Gait in Patients with Chronic Stroke", "journal": "Physical Therapy Rehabilitation Science", "date": "2021-03-30", "doi": "https://doi.org/10.14474/ptrs.2021.10.1.32"},
    {"title": "Pilates exercise focused on ankle movements for improving gait ability in older women", "journal": "Journal of Women & Aging", "date": "2021-01-05", "doi": "https://doi.org/10.1080/08952841.2019.1618129"},
    {"title": "Effects of pain neuroscience education on kinesiophobia in patients with chronic pain: a systematic review and meta-analysis", "journal": "Physical Therapy Rehabilitation Science", "date": "2020-12-30", "doi": "https://doi.org/10.14474/ptrs.2020.9.4.309"},
    {"title": "Effects of treatment of temporomandibular disorders on headache, quality of life, and neck function in patients with tension-type headaches: a randomized controlled study", "journal": "Physical Therapy Rehabilitation Science", "date": "2020-12-30", "doi": "https://doi.org/10.14474/ptrs.2020.9.4.215"},
    {"title": "The effect of sacroiliac joint manual therapy on heart rate variability in women with primary dysmenorrhea", "journal": "Physical Therapy Rehabilitation Science", "date": "2020-12-30", "doi": "https://doi.org/10.14474/ptrs.2020.9.4.252"},
    {"title": "Factors related to the treatment duration of infants with congenital muscular torticollis", "journal": "Physical Therapy Rehabilitation Science", "date": "2020-09-30", "doi": "https://doi.org/10.14474/ptrs.2020.9.3.191"},
    {"title": "Balance trainer training with transcutaneous electrical nerve stimulation improves spasticity and balance in persons with chronic stroke", "journal": "Physical Therapy Rehabilitation Science", "date": "2020-06-30", "doi": "https://doi.org/10.14474/ptrs.2020.9.2.67"},
    {"title": "The effects of head rotation exercise on postural balance, muscle strength, and gait in older women", "journal": "Women & Health", "date": "2020-04-20", "doi": "https://doi.org/10.1080/03630242.2019.1662870"},
    {"title": "Comparison of real-time ultrasound imaging for manual lymphatic drainage on breast cancer-related lymphedema in individuals with breast cancer: a preliminary study", "journal": "Physical Therapy Rehabilitation Science", "date": "2020-03-30", "doi": "https://doi.org/10.14474/ptrs.2020.9.1.43"},
    {"title": "Treatment of myofascial trigger points of the infraspinatus is effective in relieving shoulder pain and improving shoulder functions: A randomized clinical trial", "journal": "Preprint", "date": "2020-01-21", "doi": "https://doi.org/10.21203/rs.2.21424/v1"},
    {"title": "Upper thoracic spine mobilization and mobility exercise versus upper cervical spine mobilization and stabilization exercise in individuals with forward head posture: a randomized clinical trial", "journal": "BMC Musculoskeletal Disorders", "date": "2017-12", "doi": "https://doi.org/10.1186/s12891-017-1889-2"},
    {"title": "Immediate effect of self-myofascial release on hamstring flexibility", "journal": "Physical Therapy Rehabilitation Science", "date": "2017-03-30", "doi": "https://doi.org/10.14474/ptrs.2017.6.1.45"},
    {"title": "The effect of intrinsic foot muscle training on medial longitudinal arch and ankle stability in patients with chronic ankle sprain accompanied by foot pronation", "journal": "Physical Therapy Rehabilitation Science", "date": "2016-06-30", "doi": "https://doi.org/10.14474/ptrs.2016.5.2.78"},
    {"title": "EEG-biofeedback intervention improves balance in stroke survivor", "journal": "Indian Journal of Science and Technology", "date": "2015", "doi": "https://doi.org/10.17485/ijst/2015/v8i18/75926"},
    {"title": "Effect of the cognitive-motor dual-task using auditory cue on balance of surviviors with chronic stroke: A pilot study", "journal": "Clinical Rehabilitation", "date": "2015", "doi": "https://doi.org/10.1177/0269215514556093"},
    {"title": "Effects of hip mobilization on pain and function for chronic low back pain individuals with limited range of hip joint motion", "journal": "Indian Journal of Science and Technology", "date": "2015", "doi": "https://doi.org/10.17485/ijst/2015/v8i26/80867"},
    {"title": "Identifying symmetry and contracted ratio of lateral abdominal muscles in stroke survivors", "journal": "International Journal of Bio-Science and Bio-Technology", "date": "2015", "doi": "https://doi.org/10.14257/ijbsbt.2015.7.3.21"},
    {"title": "The immediate effects of laser acupuncture on static balance in healthy female older adults", "journal": "International Journal of Bio-Science and Bio-Technology", "date": "2015", "doi": "https://doi.org/10.14257/ijbsbt.2015.7.6.31"},
    {"title": "Trunk stabilization training using visual feedback on an unstable surface improves balance and trunk stability of chronic stroke patients", "journal": "Clinical and Experimental Medical Letters", "date": "2015", "doi": "https://doi.org/10.12659/MST.893523"},
    {"title": "Improving the quality of sleep with an optimal pillow: A randomized, comparative study", "journal": "Tohoku Journal of Experimental Medicine", "date": "2014", "doi": "https://doi.org/10.1620/tjem.233.183"},
    {"title": "The effects of exercise with TENS on spasticity, balance, and gait in patients with chronic stroke: A randomized controlled trial", "journal": "Medical Science Monitor", "date": "2014", "doi": "https://doi.org/10.12659/MSM.890926ed."},
    {"title": "Comparison of the changes in thickness of the abdominal wall muscles of stroke patients according to the duration of their illness as observed using ultrasonographic images", "journal": "Journal of Physical Therapy Science", "date": "2013", "doi": "https://doi.org/10.1589/jpts.25.817"},
    {"title": "Effect of continuing repeated passive and active exercises on knee's position senses in patients with hemiplegia", "journal": "NeuroRehabilitation", "date": "2013", "doi": "https://doi.org/10.3233/NRE-130969"},
    {"title": "The effect of repetitive passive and active movements on proprioception ability in forearm supination", "journal": "Journal of Physical Therapy Science", "date": "2013", "doi": "https://doi.org/10.1589/jpts.25.587"},
    {"title": "Whole-body vibration training improves balance, muscle strength and glycosylated hemoglobin in elderly patients with diabetic neuropathy", "journal": "Tohoku Journal of Experimental Medicine", "date": "2013", "doi": "https://doi.org/10.1620/tjem.231.305"},
    {"title": "Changes of normal adult physiological states and gait parameters with treadmill inclined", "journal": "Journal of Physical Therapy Science", "date": "2012", "doi": "https://doi.org/10.1589/jpts.24.805"},
    {"title": "The effect of dual motor task training while sitting on trunk control ability and balance of patients with chronic stroke", "journal": "Journal of Physical Therapy Science", "date": "2012", "doi": "https://doi.org/10.1589/jpts.24.345"},
    {"title": "Virtual reality reflection therapy improves motor recovery and motor function in the upper extremities of people with chronic stroke", "journal": "Journal of Physical Therapy Science", "date": "2012", "doi": "https://doi.org/10.1589/jpts.24.339"},
    {"title": "Effects of an exercise program on balance and trunk proprioception in older adults with diabetic neuropathies", "journal": "Diabetes Technology and Therapeutics", "date": "2011", "doi": "https://doi.org/10.1089/dia.2011.0036"},
    {"title": "Effects of combined exercise training on balance of Hemiplegic stroke patients", "journal": "Journal of Physical Therapy Science", "date": "2011", "doi": "https://doi.org/10.1589/jpts.23.639"},
    {"title": "Effects of motor imagery training on gait ability of patients with chronic stroke", "journal": "Journal of Physical Therapy Science", "date": "2011", "doi": "https://doi.org/10.1589/jpts.23.197"}
];
