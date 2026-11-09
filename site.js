(function () {
  var items = document.querySelectorAll(".reveal");

  function showAll() {
    var i;
    for (i = 0; i < items.length; i++) items[i].classList.add("is-in");
  }

  window.setTimeout(showAll, 1600);

  try {
    var btn = document.querySelector(".menu-btn");
    var nav = document.getElementById("site-nav");
    var backdrop = document.querySelector(".nav-backdrop");
    var word = btn && btn.querySelector(".menu-word");
    var wideQuery = window.matchMedia("(min-width: 800px)");

    function setOpen(open) {
      if (!btn || !nav) return;
      if (wideQuery.matches) open = false;
      nav.classList.toggle("is-open", open);
      btn.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      if (word) word.textContent = open ? "Close" : "Menu";
      if (backdrop) backdrop.hidden = !open;
    }

    if (btn && nav) {
      btn.addEventListener("click", function () {
        setOpen(!nav.classList.contains("is-open"));
      });
      if (backdrop) {
        backdrop.addEventListener("click", function () {
          setOpen(false);
          btn.focus();
        });
      }
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && nav.classList.contains("is-open")) {
          setOpen(false);
          btn.focus();
        }
      });
      nav.addEventListener("click", function (e) {
        if (e.target.closest && e.target.closest("a")) setOpen(false);
      });
      if (wideQuery.addEventListener) {
        wideQuery.addEventListener("change", function () { setOpen(false); });
      }
      document.documentElement.classList.add("js");
    }
  } catch (menuErr) {
    // Leave the links visible if the menu cannot start.
  }

  var reduce = false;
  try {
    reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    reduce = true;
  }

  if (reduce || !items.length || !("IntersectionObserver" in window)) {
    showAll();
    return;
  }

  try {
    var io = new IntersectionObserver(function (entries) {
      var n;
      for (n = 0; n < entries.length; n++) {
        if (!entries[n].isIntersecting) continue;
        entries[n].target.classList.add("is-in");
        io.unobserve(entries[n].target);
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -4% 0px" });
    var j;
    for (j = 0; j < items.length; j++) io.observe(items[j]);
    document.documentElement.classList.add("motion");
  } catch (err) {
    showAll();
  }
})();
