/* =========================================================
   main.js —— 页面渲染与交互
   职责：渲染精选项目与作品列表 / 汉堡菜单 / 顶部导航状态
        / 滚动显现动效 / 当前栏目高亮 / 页脚年份
   ========================================================= */
(function () {
  "use strict";

  /* ------------------------------ 工具函数 ------------------------------ */
  // 简单 HTML 转义，避免数据中的特殊字符破坏结构
  const esc = (v) =>
    String(v)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const pad2 = (n) => String(n).padStart(2, "0");

  // 项目列表的三种版式节奏，按序循环
  const LAYOUTS = ["work--a", "work--b", "work--c"];

  /* ------------------------------ 模板片段 ------------------------------ */
  // 元信息（完成时间 / 类别 / 角色）
  function metaList(p) {
    const rows = [
      ["完成时间", p.date],
      ["类别", p.category]
    ];
    if (p.role) rows.push(["角色", p.role]);
    return `<dl class="work-meta">${rows
      .map(([t, d]) => `<div><dt>${esc(t)}</dt><dd>${esc(d)}</dd></div>`)
      .join("")}</dl>`;
  }

  /* ------------------------------ 渲染：精选项目 ------------------------------ */
  function renderFeatured(p) {
    document.getElementById("featuredSlot").innerHTML = `
      <article class="featured-project reveal" data-category="${esc(p.category)}">
        <div class="featured-media">
          <figure class="featured-figure">
            <img src="${p.image}" alt="${esc(p.imageAlt)}">
          </figure>
          <span class="featured-num" aria-hidden="true">01</span>
        </div>
        <div class="featured-body">
          <div class="work-head">
            <span class="chip chip--${p.color}">${esc(p.category)}</span>
            <span class="work-flag">精选 FEATURED</span>
          </div>
          <h3 class="featured-title">${esc(p.name)}</h3>
          <p class="work-intro">${esc(p.intro)}</p>
          <div class="featured-foot">
            <p class="work-stack">${esc(p.stack.join(" / "))}</p>
            ${metaList(p)}
            <a class="work-link" href="${esc(p.link)}">查看项目详情<i>→</i></a>
          </div>
        </div>
      </article>`;
  }

  /* ------------------------------ 渲染：作品列表 ------------------------------ */
  function renderWorks(list) {
    document.getElementById("worksList").innerHTML = list
      .map((p, i) => {
        const num = pad2(i + 2); // 01 已被精选项目占用
        const layout = LAYOUTS[i % LAYOUTS.length];
        return `
        <article class="work ${layout} reveal" data-category="${esc(p.category)}">
          <figure class="work-figure">
            <img src="${p.image}" alt="${esc(p.imageAlt)}" loading="lazy">
          </figure>
          <div class="work-body">
            <div class="work-head">
              <span class="work-num" aria-hidden="true">${num}</span>
              <span class="chip chip--${p.color}">${esc(p.category)}</span>
            </div>
            <h3 class="work-title">${esc(p.name)}</h3>
            <p class="work-intro">${esc(p.intro)}</p>
            <p class="work-stack">${esc(p.stack.join(" / "))}</p>
            ${metaList(p)}
            <a class="work-link" href="${esc(p.link)}">查看详情<i>→</i></a>
          </div>
        </article>`;
      })
      .join("");
  }

  if (Array.isArray(PROJECTS) && PROJECTS.length) {
    renderFeatured(PROJECTS[0]);
    renderWorks(PROJECTS.slice(1));
  }

  /* ------------------------------ 顶部导航：滚动状态 ------------------------------ */
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------ 移动端汉堡菜单 ------------------------------ */
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");

  function setMenu(open) {
    toggle.classList.toggle("is-open", open);
    menu.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
  }
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  // 点击菜单中的链接后自动收起
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setMenu(false))
  );

  /* ------------------------------ 导航「作品」类别下拉 ------------------------------ */
  // 桌面端悬停/聚焦「作品」展开类别菜单，点击类别平滑滚动到对应项目
  document.querySelectorAll("#worksDropdown [data-category]").forEach((a) => {
    a.addEventListener("click", (e) => {
      const cat = a.getAttribute("data-category");
      const target = document.querySelector(
        `.featured-project[data-category="${cat}"], .work[data-category="${cat}"]`
      );
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* ------------------------------ 滚动显现动效 ------------------------------ */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    // 兜底：不支持时直接显示
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ------------------------------ 当前栏目高亮 ------------------------------ */
  const navLinks = document.querySelectorAll(".main-nav .nav-link, .mobile-menu nav a");
  const linkMap = {};
  navLinks.forEach((a) => {
    const id = a.getAttribute("href").slice(1);
    (linkMap[id] = linkMap[id] || []).push(a);
  });

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          document.querySelectorAll(".nav-link.is-active").forEach((el) =>
            el.classList.remove("is-active")
          );
          (linkMap[e.target.id] || []).forEach((a) => a.classList.add("is-active"));
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    Object.keys(linkMap).forEach((id) => {
      const sec = document.getElementById(id);
      if (sec) sectionObserver.observe(sec);
    });
  }

  /* ------------------------------ 页脚年份 ------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
