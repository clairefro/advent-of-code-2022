const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

/** ------------------------------------- */

/** PART 1 */

// first half of the characters represent items in the first compartment
// second half of the characters represent items in the second compartment

// Lowercase item types a through z have priorities 1 through 26.
// Uppercase item types A through Z have priorities 27 through 52

/** Split rucksack into two equally size compartments */
const getCompartments = (rucksack) => {
  const size = rucksack.length / 2;
  return [rucksack.slice(0, size), rucksack.slice(size)];
};

/** Find the item that appears in both compartments */
const findMisplacedItem = (compartments) => {
  let items = [];
  compartments[0].split("").forEach((i) => {
    if (compartments[1].includes(i)) {
      items.push(i);
    }
  });
  return [...new Set(items)][0];
};

/** Map priority value */
const getPriority = (item) => {
  // a-z: 1-26 ; A-Z: 27-52
  if (item.match(/[a-z]/)) {
    return item.charCodeAt(0) - 96;
  }
  if (item.match(/[A-Z]/)) {
    return item.charCodeAt(0) - 38;
  }
  return 0;
};

const rucksacks = raw.split("\n");
const compartments = rucksacks.map(getCompartments);
const misplaceds = compartments.map(findMisplacedItem);

const priorities = misplaceds.map(getPriority);

console.log("## PART 1##");
console.log(priorities.reduce((a, b) => a + b));

/** PART 2 */
// split into groups of 3 rucksacks
// find the one common item in the group's rucksacks
// calc priority

/** Split into groups of three */
const getGroups = (_rucksacks) => {
  const GROUP_SIZE = 3;
  const _groups = [];
  let counter = 0;
  let currentGroup = [];
  _rucksacks.forEach((r) => {
    currentGroup.push(r);
    counter++;
    if (counter === GROUP_SIZE) {
      counter = 0;
      _groups.push(currentGroup);
      currentGroup = [];
    }
  });
  return _groups;
};

const findCommonItem = (group) => {
  const ref = group[0];
  const commons = [];
  ref.split("").forEach((i) => {
    // check the other two rucksacks
    if (group[1].match(new RegExp(i)) && group[2].match(new RegExp(i))) {
      commons.push(i);
    }
  });
  return [...new Set(commons)][0];
};

const groups = getGroups(rucksacks);
const commons = groups.map(findCommonItem);
const prioritiesPt2 = commons.map(getPriority);

console.log("## PART 2 ##");
console.log(prioritiesPt2.reduce((a, b) => a + b));
