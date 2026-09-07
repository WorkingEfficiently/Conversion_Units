/*
 * Pure unit-conversion engine.
 *
 * No DOM access here on purpose — this file is required directly by the
 * Node test suite (tests/convert-core.test.js) and loaded as a plain
 * <script> by every HTML page before script.js. Keeping the math isolated
 * from the UI means the numbers can be checked without a browser, and the
 * UI code (script.js) stays focused on rendering.
 *
 * Conversion factors are expressed as "1 unit = <factor> base units".
 * Where a factor is a legal/SI exact definition (inches, the mile, the
 * pound, atmospheres...) it's written to full precision rather than the
 * rounded values you'll see on a lot of converter sites.
 */
(function (root) {
  "use strict";

  var CATEGORIES = {
    length: {
      base: "m",
      units: {
        km: { factor: 1000, name: "Kilometer" },
        m: { factor: 1, name: "Meter" },
        cm: { factor: 0.01, name: "Centimeter" },
        mm: { factor: 0.001, name: "Millimeter" },
        um: { factor: 0.000001, name: "Micrometer" },
        mi: { factor: 1609.344, name: "Mile" },
        yd: { factor: 0.9144, name: "Yard" },
        ft: { factor: 0.3048, name: "Foot" },
        in: { factor: 0.0254, name: "Inch" },
        nmi: { factor: 1852, name: "Nautical mile" }
      }
    },
    mass: {
      base: "kg",
      units: {
        t: { factor: 1000, name: "Metric ton" },
        kg: { factor: 1, name: "Kilogram" },
        g: { factor: 0.001, name: "Gram" },
        mg: { factor: 0.000001, name: "Milligram" },
        lb: { factor: 0.45359237, name: "Pound" },
        oz: { factor: 0.028349523125, name: "Ounce" },
        st: { factor: 6.35029318, name: "Stone" },
        ton: { factor: 907.18474, name: "US ton (short)" }
      }
    },
    volume: {
      base: "L",
      units: {
        m3: { factor: 1000, name: "Cubic meter" },
        L: { factor: 1, name: "Liter" },
        mL: { factor: 0.001, name: "Milliliter" },
        gal: { factor: 3.785411784, name: "Gallon (US)" },
        qt: { factor: 0.946352946, name: "Quart (US)" },
        pt: { factor: 0.473176473, name: "Pint (US)" },
        cup: { factor: 0.2365882365, name: "Cup (US customary)" },
        floz: { factor: 0.0295735295625, name: "Fluid ounce (US)" },
        tbsp: { factor: 0.0147867647812, name: "Tablespoon (US)" },
        tsp: { factor: 0.0049289215937, name: "Teaspoon (US)" }
      }
    },
    time: {
      base: "s",
      units: {
        s: { factor: 1, name: "Second" },
        min: { factor: 60, name: "Minute" },
        h: { factor: 3600, name: "Hour" },
        d: { factor: 86400, name: "Day" },
        wk: { factor: 604800, name: "Week" },
        yr: { factor: 31557600, name: "Year (365.25 days)" }
      }
    },
    speed: {
      base: "m/s",
      units: {
        "m/s": { factor: 1, name: "Meters per second" },
        "km/h": { factor: 0.27777778, name: "Kilometers per hour" },
        mph: { factor: 0.44704, name: "Miles per hour" },
        kt: { factor: 0.51444444, name: "Knot" },
        "ft/s": { factor: 0.3048, name: "Feet per second" }
      }
    },
    temperature: {
      base: "C",
      special: true,
      units: {
        C: { name: "Celsius" },
        F: { name: "Fahrenheit" },
        K: { name: "Kelvin" }
      }
    },
    pressure: {
      base: "Pa",
      units: {
        Pa: { factor: 1, name: "Pascal" },
        kPa: { factor: 1000, name: "Kilopascal" },
        MPa: { factor: 1000000, name: "Megapascal" },
        bar: { factor: 100000, name: "Bar" },
        atm: { factor: 101325, name: "Atmosphere" },
        psi: { factor: 6894.757293168, name: "Pound-force per square inch" },
        Torr: { factor: 133.3223684, name: "Torr" }
      }
    },
    energy: {
      base: "J",
      units: {
        J: { factor: 1, name: "Joule" },
        kJ: { factor: 1000, name: "Kilojoule" },
        cal: { factor: 4.184, name: "Calorie" },
        kcal: { factor: 4184, name: "Kilocalorie" },
        Wh: { factor: 3600, name: "Watt-hour" },
        kWh: { factor: 3600000, name: "Kilowatt-hour" },
        BTU: { factor: 1055.05585262, name: "British thermal unit" }
      }
    },
    power: {
      base: "W",
      units: {
        W: { factor: 1, name: "Watt" },
        kW: { factor: 1000, name: "Kilowatt" },
        MW: { factor: 1000000, name: "Megawatt" },
        HP: { factor: 745.69987158, name: "Horsepower (mechanical)" }
      }
    },
    digital: {
      base: "B",
      units: {
        b: { factor: 0.125, name: "Bit" },
        B: { factor: 1, name: "Byte" },
        KB: { factor: 1000, name: "Kilobyte (decimal)" },
        KiB: { factor: 1024, name: "Kibibyte (binary)" },
        MB: { factor: 1000000, name: "Megabyte (decimal)" },
        MiB: { factor: 1048576, name: "Mebibyte (binary)" },
        GB: { factor: 1000000000, name: "Gigabyte (decimal)" },
        GiB: { factor: 1073741824, name: "Gibibyte (binary)" },
        TB: { factor: 1000000000000, name: "Terabyte (decimal)" },
        TiB: { factor: 1099511627776, name: "Tebibyte (binary)" }
      }
    },
    angle: {
      base: "deg",
      units: {
        deg: { factor: 1, name: "Degree" },
        rad: { factor: 57.29577951308232, name: "Radian" },
        grad: { factor: 0.9, name: "Gradian" }
      }
    }
  };

  // Order categories appear in the nav — not alphabetical, roughly by
  // how often each one gets searched.
  var CATEGORY_ORDER = [
    "length", "mass", "volume", "time", "speed",
    "temperature", "pressure", "energy", "power", "digital", "angle"
  ];

  function toCelsius(value, from) {
    if (from === "C") return value;
    if (from === "F") return (value - 32) * 5 / 9;
    return value - 273.15; // Kelvin
  }

  function fromCelsius(celsius, to) {
    if (to === "C") return celsius;
    if (to === "F") return celsius * 9 / 5 + 32;
    return celsius + 273.15; // Kelvin
  }

  function convert(categoryKey, fromUnit, value) {
    var category = CATEGORIES[categoryKey];
    if (!category) {
      throw new Error("Unknown category: " + categoryKey);
    }
    if (!Object.prototype.hasOwnProperty.call(category.units, fromUnit)) {
      throw new Error('Unknown unit "' + fromUnit + '" in category "' + categoryKey + '"');
    }

    var results = {};
    var celsius = category.special ? toCelsius(value, fromUnit) : null;

    Object.keys(category.units).forEach(function (unit) {
      if (category.special) {
        results[unit] = fromCelsius(celsius, unit);
      } else {
        var baseValue = value * category.units[fromUnit].factor;
        results[unit] = baseValue / category.units[unit].factor;
      }
    });

    return results;
  }

  function sortedUnitKeys(categoryKey) {
    var category = CATEGORIES[categoryKey];
    var keys = Object.keys(category.units);
    if (category.special) return keys;
    return keys.slice().sort(function (a, b) {
      return category.units[a].factor - category.units[b].factor;
    });
  }

  // Trims a number for display without cutting off precision that matters:
  // very small magnitudes get more decimal places, everything else gets two,
  // and trailing zeros are dropped either way.
  function formatResult(value) {
    if (!isFinite(value)) return String(value);
    var decimals = Math.abs(value) < 0.01 && value !== 0 ? 6 : 2;
    var fixed = value.toFixed(decimals);
    return fixed.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
  }

  var ConvertCore = {
    CATEGORIES: CATEGORIES,
    CATEGORY_ORDER: CATEGORY_ORDER,
    convert: convert,
    sortedUnitKeys: sortedUnitKeys,
    formatResult: formatResult
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = ConvertCore;
  } else {
    root.ConvertCore = ConvertCore;
  }
})(typeof window !== "undefined" ? window : globalThis);
