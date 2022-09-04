const prompt = require("prompt");
var colors = require("@colors/colors/safe");
const INTERVAL = 60000; //I suggest to change this to 5000, so you can better test my app

let CUSTOMERS = [
  {
    customerId: "Customer1",
    text: ["put", "your", "hands", "up", "in", "the", "air"],
    lastValidFeed: Date.now(),
  },
  {
    customerId: "Customer2",
    text: ["Wish", "you", "were", "here"],
    lastValidFeed: Date.now(),
  },
];

prompt.start();
waitForUserInput();
function waitForUserInput() {
  prompt.get(["text"], function (err, result) {
    if (err) {
      return onErr(err);
    }
    setLastValidTime(result.text);
    isValidFeedArrived();
    waitForUserInput();
  });
}

function setLastValidTime(text) {
  const predicate = (o) => o.text.indexOf(text) !== -1;
  const customer = CUSTOMERS.find(predicate);
  if (customer) {
    CUSTOMERS[CUSTOMERS.findIndex(predicate)].lastValidFeed = Date.now();
  }
}

function isValidFeedArrived() {
  CUSTOMERS.forEach((c) => {
    if ((Date.now() - c.lastValidFeed) / 1000 >= INTERVAL / 1000) {
      console.log(
        colors.red(
          `${c.customerId}: Warning, didn’t receive input for more than 1 minute`
        )
      );
    } else {
      console.log(colors.green(`back to normal`));
    }
  });
}

function onErr(err) {
  console.log(err);
  return 1;
}

setInterval(isValidFeedArrived, INTERVAL);
