const {
  createDeck,
  randomCard,
  dealCards,
  initialHandValue,
  hitPlayer,
  hitDealer,
  decideWinner,
  removeCards,
  playGame,
} = require("../blackjack");

// "use strict";
// jest.mock("../blackjack.js");

describe("blackjack tests", () => {
  test("returns array of 52 cards", () => {
    const actual = createDeck.deckArray;
    const expected = 52;
    expect(actual).toBe(expected);
  });
});

test("return handArray of 2 cards", () => {
  const result = initialHandValue(array);
  expect(result.toHaveLength(2));
});

test("return array of all values and suits", () => {
  expect(createDeck.deckArray).toEqual([
    "A♠",
    "A♥",
    "A♣",
    "A♦",
    "2♠",
    "2♥",
    "2♣",
    "2♦",
    "3♠",
    "3♥",
    "3♣",
    "3♦",
    "4♠",
    "4♥",
    "4♣",
    "4♦",
    "5♠",
    "5♥",
    "5♣",
    "5♦",
    "6♠",
    "6♥",
    "6♣",
    "6♦",
    "7♠",
    "7♥",
    "7♣",
    "7♦",
    "8♠",
    "8♥",
    "8♣",
    "8♦",
    "9♠",
    "9♥",
    "9♣",
    "9♦",
    "10♠",
    "10♥",
    "10♣",
    "10♦",
    "J♠",
    "J♥",
    "J♣",
    "J♦",
    "Q♠",
    "Q♥",
    "Q♣",
    "Q♦",
    "K♠",
    "K♥",
    "K♣",
    "K♦",
  ]);
});
