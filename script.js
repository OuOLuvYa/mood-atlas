(function () {
  "use strict";

  const entries = Array.isArray(window.MOOD_ENTRIES) ? window.MOOD_ENTRIES : [];
  const homeView = document.querySelector("#home-view");
  const detailView = document.querySelector("#detail-view");
  const cardGrid = document.querySelector("#card-grid");
  const resultCount = document.querySelector("#result-count");
  const filters = [...document.querySelectorAll(".filter")];

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderCards(category = "全部") {
    const visibleEntries = category === "全部"
      ? entries
      : entries.filter((entry) => entry.category === category);

    resultCount.textContent = `顯示 ${visibleEntries.length} 張心情卡`;

    if (visibleEntries.length === 0) {
      cardGrid.innerHTML = '<div class="empty-state"><p>目前還沒有這個類別的心情卡。</p></div>';
      return;
    }

    cardGrid.innerHTML = visibleEntries.map((entry) => `
      <a class="mood-card" href="#mood/${encodeURIComponent(entry.id)}">
        <div class="card-top">
          <span class="card-symbol" style="background-color: ${escapeHtml(entry.color)}" aria-hidden="true">${escapeHtml(entry.symbol)}</span>
          <span class="category">${escapeHtml(entry.category)}</span>
        </div>
        <h3>${escapeHtml(entry.title)}</h3>
        <p>${escapeHtml(entry.subtitle)}</p>
        <span class="card-link">打開這張卡 <span aria-hidden="true">→</span></span>
      </a>
    `).join("");
  }

  function renderDetail(entry) {
    document.title = `${entry.title}｜心情調頻所`;
    homeView.hidden = true;
    detailView.hidden = false;
    detailView.innerHTML = `
      <a class="back-link" href="#explore"><span aria-hidden="true">←</span> 回到心情圖鑑</a>
      <article>
        <header class="detail-hero" style="--mood-color: ${escapeHtml(entry.color)}">
          <div>
            <span class="detail-symbol" aria-hidden="true">${escapeHtml(entry.symbol)}</span>
            <span class="category">${escapeHtml(entry.category)}</span>
          </div>
          <h1 tabindex="-1">${escapeHtml(entry.title)}</h1>
          <p>${escapeHtml(entry.subtitle)}</p>
        </header>
        <div class="detail-grid">
          <section class="detail-panel">
            <p class="eyebrow">可能的線索</p>
            <h2>也許你正經歷……</h2>
            <ul>${entry.signs.map((sign) => `<li>${escapeHtml(sign)}</li>`).join("")}</ul>
          </section>
          <section class="detail-panel">
            <p class="duration">${escapeHtml(entry.practice.duration)}</p>
            <h2>${escapeHtml(entry.practice.title)}</h2>
            <ol>${entry.practice.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
          </section>
          <section class="detail-panel reflection-panel">
            <h2>留一個問題</h2>
            <p>「${escapeHtml(entry.reflection)}」</p>
          </section>
          <p class="gentle-note">${escapeHtml(entry.note)}</p>
        </div>
      </article>
    `;
    window.scrollTo({ top: 0, behavior: "auto" });
    detailView.querySelector("h1").focus({ preventScroll: true });
  }

  function showHome(anchor) {
    document.title = "心情調頻所 Mood Atlas";
    detailView.hidden = true;
    detailView.innerHTML = "";
    homeView.hidden = false;

    if (anchor && anchor !== "home") {
      requestAnimationFrame(() => document.getElementById(anchor)?.scrollIntoView());
    }
  }

  function route() {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    if (hash.startsWith("mood/")) {
      const entry = entries.find((item) => item.id === hash.slice(5));
      if (entry) {
        renderDetail(entry);
        return;
      }
    }
    showHome(hash || "home");
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => {
        const isSelected = item === button;
        item.classList.toggle("is-active", isSelected);
        item.setAttribute("aria-pressed", String(isSelected));
      });
      renderCards(button.dataset.filter);
    });
  });

  renderCards();
  window.addEventListener("hashchange", route);
  route();
})();

