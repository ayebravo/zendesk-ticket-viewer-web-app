const asert = require("chai").assert;
const formatter = require("../services/formatter");

const timestamp = "2020-11-08T21:26:05Z";
const invalidDate = "Invalid date";

describe("services", () => {
  it("return date in local time zone", () => {
    let result = formatter.formatDate(timestamp);
    asert.equal(result, "Nov 8, 2020 3:26 PM");
  });

  it("handle error", () => {
    let result = formatter.formatDate("");
    console.log(result);
    asert.equal(result, invalidDate);
  });
});
