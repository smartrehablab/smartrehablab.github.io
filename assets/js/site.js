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
    { id: "about", label: UI("nav.about"), href: "about.html" },
    { id: "research", label: UI("nav.research"), href: "research.html" },
    { id: "people", label: UI("nav.people"), children: [
      { id: "pi", label: UI("nav.pi"), href: "pi.html" },
      { id: "members", label: UI("nav.members"), href: "members.html" }
    ] },
    { id: "publications", label: UI("nav.publications"), href: "publications.html" },
    { id: "news", label: UI("nav.news"), href: "news.html" },
    { id: "gallery", label: UI("nav.gallery"), href: "gallery.html", hide: GALLERY.length === 0 }
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
        <nav aria-label="${UI("nav.main")}">${items}<a class="btn sm cta-nav" href="contact.html">${UI("nav.contact")}</a></nav>
        <div class="lang" role="group" aria-label="${UI("nav.lang")}">${[["en", "EN", "English"], ["ko", "KO", "한국어"], ["ja", "JA", "日本語"]].map(([l, s, n]) => `<button type="button" data-lang="${l}" lang="${l}" title="${n}" aria-label="${n}"${l === LANG ? ' aria-current="true"' : ""}>${s}</button>`).join("")}</div>
        <button class="burger" aria-label="${UI("nav.menu")}" aria-expanded="false"><i></i><i></i></button>
      </div></header>`;
    document.querySelectorAll(".gnav .lang button").forEach((x) => x.addEventListener("click", () => { if (x.dataset.lang !== LANG) setLang(x.dataset.lang); }));
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
            <p>${esc(T(SITE.department))}<br>${esc(T(SITE.address))}</p></div>
          <div><h4>${UI("foot.lab")}</h4><ul><li><a href="about.html">${UI("nav.about")}</a></li><li><a href="research.html">${UI("nav.research")}</a></li><li><a href="news.html">${UI("nav.news")}</a></li></ul></div>
          <div><h4>${UI("nav.people")}</h4><ul><li><a href="pi.html">${UI("nav.pi")}</a></li><li><a href="members.html">${UI("nav.members")}</a></li><li><a href="publications.html">${UI("nav.publications")}</a></li></ul></div>
          <div><h4>${UI("nav.contact")}</h4><ul><li><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></li>${SITE.phone ? `<li>${esc(SITE.phone)}</li>` : ""}<li><a href="https://orcid.org/${SITE.orcid}" target="_blank" rel="noopener">ORCID ${SITE.orcid}</a></li></ul></div>
        </div>
        <div class="legal"><span>Copyright © ${new Date().getFullYear()} Smart Rehabilitation Lab. All rights reserved.</span><span>${UI("foot.place")}</span></div>
      </div></footer>`;
  }

  const R = {
    tiles(el) {
      const cls = ["wide ink", "", "", "wide"];
      el.innerHTML = RESEARCH.map((r, i) => `
        <article class="tile ${cls[i] || ""}" data-photo="${esc(r.image || "")}">
          <div class="tile-txt"><h3 class="title">${esc(r.title)}</h3><p class="desc">${esc(T(r.text))}</p>${more("research.html#" + r.id, UI("explore"))}</div>
          <ul class="tile-studies">${r.studies.map((s) => `<li><a href="${esc(s.doi)}" target="_blank" rel="noopener"><span>${esc(s.journal)}, ${s.year}</span>${esc(s.title)}</a></li>`).join("")}</ul>
        </article>`).join("");
      el.querySelectorAll("[data-photo]").forEach((t) => {
        const src = t.dataset.photo; if (!src) return;
        const im = new Image(); im.onload = () => { t.classList.add("has-photo"); t.style.setProperty("--img", `url("${src}")`); }; im.src = src;
      });
    },
    rows(el) {
      const list = pubs.slice(0, +(el.dataset.limit || 5));
      el.innerHTML = list.map(row).join("");
    },
    news(el) {
      const list = el.dataset.limit ? NEWS.slice(0, +el.dataset.limit) : NEWS;
      el.innerHTML = list.length ? list.map((n) => `
        <article class="news"><span class="d">${esc(n.date)}</span><h3>${esc(T(n.title))}</h3><p>${esc(T(n.text))}</p>
        ${n.link ? more(n.link, UI(n.linkLabel || "viewpaper"), /^https?:/.test(n.link)) : ""}</article>`).join("") : `<p class="empty">${UI("news.empty")}</p>`;
      const ctrl = document.querySelector(`[data-scroll="${el.id}"]`);
      if (ctrl) ctrl.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => el.scrollBy({ left: (+b.dataset.d) * 420, behavior: "smooth" })));
    },
    areas(el) {
      el.innerHTML = RESEARCH.map((r) => `
        <section class="area noimg" id="${r.id}">
          <div class="art" data-scene="${esc(r.id)}" data-label="${esc(r.title)}, ${UI("research.3d")}" data-photo="${esc(r.image || "")}"></div>
          <div><h2 class="title">${esc(r.title)}</h2><p class="desc">${esc(T(r.text))}</p>
            <h3>${UI("research.key")}</h3><ul class="studies">${r.studies.map((s) => `<li><a href="${esc(s.doi)}" target="_blank" rel="noopener">${esc(s.title)}</a><span>${esc(s.journal)}, ${s.year}</span></li>`).join("")}</ul></div>
        </section>`).join("");
      el.querySelectorAll("[data-photo]").forEach((a) => {
        const src = a.dataset.photo; if (!src || a.dataset.scene) return;
        const im = new Image(); im.onload = () => { a.style.backgroundImage = `url("${src}")`; a.closest(".area").classList.remove("noimg"); }; im.src = src;
      });
    },
    projects(el) {
      const won = (n) => "₩" + n.toLocaleString("en-US");
      const mil = (n) => "₩" + (n / 1e6).toFixed(1) + "M";
      const OUT = [["papers", "p.paper"], ["patents", "p.patent"], ["reports", "p.report"]];
      const word = (k, n) => { const w = UI(k); return Array.isArray(w) ? w[n === 1 ? 0 : 1] : w; };
      const outs = (o, big) => OUT.filter(([k]) => o[k]).map(([k, key]) => big
        ? `<div><b>${o[k]}</b><span>${word(key, o[k])}</span></div>`
        : `${word(key, o[k])} ${o[k]}`);
      const sub = (t) => esc(LANG === "en" ? t.ko : t.en);
      const grants = PROJECTS.grants.map((g) => {
        const total = g.years.reduce((a, y) => a + y.amount, 0);
        const sum = {}; g.years.forEach((y) => Object.entries(y.out).forEach(([k, v]) => (sum[k] = (sum[k] || 0) + v)));
        return `
        <article class="grant">
          <div class="g-info">
            ${g.collab ? `<p class="g-collab">${UI("p.collab")}</p>` : ""}<p class="g-period">${esc(g.period)}<span>${UI("p.years", g.spanYears || g.years.length)}</span>${g.ongoing ? `<em><i></i>${UI("p.progress")}</em>` : ""}</p>
            <h3>${esc(T(g.title))}</h3>
            <p class="g-ko">${sub(g.title)}</p>
            <dl class="g-meta"><dt>${UI("p.program")}</dt><dd>${esc(T(g.program))}</dd><dt>${UI("p.funder")}</dt><dd>${esc(T(g.funder))}</dd>${g.agency ? `<dt>${UI("p.agency")}</dt><dd>${esc(T(g.agency))}</dd>` : ""}<dt>${UI("p.pi")}</dt><dd>${esc(T(g.pi))}</dd></dl>
          </div>
          <div class="g-data">
            <p class="g-total"><b title="${won(total)}">${mil(total)}</b><span>${UI(g.firstYearOnly ? "p.year1" : "p.total")}, ${won(total)}</span></p>
            <div class="g-bar" role="img" aria-label="${UI("p.byyear")}">${g.years.map((y, i) => `<i style="flex:${y.amount};--o:${[1, .62, .34][i % 3]}"></i>`).join("")}</div>
            <ul class="g-years">${g.years.map((y, i) => `<li><i style="--o:${[1, .62, .34][i % 3]}"></i><b>${y.year}</b><span class="amt">${won(y.amount)}</span><span class="o">${outs(y.out).join(" · ") || UI("p.progress")}</span><span class="no">No. ${esc(y.no)}</span></li>`).join("")}</ul>
            ${Object.keys(sum).length ? `<div class="g-out">${outs(sum, true).join("")}</div>` : ""}
          </div>
        </article>`;
      }).join("");
      const services = PROJECTS.services.map((s) => `
        <article class="service">
          <div class="s-top"><p>${UI("p.consult")}</p><p class="s-when">${esc(s.period)}${s.ongoing ? `<span><i></i>${UI("p.progress")}</span>` : ""}</p></div>
          <h3>${esc(T(s.title))}</h3>
          <p class="s-ko">${sub(s.title)}</p>
          <dl class="s-meta"><dt>${UI("p.client")}</dt><dd>${esc(T(s.client))}</dd><dt>${UI("p.partners")}</dt><dd>${s.partners.map((x) => esc(T(x))).join(", ")}</dd></dl>
          <div class="s-cols">
            <div><h4>${UI("p.scope")}</h4><ul>${s.scope.map((x) => `<li>${esc(T(x))}</li>`).join("")}</ul></div>
            <div><h4>${UI("p.deliv")}</h4><ul>${s.deliverables.map((x) => `<li>${esc(T(x))}</li>`).join("")}</ul></div>
          </div>
        </article>`).join("");
      el.innerHTML = `<h3 class="p-label">${UI("p.grants")}</h3>${grants}<h3 class="p-label">${UI("p.industry")}</h3>${services}`;
    },
    pi(el) {
      el.classList.add("nophoto");
      el.innerHTML = `
        <div class="portrait" id="pi-photo" hidden></div>
        <div><p class="small" style="font-size:17px">${UI("pi.label")}</p>
          <h1 class="headline" style="margin-top:8px">${esc(PI.name)}</h1>
          ${PI.nameKo ? `<p class="sub" style="margin-top:8px">${esc(PI.nameKo)}</p>` : ""}
          <p class="sub" style="margin-top:14px">${esc(T(PI.title))}</p>
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
        <section class="group"><h2>${esc(T(g.group))}</h2><div class="people">
        ${g.people.map((p) => `
          <div class="person${p.photo ? "" : " nophoto"}">${p.photo ? `<div class="ph" style="background-image:url('${esc(p.photo)}')"></div>` : ""}
            <h3>${esc(p.name)}</h3><div class="role">${esc(p.role)}</div>
            <div class="info">${p.interests ? esc(p.interests) + "<br>" : ""}${p.position ? esc(T(p.position)) + "<br>" : ""}${p.email ? `<a href="mailto:${esc(p.email)}">${esc(p.email)}</a>` : ""}</div></div>`).join("")}
        </div></section>`).join("");
    },
    pubapp(el) {
      const years = [...new Set(pubs.map(yr))];
      const tools = $("#ptools");
      tools.innerHTML = `<div class="wrap">
        <label class="search"><svg viewBox="0 0 20 20"><circle cx="8.5" cy="8.5" r="6"/><path d="M13 13l5 5"/></svg><input type="search" placeholder="${UI("pubs.search")}" aria-label="${UI("pubs.searchA")}"></label>
        <div class="seg" role="group" aria-label="${UI("pubs.year")}"><button aria-pressed="true" data-y="">${UI("pubs.all")}</button>${years.map((y) => `<button aria-pressed="false" data-y="${y}">${y}</button>`).join("")}</div></div>`;
      const q = $("input", tools);
      let yf = "";
      const draw = () => {
        const k = q.value.trim().toLowerCase();
        const list = pubs.filter((p) => (!yf || yr(p) === yf) && (!k || (p.title + " " + p.journal).toLowerCase().includes(k)));
        const by = {};
        list.forEach((p) => (by[yr(p)] = by[yr(p)] || []).push(p));
        el.innerHTML = `<p class="ycount">${UI("pubs.count", list.length, pubs.length)}</p>` +
          (Object.keys(by).sort().reverse().map((y) => `<div class="ygroup"><h2>${y}<small>${UI("pubs.n", by[y].length)}</small></h2><ul class="rows">${by[y].map(row).join("")}</ul></div>`).join("") || `<p class="empty">${UI("pubs.none")}</p>`);
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
        : `<p class="empty">${UI("gallery.empty")}</p>`;
    },
    contact(el) {
      el.innerHTML = `<dt>${UI("contact.lab")}</dt><dd>${esc(SITE.name)}</dd><dt>${UI("contact.dept")}</dt><dd>${esc(T(SITE.department))}</dd><dt>${UI("contact.addr")}</dt><dd>${esc(T(SITE.address))}</dd><dt>${UI("contact.email")}</dt><dd><a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a></dd>${SITE.phone ? `<dt>${UI("contact.tel")}</dt><dd>${esc(SITE.phone)}</dd>` : ""}`;
      const m = $("#mail"); if (m) m.href = "mailto:" + SITE.email;
    },
    map(el) {
      el.innerHTML = `<iframe class="map" src="${esc(SITE.map)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="${UI("contact.map")}"></iframe>`;
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
  applyI18n();
})();
