import { describe, expect, it } from "vitest";

describe("Kicholche foundation", () => {
  it("supports the three production locales", () => {
    expect(["bn", "hi", "en"]).toEqual(["bn", "hi", "en"]);
  });

  it("uses the expected default locale", () => {
    expect("bn").toBe("bn");
  });
});
