/*
 * UI glue for the converter. The actual math lives in convert-core.js and
 * the per-language text lives in translations.js — both are loaded before
 * this file in every page, so ConvertCore/I18N are already on window by
 * the time this runs.
 */
(function () {
  "use strict";

  var locale = (document.documentElement.lang || "en").toLowerCase();
  var t = (window.I18N && window.I18N[locale]) || window.I18N.en;

  var STORAGE_KEY = "unitconverter:lastChoice";

  var els = {
    categories: document.getElementById("categories"),
    fromUnits: document.getElementById("fromUnits"),
    input: document.getElementById("inputValue"),
    results: document.getElementById("results"),
    allUnits: document.getElementById("allUnits"),
    allUnitsSearch: document.getElementById("allUnitsSearch"),
    year: document.getElementById("year")
  };

  var state = restoreState();

  function restoreState() {
    var fallback = { category: ConvertCore.CATEGORY_ORDER[0], unit: null };
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (saved && ConvertCore.CATEGORIES[saved.category]) {
        return saved;
      }
    } catch (err) {
      // localStorage can be unavailable (private browsing, etc.) — not worth failing over
    }
    return fallback;
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      // ignore — this is a nice-to-have, not a requirement
    }
  }

  function categoryLabel(key) {
    return (t.categories && t.categories[key]) || key;
  }

  function buildCategoryButtons() {
    els.categories.innerHTML = "";

    ConvertCore.CATEGORY_ORDER.forEach(function (key) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-btn";
      btn.textContent = categoryLabel(key);
      btn.dataset.category = key;
      btn.setAttribute("aria-pressed", String(key === state.category));

      btn.addEventListener("click", function () {
        state.category = key;
        state.unit = ConvertCore.sortedUnitKeys(key)[0];
        buildFromUnitButtons();
        highlightCategoryButtons();
        renderResults();
        saveState();
      });

      els.categories.appendChild(btn);
    });

    highlightCategoryButtons();
  }

  function highlightCategoryButtons() {
    els.categories.querySelectorAll(".category-btn").forEach(function (btn) {
      var active = btn.dataset.category === state.category;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }

  function buildFromUnitButtons() {
    els.fromUnits.innerHTML = "";

    var unitKeys = ConvertCore.sortedUnitKeys(state.category);
    if (!unitKeys.includes(state.unit)) {
      state.unit = unitKeys[0];
    }

    var unitMeta = ConvertCore.CATEGORIES[state.category].units;

    unitKeys.forEach(function (unit) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "unit-btn";
      btn.textContent = unit;
      btn.title = unitMeta[unit].name;
      btn.dataset.unit = unit;

      btn.addEventListener("click", function () {
        state.unit = unit;
        highlightFromUnitButtons();
        renderResults();
        saveState();
      });

      els.fromUnits.appendChild(btn);
    });

    highlightFromUnitButtons();
  }

  function highlightFromUnitButtons() {
    els.fromUnits.querySelectorAll(".unit-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.unit === state.unit);
    });
  }

  function renderResults() {
    var value = parseFloat(els.input.value);
    els.results.innerHTML = "";

    if (isNaN(value)) return;

    var results = ConvertCore.convert(state.category, state.unit, value);
    var unitMeta = ConvertCore.CATEGORIES[state.category].units;

    ConvertCore.sortedUnitKeys(state.category).forEach(function (unit) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "result-card";
      card.title = unitMeta[unit].name;

      var display = ConvertCore.formatResult(results[unit]) + " " + unit;
      card.textContent = display;

      card.addEventListener("click", function () {
        copyToClipboard(display, card);
      });

      els.results.appendChild(card);
    });
  }

  function copyToClipboard(text, anchorEl) {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(text).then(function () {
      showToast(anchorEl);
    }, function () {
      // clipboard permission denied or unsupported context — fail quietly
    });
  }

  function showToast(anchorEl) {
    var toast = document.createElement("span");
    toast.className = "copy-toast";
    toast.textContent = t.ui.copied;
    anchorEl.appendChild(toast);
    window.setTimeout(function () {
      toast.remove();
    }, 900);
  }

  function buildQuickAccessUnits() {
    els.allUnits.innerHTML = "";

    ConvertCore.CATEGORY_ORDER.forEach(function (category) {
      var unitMeta = ConvertCore.CATEGORIES[category].units;

      ConvertCore.sortedUnitKeys(category).forEach(function (unit) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "unit-btn";
        btn.textContent = unit;
        btn.title = categoryLabel(category) + " — " + unitMeta[unit].name;

        btn.addEventListener("click", function () {
          state.category = category;
          state.unit = unit;
          buildFromUnitButtons();
          highlightCategoryButtons();
          renderResults();
          saveState();
          els.input.focus();
        });

        els.allUnits.appendChild(btn);
      });
    });
  }

  function wireQuickAccessSearch() {
    els.allUnitsSearch.addEventListener("input", function () {
      var term = els.allUnitsSearch.value.trim().toLowerCase();
      els.allUnits.querySelectorAll(".unit-btn").forEach(function (btn) {
        var matches = !term ||
          btn.textContent.toLowerCase().includes(term) ||
          btn.title.toLowerCase().includes(term);
        btn.hidden = !matches;
      });
    });
  }

  function init() {
    if (!state.unit) {
      state.unit = ConvertCore.sortedUnitKeys(state.category)[0];
    }

    buildCategoryButtons();
    buildFromUnitButtons();
    buildQuickAccessUnits();
    wireQuickAccessSearch();
    renderResults();

    els.input.addEventListener("input", renderResults);

    if (els.year) {
      els.year.textContent = String(new Date().getFullYear());
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
