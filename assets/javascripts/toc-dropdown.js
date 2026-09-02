(function () {
  var dropdownSelector = ".md-nav--secondary [data-md-component='toc']";

  function directChild(parent, selector) {
    return Array.prototype.find.call(parent.children, function (child) {
      return child.matches(selector);
    });
  }

  function setExpanded(item, link, expanded) {
    item.classList.toggle("toc-dropdown-collapsed", !expanded);
    link.setAttribute("aria-expanded", String(expanded));
  }

  function itemContainsHash(item, hash) {
    if (!hash) {
      return false;
    }

    return Boolean(item.querySelector("a[href='" + hash + "']"));
  }

  function scrollToHash(hash) {
    var id = decodeURIComponent(hash.slice(1));
    var target = document.getElementById(id);

    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function initTocDropdowns() {
    var toc = document.querySelector(dropdownSelector);

    if (!toc) {
      return;
    }

    var items = Array.prototype.filter.call(toc.children, function (item) {
      var link = directChild(item, "a.md-nav__link");
      var childNav = directChild(item, "nav.md-nav");

      return link && childNav && /^Aula\s+\d+/i.test(link.textContent.trim());
    });

    items.forEach(function (item, index) {
      var link = directChild(item, "a.md-nav__link");
      var childNav = directChild(item, "nav.md-nav");
      var navId = childNav.id || "toc-dropdown-" + index;

      childNav.id = navId;
      item.classList.add("toc-dropdown-item");
      link.classList.add("toc-dropdown-toggle");
      link.setAttribute("aria-controls", navId);

      if (!link.querySelector(".toc-dropdown-icon")) {
        var icon = document.createElement("span");
        icon.className = "toc-dropdown-icon";
        icon.setAttribute("aria-hidden", "true");
        link.appendChild(icon);
      }

      if (item.dataset.tocDropdownReady === "true") {
        return;
      }

      item.dataset.tocDropdownReady = "true";
      setExpanded(item, link, itemContainsHash(item, window.location.hash));

      link.addEventListener("click", function (event) {
        if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        event.preventDefault();

        var expanded = item.classList.contains("toc-dropdown-collapsed");
        setExpanded(item, link, expanded);

        if (expanded) {
          var hash = link.getAttribute("href");
          window.history.pushState(null, "", hash);
          scrollToHash(hash);
        }
      });

      link.addEventListener("keydown", function (event) {
        if (event.key === " ") {
          event.preventDefault();
          link.click();
        }
      });
    });
  }

  function openDropdownForHash() {
    var toc = document.querySelector(dropdownSelector);

    if (!toc) {
      return;
    }

    Array.prototype.forEach.call(toc.querySelectorAll(".toc-dropdown-item"), function (item) {
      var link = directChild(item, "a.md-nav__link");

      if (itemContainsHash(item, window.location.hash)) {
        setExpanded(item, link, true);
      }
    });
  }

  if (typeof document$ !== "undefined") {
    document$.subscribe(initTocDropdowns);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTocDropdowns);
  } else {
    initTocDropdowns();
  }

  window.addEventListener("hashchange", openDropdownForHash);
})();
