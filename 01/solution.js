const fs = require("fs");
const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

/** ------------------------------------- */

const groups = raw
  .split("\n\n")
  .map((i) => i.split("\n").map((n) => parseInt(n)));

const sum = (arr) => arr.reduce((a, b) => a + b);

const sums = groups.map(sum);

const sortedDesc = sums.sort((a, b) => b - a);

/** Highest calorie */
console.log("## PART 1 ##");
console.log(sortedDesc[0]);

/** Top 3 elves calories sum */
console.log("## PART 2 ##");
console.log(sortedDesc.slice(0, 3).reduce((a, b) => a + b));
