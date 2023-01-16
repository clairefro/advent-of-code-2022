const load = require("../util/load");

const raw = load(__dirname + "/input.txt");

/** ------------------------------------- */
/** Returns true if all chars in string are unique */
const isUniqueChars = (str) => {
  const re = new RegExp(/^(?:([A-Za-z])(?!.*\1))*$/);
  return re.test(str);
};

const scanForSignal = (str, msgSize) => {
  let foundI = -1;
  for (let i = 0; i < str.length - 4; i++) {
    const substr = str.slice(i, i + msgSize);
    if (isUniqueChars(substr)) {
      foundI = i;
      break;
    }
  }
  return foundI;
};

console.log("## PART 1 ##");
const PACKET_SIZE = 4;

console.log("chars processed for first full package match");
console.log(scanForSignal(raw, PACKET_SIZE) + PACKET_SIZE);

console.log("## PART 2 ##");
const MESSAGE_SIZE = 14;
console.log("chars processed for first full message match");
console.log(scanForSignal(raw, MESSAGE_SIZE) + MESSAGE_SIZE);
