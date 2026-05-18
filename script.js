// Bergmann Law Firm — site interactions
(function () {
  "use strict";

  // ---------- Mobile nav toggle ----------
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector(".primary-nav");
  const menu = document.querySelector("[data-nav-menu]");

  if (toggle && nav && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close after clicking a nav link
    menu.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });

    // Close on Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // ---------- Sticky-header shadow on scroll ----------
  const header = document.querySelector("[data-header]");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---------- Forms: client-side feedback only ----------
  document.querySelectorAll("[data-form]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const status = form.querySelector(".form-status");
      const required = form.querySelectorAll("[required]");
      let missing = null;
      required.forEach((el) => {
        if (!el.value || (el.tagName === "SELECT" && el.selectedIndex <= 0)) {
          if (!missing) missing = el;
        }
      });
      if (missing) {
        missing.focus();
        if (status) {
          status.textContent = "Please fill in the highlighted fields.";
          status.classList.remove("is-success");
        }
        return;
      }
      if (status) {
        status.textContent = "Thanks — we've received your request and will be in touch shortly.";
        status.classList.add("is-success");
      }
      form.reset();
    });
  });

  // ---------- Year ----------
  const yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Single-open FAQ (optional polish) ----------
  const faq = document.querySelector("[data-faq]");
  if (faq) {
    faq.addEventListener("toggle", (e) => {
      const target = e.target;
      if (!(target instanceof HTMLDetailsElement) || !target.open) return;
      faq.querySelectorAll("details[open]").forEach((d) => {
        if (d !== target) d.open = false;
      });
    }, true);
  }
})();
