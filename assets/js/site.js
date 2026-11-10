(function () {
  const page = document.body.dataset.page || "";
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const yr = (p) => String(p.date || p.year).slice(0, 4);
  const pubs = PUBLICATIONS.slice().sort((a, b) => String(b.date).localeCompare(String(a.date)));
  const chev = '<svg viewBox="0 0 10 10"><path d="M3 1l4 4-4 4"/></svg>';
  const more = (href, label, ext) => `<a class="more" href="${esc(href)}"${ext ? ' target="_blank" rel="noopener"' : ""}>${label}${chev}</a>`;
  const initials = (n) => n.split(",")[0].split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const NAV = [
    { id: "about", label: "About", href: "about.html" },
    { id: "research", label: "Research", href: "research.html" },
    { id: "people", label: "People", children: [
      { id: "pi", label: "Principal Investigator", href: "pi.html" },
      { id: "members", label: "Members", href: "members.html" }
    ] },
    { id: "publications", label: "Publications", href: "publications.html" },
    { id: "news", label: "News", href: "news.html" },
    { id: "gallery", label: "Gallery", href: "gallery.html", hide: GALLERY.length === 0 }
  ];

  function nav() {
    const items = NAV.filter((n) => !n.hide).map((n) => {
      if (!n.children) return `<a href="${n.href}"${n.id === page ? ' aria-current="page"' : ""}>${n.label}</a>`;
      const on = n.children.some((c) => c.id === page);
      return `<div class="dd${on ? " on" : ""}"><button type="button" aria-haspopup="true">${n.label}</button><div class="dd-panel">${n.children.map((c) => `<a href="${c.href}"${c.id === page ? ' aria-current="page"' : ""}>${c.label}</a>`).join("")}</div></div>`;
    }).join("");
    $("#site-header").outerHTML = `
      <header class="gnav"><div class="wrap-wide">
        <a class="logo" href="index.html"><img src="assets/img/logo.png" alt="Smart Rehabilitation Lab, Prof. Seungwon Lee"></a>
        <nav aria-label="주 메뉴">${items}<a class="btn sm cta-nav" href="contact.html">Contact</a></nav>
        <button class="burger" aria-label="메뉴" aria-expanded="false"><i></i><i></i></button>
      </div></header>`;
    const b = $(".burger");
    b.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      b.setAttribute("aria-expanded", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
  }

  function foot() {
    $("#site-footer").outerHTML = `
      <footer class="gfoot"><div class="wrap">
        <div class="cols">
          <div><div class="mark"><img src="assets/img/logo-mark.png" alt="">Smart Rehabilitation Lab</div>
            <p>${esc(SITE.department)}<br>${esc(SITE.address)}</p></div>
          <div><h4>Lab</h4><ul><li><a href="about.html">About</a></li><li><a href="research.html">Research</a></li><li><a href="news.html">News</a></li></ul></div>
          <div><h4>People</h4><ul><li><a href="pi.html">Principal Investigator</a></li><li><a href="members.html">Members</a></li><li><a href="publications.html">Publications</a></li></ul></div>
          <div><h4>Contact</h4><ul><li><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></li>${SITE.phone ? `<li>${esc(SITE.phone)}</li>` : ""}<li><a href="https://orcid.org/${SITE.orcid}" target="_blank" rel="noopener">ORCID ${SITE.orcid}</a></li></ul></div>
        </div>
        <div class="legal"><span>Copyright © ${new Date().getFullYear()} Smart Rehabilitation Lab. All rights reserved.</span><span>Sahmyook University, Seoul</span></div>
      </div></footer>`;
  }

  const R = {
    tiles(el) {
      const cls = ["wide ink", "", "", "wide"];
      el.innerHTML = RESEARCH.map((r, i) => `
        <article class="tile ${cls[i] || ""}" data-photo="${esc(r.image || "")}">
          <div class="tile-txt"><h3 class="title">${esc(r.title)}</h3><p class="desc">${esc(r.text)}</p>${more("research.html#" + r.id, "연구 자세히 보기")}</div>
          <ul class="tile-studies">${r.studies.map((s) => `<li><a href="${esc(s.doi)}" target="_blank" rel="noopener"><span>${esc(s.journal)}, ${s.year}</span>${esc(s.title)}</a></li>`).join("")}</ul>
        </article>`).join("");
      el.querySelectorAll("[data-photo]").forEach((t) => {
        const src = t.dataset.photo; if (!src) return;
        const im = new Image(); im.onload = () => { t.classList.add("has-photo"); t.style.setProperty("--img", `url("${src}")`); }; im.src = src;
      });
    },
    numbers(el) {
      const alumni = ((MEMBERS.find((g) => g.group === "Alumni") || {}).people || []).length;
      const items = [[pubs.length, "ORCID 등록 연구 실적"], [RESEARCH.length, "연구 분야"], [SITE.since, "삼육대학교 물리치료학과 재직 시작"], [alumni, "박사 졸업생"]];
      el.innerHTML = items.map(([n, l]) => `<div><b data-n="${n}">${n}</b><span>${l}</span></div>`).join("");
    },
    rows(el) {
      const list = pubs.slice(0, +(el.dataset.limit || 5));
      el.innerHTML = list.map(row).join("");
    },
    news(el) {
      const list = el.dataset.limit ? NEWS.slice(0, +el.dataset.limit) : NEWS;
      el.innerHTML = list.length ? list.map((n) => `
        <article class="news"><span class="d">${esc(n.date)}</span><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p>
        ${n.link ? more(n.link, "논문 보기", true) : ""}</article>`).join("") : `<p class="empty">새 소식이 올라오면 여기에 표시됩니다.</p>`;
      const ctrl = document.querySelector(`[data-scroll="${el.id}"]`);
      if (ctrl) ctrl.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => el.scrollBy({ left: (+b.dataset.d) * 420, behavior: "smooth" })));
    },
    areas(el) {
      el.innerHTML = RESEARCH.map((r) => `
        <section class="area noimg" id="${r.id}">
          <div class="art" data-photo="${esc(r.image || "")}"></div>
          <div><h2 class="title">${esc(r.title)}</h2><p class="desc">${esc(r.text)}</p>
            <h3>대표 연구</h3><ul class="studies">${r.studies.map((s) => `<li><a href="${esc(s.doi)}" target="_blank" rel="noopener">${esc(s.title)}</a><span>${esc(s.journal)}, ${s.year}</span></li>`).join("")}</ul></div>
        </section>`).join("");
      el.querySelectorAll("[data-photo]").forEach((a) => {
        const src = a.dataset.photo; if (!src) return;
        const im = new Image(); im.onload = () => { a.style.backgroundImage = `url("${src}")`; a.closest(".area").classList.remove("noimg"); }; im.src = src;
      });
    },
    pi(el) {
      el.classList.add("nophoto");
      el.innerHTML = `
        <div class="portrait" id="pi-photo" hidden></div>
        <div><p class="small" style="font-size:17px">Principal Investigator</p>
          <h1 class="headline" style="margin-top:8px">${esc(PI.name)}</h1>
          ${PI.nameKo ? `<p class="sub" style="margin-top:8px">${esc(PI.nameKo)}</p>` : ""}
          <p class="sub" style="margin-top:14px">${esc(PI.title)}</p>
          <dl class="meta">
            <dt>Email</dt><dd><a href="mailto:${esc(PI.email)}">${esc(PI.email)}</a></dd>
            <dt>ORCID</dt><dd><a href="https://orcid.org/${SITE.orcid}" target="_blank" rel="noopener">${SITE.orcid}</a></dd>
            <dt>Scopus</dt><dd><a href="https://www.scopus.com/authid/detail.uri?authorId=${SITE.scopus}" target="_blank" rel="noopener">${SITE.scopus}</a></dd>
            <dt>Keywords</dt><dd>${PI.keywords.map(esc).join(", ")}</dd>
          </dl></div>`;
      photo("#pi-photo", PI.photo);
    },
    cv(el) {
      const ol = (a) => `<ol>${a.map((x) => `<li><b>${esc(x.period)}</b><span>${esc(x.text)}</span></li>`).join("")}</ol>`;
      el.innerHTML = `<div><h2 class="title">Employment</h2>${ol(PI.employment)}</div><div><h2 class="title">Education</h2>${ol(PI.education)}</div>`;
    },
    selected(el) {
      el.innerHTML = PI.selected.map((d) => pubs.find((p) => p.doi === d)).filter(Boolean).map(row).join("");
    },
    members(el) {
      el.innerHTML = MEMBERS.filter((g) => g.people.length).map((g) => `
        <section class="group"><h2>${esc(g.group)}</h2><div class="people">
        ${g.people.map((p) => `
          <div class="person${p.photo ? "" : " nophoto"}">${p.photo ? `<div class="ph" style="background-image:url('${esc(p.photo)}')"></div>` : ""}
            <h3>${esc(p.name)}</h3><div class="role">${esc(p.role)}</div>
            <div class="info">${p.interests ? esc(p.interests) + "<br>" : ""}${p.position ? esc(p.position) + "<br>" : ""}${p.email ? `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>` : ""}</div></div>`).join("")}
        </div></section>`).join("");
    },
    pubapp(el) {
      const years = [...new Set(pubs.map(yr))];
      const tools = $("#ptools");
      tools.innerHTML = `<div class="wrap">
        <label class="search"><svg viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="6"/><path d="M13 13l5 5"/></svg><input type="search" placeholder="제목이나 저널로 검색" aria-label="논문 검색"></label>
        <div class="seg" role="group" aria-label="연도"><button aria-pressed="true" data-y="">전체</button>${years.map((y) => `<button aria-pressed="false" data-y="${y}">${y}</button>`).join("")}</div></div>`;
      const q = $("input", tools);
      let yf = "";
      const draw = () => {
        const k = q.value.trim().toLowerCase();
        const list = pubs.filter((p) => (!yf || yr(p) === yf) && (!k || (p.title + " " + p.journal).toLowerCase().includes(k)));
        const by = {};
        list.forEach((p) => (by[yr(p)] = by[yr(p)] || []).push(p));
        el.innerHTML = `<p class="ycount">전체 ${pubs.length}편 중 ${list.length}편 (ORCID 기준)</p>` +
          (Object.keys(by).sort().reverse().map((y) => `<div class="ygroup"><h2>${y}<small>${by[y].length}편</small></h2><ul class="rows">${by[y].map(row).join("")}</ul></div>`).join("") || `<p class="empty">검색어와 일치하는 논문이 없습니다. 다른 단어로 검색해 보십시오.</p>`);
      };
      q.addEventListener("input", draw);
      tools.querySelectorAll(".seg button").forEach((b) => b.addEventListener("click", () => {
        tools.querySelectorAll(".seg button").forEach((x) => x.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true"); yf = b.dataset.y; draw();
      }));
      draw();
    },
    gallery(el) {
      el.innerHTML = GALLERY.length ? `<div class="gallery">${GALLERY.map((g) => `<figure><img src="${esc(g.image)}" alt="${esc(g.caption || "")}" loading="lazy"><figcaption>${esc(g.caption || "")}</figcaption></figure>`).join("")}</div>`
        : `<p class="empty">사진이 올라오면 여기에 표시됩니다.</p>`;
    },
    contact(el) {
      el.innerHTML = `<dt>Lab</dt><dd>${esc(SITE.name)}</dd><dt>Dept.</dt><dd>${esc(SITE.department)}</dd><dt>Address</dt><dd>${esc(SITE.address)}</dd><dt>Email</dt><dd><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></dd>${SITE.phone ? `<dt>Tel</dt><dd>${esc(SITE.phone)}</dd>` : ""}`;
      const m = $("#mail"); if (m) m.href = "mailto:" + SITE.email;
    },
    map(el) {
      el.innerHTML = `<iframe class="map" src="${esc(SITE.map)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="삼육대학교 위치 지도"></iframe>`;
    },
    greetphoto(el) { photo("#" + el.id, PI.photo); }
  };

  function row(p) {
    return `<li class="row-pub"><span class="y">${yr(p)}</span><a href="${esc(p.doi)}" target="_blank" rel="noopener">${esc(p.title)}</a><span class="j">${esc(p.journal)}</span></li>`;
  }
  function photo(sel, src) {
    if (!src) return;
    const im = new Image();
    im.onload = () => { const a = $(sel); if (a) { a.style.backgroundImage = `url("${src}")`; a.innerHTML = ""; a.hidden = false; const box = a.parentElement; if (box) box.classList.remove("nophoto"); } };
    im.src = src;
  }

  nav();
  foot();
  document.querySelectorAll("[data-render]").forEach((el) => R[el.dataset.render] && R[el.dataset.render](el));
})();
