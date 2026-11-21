import assert from "node:assert/strict";
import test from "node:test";
import { normalizeLanguage, pickLang } from "../lib/pickLang.ts";

test("normalizes language aliases and rejects unsupported codes", () => {
  assert.equal(normalizeLanguage("ms"), "ms-MY");
  assert.equal(normalizeLanguage("zh"), "zh-CN");
  assert.equal(normalizeLanguage("ru"), "ru");
  assert.equal(normalizeLanguage("xx"), undefined);
});

test("uses the configured zh-CN and ru fallback order", () => {
  const map = { id: "Indonesian", en: "English" };

  assert.equal(pickLang(map, "zh-CN"), "English");
  assert.equal(pickLang(map, "ru"), "English");
});

test("uses Indonesian before English for ms-MY", () => {
  assert.equal(pickLang({ id: "Indonesian", en: "English" }, "ms-MY"), "Indonesian");
});

test("falls back to Indonesian for other languages", () => {
  assert.equal(pickLang({ id: "Indonesian", ja: "Japanese" }, "ja"), "Japanese");
  assert.equal(pickLang({ id: "Indonesian" }, "en"), "Indonesian");
});

test("throws when no translation exists in the fallback chain", () => {
  assert.throws(() => pickLang({}, "ru"), /No translation available/);
});
