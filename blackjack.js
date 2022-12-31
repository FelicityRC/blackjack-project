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

const displayCards = document.createElement("div");
displayCards.classList.add("card");

const player = document.getElementById("player");
const dealer = document.getElementById("dealer");
const hit = document.getElementById("hit");
const stand = document.getElementById("stand");
const results = document.getElementById("results");
const nextHand = document.getElementById("next-hand");

let dealerHandArray = [];
let playerHandArray = [];
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

const randomCard = () => {
  const randomIndexNum = Math.floor(Math.random() * deckArray.length);
  const cardToRemove = deckArray[randomIndexNum];
  deckArray.splice(randomIndexNum, 1);
  return cardToRemove;
};

const dealCards = () => {
  dealerHandArray = [randomCard(), randomCard()];
  dealerHandArray.forEach((card) => {
    const setCards = displayCards.cloneNode(true);
    setCards.innerHTML = card;
    dealer.append(setCards);
  });

  playerHandArray = [randomCard(), randomCard()];
  playerHandArray.forEach((card) => {
    const setCards = displayCards.cloneNode(true);
    setCards.innerHTML = card;
    player.append(setCards);
  });
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
  if (hasAce > 0) {
    value += hasAce - 1;
    value + 11 > 21 ? (value += 1) : (value += 11);
  }
  return value;
};

const hitPlayer = () => {
  const card = randomCard();
  playerHandArray.push(card);
  const handValue = initialHandValue(playerHandArray);
  const addCard = displayCards.cloneNode(true);
  addCard.innerHTML = card;
  player.append(addCard);
  if (handValue > 21) {
    stand.setAttribute("disabled", true);
    hit.setAttribute("disabled", true);
    nextHand.removeAttribute("disabled");
    displayResults(`You've bust with ${handValue}! So the dealer wins!`);
  }
};

const hitDealer = async () => {
  stand.setAttribute("disabled", true);
  hit.setAttribute("disabled", true);
  nextHand.removeAttribute("disabled");
  const card = await randomCard();
  dealerHandArray.push(card);
  const handValue = await initialHandValue(dealerHandArray);
  const addCard = displayCards.cloneNode(true);
  addCard.innerHTML = card;
  dealer.append(addCard);
  handValue < 16
    ? hitDealer()
    : handValue === 21
    ? displayResults("Dealer has 21 so the dealer WINS!")
    : handValue > 21
    ? displayResults(`Dealer has BUST with ${handValue}! So you WIN! 🥳`)
    : decideWinner();
};

const displayResults = (msg) => {
  results.children[0].innerHTML = msg;
};

const decideWinner = async () => {
  let dealerValue = await initialHandValue(dealerHandArray);
  let playerValue = await initialHandValue(playerHandArray);
  const msg = `Dealer has ${dealerValue}.   You have ${playerValue}.  
  ${dealerValue >= playerValue ? "So the dealer WINS!" : "So you WIN! 🥳"}`;
  displayResults(msg);
  hit.setAttribute("disabled", true);
};

const removeCards = () => {
  results.children[0].innerHTML = " ";
  while (dealer.children.length > 0) {
    dealer.children[0].remove();
  }
  while (player.children.length > 0) {
    player.children[0].remove();
  }
  return true;
};

const playGame = () => {
  stand.removeAttribute("disabled");
  hit.removeAttribute("disabled");
  nextHand.setAttribute("disabled", true);
  removeCards();
  createDeck();
  dealCards();
};

hit.addEventListener("click", hitPlayer);
stand.addEventListener("click", hitDealer);
nextHand.addEventListener("click", playGame);

playGame();

module.exports = {
  randomCard,
  initialHandValue,
};
