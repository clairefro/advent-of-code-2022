const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

/** ------------------------------------- */

const inputs = raw.split("\n\n");
const dockRaw = inputs[0];
const opsRaw = inputs[1].split("\n");

/** PART 1 */

// Find the top crates after all ops complete

const rows = dockRaw.split("\n");

/** Calculate stack number based on char index in row,
 *  assuming crate slots are 4 chars wide */
const indexToStackNum = (_rowLength, index) => {
  const CRATE_WIDTH = 4;
  const raw = Math.ceil(
    (index / _rowLength) * Math.ceil(_rowLength / CRATE_WIDTH)
  );
  return raw === 0 ? 1 : raw;
};

/** Maps crates { 1: ['A','B','C'] ... } */
const toCreatesMap = (_rows) => {
  let map = {};
  // assumes uniform row length
  const rowLength = _rows[0].length;

  _rows.forEach((r) => {
    r.split("").forEach((char, i) => {
      if (char.match(/[A-Z]/)) {
        const stackNum = indexToStackNum(rowLength, i);
        if (!map[stackNum]) map[stackNum] = [];
        map[stackNum].unshift(char);
      }
    });
  });
  return map;
};

/** Return format: [# crates, [from, to]] */
const parseOps = (op) => {
  const parts = op.split(" ");
  return [parseInt(parts[1]), [parts[3], parts[5]]];
};

/** Get the crates that will be moved, in their reverse stack order or mimic 1 by 1 removal */
const selectCrates = (crateMap, stackNum, loadSize, mode) => {
  const stack = [...crateMap[stackNum]];
  const selected = stack.splice(stack.length - loadSize, stack.length);
  if (mode === 0) {
    /** Move crates 1 by 1 - reverse stack order */
    return selected.reverse();
  }

  return selected;
};

/** Mutates crates map */
const removeCrates = (cratesMap, stackNum, loadSize) => {
  cratesMap[stackNum] = cratesMap[stackNum].slice(
    0,
    cratesMap[stackNum].length - loadSize
  );
};

/** Mutates crates map */
const addCrates = (cratesMap, stackNum, load) => {
  cratesMap[stackNum] = cratesMap[stackNum].concat(load);
};

/** Mutate cratesMap with ops */
/** mode 0 = move crates one by one (reverse stack order) */
/** mode 1 = move crates in bulk (normal stack order) */
const execOp = (op, cratesMap, mode = 0) => {
  const loadSize = op[0];
  const fromStack = op[1][0];
  const toStack = op[1][1];

  const load = selectCrates(cratesMap, fromStack, loadSize, mode);
  removeCrates(cratesMap, fromStack, loadSize);
  addCrates(cratesMap, toStack, load);
};

const mainCratesMap = toCreatesMap(rows);
const mainCratesMapCopy = { ...mainCratesMap };
const parsedOps = opsRaw.map(parseOps);

// console.log({ start: mainCratesMap });

let opsCnt = 0;
parsedOps.forEach((o) => {
  execOp(o, mainCratesMap, 0);
  opsCnt++;
});

// console.log({ final: mainCratesMap });

console.log("## PART 1 ##");
console.log(`Top crates after ${opsCnt} ops (move crates 1by1):`);
console.log(
  Object.values(mainCratesMap)
    .map((arr) => arr[arr.length - 1])
    .join("")
);

console.log("## PART 2 ##");
opsCnt = 0;
parsedOps.forEach((o) => {
  execOp(o, mainCratesMapCopy, 1);
  opsCnt++;
});
console.log(`Top crates after ${opsCnt} ops (move crates in bulk):`);
console.log(
  Object.values(mainCratesMapCopy)
    .map((arr) => arr[arr.length - 1])
    .join("")
);
