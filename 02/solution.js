const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

/** ------------------------------------- */

// OPPONENT
// A: Rock
// B: Paper
// C: Scissors

// YOU
// X: Rock + 1
// Y: Paper + 2
// Z: Scissors + 3

// + 0 (loss)
// + 3 (draw)
// + 6 (win)

const vals = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
};

const getOutcomeScore = (play) => {
  const playVals = play.map((p) => vals[p]);
  if ([...new Set(playVals)].length === 1) {
    /** Draw */
    return 3;
  }
  if (playVals[0] === 1 && playVals[1] === 3) {
    /** Loss */
    return 0;
  }
  if (playVals[0] === 3 && playVals[1] === 1) {
    /** Win */
    return 6;
  }
  if (playVals[0] > playVals[1]) {
    /** Loss */
    return 0;
  }
  /** Win */
  return 6;
};

/** Points from played hand */
const getMyPoints = (_plays) =>
  _plays.map((p) => vals[p[1]]).reduce((a, b) => a + b);

const plays = raw.split("\n").map((d) => d.split(" "));

const scores = plays.map(getOutcomeScore);

// /** My total score */
console.log("## PART 1 ##");
console.log(scores.reduce((a, b) => a + b) + getMyPoints(plays));

/** PART 2 */
// X: need to lose
// Y: need to draw
// Z: need to win

const equivalencies = {
  A: "X",
  B: "Y",
  C: "Z",
};

/** Example scenario: ["A", "X"] = they played rock, need to lose => ["A", "Z"] */
const decidePlay = (s) => {
  let myHand;
  // X: need to lose
  if (s[1] === "X") {
    if (s[0] === "A") {
      myHand = "Z";
    } else if (s[0] === "B") {
      myHand = "X";
    } else {
      myHand = "Y";
    }
  }
  // Y: need to draw
  if (s[1] === "Y") {
    myHand = equivalencies[s[0]];
  }
  // Z: need to win
  if (s[1] === "Z") {
    if (s[0] === "A") {
      myHand = "Y";
    } else if (s[0] === "B") {
      myHand = "Z";
    } else {
      myHand = "X";
    }
  }
  return [s[0], myHand];
};

const part2Plays = plays.map(decidePlay);
const part2Scores = part2Plays.map(getOutcomeScore);

// /** My total score */
console.log("## PART 2 ##");
console.log(part2Scores.reduce((a, b) => a + b) + getMyPoints(part2Plays));
