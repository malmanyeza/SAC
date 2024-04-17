const functions = require("firebase-functions");
const {Paynow} = require("paynow");

exports.processPayment = functions.https.onCall((data, context) => {
  // Initialize Paynow with your Integration ID and Key
  const paynow = new Paynow("17351", "91be348e-e6e6-40a5-9434-a0a81da0f1d4");

  const payment = paynow.createPayment(`Invoice ${Date.now()}`);

  // Adding items from the cart to the payment
  data.items.forEach((item) => {
    payment.add(item.name, parseInt(item.price));
  });

  // Send payment to Paynow
  return paynow.send(payment).then((response) => {
    if (response.success) {
      // Return the link to redirect user
      return {url: response.redirectUrl};
    } else {
      throw new functions.https.HttpsError("failed", "Failed to initiate");
    }
  }).catch((error) => {
    throw new functions.https.HttpsError("internal", "Payment failed", error);
  });
});


exports.doubleNumber = functions.https.onCall((data, context) => {
  if (typeof data.number !== "number") {
    throw new functions.https.HttpsError("invalid-argument");
  }
  return {result: data.number*2};
});
