/* Tremenda Corporea — tiny bit of JS. Mobile nav toggle + gentle image fade-in. */
(function () {
  "use strict";

  // --- mobile nav ---------------------------------------------------------
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.textContent = open ? "close" : "menu";
      toggle.setAttribute("aria-expanded", String(open));
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.textContent = "menu";
      }
    });
  }

  // --- fade images in once they load ------------------------------------
  document.querySelectorAll("img[loading]").forEach(function (img) {
    img.style.opacity = "0";
    img.style.transition = "opacity .5s ease";
    var show = function () { img.style.opacity = "1"; };
    if (img.complete) show();
    else {
      img.addEventListener("load", show);
      img.addEventListener("error", show);
    }
  });
})();
