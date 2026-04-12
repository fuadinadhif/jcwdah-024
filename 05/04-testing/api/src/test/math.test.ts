import { describe, it, expect } from "vitest";
import { add } from "../utils/math.js";

// test suite
describe("Math add function", () => {
  // test case
  it("should add numbers", () => {
    expect(add(11, 3)).toBe(14);
  });

  it("should add numbers", () => {
    expect(add(0, -5)).toBe(-5);
  });

  it("should add numbers", () => {
    expect(add(100, 0.5)).toBe(100.5);
  });

  it("should return NaN when one of the parameter is not number", () => {
    // @ts-expect-error
    expect(add(10, "tiga")).toBeNaN();
  });
});
