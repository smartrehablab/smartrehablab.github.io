const SITE = {
  name: "Smart Rehabilitation Lab",
  department: "Department of Physical Therapy, Sahmyook University",
  departmentKo: "삼육대학교 물리치료학과",
  address: "815 Hwarang-ro, Nowon-gu, Seoul, Republic of Korea",
  email: "jihye3752@gmail.com",
  phone: "",
  orcid: "0000-0002-0413-0510",
  scopus: "35088310300",
  since: 2008,
  map: "https://www.google.com/maps?q=37.6435,127.107621&z=16&output=embed"
};

const RESEARCH = [
  {
    id: "msk",
    title: "Musculoskeletal Rehabilitation",
    image: "assets/img/research-1.jpg",
    text: "어깨 회전근개 수술 후 재활, 만성 발목 불안정성, 요통, 슬개대퇴통증, 전방머리자세에 대한 운동치료와 도수치료 효과를 임상시험으로 검증합니다.",
    studies: [
      { title: "Postoperative Rehabilitation Protocol Following Arthroscopic Rotator Cuff Repair: A Prospective Single-Arm Pragmatic Interventional Study", journal: "Medicina", year: 2022, doi: "https://doi.org/10.3390/medicina58060729" },
      { title: "Improving muscle function and quality of life in women with chronic low back pain through combined self-myofascial release and Pilates: A randomized clinical trial (CONSORT)", journal: "Medicine", year: 2026, doi: "https://doi.org/10.1097/MD.0000000000046971" }
    ]
  },
  {
    id: "neuro",
    title: "Neurological Rehabilitation",
    image: "assets/img/research-2.jpg",
    text: "뇌졸중과 뇌성마비의 균형·보행 회복, 반복경두개자기자극(rTMS)과 경두개직류자극(tDCS)을 결합한 재활 중재를 연구합니다.",
    studies: [
      { title: "Effects of High-Frequency Repetitive Transcranial Magnetic Stimulation Combined with Motor Learning on Motor Function and Grip Force of the Upper Limbs and Activities of Daily Living in Patients with a Subacute Stroke", journal: "International Journal of Environmental Research and Public Health", year: 2023, doi: "https://doi.org/10.3390/ijerph20126093" },
      { title: "Synergistic Effects of Joint-Biased Rehabilitation and Combined Transcranial Direct Current Stimulation (tDCS) in Chronic Ankle Instability: A Single-Blind, Three-Armed Randomized Controlled Trial", journal: "Brain Sciences", year: 2025, doi: "https://doi.org/10.3390/brainsci15050458" }
    ]
  },
  {
    id: "pain",
    title: "Pain Neuroscience",
    image: "assets/img/research-3.jpg",
    text: "통증신경과학교육, 중추감작, 섬유근통, 통증 파국화 등 만성통증의 신경과학적 기전과 중재를 연구합니다.",
    studies: [
      { title: "The Efficacy of Pain Neuroscience Education on Active Rehabilitation Following Arthroscopic Rotator Cuff Repair: A CONSORT-Compliant Prospective Randomized Single-Blind Controlled Trial", journal: "Brain Sciences", year: 2022, doi: "https://doi.org/10.3390/brainsci12060764" },
      { title: "Effects of Repetitive Transcranial Magnetic Stimulation on the Primary Motor Cortex of Individuals with Fibromyalgia: A Systematic Review and Meta-Analysis", journal: "Brain Sciences", year: 2022, doi: "https://doi.org/10.3390/brainsci12050570" }
    ]
  },
  {
    id: "tech",
    title: "Smart Rehab Technology & Aging",
    image: "assets/img/research-4.jpg",
    text: "가상현실 사이클링, 웨어러블 센서 기반 인지-운동 훈련, fNIRS 전전두엽 혈역학 측정을 활용해 노인과 경도인지장애 대상 재활기술을 개발합니다.",
    studies: [
      { title: "Enhancing cognitive and physical performance in older adults through wearable sensor-based interactive cognitive-motor training: a randomized clinical trial", journal: "Scientific Reports", year: 2025, doi: "https://doi.org/10.1038/s41598-025-03725-x" },
      { title: "Comparison of the Influence of Dual-Task Activities on Prefrontal Activation and Gait Variables in Older Adults with Mild Cognitive Impairment during Straight and Curved Walking", journal: "Medicina", year: 2024, doi: "https://doi.org/10.3390/medicina60020235" }
    ]
  }
];

const PI = {
  name: "Seungwon Lee, PhD",
  nameKo: "",
  title: "Professor, Department of Physical Therapy, Sahmyook University",
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
    group: "Researchers",
    people: [
      { name: "Jihye Jung, PT, PhD", role: "Post-Doctoral Researcher", interests: "Neuroscience, Geriatrics", email: "jihye3752@gmail.com", photo: "" },
      { name: "Wonhyung Kang, PT, MS Candidate", role: "Master's Student Researcher", interests: "MSK disorders, Exercise", email: "dannykangwh@naver.com", photo: "" }
    ]
  },
  { group: "Graduate Students (Ph.D.)", people: [] },
  { group: "Graduate Students (M.S.)", people: [] },
  { group: "Ph.D. Candidates (Coursework Completed)", people: [] },
  {
    group: "Alumni",
    people: [
      { name: "Wonjae Choi, PT, PhD", role: "Ph.D., 2011", position: "중부대학교 물리치료학과", photo: "assets/img/members/choi-wonjae.jpg" },
      { name: "Eunsang Lee, PT, PhD", role: "Ph.D., 2018", position: "광주보건대학교 물리치료학과", photo: "assets/img/members/lee-eunsang.jpg" },
      { name: "Hyunjoong Kim, PT, PhD", role: "Ph.D., 2022", position: "광주보건대학교 시니어운동처방학과", photo: "assets/img/members/kim-hyunjoong.jpg" },
      { name: "Jeongu Sim, PT, PhD", role: "Ph.D., 2024", position: "경남대학교 물리치료학과", photo: "assets/img/members/sim-jeongu.jpg" }
    ]
  }
];

const NEWS = [
  { date: "2026.09", title: "Paper published in Physical Therapy Rehabilitation Science", text: "Effects of radial extracorporeal shock wave therapy combined with blood flow restriction exercise on Q-angle and plantar pressure in adults with genu varum.", link: "https://doi.org/10.14474/ptrs.2026.15.3.445", image: "" },
  { date: "2026.01", title: "Paper published in Medicine", text: "Combined self-myofascial release and Pilates improved muscle function and quality of life in women with chronic low back pain: a randomized clinical trial.", link: "https://doi.org/10.1097/MD.0000000000046971", image: "" },
  { date: "2025.05", title: "Paper published in Scientific Reports", text: "Wearable sensor-based interactive cognitive-motor training enhanced cognitive and physical performance in older adults: a randomized clinical trial.", link: "https://doi.org/10.1038/s41598-025-03725-x", image: "" }
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
