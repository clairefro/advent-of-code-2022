const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

/** ------------------------------------- */

// In how many assignment pairs does one range fully contain the other?

const ranges = raw.split("\n").map((r) => r.split(","));
const rangesBounds = ranges.map((r) =>
  r.map((k) => k.split("-").map((n) => parseInt(n)))
);

/** Return index of fully contained bounds (0 or 1). Null if neither fully contains the other */
/** ex boundsArr: [ [ 37, 84 ], [ 25, 35 ] ] */
const findIndexFullyContained = (boundsArr) => {
  /** first elf contains range of second */
  if (
    boundsArr[0][0] <= boundsArr[1][0] &&
    boundsArr[0][1] >= boundsArr[1][1]
  ) {
    return 0;
  }
  /** second elf contains range of first */
  if (
    boundsArr[1][0] <= boundsArr[0][0] &&
    boundsArr[1][1] >= boundsArr[0][1]
  ) {
    return 1;
  }
  /** No fully contained */
  return null;
};

const indexesFullyContained = rangesBounds.map(findIndexFullyContained);
const fullContainedCount = indexesFullyContained
  .map((i) => (Number.isInteger(i) ? 1 : 0))
  .reduce((a, b) => a + b);

console.log("## PART 1 ##");
console.log(fullContainedCount);

/** PART 2 */

/** ex: [1,3] => [1,2,3] */
const range = (bounds) => {
  let _range = [];
  let length = bounds[1] - bounds[0];
  let cur = bounds[0];
  for (let i = 0; i <= length; i++) {
    _range.push(cur + i);
  }
  return _range;
};

const isOverlap = (boundsArr) => {
  let overlap = false;
  const ranges = boundsArr.map(range);
  if (ranges[0].some((i) => ranges[1].includes(i))) {
    overlap = true;
  }
  return overlap;
};

const overlaps = rangesBounds.map(isOverlap);

console.log("## PART 2 ##");
console.log(overlaps.filter((o) => !!o).length);
