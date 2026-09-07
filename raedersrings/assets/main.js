/* Raeder's Rings — small progressive enhancements. Site works fully without JS. */
(function () {
  "use strict";

  // Sticky header hairline
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile nav
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    var mq = window.matchMedia("(max-width: 820px)");
    var sync = function () {
      if (mq.matches) {
        links.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      } else {
        links.hidden = false;
      }
    };
    sync();
    mq.addEventListener("change", sync);

    toggle.addEventListener("click", function () {
      var open = links.hidden;
      links.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && mq.matches) {
        links.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Reveal on scroll
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Quote form: post to a configured endpoint, otherwise fall back to a
  // pre-filled email. Set data-endpoint on the <form> to enable posting.
  var form = document.querySelector("form[data-quote-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      var endpoint = form.getAttribute("data-endpoint");
      if (endpoint) return; // let the browser POST normally

      e.preventDefault();
      var data = new FormData(form);
      if (data.get("company")) return; // honeypot tripped

      var lines = [];
      data.forEach(function (value, key) {
        if (key === "company" || !String(value).trim()) return;
        lines.push(key.replace(/_/g, " ") + ": " + value);
      });

      var to = form.getAttribute("data-mailto") || "hello@raedersrings.com";
      var subject = "Custom ring inquiry — " + (data.get("name") || "new request");
      window.location.href =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));
    });
  }

  // Footer year
  var year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
})();
