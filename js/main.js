/* =====================================================================
   Tang Software LLC — site behaviour
   Vanilla JS, no dependencies. Progressive enhancement only:
   every page works with JS disabled; this just adds polish.
   ===================================================================== */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---------------------------------------- */
  var toggle = document.querySelector(".nav-toggle");
  var panel = document.getElementById("nav-panel");
  if (toggle && panel) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      panel.classList.toggle("is-open", !open);
    });
    // Close the menu when a link is tapped (mobile).
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        panel.classList.remove("is-open");
      }
    });
    // Reset state when crossing the desktop breakpoint.
    var mq = window.matchMedia("(min-width: 880px)");
    var sync = function () {
      if (mq.matches) {
        panel.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    };
    mq.addEventListener ? mq.addEventListener("change", sync) : mq.addListener(sync);
  }

  /* ---- Footer year ---------------------------------------------- */
  var yearEls = document.querySelectorAll("[data-year]");
  if (yearEls.length) {
    var y = String(new Date().getFullYear());
    yearEls.forEach(function (el) { el.textContent = y; });
  }

  /* ---- Reveal on scroll ----------------------------------------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length) {
    if ("IntersectionObserver" in window &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      // No IO or reduced motion: show everything immediately.
      reveals.forEach(function (el) { el.classList.add("in"); });
    }
  }

  /* ---- Contact / notify forms (mailto, no backend) -------------- */
  document.querySelectorAll("form[data-mailto]").forEach(function (form) {
    var status = form.querySelector("[data-form-status]");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var to = form.getAttribute("data-mailto");
      var subjectTpl = form.getAttribute("data-subject") || "Website enquiry";
      var get = function (name) {
        var f = form.elements[name];
        return f ? String(f.value).trim() : "";
      };

      var lines = [];
      ["name", "email", "topic", "platform", "game"].forEach(function (key) {
        var v = get(key);
        if (v) lines.push(key.charAt(0).toUpperCase() + key.slice(1) + ": " + v);
      });
      var message = get("message");
      if (message) lines.push("", message);

      var subject = subjectTpl;
      if (get("topic")) subject += " — " + get("topic");

      var href = "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(lines.join("\n"));

      window.location.href = href;

      if (status) {
        status.hidden = false;
        status.textContent =
          "Opening your email app… if nothing happens, email us directly at " + to + ".";
      }
    });
  });

  /* ---- Current-year-safe external link safety ------------------- */
  document.querySelectorAll('a[target="_blank"]').forEach(function (a) {
    var rel = a.getAttribute("rel") || "";
    if (rel.indexOf("noopener") === -1) {
      a.setAttribute("rel", (rel + " noopener noreferrer").trim());
    }
  });
})();
