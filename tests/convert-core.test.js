/*
 * Sanity checks for convert-core.js. No test framework — this is a small
 * enough surface that plain Node `assert` is easier to read than pulling
 * in a dependency. Run with: node tests/convert-core.test.js
 */
const assert = require("assert");
const path = require("path");
const ConvertCore = require(path.join(__dirname, "..", "convert-core.js"));

let passed = 0;

function check(label, fn) {
  try {
    fn();
    passed++;
  } catch (err) {
    console.error(`FAIL: ${label}`);
    throw err;
  }
}

function close(actual, expected, epsilon, label) {
  assert(
    Math.abs(actual - expected) < epsilon,
    `${label}: expected ${expected}, got ${actual}`
  );
}

check("1 mile is exactly 1.609344 km", () => {
  const r = ConvertCore.convert("length", "mi", 1);
  close(r.km, 1.609344, 1e-9, "mi -> km");
});

check("1 inch is exactly 2.54 cm", () => {
  const r = ConvertCore.convert("length", "in", 1);
  close(r.cm, 2.54, 1e-9, "in -> cm");
});

check("length round-trips through meters", () => {
  const r = ConvertCore.convert("length", "km", 5);
  close(r.m, 5000, 1e-9, "km -> m");
  close(r.mi, 5000 / 1609.344, 1e-9, "km -> mi");
});

check("1 kg is about 2.20462 lb", () => {
  const r = ConvertCore.convert("mass", "kg", 1);
  close(r.lb, 2.2046226218, 1e-6, "kg -> lb");
});

check("1 lb is exactly 16 oz", () => {
  const r = ConvertCore.convert("mass", "lb", 1);
  close(r.oz, 16, 1e-9, "lb -> oz");
});

check("temperature: 0C is 32F and 273.15K", () => {
  const r = ConvertCore.convert("temperature", "C", 0);
  close(r.F, 32, 1e-9, "0C -> F");
  close(r.K, 273.15, 1e-9, "0C -> K");
  close(r.C, 0, 1e-9, "0C -> C");
});

check("temperature: 100C is 212F", () => {
  const r = ConvertCore.convert("temperature", "C", 100);
  close(r.F, 212, 1e-9, "100C -> F");
});

check("temperature: -40 is the same in C and F", () => {
  const r = ConvertCore.convert("temperature", "C", -40);
  close(r.F, -40, 1e-9, "-40C -> F");
});

check("temperature: absolute zero", () => {
  const r = ConvertCore.convert("temperature", "K", 0);
  close(r.C, -273.15, 1e-9, "0K -> C");
});

check("temperature conversions compose (F -> K -> F)", () => {
  const toK = ConvertCore.convert("temperature", "F", 98.6);
  const back = ConvertCore.convert("temperature", "K", toK.K);
  close(back.F, 98.6, 1e-9, "F -> K -> F");
});

check("1 US gallon is 3.785411784 liters", () => {
  const r = ConvertCore.convert("volume", "gal", 1);
  close(r.L, 3.785411784, 1e-9, "gal -> L");
});

check("1 cup is 16 tablespoons", () => {
  const r = ConvertCore.convert("volume", "cup", 1);
  close(r.tbsp, 16, 1e-6, "cup -> tbsp");
});

check("digital storage: decimal GB vs binary GiB differ", () => {
  const r = ConvertCore.convert("digital", "GB", 1);
  close(r.GiB, 1000000000 / 1073741824, 1e-9, "GB -> GiB");
  assert(Math.abs(r.GiB - 1) > 0.001, "GB and GiB must not be treated as equal");
});

check("digital storage: 1 byte is 8 bits", () => {
  const r = ConvertCore.convert("digital", "B", 1);
  close(r.b, 8, 1e-9, "B -> b");
});

check("1 atm is exactly 101325 Pa", () => {
  const r = ConvertCore.convert("pressure", "atm", 1);
  close(r.Pa, 101325, 1e-6, "atm -> Pa");
});

check("180 degrees is pi radians", () => {
  const r = ConvertCore.convert("angle", "deg", 180);
  close(r.rad, Math.PI, 1e-9, "180deg -> rad");
});

check("every category converts a unit to itself unchanged", () => {
  Object.keys(ConvertCore.CATEGORIES).forEach((cat) => {
    const firstUnit = Object.keys(ConvertCore.CATEGORIES[cat].units)[0];
    const r = ConvertCore.convert(cat, firstUnit, 7);
    close(r[firstUnit], 7, 1e-9, `${cat}:${firstUnit} self-conversion`);
  });
});

check("sortedUnitKeys returns ascending factors for non-special categories", () => {
  const keys = ConvertCore.sortedUnitKeys("length");
  const factors = keys.map((k) => ConvertCore.CATEGORIES.length.units[k].factor);
  for (let i = 1; i < factors.length; i++) {
    assert(factors[i] >= factors[i - 1], "length units should be sorted ascending");
  }
});

check("convert throws on an unknown category", () => {
  assert.throws(() => ConvertCore.convert("nope", "m", 1));
});

check("convert throws on an unknown unit", () => {
  assert.throws(() => ConvertCore.convert("length", "parsec", 1));
});

check("formatResult trims trailing zeros but keeps precision for small values", () => {
  assert.strictEqual(ConvertCore.formatResult(100), "100");
  assert.strictEqual(ConvertCore.formatResult(100.5), "100.5");
  assert.strictEqual(ConvertCore.formatResult(0.1), "0.1");
  assert.strictEqual(ConvertCore.formatResult(0.001234), "0.001234");
  assert.strictEqual(ConvertCore.formatResult(0), "0");
});

console.log(`${passed} checks passed.`);
