import { describe, expect, it } from "vitest";
import { createTranslator } from "../src/services/translator";

describe("createTranslator (@veap/intl)", () => {
  const messages = {
    common: {
      welcome: "Welcome, {name}!",
      farewell: "Goodbye!",
      apples: "{count, plural, =0 {No apples} =1 {One apple} other {# apples}}",
    },
  };

  it("translates simple keys", () => {
    const { t } = createTranslator({ locale: "en", messages });
    expect(t("common.farewell")).toBe("Goodbye!");
  });

  it("interpolates parameters", () => {
    const { t } = createTranslator({ locale: "en", messages });
    expect(t("common.welcome", { name: "John" })).toBe("Welcome, John!");
  });

  it("handles ICU pluralization", () => {
    const { t } = createTranslator({ locale: "en", messages });
    expect(t("common.apples", { count: 0 })).toBe("No apples");
    expect(t("common.apples", { count: 1 })).toBe("One apple");
    expect(t("common.apples", { count: 5 })).toBe("5 apples");
  });

  it("falls back to key when missing", () => {
    const { t } = createTranslator({ locale: "en", messages });
    expect(t("common.missing_key")).toBe("common.missing_key");
  });
});
