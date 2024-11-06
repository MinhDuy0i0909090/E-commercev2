const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AScodeBnuDTWZUOoltDF3pndelXITEdbENLtgrgtT1d8IrOb6LHJFGIHOUZ7ZMlFTn9xZw74Gs8pvS4C",
  client_secret:
    "EDMNFupo19zZFzOBFRRtYRao54pdUw3-Zhj5VoPpmE-VQb-FnswzD4NoZt7HeuhC1xHAa9ItaxU5oaVX",
});

module.exports = paypal;
