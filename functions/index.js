const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.getMockPrediction = functions.https.onCall(async (data, context) => {
  const drivers = [
    { driver: "Max Verstappen", teams: "Red Bull Racing", pictures: "...", win_probability: 0.8, id: "VER" },
    { driver: "Charles Leclerc", teams: "Ferrari", pictures: "...", win_probability: 0.7, id: "LEC" },
    { driver: "Lando Norris", teams: "McLaren", pictures: "...", win_probability: 0.6, id: "NOR" },
    // Add more drivers as needed
  ];

  const reasoning = "This mock prediction is based on a random selection of drivers. In the future, this will be replaced with a sophisticated AI model that considers various factors like driver form, car performance, and track characteristics.";

  return {
    prediction: drivers,
    reasoning: reasoning,
  };
});
