const { createDeck, initialHandValue } = require("../utils");

describe("blackjack unit tests", () => {
  test("Check deckArray has a total length of 52 elements", () => {
    const deckArray = createDeck();
    expect(deckArray).toHaveLength(52);
  });

  test("When player has a king and a queen, their score is 20.", () => {
    const handArray = ["K♠", "Q♥"];
    const result = initialHandValue(handArray);
    expect(result).toEqual(20);
  });

  test("When player has a king and an ace, their score is 21.", () => {
    const handArray = ["K♠", "A♠"];
    const result = initialHandValue(handArray);
    expect(result).toEqual(21);
  });

  test("When player has a king, queen and an ace, their score is 21.", () => {
    const handArray = ["K♠", "Q♥", "A♠"];
    const result = initialHandValue(handArray);
    expect(result).toEqual(21);
  });

  test("When player has a nine, an ace, and another ace, their score is 21.", () => {
    const handArray = ["9♠", "A♥", "A♠"];
    const result = initialHandValue(handArray);
    expect(result).toEqual(21);
  });

  test("When player has three aces, their score is 13", () => {
    const handArray = ["A♠", "A♥", "A♣"];
    const result = initialHandValue(handArray);
    expect(result).toEqual(13);
  });
});
