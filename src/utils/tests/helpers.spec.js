import { calculate } from "../helpers";

describe("fraction calculating", function() {
  it("should add two fractions", function() {
    expect(
      calculate(
        [{ numerator: 1, denominator: 2 }, { numerator: 1, denominator: 3 }],
        ["+"]
      )
    ).toEqual({ numerator: 5, denominator: 6 });
  });
  it("should add three fractions", function() {
    expect(
      calculate(
        [
          { numerator: 1, denominator: 2 },
          { numerator: 1, denominator: 3 },
          { numerator: -1, denominator: 3 }
        ],
        ["+", "+"]
      )
    ).toEqual({ numerator: 1, denominator: 2 });
  });
  it("should subtract three fractions", function() {
    expect(
      calculate(
        [
          { numerator: 5, denominator: 12 },
          { numerator: 24, denominator: 5 },
          { numerator: -10, denominator: -11 }
        ],
        ["-", "-"]
      )
    ).toEqual({ numerator: 3493, denominator: -660 });
  });
  it("should add and subtract three fractions", function() {
    expect(
      calculate(
        [
          { numerator: 5, denominator: 12 },
          { numerator: 24, denominator: 5 },
          { numerator: -10, denominator: -11 }
        ],
        ["+", "-"]
      )
    ).toEqual({ numerator: 2843, denominator: 660 });
  });
  it("should apply all operations on four fractions", function() {
    expect(
      calculate(
        [
          { numerator: 5, denominator: 12 },
          { numerator: 24, denominator: 5 },
          { numerator: -10, denominator: -11 },
          { numerator: 287, denominator: 29 },
          { numerator: 19, denominator: 1999 }
        ],
        ["+", "-", "/", "*"]
      )
    ).toEqual({ numerator: 1566493, denominator: 378650580 });
  });
  it("should multiply on zero", function() {
    expect(
      calculate(
        [
          { numerator: 5, denominator: 12 },
          { numerator: 24, denominator: 5 },
          { numerator: -10, denominator: -11 },
          { numerator: 287, denominator: 29 },
          { numerator: 0, denominator: 1999 }
        ],
        ["+", "-", "/", "*"]
      )
    ).toEqual({ numerator: 0, denominator: 1 });
  });
});
