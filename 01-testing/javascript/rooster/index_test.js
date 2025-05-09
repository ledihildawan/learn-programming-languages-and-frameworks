const assert = require("assert");
const Rooster = require("./index");

describe("Rooster", () => {
  describe(".announceDawn", () => {
    it("returns a rooster call", () => {
      const expected = "cock-a-doodle-doo!";

      const result = Rooster.announceDawn();

      assert.strictEqual(result, expected);
    });
  });

  describe(".timeAtDawn", () => {
    it("returns its argument as string", () => {
      const expected = "14";

      const results = Rooster.timeAtDawn(14);

      assert.strictEqual(results, expected);
    });

    it("throws an error if passed a number less than 0", () => {
      assert.throws(() => Rooster.timeAtDawn(-1), RangeError);
    });

    it("throws an error if passed a number greater than 23", () => {
      assert.throws(() => Rooster.timeAtDawn(24), RangeError);
    });
  });
});
