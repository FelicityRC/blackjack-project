const values = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const suits = ["♠", "♥", "♣", "♦"];

const deckArray = [];

const createDeck = () => {
  values.forEach((value) => {
    suits.forEach((suit) => {
      const card = value + suit;
      deckArray.push(card);
    });
  });
  return deckArray;
};

const initialHandValue = (handArray) => {
  let value = 0;
  let hasAce = 0;
  handArray.forEach((card) => {
    let cardValue =
      card.length === 2 ? card.substring(0, 1) : card.substring(0, 2);
    if (cardValue === "A") hasAce += 1;
    else if (cardValue === "J" || cardValue === "Q" || cardValue === "K")
      value += 10;
    else value += Number(cardValue);
  });
  if (hasAce > 0) value + 11 > 21 ? (value += 1) : (value += 11);
  if (hasAce > 1) {
    value += hasAce - 1;
  }
  return value;
};

module.exports = {
  createDeck,
  initialHandValue
};
